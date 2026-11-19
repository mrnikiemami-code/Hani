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
                    false);
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
                    Appended: true);
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
            SupportTicketPriority.Normal);
        dbContext.SupportTickets.Add(created);
        await dbContext.SaveChangesAsync(cancellationToken);
        return new InboundSupportEmailResult(
            created.Id,
            created.TicketNumber,
            Appended: false);
    }

    [GeneratedRegex(@"SUP-[0-9A-F]{8,}", RegexOptions.IgnoreCase | RegexOptions.Compiled)]
    private static partial Regex TicketNumberPattern();
}
