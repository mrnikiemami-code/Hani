using Hani.BuildingBlocks.Domain;

namespace Hani.Modules.Payments.Domain.OfflinePayments;

/// <summary>
/// Offline collection method.
/// </summary>
public enum OfflinePaymentMethod
{
    Cash = 0,
    BankTransfer = 1,
    Cheque = 2
}

/// <summary>
/// Recorded offline payment for an order.
/// </summary>
public sealed class OfflinePaymentReceipt : AggregateRoot<Guid>
{
    private OfflinePaymentReceipt()
    {
    }

    private OfflinePaymentReceipt(
        Guid id,
        Guid orderId,
        Guid agencyId,
        decimal amount,
        string currency,
        OfflinePaymentMethod method,
        string? reference,
        string recordedBy,
        DateTimeOffset recordedAt) : base(id)
    {
        OrderId = orderId;
        AgencyId = agencyId;
        Amount = amount;
        Currency = currency;
        Method = method;
        Reference = reference;
        RecordedBy = recordedBy;
        RecordedAt = recordedAt;
    }

    /// <summary>
    /// Order paid offline.
    /// </summary>
    public Guid OrderId { get; private set; }

    /// <summary>
    /// Selling agency.
    /// </summary>
    public Guid AgencyId { get; private set; }

    /// <summary>
    /// Amount collected.
    /// </summary>
    public decimal Amount { get; private set; }

    /// <summary>
    /// ISO currency.
    /// </summary>
    public string Currency { get; private set; } = string.Empty;

    /// <summary>
    /// Offline method.
    /// </summary>
    public OfflinePaymentMethod Method { get; private set; }

    /// <summary>
    /// Cheque or transfer reference.
    /// </summary>
    public string? Reference { get; private set; }

    /// <summary>
    /// Operator who recorded the payment.
    /// </summary>
    public string RecordedBy { get; private set; } = string.Empty;

    /// <summary>
    /// Recording time.
    /// </summary>
    public DateTimeOffset RecordedAt { get; private set; }

    /// <summary>
    /// Creates a validated offline receipt.
    /// </summary>
    public static OfflinePaymentReceipt Create(
        IIdGenerator ids,
        Guid orderId,
        Guid agencyId,
        decimal amount,
        string currency,
        OfflinePaymentMethod method,
        string? reference,
        string recordedBy,
        DateTimeOffset? now = null)
    {
        if (orderId == Guid.Empty || agencyId == Guid.Empty)
        {
            throw new ArgumentException("Order and agency are required.");
        }

        if (amount <= 0 || string.IsNullOrWhiteSpace(currency))
        {
            throw new ArgumentException("Amount and currency are required.");
        }

        if (string.IsNullOrWhiteSpace(recordedBy))
        {
            throw new ArgumentException("Operator is required.", nameof(recordedBy));
        }

        return new OfflinePaymentReceipt(
            ids.NewId(),
            orderId,
            agencyId,
            amount,
            currency.Trim().ToUpperInvariant(),
            method,
            string.IsNullOrWhiteSpace(reference) ? null : reference.Trim(),
            recordedBy.Trim(),
            now ?? DateTimeOffset.UtcNow);
    }
}
