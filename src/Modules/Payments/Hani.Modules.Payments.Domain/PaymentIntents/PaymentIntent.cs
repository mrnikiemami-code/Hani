using Hani.BuildingBlocks.Domain;
using Hani.Modules.Payments.Domain.PaymentIntents.Events;

namespace Hani.Modules.Payments.Domain.PaymentIntents;

/// <summary>
/// Payment attempt for an order. Hani is the merchant of record; the PSP account
/// and funds holder are captured on the intent.
/// </summary>
public sealed class PaymentIntent : AggregateRoot<Guid>
{
    private PaymentIntent()
    {
    }

    private PaymentIntent(
        Guid id,
        Guid orderId,
        Guid agencyId,
        decimal amount,
        string currency,
        string pspAccountRef,
        string merchantScope,
        string fundsHeldBy,
        DateTimeOffset createdAt,
        DateTimeOffset expiresAt) : base(id)
    {
        OrderId = orderId;
        AgencyId = agencyId;
        Amount = amount;
        Currency = currency;
        PspAccountRef = pspAccountRef;
        MerchantScope = merchantScope;
        FundsHeldBy = fundsHeldBy;
        CreatedAt = createdAt;
        UpdatedAt = createdAt;
        ExpiresAt = expiresAt;
        Status = PaymentIntentStatus.Created;
        Version = 1;
    }

    /// <summary>
    /// Order being paid.
    /// </summary>
    public Guid OrderId { get; private set; }

    /// <summary>
    /// Selling agency identifier.
    /// </summary>
    public Guid AgencyId { get; private set; }

    /// <summary>
    /// Amount charged.
    /// </summary>
    public decimal Amount { get; private set; }

    /// <summary>
    /// ISO currency code.
    /// </summary>
    public string Currency { get; private set; } = string.Empty;

    /// <summary>
    /// Current lifecycle state.
    /// </summary>
    public PaymentIntentStatus Status { get; private set; }

    /// <summary>
    /// Payment provider name.
    /// </summary>
    public string Provider { get; private set; } = string.Empty;

    /// <summary>
    /// Provider-side payment reference.
    /// </summary>
    public string? ProviderRef { get; private set; }

    /// <summary>
    /// Redirect URL returned by the provider.
    /// </summary>
    public string? RedirectUrl { get; private set; }

    /// <summary>
    /// PSP account that receives the funds.
    /// </summary>
    public string PspAccountRef { get; private set; } = string.Empty;

    /// <summary>
    /// Merchant scope; for Hani checkout this is <c>Hani</c>.
    /// </summary>
    public string MerchantScope { get; private set; } = string.Empty;

    /// <summary>
    /// Entity holding the funds; for Hani checkout this is <c>Hani</c>.
    /// </summary>
    public string FundsHeldBy { get; private set; } = string.Empty;

    /// <summary>
    /// Failure reason when the intent fails.
    /// </summary>
    public string? FailureReason { get; private set; }

    /// <summary>
    /// Creation time.
    /// </summary>
    public DateTimeOffset CreatedAt { get; private set; }

    /// <summary>
    /// Last transition time.
    /// </summary>
    public DateTimeOffset UpdatedAt { get; private set; }

    /// <summary>
    /// Deadline inherited from the order.
    /// </summary>
    public DateTimeOffset ExpiresAt { get; private set; }

    /// <summary>
    /// Optimistic concurrency version.
    /// </summary>
    public int Version { get; private set; }

    /// <summary>
    /// Creates a payment intent for an order.
    /// </summary>
    public static PaymentIntent Create(
        IIdGenerator ids,
        Guid orderId,
        Guid agencyId,
        decimal amount,
        string currency,
        string pspAccountRef,
        string merchantScope,
        string fundsHeldBy,
        DateTimeOffset expiresAt,
        DateTimeOffset? now = null)
    {
        if (orderId == Guid.Empty || agencyId == Guid.Empty)
        {
            throw new ArgumentException("Order and agency are required.");
        }

        ArgumentOutOfRangeException.ThrowIfNegativeOrZero(amount);

        if (string.IsNullOrWhiteSpace(currency) ||
            string.IsNullOrWhiteSpace(pspAccountRef) ||
            string.IsNullOrWhiteSpace(merchantScope) ||
            string.IsNullOrWhiteSpace(fundsHeldBy))
        {
            throw new ArgumentException("Currency and merchant configuration are required.");
        }

        var createdAt = now ?? DateTimeOffset.UtcNow;

        if (expiresAt <= createdAt)
        {
            throw new ArgumentException("Payment deadline must be in the future.", nameof(expiresAt));
        }

        var intent = new PaymentIntent(
            ids.NewId(),
            orderId,
            agencyId,
            amount,
            currency.ToUpperInvariant(),
            pspAccountRef.Trim(),
            merchantScope.Trim(),
            fundsHeldBy.Trim(),
            createdAt,
            expiresAt);

        intent.AddDomainEvent(new PaymentIntentCreatedDomainEvent(ids.NewId(), intent.Id, orderId));
        return intent;
    }

    /// <summary>
    /// True when the payment deadline has passed.
    /// </summary>
    public bool IsExpired(DateTimeOffset now) => now >= ExpiresAt;

    /// <summary>
    /// Records the provider reference and redirect URL after gateway initiation.
    /// </summary>
    public void MarkPending(
        string provider,
        string providerRef,
        string redirectUrl,
        DateTimeOffset? now = null)
    {
        if (Status != PaymentIntentStatus.Created)
        {
            throw new InvalidOperationException("Only created intents can become pending.");
        }

        if (string.IsNullOrWhiteSpace(provider) ||
            string.IsNullOrWhiteSpace(providerRef) ||
            string.IsNullOrWhiteSpace(redirectUrl))
        {
            throw new ArgumentException("Provider, provider reference, and redirect URL are required.");
        }

        Status = PaymentIntentStatus.Pending;
        Provider = provider.Trim();
        ProviderRef = providerRef.Trim();
        RedirectUrl = redirectUrl.Trim();
        Touch(now);
    }

    /// <summary>
    /// Marks a pending payment as successful.
    /// </summary>
    public void MarkSucceeded(DateTimeOffset? now = null)
    {
        if (Status != PaymentIntentStatus.Pending)
        {
            throw new InvalidOperationException("Only pending intents can succeed.");
        }

        Status = PaymentIntentStatus.Succeeded;
        Touch(now);
    }

    /// <summary>
    /// Marks a created or pending payment as failed.
    /// </summary>
    public void MarkFailed(string reason, DateTimeOffset? now = null)
    {
        if (Status is not (PaymentIntentStatus.Created or PaymentIntentStatus.Pending))
        {
            throw new InvalidOperationException("Only created or pending intents can fail.");
        }

        Status = PaymentIntentStatus.Failed;
        FailureReason = string.IsNullOrWhiteSpace(reason) ? null : reason.Trim();
        Touch(now);
    }

    /// <summary>
    /// Expires a created or pending intent after its deadline.
    /// </summary>
    public void Expire(DateTimeOffset now)
    {
        if (Status is not (PaymentIntentStatus.Created or PaymentIntentStatus.Pending))
        {
            return;
        }

        if (!IsExpired(now))
        {
            throw new InvalidOperationException("Payment intent is not expired yet.");
        }

        Status = PaymentIntentStatus.Expired;
        UpdatedAt = now;
        Version++;
    }

    private void Touch(DateTimeOffset? now)
    {
        UpdatedAt = now ?? DateTimeOffset.UtcNow;
        Version++;
    }
}
