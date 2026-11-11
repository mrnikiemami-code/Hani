using Hani.BuildingBlocks.Domain;

namespace Hani.Modules.Catalog.Domain.TourProducts.Events;

/// <summary>
/// Domain event raised when a tour product is created.
/// </summary>
public sealed record TourProductCreatedDomainEvent(
    Guid EventId,
    Guid TourProductId) : IDomainEvent
{
    public DateTimeOffset OccurredAt { get; } = DateTimeOffset.UtcNow;
}

/// <summary>
/// Domain event raised when a tour product is published.
/// </summary>
public sealed record TourProductPublishedDomainEvent(
    Guid EventId,
    Guid TourProductId) : IDomainEvent
{
    public DateTimeOffset OccurredAt { get; } = DateTimeOffset.UtcNow;
}
