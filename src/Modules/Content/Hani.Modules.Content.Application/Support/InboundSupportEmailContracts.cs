namespace Hani.Modules.Content.Application.Support;

/// <summary>Inbound email payload accepted from a trusted mail provider.</summary>
public sealed record InboundSupportEmailInput(
    string FromEmail,
    string? FromName,
    string Subject,
    string Body,
    string? ProviderMessageId);

/// <summary>Result of appending or creating a ticket from inbound email.</summary>
public sealed record InboundSupportEmailResult(
    Guid TicketId,
    string TicketNumber,
    bool Appended,
    bool Duplicate);

/// <summary>Service that maps trusted inbound email into support tickets.</summary>
public interface IInboundSupportEmailService
{
    /// <summary>
    /// Appends to a ticket referenced by its ticket number in the subject, or
    /// creates a new email ticket when no ticket is referenced.
    /// </summary>
    Task<InboundSupportEmailResult> ReceiveAsync(
        InboundSupportEmailInput input,
        CancellationToken cancellationToken);
}
