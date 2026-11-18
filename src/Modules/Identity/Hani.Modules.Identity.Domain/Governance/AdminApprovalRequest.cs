using Hani.BuildingBlocks.Domain;

namespace Hani.Modules.Identity.Domain.Governance;

/// <summary>Kind of sensitive operation that requires a second approver.</summary>
public enum AdminApprovalType
{
    /// <summary>Refund of one successful payment intent.</summary>
    Refund = 0,

    /// <summary>Settlement of one agency payout.</summary>
    Settlement = 1
}

/// <summary>Lifecycle of an approval request.</summary>
public enum AdminApprovalStatus
{
    /// <summary>Waiting for a second administrator.</summary>
    Pending = 0,

    /// <summary>Approved and executed.</summary>
    Approved = 1,

    /// <summary>Rejected by a second administrator.</summary>
    Rejected = 2,

    /// <summary>Approved but execution failed.</summary>
    Failed = 3
}

/// <summary>
/// Durable request for a two-person financial decision. The requester and the
/// approver must be different administrators.
/// </summary>
public sealed class AdminApprovalRequest : AggregateRoot<Guid>
{
    private AdminApprovalRequest()
    {
    }

    private AdminApprovalRequest(
        Guid id,
        AdminApprovalType type,
        string entityType,
        Guid entityId,
        decimal amount,
        string currency,
        Guid? paymentIntentId,
        string? bankReference,
        string? documentUrl,
        string requestedReason,
        Guid requestedBy,
        DateTimeOffset requestedAt) : base(id)
    {
        Type = type;
        Status = AdminApprovalStatus.Pending;
        EntityType = entityType;
        EntityId = entityId;
        Amount = amount;
        Currency = currency;
        PaymentIntentId = paymentIntentId;
        BankReference = bankReference;
        DocumentUrl = documentUrl;
        RequestedReason = requestedReason;
        RequestedBy = requestedBy;
        RequestedAt = requestedAt;
    }

    /// <summary>Operation type.</summary>
    public AdminApprovalType Type { get; private set; }

    /// <summary>Current lifecycle state.</summary>
    public AdminApprovalStatus Status { get; private set; }

    /// <summary>Affected entity type such as <c>Order</c> or <c>Payout</c>.</summary>
    public string EntityType { get; private set; } = string.Empty;

    /// <summary>Affected entity identifier.</summary>
    public Guid EntityId { get; private set; }

    /// <summary>Amount frozen at request time.</summary>
    public decimal Amount { get; private set; }

    /// <summary>ISO currency of the amount.</summary>
    public string Currency { get; private set; } = string.Empty;

    /// <summary>Payment intent for refund requests.</summary>
    public Guid? PaymentIntentId { get; private set; }

    /// <summary>Bank transfer reference for settlement requests.</summary>
    public string? BankReference { get; private set; }

    /// <summary>Bank receipt or settlement document link.</summary>
    public string? DocumentUrl { get; private set; }

    /// <summary>Reason supplied by the requester.</summary>
    public string RequestedReason { get; private set; } = string.Empty;

    /// <summary>Administrator who requested the operation.</summary>
    public Guid RequestedBy { get; private set; }

    /// <summary>Request time.</summary>
    public DateTimeOffset RequestedAt { get; private set; }

    /// <summary>Second administrator who decided the request.</summary>
    public Guid? DecidedBy { get; private set; }

    /// <summary>Decision time.</summary>
    public DateTimeOffset? DecidedAt { get; private set; }

    /// <summary>Reason supplied by the approver or rejector.</summary>
    public string? DecisionReason { get; private set; }

    /// <summary>Execution failure after approval, when applicable.</summary>
    public string? FailureReason { get; private set; }

    /// <summary>Creates a refund approval request.</summary>
    public static AdminApprovalRequest CreateRefund(
        IIdGenerator ids,
        Guid orderId,
        Guid paymentIntentId,
        decimal amount,
        string currency,
        string reason,
        Guid requestedBy,
        DateTimeOffset? now = null)
    {
        if (orderId == Guid.Empty || paymentIntentId == Guid.Empty || amount <= 0 ||
            string.IsNullOrWhiteSpace(currency) || string.IsNullOrWhiteSpace(reason))
        {
            throw new ArgumentException("Order, payment intent, positive amount, currency, and reason are required.");
        }

        return new AdminApprovalRequest(
            ids.NewId(),
            AdminApprovalType.Refund,
            "Order",
            orderId,
            amount,
            currency.Trim().ToUpperInvariant(),
            paymentIntentId,
            null,
            null,
            reason.Trim(),
            requestedBy,
            now ?? DateTimeOffset.UtcNow);
    }

    /// <summary>Creates a settlement approval request with its bank evidence.</summary>
    public static AdminApprovalRequest CreateSettlement(
        IIdGenerator ids,
        Guid payoutId,
        decimal amount,
        string currency,
        string bankReference,
        string documentUrl,
        string reason,
        Guid requestedBy,
        DateTimeOffset? now = null)
    {
        if (payoutId == Guid.Empty || amount <= 0 ||
            string.IsNullOrWhiteSpace(currency) ||
            string.IsNullOrWhiteSpace(bankReference) ||
            string.IsNullOrWhiteSpace(reason))
        {
            throw new ArgumentException("Payout, positive amount, currency, bank reference, and reason are required.");
        }

        if (!Uri.TryCreate(documentUrl, UriKind.Absolute, out var uri) ||
            (uri.Scheme != Uri.UriSchemeHttp && uri.Scheme != Uri.UriSchemeHttps))
        {
            throw new ArgumentException("The settlement document must be an HTTP or HTTPS link.");
        }

        return new AdminApprovalRequest(
            ids.NewId(),
            AdminApprovalType.Settlement,
            "Payout",
            payoutId,
            amount,
            currency.Trim().ToUpperInvariant(),
            null,
            bankReference.Trim(),
            documentUrl.Trim(),
            reason.Trim(),
            requestedBy,
            now ?? DateTimeOffset.UtcNow);
    }

    /// <summary>
    /// Approves the request. The approver must differ from the requester.
    /// </summary>
    public void Approve(Guid decidedBy, string? reason, DateTimeOffset? now = null)
    {
        EnsurePending();
        if (decidedBy == Guid.Empty || decidedBy == RequestedBy)
        {
            throw new InvalidOperationException("A second administrator must approve the request.");
        }

        Status = AdminApprovalStatus.Approved;
        DecidedBy = decidedBy;
        DecidedAt = now ?? DateTimeOffset.UtcNow;
        DecisionReason = string.IsNullOrWhiteSpace(reason) ? null : reason.Trim();
    }

    /// <summary>Rejects the request. A reason is required.</summary>
    public void Reject(Guid decidedBy, string reason, DateTimeOffset? now = null)
    {
        EnsurePending();
        if (decidedBy == Guid.Empty || decidedBy == RequestedBy)
        {
            throw new InvalidOperationException("A second administrator must reject the request.");
        }

        if (string.IsNullOrWhiteSpace(reason))
        {
            throw new ArgumentException("A rejection reason is required.");
        }

        Status = AdminApprovalStatus.Rejected;
        DecidedBy = decidedBy;
        DecidedAt = now ?? DateTimeOffset.UtcNow;
        DecisionReason = reason.Trim();
    }

    /// <summary>Marks an approved request as failed after execution error.</summary>
    public void Fail(string failureReason, DateTimeOffset? now = null)
    {
        EnsurePending();
        Status = AdminApprovalStatus.Failed;
        FailureReason = string.IsNullOrWhiteSpace(failureReason) ? "Execution failed." : failureReason.Trim();
        DecidedAt = now ?? DateTimeOffset.UtcNow;
    }

    private void EnsurePending()
    {
        if (Status != AdminApprovalStatus.Pending)
        {
            throw new InvalidOperationException("Only pending approval requests can be decided.");
        }
    }
}
