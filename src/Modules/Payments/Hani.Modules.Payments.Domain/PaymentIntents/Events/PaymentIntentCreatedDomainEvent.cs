using Hani.BuildingBlocks.Domain;

namespace Hani.Modules.Payments.Domain.PaymentIntents.Events;

/// <summary>
/// Raised when a payment intent is created for an order.
/// </summary>
public sealed record PaymentIntentCreatedDomainEvent(
    Guid EventId,
    Guid PaymentIntentId,
    Guid OrderId) : IDomainEvent
{
    public DateTimeOffset OccurredAt { get; } = DateTimeOffset.UtcNow;
}
