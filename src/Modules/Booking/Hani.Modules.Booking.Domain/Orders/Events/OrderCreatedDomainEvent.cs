using Hani.BuildingBlocks.Domain;

namespace Hani.Modules.Booking.Domain.Orders.Events;

/// <summary>
/// Raised when an order and its immutable contract are issued.
/// </summary>
public sealed record OrderCreatedDomainEvent(
    Guid EventId,
    Guid OrderId,
    Guid ContractId) : IDomainEvent
{
    public DateTimeOffset OccurredAt { get; } = DateTimeOffset.UtcNow;
}
