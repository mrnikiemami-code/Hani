namespace Hani.Contracts.Booking;

/// <summary>
/// One per-currency payment obligation exposed to the payment module.
/// </summary>
public sealed record OrderPaymentObligationSnapshot(
    Guid ObligationId,
    string Currency,
    decimal Amount,
    string Status);

/// <summary>
/// Minimal order snapshot used by the payment module without taking a dependency on Booking.
/// </summary>
public sealed record OrderPaymentSnapshot(
    Guid OrderId,
    Guid AgencyId,
    decimal Amount,
    string Currency,
    string Status,
    DateTimeOffset PaymentDueAt,
    IReadOnlyList<OrderPaymentObligationSnapshot> Obligations,
    string CollectionMode = "HaniOnline",
    string SellerOfRecord = "Hani",
    string InvoiceIssuer = "Hani");

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

    /// <summary>
    /// Marks one per-currency obligation paid. Returns <c>true</c> when the obligation
    /// is paid (or was already paid); <c>false</c> when it cannot be updated.
    /// </summary>
    Task<bool> MarkObligationPaidAsync(
        Guid orderId,
        Guid? paymentObligationId,
        string currency,
        Guid? paymentIntentId,
        DateTimeOffset paidAt,
        CancellationToken cancellationToken);
}
