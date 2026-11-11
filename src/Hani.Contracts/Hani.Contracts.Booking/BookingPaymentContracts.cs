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
