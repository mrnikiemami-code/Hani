using Hani.BuildingBlocks.Domain;

namespace Hani.Modules.Identity.Domain.Users.Events;

/// <summary>
/// Raised when a pending marketplace user is created.
/// </summary>
public sealed record UserRegisteredDomainEvent(
    Guid EventId,
    Guid UserId,
    string Mobile) : IDomainEvent
{
    public DateTimeOffset OccurredAt { get; } = DateTimeOffset.UtcNow;
}
