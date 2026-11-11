using Hani.BuildingBlocks.Domain;

namespace Hani.Modules.Payments.Domain.PaymentWebhooks;

/// <summary>
/// Durable record of a provider webhook. The provider event id is the deduplication key.
/// </summary>
public sealed class PaymentWebhookEvent : Entity<Guid>
{
    private PaymentWebhookEvent()
    {
    }

    private PaymentWebhookEvent(
        Guid id,
        string provider,
        string providerEventId,
        Guid paymentIntentId,
        string eventType,
        string payload,
        DateTimeOffset receivedAt) : base(id)
    {
        Provider = provider;
        ProviderEventId = providerEventId;
        PaymentIntentId = paymentIntentId;
        EventType = eventType;
        Payload = payload;
        ReceivedAt = receivedAt;
        Status = PaymentWebhookStatus.Received;
    }

    /// <summary>
    /// Provider name.
    /// </summary>
    public string Provider { get; private set; } = string.Empty;

    /// <summary>
    /// Provider-side unique event id.
    /// </summary>
    public string ProviderEventId { get; private set; } = string.Empty;

    /// <summary>
    /// Payment intent referenced by the event.
    /// </summary>
    public Guid PaymentIntentId { get; private set; }

    /// <summary>
    /// Event type, for example <c>payment.succeeded</c>.
    /// </summary>
    public string EventType { get; private set; } = string.Empty;

    /// <summary>
    /// Raw payload retained for audit and replay.
    /// </summary>
    public string Payload { get; private set; } = string.Empty;

    /// <summary>
    /// Processing state.
    /// </summary>
    public PaymentWebhookStatus Status { get; private set; }

    /// <summary>
    /// Receipt time.
    /// </summary>
    public DateTimeOffset ReceivedAt { get; private set; }

    /// <summary>
    /// Time processing finished.
    /// </summary>
    public DateTimeOffset? ProcessedAt { get; private set; }

    /// <summary>
    /// Optional processing error.
    /// </summary>
    public string? FailureReason { get; private set; }

    /// <summary>
    /// Creates a received webhook record.
    /// </summary>
    public static PaymentWebhookEvent Create(
        IIdGenerator ids,
        string provider,
        string providerEventId,
        Guid paymentIntentId,
        string eventType,
        string payload,
        DateTimeOffset? now = null)
    {
        if (string.IsNullOrWhiteSpace(provider) ||
            string.IsNullOrWhiteSpace(providerEventId) ||
            string.IsNullOrWhiteSpace(eventType) ||
            string.IsNullOrWhiteSpace(payload))
        {
            throw new ArgumentException("Webhook provider, event id, type, and payload are required.");
        }

        if (paymentIntentId == Guid.Empty)
        {
            throw new ArgumentException("Payment intent is required.", nameof(paymentIntentId));
        }

        return new PaymentWebhookEvent(
            ids.NewId(),
            provider.Trim(),
            providerEventId.Trim(),
            paymentIntentId,
            eventType.Trim(),
            payload,
            now ?? DateTimeOffset.UtcNow);
    }

    /// <summary>
    /// Marks the event as processed.
    /// </summary>
    public void MarkProcessed(DateTimeOffset? now = null)
    {
        Status = PaymentWebhookStatus.Processed;
        ProcessedAt = now ?? DateTimeOffset.UtcNow;
    }

    /// <summary>
    /// Marks the event as ignored because it did not require a state change.
    /// </summary>
    public void MarkIgnored(DateTimeOffset? now = null)
    {
        Status = PaymentWebhookStatus.Ignored;
        ProcessedAt = now ?? DateTimeOffset.UtcNow;
    }

    /// <summary>
    /// Marks the event as failed for reconciliation and retry.
    /// </summary>
    public void MarkFailed(string reason, DateTimeOffset? now = null)
    {
        Status = PaymentWebhookStatus.Failed;
        FailureReason = string.IsNullOrWhiteSpace(reason) ? null : reason.Trim();
        ProcessedAt = now ?? DateTimeOffset.UtcNow;
    }
}
