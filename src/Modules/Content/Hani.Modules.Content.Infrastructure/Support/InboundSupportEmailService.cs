using System.Text.Json;
using System.Text.RegularExpressions;
using Hani.BuildingBlocks.Domain;
using Hani.Modules.Content.Application.Support;
using Hani.Modules.Content.Domain.Growth;
using Hani.Modules.Content.Domain.Support;
using Hani.Modules.Content.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Hani.Modules.Content.Infrastructure.Support;

internal sealed partial class InboundSupportEmailService(
    ContentDbContext dbContext,
    IIdGenerator ids) : IInboundSupportEmailService
{
    private static readonly Regex TicketPattern = TicketNumberPattern();

    public async Task<InboundSupportEmailResult> ReceiveAsync(
        InboundSupportEmailInput input,
        CancellationToken cancellationToken)
    {
        var email = input.FromEmail.Trim().ToLowerInvariant();
        if (string.IsNullOrWhiteSpace(email) ||
            email.Length > 320 ||
            !email.Contains('@', StringComparison.Ordinal))
        {
            throw new ArgumentException("A valid sender email is required.");
        }

        if (string.IsNullOrWhiteSpace(input.Subject) ||
            string.IsNullOrWhiteSpace(input.Body))
        {
            throw new ArgumentException("Email subject and body are required.");
        }

        var body = input.Body.Trim();
        if (body.Length > 20_000)
        {
            body = body[..20_000];
        }

        var providerMessageId = string.IsNullOrWhiteSpace(input.ProviderMessageId)
            ? null
            : input.ProviderMessageId.Trim();
        if (providerMessageId is not null)
        {
            var existing = await (
                    from message in dbContext.SupportTickets.SelectMany(ticket => ticket.Messages)
                    join ticket in dbContext.SupportTickets on message.TicketId equals ticket.Id
                    where message.ProviderMessageId == providerMessageId
                    select new { ticket.Id, ticket.TicketNumber })
                .FirstOrDefaultAsync(cancellationToken);
            if (existing is not null)
            {
                return new InboundSupportEmailResult(
                    existing.Id,
                    existing.TicketNumber,
                    Appended: true,
                    Duplicate: true);
            }
        }

        var match = TicketPattern.Match(input.Subject);
        if (match.Success)
        {
            var ticketNumber = match.Value.ToUpperInvariant();
            var ticket = await dbContext.SupportTickets
                .Include(item => item.Messages)
                .FirstOrDefaultAsync(
                    item => item.TicketNumber == ticketNumber,
                    cancellationToken);
            if (ticket is not null)
            {
                ticket.AddMessage(
                    ids,
                    SupportAuthorType.Customer,
                    ticket.UserId,
                    body,
                    false,
                    providerMessageId: providerMessageId);
                if (ticket.AssignedTo is { } assigned)
                {
                    dbContext.Notifications.Add(Notification.Create(
                        ids,
                        assigned,
                        ContactChannel.Email,
                        "support.ticket.customer_replied",
                        JsonSerializer.Serialize(new
                        {
                            ticket.Id,
                            ticket.TicketNumber,
                            ticket.Subject,
                            ticket.Status,
                            deepLink = $"/admin/support/tickets/{ticket.Id}"
                        })));
                }

                await dbContext.SaveChangesAsync(cancellationToken);
                return new InboundSupportEmailResult(
                    ticket.Id,
                    ticket.TicketNumber,
                    Appended: true,
                    Duplicate: false);
            }
        }

        var contactName = string.IsNullOrWhiteSpace(input.FromName)
            ? email
            : input.FromName.Trim();
        var created = SupportTicket.Create(
            ids,
            null,
            contactName,
            email,
            null,
            input.Subject.Trim(),
            "Email",
            body,
            SupportTicketPriority.Normal,
            providerMessageId: providerMessageId);
        dbContext.SupportTickets.Add(created);
        await dbContext.SaveChangesAsync(cancellationToken);
        return new InboundSupportEmailResult(
            created.Id,
            created.TicketNumber,
            Appended: false,
            Duplicate: false);
    }

    [GeneratedRegex(@"SUP-[0-9A-F]{8,}", RegexOptions.IgnoreCase | RegexOptions.Compiled)]
    private static partial Regex TicketNumberPattern();
}
