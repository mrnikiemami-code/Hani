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

/// <summary>
/// Cross-module contract that reverses ledger revenue for a processed refund.
/// </summary>
public interface IRefundLedgerService
{
    /// <summary>
    /// Posts the refund reversal for an order and currency.
    /// </summary>
    Task RecordRefundAsync(
        Guid orderId,
        Guid refundId,
        decimal amount,
        string currency,
        CancellationToken cancellationToken);
}
