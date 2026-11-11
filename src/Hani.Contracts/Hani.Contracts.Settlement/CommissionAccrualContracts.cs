namespace Hani.Contracts.Settlement;

/// <summary>
/// Input used when a paid order must accrue commission and ledger entries.
/// </summary>
public sealed record CommissionAccrualRequest(
    Guid OrderId,
    Guid AgencyId,
    decimal GrossAmount,
    string Currency,
    string ProductType,
    DateTimeOffset PaidAt);

/// <summary>
/// Cross-module contract invoked after a payment is confirmed.
/// Implementations must be idempotent per order.
/// </summary>
public interface ICommissionAccrualService
{
    /// <summary>
    /// Accrues commission and posts the corresponding double-entry ledger transaction.
    /// </summary>
    Task AccrueAsync(
        CommissionAccrualRequest request,
        CancellationToken cancellationToken);
}
