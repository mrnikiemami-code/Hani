using Hani.BuildingBlocks.Domain;

namespace Hani.Modules.Identity.Domain.ApiClients.Events;

/// <summary>
/// Domain event raised by an aggregate.
/// </summary>
public sealed record ApiClientCreatedDomainEvent(
    Guid EventId,
    Guid ApiClientId,
    Guid AgencyId) : IDomainEvent
{
    public DateTimeOffset OccurredAt { get; } = DateTimeOffset.UtcNow;
}
