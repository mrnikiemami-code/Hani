using Hani.Modules.Admin.Application;
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
        var items = await query
            .OrderByDescending(item => item.LastMessageAt)
            .Skip((normalizedPage - 1) * normalizedPageSize)
            .Take(normalizedPageSize)
            .Select(item => new AdminSupportTicketRowDto(
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
                item.LastMessageAt))
            .ToArrayAsync(cancellationToken);
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
        return ticket is null ? null : ToSupportDetail(ticket);
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
        await content.SaveChangesAsync(cancellationToken);
        return ToSupportDetail(ticket);
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
        return ToSupportDetail(ticket);
    }

    private static AdminSupportTicketDetailDto ToSupportDetail(SupportTicket ticket)
        => new(
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
                .ToArray());
}
