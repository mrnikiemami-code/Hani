using Hani.BuildingBlocks.Domain;

namespace Hani.Modules.Booking.Domain.Orders;

/// <summary>
/// One per-currency amount that must be paid for an order.
/// </summary>
public sealed class PaymentObligation : Entity<Guid>
{
    private PaymentObligation()
    {
    }

    internal PaymentObligation(
        Guid id,
        Guid orderId,
        string currency,
        decimal amount) : base(id)
    {
        OrderId = orderId;
        Currency = currency;
        Amount = amount;
        Status = PaymentObligationStatus.Unpaid;
    }

    /// <summary>
    /// Owning order.
    /// </summary>
    public Guid OrderId { get; private set; }

    /// <summary>
    /// ISO currency code.
    /// </summary>
    public string Currency { get; private set; } = string.Empty;

    /// <summary>
    /// Amount due in this currency.
    /// </summary>
    public decimal Amount { get; private set; }

    /// <summary>
    /// Current obligation state.
    /// </summary>
    public PaymentObligationStatus Status { get; private set; }

    /// <summary>
    /// Payment intent that settled this obligation, when available.
    /// </summary>
    public Guid? PaymentIntentId { get; private set; }

    /// <summary>
    /// Settlement time, when paid.
    /// </summary>
    public DateTimeOffset? PaidAt { get; private set; }

    internal void MarkPaid(Guid? paymentIntentId, DateTimeOffset paidAt)
    {
        Status = PaymentObligationStatus.Paid;
        PaymentIntentId = paymentIntentId;
        PaidAt = paidAt;
    }
}
