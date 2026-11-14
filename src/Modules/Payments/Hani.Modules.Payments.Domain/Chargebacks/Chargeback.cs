using Hani.BuildingBlocks.Domain;

namespace Hani.Modules.Payments.Domain.Chargebacks;

/// <summary>Chargeback lifecycle state.</summary>
public enum ChargebackStatus
{
    Opened = 0,
    Accepted = 1,
    Rejected = 2
}

/// <summary>Provider chargeback/dispute for an order.</summary>
public sealed class Chargeback : AggregateRoot<Guid>
{
    private Chargeback()
    {
    }

    private Chargeback(
        Guid id,
        Guid orderId,
        Guid? paymentIntentId,
        decimal amount,
        string currency,
        string reason,
        DateTimeOffset createdAt) : base(id)
    {
        OrderId = orderId;
        PaymentIntentId = paymentIntentId;
        Amount = amount;
        Currency = currency.Trim().ToUpperInvariant();
        Reason = reason.Trim();
        CreatedAt = createdAt;
        Status = ChargebackStatus.Opened;
    }

    /// <summary>Order id.</summary>
    public Guid OrderId { get; private set; }

    /// <summary>Optional payment intent.</summary>
    public Guid? PaymentIntentId { get; private set; }

    /// <summary>Disputed amount.</summary>
    public decimal Amount { get; private set; }

    /// <summary>Currency.</summary>
    public string Currency { get; private set; } = string.Empty;

    /// <summary>Dispute reason.</summary>
    public string Reason { get; private set; } = string.Empty;

    /// <summary>Current status.</summary>
    public ChargebackStatus Status { get; private set; }

    /// <summary>Creation time.</summary>
    public DateTimeOffset CreatedAt { get; private set; }

    /// <summary>Resolution time.</summary>
    public DateTimeOffset? ResolvedAt { get; private set; }

    /// <summary>Creates a chargeback case.</summary>
    public static Chargeback Create(
        IIdGenerator ids,
        Guid orderId,
        Guid? paymentIntentId,
        decimal amount,
        string currency,
        string reason,
        DateTimeOffset? now = null)
    {
        if (orderId == Guid.Empty || amount <= 0 || string.IsNullOrWhiteSpace(currency) ||
            string.IsNullOrWhiteSpace(reason))
        {
            throw new ArgumentException("Order, positive amount, currency, and reason are required.");
        }

        return new Chargeback(
            ids.NewId(),
            orderId,
            paymentIntentId,
            amount,
            currency,
            reason,
            now ?? DateTimeOffset.UtcNow);
    }

    /// <summary>Accepts the chargeback.</summary>
    public void Accept(DateTimeOffset? now = null)
    {
        Status = ChargebackStatus.Accepted;
        ResolvedAt = now ?? DateTimeOffset.UtcNow;
    }

    /// <summary>Rejects the chargeback.</summary>
    public void Reject(DateTimeOffset? now = null)
    {
        Status = ChargebackStatus.Rejected;
        ResolvedAt = now ?? DateTimeOffset.UtcNow;
    }
}
