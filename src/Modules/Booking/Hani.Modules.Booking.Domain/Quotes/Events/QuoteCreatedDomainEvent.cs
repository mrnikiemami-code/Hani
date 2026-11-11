using Hani.BuildingBlocks.Domain;

namespace Hani.Modules.Booking.Domain.Quotes.Events;

/// <summary>
/// Raised when a priced quote is created.
/// </summary>
public sealed record QuoteCreatedDomainEvent(
    Guid EventId,
    Guid QuoteId,
    Guid DepartureId) : IDomainEvent
{
    public DateTimeOffset OccurredAt { get; } = DateTimeOffset.UtcNow;
}
