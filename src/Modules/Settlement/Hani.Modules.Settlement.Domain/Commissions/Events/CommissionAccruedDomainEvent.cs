using Hani.BuildingBlocks.Domain;

namespace Hani.Modules.Settlement.Domain.Commissions.Events;

/// <summary>
/// Raised when commission is accrued for a paid order.
/// </summary>
public sealed record CommissionAccruedDomainEvent(
    Guid EventId,
    Guid CommissionEntryId,
    Guid OrderId,
    decimal CommissionAmount) : IDomainEvent
{
    public DateTimeOffset OccurredAt { get; } = DateTimeOffset.UtcNow;
}
