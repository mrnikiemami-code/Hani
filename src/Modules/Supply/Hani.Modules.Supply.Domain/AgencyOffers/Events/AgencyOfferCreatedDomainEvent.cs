using Hani.BuildingBlocks.Domain;

namespace Hani.Modules.Supply.Domain.AgencyOffers.Events;

/// <summary>
/// Domain event raised by an aggregate.
/// </summary>
public sealed record AgencyOfferCreatedDomainEvent(
    Guid EventId,
    Guid OfferId,
    Guid AgencyId) : IDomainEvent
{
    public DateTimeOffset OccurredAt { get; } = DateTimeOffset.UtcNow;
}
