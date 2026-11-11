using Hani.BuildingBlocks.Domain;

namespace Hani.Modules.Supply.Domain.Departures.Events;

/// <summary>
/// Domain event raised by an aggregate.
/// </summary>
public sealed record TourDepartureCreatedDomainEvent(
    Guid EventId,
    Guid TourDepartureId,
    Guid AgencyOfferId) : IDomainEvent
{
    public DateTimeOffset OccurredAt { get; } = DateTimeOffset.UtcNow;
}
