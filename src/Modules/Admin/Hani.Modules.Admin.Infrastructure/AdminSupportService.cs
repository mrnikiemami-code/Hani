using System.Text.Json;
using Hani.BuildingBlocks.Application;
using Hani.Modules.Admin.Application;
using Hani.Modules.Content.Domain.Growth;
using Hani.Modules.Content.Domain.Support;
using Microsoft.EntityFrameworkCore;

namespace Hani.Modules.Admin.Infrastructure;

internal sealed partial class AdminService : IAdminSupportService
{
    public async Task<AdminSupportTicketPageDto> ListTicketsAsync(
        int page,
        int pageSize,
        string? q,
        string? status,
        string? priority,
        CancellationToken cancellationToken)
    {
        var normalizedPage = page <= 0 ? 1 : page;
        var normalizedPageSize = pageSize is <= 0 or > 100 ? 20 : pageSize;
        var query = content.SupportTickets.AsNoTracking();
        if (!string.IsNullOrWhiteSpace(q))
        {
            var term = q.Trim();
            query = query.Where(item =>
                item.TicketNumber.Contains(term) ||
                item.Subject.Contains(term) ||
                item.ContactEmail.Contains(term) ||
                item.ContactName.Contains(term));
        }

        if (!string.IsNullOrWhiteSpace(status) &&
            Enum.TryParse<SupportTicketStatus>(status, true, out var parsedStatus))
        {
            query = query.Where(item => item.Status == parsedStatus);
        }

        if (!string.IsNullOrWhiteSpace(priority) &&
            Enum.TryParse<SupportTicketPriority>(priority, true, out var parsedPriority))
        {
            query = query.Where(item => item.Priority == parsedPriority);
        }

        var total = await query.CountAsync(cancellationToken);
        var rows = await query
            .OrderByDescending(item => item.LastMessageAt)
            .Skip((normalizedPage - 1) * normalizedPageSize)
            .Take(normalizedPageSize)
            .ToArrayAsync(cancellationToken);
        var ticketIds = rows.Select(item => item.Id).ToArray();
        var firstResponses = await content.SupportTickets
            .AsNoTracking()
            .Where(item => ticketIds.Contains(item.Id))
            .SelectMany(item => item.Messages)
            .Where(message =>
                message.AuthorType == SupportAuthorType.Admin &&
                !message.IsInternal)
            .GroupBy(message => message.TicketId)
            .Select(group => new
            {
                TicketId = group.Key,
                First = group.Min(message => message.CreatedAt)
            })
            .ToDictionaryAsync(
                item => item.TicketId,
                item => item.First,
                cancellationToken);
        var assigneeNames = await LoadAssigneeNamesAsync(
            rows.Select(item => item.AssignedTo).ToArray(),
            cancellationToken);
        var now = DateTimeOffset.UtcNow;
        var items = rows.Select(item =>
        {
            var dueAt = AdminSupportSlaPolicy.DueAt(
                item.CreatedAt,
                item.Priority.ToString());
            firstResponses.TryGetValue(item.Id, out var firstResponse);
            return new AdminSupportTicketRowDto(
                item.Id,
                item.TicketNumber,
                item.Subject,
                item.ContactName,
                item.ContactEmail,
                item.Category,
                item.Priority.ToString(),
                item.Status.ToString(),
                item.AssignedTo,
                item.Messages.Count,
                item.CreatedAt,
                item.LastMessageAt,
                item.AssignedTo is { } assigned &&
                assigneeNames.TryGetValue(assigned, out var name)
                    ? name
                    : null,
                dueAt,
                firstResponse == default ? null : firstResponse,
                AdminSupportSlaPolicy.Evaluate(
                    dueAt,
                    firstResponse == default ? null : firstResponse,
                    item.Status.ToString(),
                    now));
        }).ToArray();
        return new AdminSupportTicketPageDto(items, normalizedPage, normalizedPageSize, total);
    }

    public async Task<AdminSupportTicketDetailDto?> GetTicketAsync(
        Guid id,
        CancellationToken cancellationToken)
    {
        var ticket = await content.SupportTickets
            .AsNoTracking()
            .Include(item => item.Messages)
            .FirstOrDefaultAsync(item => item.Id == id, cancellationToken);
        if (ticket is null)
        {
            return null;
        }

        var assigneeNames = await LoadAssigneeNamesAsync(
            [ticket.AssignedTo],
            cancellationToken);
        return ToSupportDetail(
            ticket,
            ticket.AssignedTo is { } assigned &&
            assigneeNames.TryGetValue(assigned, out var name)
                ? name
                : null);
    }

    public async Task<SupportTicketCreatedDto> CreateAsync(
        AdminSupportTicketInput input,
        CancellationToken cancellationToken)
    {
        var priority = Enum.TryParse<SupportTicketPriority>(input.Priority, true, out var parsed)
            ? parsed
            : SupportTicketPriority.Normal;
        var ticket = SupportTicket.Create(
            ids,
            input.UserId,
            input.ContactName,
            input.ContactEmail,
            input.ContactPhone,
            input.Subject,
            input.Category,
            input.Message,
            priority);
        content.SupportTickets.Add(ticket);
        await content.SaveChangesAsync(cancellationToken);
        return new SupportTicketCreatedDto(ticket.Id, ticket.TicketNumber);
    }

    public async Task<AdminSupportTicketDetailDto?> ReplyAsync(
        Guid id,
        Guid actorUserId,
        string body,
        bool isInternal,
        CancellationToken cancellationToken)
    {
        var ticket = await content.SupportTickets
            .Include(item => item.Messages)
            .FirstOrDefaultAsync(item => item.Id == id, cancellationToken);
        if (ticket is null)
        {
            return null;
        }

        ticket.AddMessage(ids, SupportAuthorType.Admin, actorUserId, body, isInternal);
        if (!isInternal)
        {
            AddNotification(
                ticket.UserId,
                "support.ticket.replied",
                new
                {
                    ticket.Id,
                    ticket.TicketNumber,
                    ticket.Subject,
                    ticket.Status
                });
        }

        await content.SaveChangesAsync(cancellationToken);
        var assigneeNames = await LoadAssigneeNamesAsync(
            [ticket.AssignedTo],
            cancellationToken);
        return ToSupportDetail(
            ticket,
            ticket.AssignedTo is { } assigned &&
            assigneeNames.TryGetValue(assigned, out var name)
                ? name
                : null);
    }

    public async Task<AdminSupportTicketDetailDto?> UpdateAsync(
        Guid id,
        string status,
        string priority,
        Guid? assignedTo,
        CancellationToken cancellationToken)
    {
        if (!Enum.TryParse<SupportTicketStatus>(status, true, out var parsedStatus) ||
            !Enum.TryParse<SupportTicketPriority>(priority, true, out var parsedPriority))
        {
            throw new ArgumentException("Invalid support ticket status or priority.");
        }

        var ticket = await content.SupportTickets
            .Include(item => item.Messages)
            .FirstOrDefaultAsync(item => item.Id == id, cancellationToken);
        if (ticket is null)
        {
            return null;
        }

        ticket.SetStatus(parsedStatus);
        ticket.SetPriority(parsedPriority);
        ticket.Assign(assignedTo);
        await content.SaveChangesAsync(cancellationToken);
        var assigneeNames = await LoadAssigneeNamesAsync(
            [ticket.AssignedTo],
            cancellationToken);
        return ToSupportDetail(
            ticket,
            ticket.AssignedTo is { } assigned &&
            assigneeNames.TryGetValue(assigned, out var name)
                ? name
                : null);
    }

    public async Task<AdminSupportDisputePageDto> ListDisputesAsync(
        int page,
        int pageSize,
        string? status,
        string? type,
        Guid? ticketId,
        CancellationToken cancellationToken)
    {
        var normalizedPage = page <= 0 ? 1 : page;
        var normalizedPageSize = pageSize is <= 0 or > 100 ? 20 : pageSize;
        var query = content.SupportDisputes.AsNoTracking();
        if (!string.IsNullOrWhiteSpace(status) &&
            Enum.TryParse<SupportDisputeStatus>(status, true, out var parsedStatus))
        {
            query = query.Where(item => item.Status == parsedStatus);
        }

        if (!string.IsNullOrWhiteSpace(type) &&
            Enum.TryParse<SupportDisputeType>(type, true, out var parsedType))
        {
            query = query.Where(item => item.Type == parsedType);
        }

        if (ticketId is { } id)
        {
            query = query.Where(item => item.TicketId == id);
        }

        var total = await query.CountAsync(cancellationToken);
        var rows = await query
            .OrderByDescending(item => item.OpenedAt)
            .Skip((normalizedPage - 1) * normalizedPageSize)
            .Take(normalizedPageSize)
            .ToArrayAsync(cancellationToken);
        var ticketIds = rows.Select(item => item.TicketId).Distinct().ToArray();
        var ticketNumbers = await content.SupportTickets
            .AsNoTracking()
            .Where(item => ticketIds.Contains(item.Id))
            .Select(item => new { item.Id, item.TicketNumber })
            .ToDictionaryAsync(item => item.Id, item => item.TicketNumber, cancellationToken);
        var items = rows.Select(item => ToDisputeDto(
            item,
            ticketNumbers.GetValueOrDefault(item.TicketId, string.Empty))).ToArray();
        return new AdminSupportDisputePageDto(
            items,
            normalizedPage,
            normalizedPageSize,
            total);
    }

    public async Task<Result<AdminSupportDisputeDto>> CreateDisputeAsync(
        Guid ticketId,
        AdminSupportDisputeInput input,
        Guid actorUserId,
        CancellationToken cancellationToken)
    {
        var ticket = await content.SupportTickets
            .AsNoTracking()
            .FirstOrDefaultAsync(item => item.Id == ticketId, cancellationToken);
        if (ticket is null)
        {
            return Result<AdminSupportDisputeDto>.Failure(
                Error.NotFound("HANI-SUPPORT-4201", "Support ticket was not found."));
        }

        if (!Enum.TryParse<SupportDisputeType>(input.Type, true, out var parsedType))
        {
            return Result<AdminSupportDisputeDto>.Failure(
                Error.Validation("HANI-SUPPORT-4202", "Invalid dispute type."));
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
                actorUserId);
            content.SupportDisputes.Add(dispute);
            AddNotification(
                ticket.UserId,
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
            await content.SaveChangesAsync(cancellationToken);
            return Result<AdminSupportDisputeDto>.Success(
                ToDisputeDto(dispute, ticket.TicketNumber));
        }
        catch (ArgumentException exception)
        {
            return Result<AdminSupportDisputeDto>.Failure(
                Error.Validation("HANI-SUPPORT-4203", exception.Message));
        }
    }

    public async Task<Result<AdminSupportDisputeDto>> UpdateDisputeStatusAsync(
        Guid id,
        AdminSupportDisputeStatusInput input,
        Guid actorUserId,
        CancellationToken cancellationToken)
    {
        if (!Enum.TryParse<SupportDisputeStatus>(input.Status, true, out var parsedStatus))
        {
            return Result<AdminSupportDisputeDto>.Failure(
                Error.Validation("HANI-SUPPORT-4204", "Invalid dispute status."));
        }

        var dispute = await content.SupportDisputes
            .FirstOrDefaultAsync(item => item.Id == id, cancellationToken);
        if (dispute is null)
        {
            return Result<AdminSupportDisputeDto>.Failure(
                Error.NotFound("HANI-SUPPORT-4205", "Support dispute was not found."));
        }

        try
        {
            dispute.SetStatus(parsedStatus, actorUserId, input.Resolution);
            var ticket = await content.SupportTickets
                .AsNoTracking()
                .Where(item => item.Id == dispute.TicketId)
                .Select(item => new { item.UserId, item.TicketNumber })
                .FirstOrDefaultAsync(cancellationToken);
            AddNotification(
                ticket?.UserId,
                "support.dispute.updated",
                new
                {
                    dispute.TicketId,
                    ticket?.TicketNumber,
                    disputeId = dispute.Id,
                    dispute.Status,
                    dispute.Resolution
                });
            await content.SaveChangesAsync(cancellationToken);
            return Result<AdminSupportDisputeDto>.Success(
                ToDisputeDto(dispute, ticket?.TicketNumber ?? string.Empty));
        }
        catch (ArgumentException exception)
        {
            return Result<AdminSupportDisputeDto>.Failure(
                Error.Validation("HANI-SUPPORT-4206", exception.Message));
        }
        catch (InvalidOperationException exception)
        {
            return Result<AdminSupportDisputeDto>.Failure(
                Error.Conflict("HANI-SUPPORT-4207", exception.Message));
        }
    }

    public async Task<AdminSupportReportDto> GetReportAsync(
        int days,
        CancellationToken cancellationToken)
    {
        var periodDays = days is > 0 and <= 3650 ? days : 30;
        var to = DateTimeOffset.UtcNow;
        var from = to.AddDays(-periodDays);
        var tickets = await content.SupportTickets
            .AsNoTracking()
            .Include(item => item.Messages)
            .Where(item => item.CreatedAt >= from)
            .ToArrayAsync(cancellationToken);
        var now = DateTimeOffset.UtcNow;
        var evaluated = tickets.Select(ticket =>
        {
            var firstResponse = FirstResponseAt(ticket);
            var dueAt = AdminSupportSlaPolicy.DueAt(
                ticket.CreatedAt,
                ticket.Priority.ToString());
            return new
            {
                Ticket = ticket,
                FirstResponse = firstResponse,
                DueAt = dueAt,
                Sla = AdminSupportSlaPolicy.Evaluate(
                    dueAt,
                    firstResponse,
                    ticket.Status.ToString(),
                    now)
            };
        }).ToArray();
        var responded = evaluated
            .Where(item => item.FirstResponse is not null)
            .ToArray();
        var resolved = evaluated
            .Where(item => item.Ticket.Status is SupportTicketStatus.Resolved or
                SupportTicketStatus.Closed)
            .ToArray();
        var assigneeNames = await LoadAssigneeNamesAsync(
            tickets.Select(item => item.AssignedTo).ToArray(),
            cancellationToken);
        var slaStates = new[] { "Met", "AtRisk", "Breached", "Pending" };
        var slaBreakdown = slaStates
            .Select(state => new AdminSupportSlaBreakdownDto(
                state,
                evaluated.Count(item => item.Sla == state)))
            .ToArray();
        var byCategory = tickets
            .GroupBy(item => item.Category)
            .Select(group => new AdminSupportCategoryReportDto(
                group.Key,
                group.Count()))
            .OrderByDescending(item => item.Count)
            .ToArray();
        var byAssignee = tickets
            .GroupBy(item => item.AssignedTo)
            .Select(group => new AdminSupportAssigneeReportDto(
                group.Key,
                group.Key is { } assigned &&
                assigneeNames.TryGetValue(assigned, out var name)
                    ? name
                    : string.Empty,
                group.Count(item => item.Status is SupportTicketStatus.Open or
                    SupportTicketStatus.InProgress or
                    SupportTicketStatus.WaitingCustomer),
                group.Count()))
            .OrderByDescending(item => item.OpenCount)
            .ThenByDescending(item => item.TotalCount)
            .ToArray();

        return new AdminSupportReportDto(
            periodDays,
            from,
            to,
            tickets.Length,
            evaluated.Count(item => item.Ticket.Status is SupportTicketStatus.Open or
                SupportTicketStatus.InProgress or
                SupportTicketStatus.WaitingCustomer),
            resolved.Length,
            evaluated.Count(item => item.Sla == "Breached"),
            evaluated.Count(item => item.Sla == "AtRisk"),
            responded.Length == 0
                ? 0
                : Math.Round(
                    responded.Average(item =>
                        (item.FirstResponse!.Value - item.Ticket.CreatedAt).TotalHours),
                    1),
            resolved.Length == 0
                ? 0
                : Math.Round(
                    resolved.Average(item =>
                        (item.Ticket.UpdatedAt - item.Ticket.CreatedAt).TotalHours),
                    1),
            slaBreakdown,
            byCategory,
            byAssignee);
    }

    private async Task<Dictionary<Guid, string>> LoadAssigneeNamesAsync(
        IReadOnlyCollection<Guid?> assignedTo,
        CancellationToken cancellationToken)
    {
        var ids = assignedTo
            .Where(item => item.HasValue)
            .Select(item => item!.Value)
            .Distinct()
            .ToArray();
        if (ids.Length == 0)
        {
            return [];
        }

        return await identity.Users
            .AsNoTracking()
            .Where(item => ids.Contains(item.Id))
            .Select(item => new
            {
                item.Id,
                Name = string.IsNullOrWhiteSpace(item.DisplayName)
                    ? item.Mobile
                    : item.DisplayName
            })
            .ToDictionaryAsync(item => item.Id, item => item.Name, cancellationToken);
    }

    private static AdminSupportTicketDetailDto ToSupportDetail(
        SupportTicket ticket,
        string? assignedToName)
    {
        var firstResponse = FirstResponseAt(ticket);
        var dueAt = AdminSupportSlaPolicy.DueAt(
            ticket.CreatedAt,
            ticket.Priority.ToString());
        return new AdminSupportTicketDetailDto(
            ticket.Id,
            ticket.TicketNumber,
            ticket.Subject,
            ticket.ContactName,
            ticket.ContactEmail,
            ticket.ContactPhone,
            ticket.Category,
            ticket.Priority.ToString(),
            ticket.Status.ToString(),
            ticket.AssignedTo,
            ticket.CreatedAt,
            ticket.UpdatedAt,
            ticket.LastMessageAt,
            ticket.Messages
                .OrderBy(message => message.CreatedAt)
                .Select(message => new AdminSupportMessageDto(
                    message.Id,
                    message.AuthorType.ToString(),
                    message.AuthorUserId,
                    message.Body,
                    message.IsInternal,
                    message.CreatedAt))
                .ToArray(),
            assignedToName,
            dueAt,
            firstResponse,
            AdminSupportSlaPolicy.Evaluate(
                dueAt,
                firstResponse,
                ticket.Status.ToString(),
                DateTimeOffset.UtcNow));
    }

    private static DateTimeOffset? FirstResponseAt(SupportTicket ticket)
    {
        var responses = ticket.Messages
            .Where(message =>
                message.AuthorType == SupportAuthorType.Admin &&
                !message.IsInternal)
            .Select(message => (DateTimeOffset?)message.CreatedAt)
            .ToArray();
        return responses.Length == 0 ? null : responses.Min();
    }

    private void AddNotification(Guid? userId, string templateKey, object payload)
    {
        if (userId is null)
        {
            return;
        }

        content.Notifications.Add(Notification.Create(
            ids,
            userId,
            ContactChannel.Email,
            templateKey,
            JsonSerializer.Serialize(payload)));
    }

    private static AdminSupportDisputeDto ToDisputeDto(
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
            dispute.OpenedBy,
            dispute.OpenedAt,
            dispute.ResolvedBy,
            dispute.ResolvedAt);
}
