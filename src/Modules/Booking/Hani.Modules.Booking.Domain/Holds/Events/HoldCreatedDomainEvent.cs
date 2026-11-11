using Hani.BuildingBlocks.Domain;

namespace Hani.Modules.Booking.Domain.Holds.Events;

/// <summary>
/// Raised when a seat hold is created.
/// </summary>
public sealed record HoldCreatedDomainEvent(
    Guid EventId,
    Guid HoldId,
    Guid QuoteId) : IDomainEvent
{
    public DateTimeOffset OccurredAt { get; } = DateTimeOffset.UtcNow;
}
