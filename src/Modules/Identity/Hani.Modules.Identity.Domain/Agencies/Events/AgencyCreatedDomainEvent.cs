using Hani.BuildingBlocks.Domain;

namespace Hani.Modules.Identity.Domain.Agencies.Events;

/// <summary>
/// Domain event raised by an aggregate.
/// </summary>
public sealed record AgencyCreatedDomainEvent(
    Guid EventId,
    Guid AgencyId) : IDomainEvent
{
    public DateTimeOffset OccurredAt { get; } = DateTimeOffset.UtcNow;
}
