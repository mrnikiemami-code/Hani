namespace Hani.Contracts.Booking;

/// <summary>
/// Minimal order snapshot used by the payment module without taking a dependency on Booking.
/// </summary>
public sealed record OrderPaymentSnapshot(
    Guid OrderId,
    Guid AgencyId,
    decimal Amount,
    string Currency,
    string Status,
    DateTimeOffset PaymentDueAt);

/// <summary>
/// Read-side contract exposed by Booking for payment initiation.
/// </summary>
public interface IOrderPaymentReadService
{
    /// <summary>
    /// Returns the payment-relevant order snapshot, or <c>null</c> when the order does not exist.
    /// </summary>
    Task<OrderPaymentSnapshot?> GetForPaymentAsync(
        Guid orderId,
        CancellationToken cancellationToken);
}

/// <summary>
/// Write-side contract used by Payments after a verified success callback.
/// </summary>
public interface IOrderPaymentWriteService
{
    /// <summary>
    /// Marks a pending-payment order as paid. Returns <c>true</c> when the order is paid
    /// (or was already paid); <c>false</c> when the order cannot be updated.
    /// </summary>
    Task<bool> MarkPaidAsync(Guid orderId, CancellationToken cancellationToken);
}
