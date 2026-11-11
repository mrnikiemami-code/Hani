using Hani.BuildingBlocks.Domain;

namespace Hani.Modules.Booking.Domain.Quotes.Events;

/// <summary>
/// Raised when a priced quote is created.
/// </summary>
public sealed record QuoteCreatedDomainEvent(
    Guid QuoteId,
    Guid DepartureId) : IDomainEvent
{
    public Guid EventId { get; } = Guid.CreateVersion7();

    public DateTimeOffset OccurredAt { get; } = DateTimeOffset.UtcNow;
}
