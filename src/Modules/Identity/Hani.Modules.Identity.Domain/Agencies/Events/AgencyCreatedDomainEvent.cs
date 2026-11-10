using Hani.BuildingBlocks.Domain;

namespace Hani.Modules.Identity.Domain.Agencies.Events;

public sealed record AgencyCreatedDomainEvent(Guid AgencyId) : IDomainEvent
{
    public Guid EventId { get; } = Guid.CreateVersion7();

    public DateTimeOffset OccurredAt { get; } = DateTimeOffset.UtcNow;
}
