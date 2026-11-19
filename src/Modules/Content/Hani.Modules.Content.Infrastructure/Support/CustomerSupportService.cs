using System.Text.Json;
using Hani.BuildingBlocks.Application;
using Hani.BuildingBlocks.Domain;
using Hani.Modules.Content.Application.Support;
using Hani.Modules.Content.Domain.Growth;
using Hani.Modules.Content.Domain.Support;
using Hani.Modules.Content.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Hani.Modules.Content.Infrastructure.Support;

internal sealed class CustomerSupportService(
    ContentDbContext dbContext,
    IIdGenerator ids) : ICustomerSupportService
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
            .AsNoTracking()
            .Include(item => item.Messages)
            .FirstOrDefaultAsync(
                item => item.Id == id && item.UserId == userId,
                cancellationToken);
        if (ticket is null)
        {
            return null;
        }

        var disputes = await LoadTicketDisputesAsync(id, cancellationToken);
        return ToDetail(ticket, disputes);
    }

    public async Task<Result<CustomerSupportTicketDetailDto>> ReplyAsync(
        Guid userId,
        Guid id,
        string body,
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

        ticket.AddMessage(ids, SupportAuthorType.Customer, userId, body, false);
        AddNotification(
            ticket.AssignedTo,
            "support.ticket.customer_replied",
            new
            {
                ticket.Id,
                ticket.TicketNumber,
                ticket.Subject,
                ticket.Status
            });
        await dbContext.SaveChangesAsync(cancellationToken);
        var disputes = await LoadTicketDisputesAsync(id, cancellationToken);
        return Result<CustomerSupportTicketDetailDto>.Success(
            ToDetail(ticket, disputes));
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
                    dispute.Currency
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
        IReadOnlyList<CustomerSupportDisputeDto> disputes)
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
            ticket.Messages
                .Where(message => !message.IsInternal)
                .OrderBy(message => message.CreatedAt)
                .Select(message => new CustomerSupportMessageDto(
                    message.Id,
                    message.AuthorType.ToString(),
                    message.Body,
                    message.CreatedAt))
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
