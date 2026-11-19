using System.Text.Json;
using Hani.BuildingBlocks.Application;
using Hani.BuildingBlocks.Domain;
using Hani.Modules.Content.Application.Support;
using Hani.Modules.Content.Domain.Growth;
using Hani.Modules.Content.Domain.Support;
using Hani.Modules.Content.Infrastructure.Persistence;
using Hani.Modules.Content.Infrastructure.Storage;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace Hani.Modules.Content.Infrastructure.Support;

internal sealed class CustomerSupportService(
    ContentDbContext dbContext,
    IIdGenerator ids,
    ISupportAttachmentStorage attachmentStorage,
    ISupportAttachmentScanner attachmentScanner,
    ILogger<CustomerSupportService> logger) : ICustomerSupportService
{
    private static readonly JsonSerializerOptions Json = new(JsonSerializerDefaults.Web);

    public async Task<CustomerSupportTicketPageDto> ListTicketsAsync(
        Guid userId,
        int page,
        int pageSize,
        string? status,
        string? q,
        CancellationToken cancellationToken)
    {
        var normalizedPage = page <= 0 ? 1 : page;
        var normalizedPageSize = pageSize is <= 0 or > 100 ? 20 : pageSize;
        var query = dbContext.SupportTickets
            .AsNoTracking()
            .Where(item => item.UserId == userId);
        if (!string.IsNullOrWhiteSpace(q))
        {
            var term = q.Trim();
            query = query.Where(item =>
                item.TicketNumber.Contains(term) ||
                item.Subject.Contains(term));
        }

        if (!string.IsNullOrWhiteSpace(status) &&
            Enum.TryParse<SupportTicketStatus>(status, true, out var parsedStatus))
        {
            query = query.Where(item => item.Status == parsedStatus);
        }

        var total = await query.CountAsync(cancellationToken);
        var items = await query
            .OrderByDescending(item => item.LastMessageAt)
            .Skip((normalizedPage - 1) * normalizedPageSize)
            .Take(normalizedPageSize)
            .Select(item => new CustomerSupportTicketRowDto(
                item.Id,
                item.TicketNumber,
                item.Subject,
                item.Category,
                item.Status.ToString(),
                item.Priority.ToString(),
                item.Messages.Count(message => !message.IsInternal),
                item.Messages.Count(message =>
                    message.AuthorType == SupportAuthorType.Admin &&
                    !message.IsInternal &&
                    (item.CustomerLastReadAt == null ||
                        message.CreatedAt > item.CustomerLastReadAt)),
                item.CreatedAt,
                item.LastMessageAt))
            .ToArrayAsync(cancellationToken);
        return new CustomerSupportTicketPageDto(
            items,
            normalizedPage,
            normalizedPageSize,
            total);
    }

    public async Task<CustomerSupportTicketDetailDto?> GetTicketAsync(
        Guid userId,
        Guid id,
        CancellationToken cancellationToken)
    {
        var ticket = await dbContext.SupportTickets
            .Include(item => item.Messages)
            .FirstOrDefaultAsync(
                item => item.Id == id && item.UserId == userId,
                cancellationToken);
        if (ticket is null)
        {
            return null;
        }

        ticket.MarkCustomerRead();
        await dbContext.SaveChangesAsync(cancellationToken);
        var disputes = await LoadTicketDisputesAsync(id, cancellationToken);
        var attachments = await LoadAttachmentsAsync(id, cancellationToken);
        return ToDetail(ticket, disputes, attachments);
    }

    public async Task<Result<CustomerSupportTicketDetailDto>> ReplyAsync(
        Guid userId,
        Guid id,
        string body,
        IReadOnlyList<Guid>? attachmentIds,
        CancellationToken cancellationToken)
    {
        if (string.IsNullOrWhiteSpace(body))
        {
            return Result<CustomerSupportTicketDetailDto>.Failure(
                Error.Validation("HANI-SUPPORT-4301", "A message body is required."));
        }

        var ticket = await dbContext.SupportTickets
            .Include(item => item.Messages)
            .FirstOrDefaultAsync(
                item => item.Id == id && item.UserId == userId,
                cancellationToken);
        if (ticket is null)
        {
            return Result<CustomerSupportTicketDetailDto>.Failure(
                Error.NotFound("HANI-SUPPORT-4302", "Support ticket was not found."));
        }

        var message = ticket.AddMessage(
            ids,
            SupportAuthorType.Customer,
            userId,
            body,
            false);
        var requestedAttachments = attachmentIds?
            .Where(item => item != Guid.Empty)
            .Distinct()
            .ToArray() ?? [];
        if (requestedAttachments.Length > 0)
        {
            var attachments = await dbContext.SupportAttachments
                .Where(item =>
                    requestedAttachments.Contains(item.Id) &&
                    item.TicketId == id &&
                    item.MessageId == null &&
                    item.UploadedBy == userId)
                .ToArrayAsync(cancellationToken);
            if (attachments.Length != requestedAttachments.Length)
            {
                return Result<CustomerSupportTicketDetailDto>.Failure(
                    Error.Validation(
                        "HANI-SUPPORT-4307",
                        "One or more attachments are invalid."));
            }

            foreach (var attachment in attachments)
            {
                attachment.AttachToMessage(message.Id);
            }
        }

        ticket.MarkCustomerRead();
        AddNotification(
            ticket.AssignedTo,
            "support.ticket.customer_replied",
            new
            {
                ticket.Id,
                ticket.TicketNumber,
                ticket.Subject,
                ticket.Status,
                deepLink = $"/admin/support/tickets/{ticket.Id}"
            });
        await dbContext.SaveChangesAsync(cancellationToken);
        var disputes = await LoadTicketDisputesAsync(id, cancellationToken);
        var loadedAttachments = await LoadAttachmentsAsync(id, cancellationToken);
        return Result<CustomerSupportTicketDetailDto>.Success(
            ToDetail(ticket, disputes, loadedAttachments));
    }

    public async Task<CustomerSupportDisputePageDto> ListDisputesAsync(
        Guid userId,
        int page,
        int pageSize,
        string? status,
        CancellationToken cancellationToken)
    {
        var normalizedPage = page <= 0 ? 1 : page;
        var normalizedPageSize = pageSize is <= 0 or > 100 ? 20 : pageSize;
        var query = dbContext.SupportDisputes
            .AsNoTracking()
            .Where(dispute => dbContext.SupportTickets.Any(ticket =>
                ticket.Id == dispute.TicketId && ticket.UserId == userId));
        if (!string.IsNullOrWhiteSpace(status) &&
            Enum.TryParse<SupportDisputeStatus>(status, true, out var parsedStatus))
        {
            query = query.Where(item => item.Status == parsedStatus);
        }

        var total = await query.CountAsync(cancellationToken);
        var rows = await query
            .OrderByDescending(item => item.OpenedAt)
            .Skip((normalizedPage - 1) * normalizedPageSize)
            .Take(normalizedPageSize)
            .ToArrayAsync(cancellationToken);
        var ticketIds = rows.Select(item => item.TicketId).Distinct().ToArray();
        var ticketNumbers = await dbContext.SupportTickets
            .AsNoTracking()
            .Where(item => ticketIds.Contains(item.Id))
            .Select(item => new { item.Id, item.TicketNumber })
            .ToDictionaryAsync(
                item => item.Id,
                item => item.TicketNumber,
                cancellationToken);
        var items = rows
            .Select(item => ToDisputeDto(
                item,
                ticketNumbers.GetValueOrDefault(item.TicketId, string.Empty)))
            .ToArray();
        return new CustomerSupportDisputePageDto(
            items,
            normalizedPage,
            normalizedPageSize,
            total);
    }

    public async Task<Result<CustomerSupportDisputeDto>> CreateDisputeAsync(
        Guid userId,
        Guid ticketId,
        CustomerSupportDisputeInput input,
        CancellationToken cancellationToken)
    {
        var ticket = await dbContext.SupportTickets
            .AsNoTracking()
            .FirstOrDefaultAsync(
                item => item.Id == ticketId && item.UserId == userId,
                cancellationToken);
        if (ticket is null)
        {
            return Result<CustomerSupportDisputeDto>.Failure(
                Error.NotFound("HANI-SUPPORT-4302", "Support ticket was not found."));
        }

        if (!Enum.TryParse<SupportDisputeType>(input.Type, true, out var parsedType))
        {
            return Result<CustomerSupportDisputeDto>.Failure(
                Error.Validation("HANI-SUPPORT-4303", "Invalid dispute type."));
        }

        try
        {
            var dispute = SupportDispute.Create(
                ids,
                ticketId,
                input.OrderId,
                parsedType,
                input.Amount,
                input.Currency,
                input.Description,
                input.EvidenceUrl,
                userId);
            dbContext.SupportDisputes.Add(dispute);
            AddNotification(
                ticket.AssignedTo,
                "support.dispute.opened",
                new
                {
                    ticket.Id,
                    ticket.TicketNumber,
                    disputeId = dispute.Id,
                    dispute.Type,
                    dispute.Amount,
                    dispute.Currency,
                    deepLink = $"/admin/support/tickets/{ticket.Id}"
                });
            await dbContext.SaveChangesAsync(cancellationToken);
            return Result<CustomerSupportDisputeDto>.Success(
                ToDisputeDto(dispute, ticket.TicketNumber));
        }
        catch (ArgumentException exception)
        {
            return Result<CustomerSupportDisputeDto>.Failure(
                Error.Validation("HANI-SUPPORT-4304", exception.Message));
        }
    }

    public async Task<Result<SupportAttachmentDto>> UploadAttachmentAsync(
        Guid userId,
        Guid ticketId,
        string fileName,
        string contentType,
        long sizeBytes,
        Stream content,
        CancellationToken cancellationToken)
    {
        var ticket = await dbContext.SupportTickets
            .AsNoTracking()
            .FirstOrDefaultAsync(
                item => item.Id == ticketId && item.UserId == userId,
                cancellationToken);
        if (ticket is null)
        {
            return Result<SupportAttachmentDto>.Failure(
                Error.NotFound("HANI-SUPPORT-4302", "Support ticket was not found."));
        }

        if (sizeBytes is <= 0 or > SupportAttachmentRules.MaxBytes)
        {
            return Result<SupportAttachmentDto>.Failure(
                Error.Validation(
                    "HANI-SUPPORT-4308",
                    "Attachment size must be between 1 byte and 10 MB."));
        }

        var normalizedType = contentType.Trim().ToLowerInvariant();
        if (!SupportAttachmentRules.TryGetExtension(normalizedType, out var extension))
        {
            return Result<SupportAttachmentDto>.Failure(
                Error.Validation(
                    "HANI-SUPPORT-4309",
                    "Only JPEG, PNG, WebP, PDF, and text files are allowed."));
        }

        var attachmentId = ids.NewId();
        var storageKey = SupportAttachmentRules.StorageKey(
            ticketId,
            attachmentId,
            extension);
        try
        {
            await attachmentStorage.SaveAsync(
                storageKey,
                content,
                cancellationToken);
            await using var scanStream = await attachmentStorage.OpenReadAsync(
                storageKey,
                cancellationToken);
            var scan = await attachmentScanner.ScanAsync(
                scanStream,
                cancellationToken);
            if (scan.ScannerAvailable && !scan.IsClean)
            {
                await attachmentStorage.DeleteAsync(storageKey, cancellationToken);
                return Result<SupportAttachmentDto>.Failure(
                    Error.Validation(
                        "HANI-SUPPORT-4312",
                        "Attachment was rejected by the security scanner."));
            }

            var attachment = SupportAttachment.Create(
                ids,
                ticketId,
                SupportAttachmentRules.SafeFileName(fileName),
                normalizedType,
                sizeBytes,
                storageKey,
                userId);
            if (scan.ScannerAvailable)
            {
                attachment.MarkScanClean();
            }

            if (normalizedType.StartsWith("image/", StringComparison.Ordinal))
            {
                try
                {
                    await using var imageStream = await attachmentStorage.OpenReadAsync(
                        storageKey,
                        cancellationToken);
                    var thumbnail = await SupportAttachmentThumbnails.CreateAsync(
                        imageStream,
                        cancellationToken);
                    if (thumbnail is not null)
                    {
                        var thumbnailKey = $"{storageKey}.thumb.webp";
                        await attachmentStorage.SaveAsync(
                            thumbnailKey,
                            new MemoryStream(thumbnail),
                            cancellationToken);
                        attachment.SetThumbnail(thumbnailKey);
                    }
                }
                catch (Exception exception)
                {
                    logger.LogWarning(
                        exception,
                        "Support attachment thumbnail generation failed.");
                }
            }

            dbContext.SupportAttachments.Add(attachment);
            await dbContext.SaveChangesAsync(cancellationToken);
            return Result<SupportAttachmentDto>.Success(ToAttachmentDto(attachment));
        }
        catch (ArgumentException exception)
        {
            await attachmentStorage.DeleteAsync(storageKey, cancellationToken);
            return Result<SupportAttachmentDto>.Failure(
                Error.Validation("HANI-SUPPORT-4310", exception.Message));
        }
        catch
        {
            await attachmentStorage.DeleteAsync(storageKey, cancellationToken);
            throw;
        }
    }

    public async Task<SupportAttachmentDownloadDto?> DownloadThumbnailAsync(
        Guid userId,
        Guid attachmentId,
        CancellationToken cancellationToken)
    {
        var attachment = await dbContext.SupportAttachments
            .AsNoTracking()
            .FirstOrDefaultAsync(item => item.Id == attachmentId, cancellationToken);
        if (attachment is null ||
            attachment.ThumbnailStorageKey is null ||
            attachment.MessageId is not { } messageId)
        {
            return null;
        }

        if (!await CanDownloadAsync(userId, attachment, messageId, cancellationToken))
        {
            return null;
        }

        var stream = await attachmentStorage.OpenReadAsync(
            attachment.ThumbnailStorageKey,
            cancellationToken);
        return new SupportAttachmentDownloadDto(
            $"{Path.GetFileNameWithoutExtension(attachment.FileName)}-thumb.webp",
            "image/webp",
            stream);
    }

    public async Task<SupportAttachmentDownloadDto?> DownloadAttachmentAsync(
        Guid userId,
        Guid attachmentId,
        CancellationToken cancellationToken)
    {
        var attachment = await dbContext.SupportAttachments
            .AsNoTracking()
            .FirstOrDefaultAsync(item => item.Id == attachmentId, cancellationToken);
        if (attachment is null || attachment.MessageId is not { } messageId)
        {
            return null;
        }

        if (!await CanDownloadAsync(userId, attachment, messageId, cancellationToken))
        {
            return null;
        }

        var stream = await attachmentStorage.OpenReadAsync(
            attachment.StorageKey,
            cancellationToken);
        return new SupportAttachmentDownloadDto(
            attachment.FileName,
            attachment.ContentType,
            stream);
    }

    public async Task<CustomerSupportDisputeDto?> GetDisputeAsync(
        Guid userId,
        Guid id,
        CancellationToken cancellationToken)
    {
        var row = await (
                from dispute in dbContext.SupportDisputes.AsNoTracking()
                join ticket in dbContext.SupportTickets.AsNoTracking()
                    on dispute.TicketId equals ticket.Id
                where dispute.Id == id && ticket.UserId == userId
                select new { Dispute = dispute, ticket.TicketNumber })
            .FirstOrDefaultAsync(cancellationToken);
        return row is null
            ? null
            : ToDisputeDto(row.Dispute, row.TicketNumber);
    }

    private async Task<IReadOnlyList<CustomerSupportDisputeDto>> LoadTicketDisputesAsync(
        Guid ticketId,
        CancellationToken cancellationToken)
    {
        var rows = await dbContext.SupportDisputes
            .AsNoTracking()
            .Where(item => item.TicketId == ticketId)
            .OrderByDescending(item => item.OpenedAt)
            .ToArrayAsync(cancellationToken);
        var ticketNumber = await dbContext.SupportTickets
            .AsNoTracking()
            .Where(item => item.Id == ticketId)
            .Select(item => item.TicketNumber)
            .FirstOrDefaultAsync(cancellationToken);
        return rows
            .Select(item => ToDisputeDto(item, ticketNumber ?? string.Empty))
            .ToArray();
    }

    private async Task<bool> CanDownloadAsync(
        Guid userId,
        SupportAttachment attachment,
        Guid messageId,
        CancellationToken cancellationToken)
    {
        var ownsTicket = await dbContext.SupportTickets
            .AsNoTracking()
            .AnyAsync(
                item => item.Id == attachment.TicketId && item.UserId == userId,
                cancellationToken);
        if (!ownsTicket)
        {
            return false;
        }

        var message = await dbContext.SupportTickets
            .AsNoTracking()
            .Where(item => item.Id == attachment.TicketId)
            .SelectMany(item => item.Messages)
            .FirstOrDefaultAsync(item => item.Id == messageId, cancellationToken);
        return message is { IsInternal: false };
    }

    private async Task<IReadOnlyList<SupportAttachmentDto>> LoadAttachmentsAsync(
        Guid ticketId,
        CancellationToken cancellationToken)
        => await dbContext.SupportAttachments
            .AsNoTracking()
            .Where(item => item.TicketId == ticketId && item.MessageId != null)
            .OrderBy(item => item.CreatedAt)
            .Select(item => new SupportAttachmentDto(
                item.Id,
                item.TicketId,
                item.MessageId,
                item.FileName,
                item.ContentType,
                item.SizeBytes,
                item.ThumbnailStorageKey != null,
                item.CreatedAt))
            .ToArrayAsync(cancellationToken);

    private static SupportAttachmentDto ToAttachmentDto(
        SupportAttachment attachment)
        => new(
            attachment.Id,
            attachment.TicketId,
            attachment.MessageId,
            attachment.FileName,
            attachment.ContentType,
            attachment.SizeBytes,
            attachment.ThumbnailStorageKey is not null,
            attachment.CreatedAt);

    private void AddNotification(Guid? userId, string templateKey, object payload)
    {
        if (userId is null)
        {
            return;
        }

        dbContext.Notifications.Add(Notification.Create(
            ids,
            userId,
            ContactChannel.Email,
            templateKey,
            JsonSerializer.Serialize(payload, Json)));
    }

    private static CustomerSupportTicketDetailDto ToDetail(
        SupportTicket ticket,
        IReadOnlyList<CustomerSupportDisputeDto> disputes,
        IReadOnlyList<SupportAttachmentDto> attachments)
        => new(
            ticket.Id,
            ticket.TicketNumber,
            ticket.Subject,
            ticket.Category,
            ticket.Status.ToString(),
            ticket.Priority.ToString(),
            ticket.CreatedAt,
            ticket.UpdatedAt,
            ticket.LastMessageAt,
            0,
            ticket.AdminLastReadAt,
            ticket.Messages
                .Where(message => !message.IsInternal)
                .OrderBy(message => message.CreatedAt)
                .Select(message => new CustomerSupportMessageDto(
                    message.Id,
                    message.AuthorType.ToString(),
                    message.Body,
                    message.CreatedAt,
                    attachments
                        .Where(attachment => attachment.MessageId == message.Id)
                        .ToArray()))
                .ToArray(),
            disputes);

    private static CustomerSupportDisputeDto ToDisputeDto(
        SupportDispute dispute,
        string ticketNumber)
        => new(
            dispute.Id,
            dispute.TicketId,
            ticketNumber,
            dispute.OrderId,
            dispute.Type.ToString(),
            dispute.Status.ToString(),
            dispute.Amount,
            dispute.Currency,
            dispute.Description,
            dispute.EvidenceUrl,
            dispute.Resolution,
            dispute.OpenedAt,
            dispute.ResolvedAt);
}
