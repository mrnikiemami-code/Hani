using Hani.BuildingBlocks.Domain;

namespace Hani.Modules.Payments.Domain.Refunds;

/// <summary>Refund lifecycle state.</summary>
public enum RefundStatus
{
    Requested = 0,
    Approved = 1,
    Processed = 2,
    Failed = 3,
    Cancelled = 4
}

/// <summary>
/// Refund request for a paid order or payment intent.
/// </summary>
public sealed class Refund : AggregateRoot<Guid>
{
    private Refund()
    {
    }

    private Refund(
        Guid id,
        Guid orderId,
        Guid? paymentIntentId,
        decimal amount,
        string currency,
        string reason,
        DateTimeOffset requestedAt) : base(id)
    {
        OrderId = orderId;
        PaymentIntentId = paymentIntentId;
        Amount = amount;
        Currency = currency.Trim().ToUpperInvariant();
        Reason = reason.Trim();
        RequestedAt = requestedAt;
        Status = RefundStatus.Requested;
    }

    /// <summary>Order id.</summary>
    public Guid OrderId { get; private set; }

    /// <summary>Optional source payment intent.</summary>
    public Guid? PaymentIntentId { get; private set; }

    /// <summary>Refund amount.</summary>
    public decimal Amount { get; private set; }

    /// <summary>Refund currency.</summary>
    public string Currency { get; private set; } = string.Empty;

    /// <summary>Refund reason.</summary>
    public string Reason { get; private set; } = string.Empty;

    /// <summary>Refund state.</summary>
    public RefundStatus Status { get; private set; }

    /// <summary>Request time.</summary>
    public DateTimeOffset RequestedAt { get; private set; }

    /// <summary>Processing time.</summary>
    public DateTimeOffset? ProcessedAt { get; private set; }

    /// <summary>Provider reference.</summary>
    public string? ProviderRef { get; private set; }

    /// <summary>Failure reason.</summary>
    public string? FailureReason { get; private set; }

    /// <summary>Creates a refund request.</summary>
    public static Refund Create(
        IIdGenerator ids,
        Guid orderId,
        Guid? paymentIntentId,
        decimal amount,
        string currency,
        string reason,
        DateTimeOffset? now = null)
    {
        if (orderId == Guid.Empty || amount <= 0 || string.IsNullOrWhiteSpace(currency))
        {
            throw new ArgumentException("Order, positive amount, and currency are required.");
        }

        if (string.IsNullOrWhiteSpace(reason))
        {
            throw new ArgumentException("Refund reason is required.", nameof(reason));
        }

        return new Refund(
            ids.NewId(),
            orderId,
            paymentIntentId,
            amount,
            currency,
            reason,
            now ?? DateTimeOffset.UtcNow);
    }

    /// <summary>Marks the refund processed.</summary>
    public void MarkProcessed(string? providerRef = null, DateTimeOffset? now = null)
    {
        Status = RefundStatus.Processed;
        ProviderRef = providerRef;
        ProcessedAt = now ?? DateTimeOffset.UtcNow;
    }

    /// <summary>Marks the refund failed.</summary>
    public void MarkFailed(string reason)
    {
        Status = RefundStatus.Failed;
        FailureReason = reason;
    }
}
