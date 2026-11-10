using Hani.BuildingBlocks.Domain;

namespace Hani.Modules.Supply.Domain.AgencyOffers.Events;

public sealed record AgencyOfferCreatedDomainEvent(
    Guid OfferId,
    Guid AgencyId) : IDomainEvent
{
    public Guid EventId { get; } = Guid.CreateVersion7();

    public DateTimeOffset OccurredAt { get; } = DateTimeOffset.UtcNow;
}
