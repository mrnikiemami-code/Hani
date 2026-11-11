using Hani.BuildingBlocks.Domain;

namespace Hani.Modules.Identity.Domain.ApiClients.Events;

/// <summary>
/// Domain event raised by an aggregate.
/// </summary>
public sealed record ApiClientCreatedDomainEvent(
    Guid ApiClientId,
    Guid AgencyId) : IDomainEvent
{
    public Guid EventId { get; } = Guid.CreateVersion7();

    public DateTimeOffset OccurredAt { get; } = DateTimeOffset.UtcNow;
}
