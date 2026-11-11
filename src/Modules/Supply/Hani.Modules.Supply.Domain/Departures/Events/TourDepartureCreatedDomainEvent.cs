using Hani.BuildingBlocks.Domain;

namespace Hani.Modules.Supply.Domain.Departures.Events;

/// <summary>
/// Domain event raised by an aggregate.
/// </summary>
public sealed record TourDepartureCreatedDomainEvent(
    Guid TourDepartureId,
    Guid AgencyOfferId) : IDomainEvent
{
    public Guid EventId { get; } = Guid.CreateVersion7();

    public DateTimeOffset OccurredAt { get; } = DateTimeOffset.UtcNow;
}
