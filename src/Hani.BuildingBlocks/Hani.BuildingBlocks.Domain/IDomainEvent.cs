namespace Hani.BuildingBlocks.Domain;

/// <summary>
/// Marker for a domain event raised by an aggregate.
/// </summary>
public interface IDomainEvent
{
    Guid EventId { get; }

    DateTimeOffset OccurredAt { get; }
}
