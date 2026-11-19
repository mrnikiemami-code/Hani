namespace Hani.Modules.Content.Application.Support;

/// <summary>Ticket ownership/agent access check for the real-time hub.</summary>
public interface ISupportTicketAccessService
{
    /// <summary>Returns true when the user owns the ticket or is a support agent.</summary>
    Task<bool> CanAccessAsync(
        Guid ticketId,
        Guid userId,
        bool isSupportAgent,
        CancellationToken cancellationToken);
}

/// <summary>Pushes support events to connected real-time clients.</summary>
public interface ISupportRealtimeNotifier
{
    /// <summary>Notifies ticket group members that a message was created.</summary>
    Task MessageAddedAsync(
        Guid ticketId,
        Guid messageId,
        string authorType,
        bool isInternal,
        CancellationToken cancellationToken);

    /// <summary>Notifies ticket group members that a dispute changed.</summary>
    Task DisputeUpdatedAsync(
        Guid ticketId,
        Guid disputeId,
        string status,
        CancellationToken cancellationToken);
}
