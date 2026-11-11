using Hani.BuildingBlocks.Domain;

namespace Hani.Modules.Catalog.Domain.TourProducts.Events;

/// <summary>
/// Domain event raised by an aggregate.
/// </summary>
public sealed record TourProductCreatedDomainEvent(Guid TourProductId) : IDomainEvent
{
    public Guid EventId { get; } = Guid.CreateVersion7();

    public DateTimeOffset OccurredAt { get; } = DateTimeOffset.UtcNow;
}

/// <summary>
/// Domain event raised by an aggregate.
/// </summary>
public sealed record TourProductPublishedDomainEvent(Guid TourProductId) : IDomainEvent
{
    public Guid EventId { get; } = Guid.CreateVersion7();

    public DateTimeOffset OccurredAt { get; } = DateTimeOffset.UtcNow;
}
