using Hani.Modules.Payments.Domain.PaymentIntents;
using Hani.Modules.Payments.Domain.PaymentWebhooks;

namespace Hani.Modules.Payments.Application.Abstractions;

/// <summary>
/// Request sent to a payment gateway to initiate checkout.
/// </summary>
public sealed record PaymentGatewayRequest(
    Guid PaymentIntentId,
    Guid OrderId,
    decimal Amount,
    string Currency,
    string ReturnUrl);

/// <summary>
/// Provider response for an initiated checkout.
/// </summary>
public sealed record PaymentGatewayResponse(
    string Provider,
    string ProviderRef,
    string RedirectUrl);

/// <summary>
/// Raw webhook request sent to a provider adapter for signature verification and parsing.
/// </summary>
public sealed record PaymentWebhookRequest(
    string Provider,
    string Payload,
    string? Signature,
    string? Timestamp);

/// <summary>
/// Verified and parsed provider webhook message.
/// </summary>
public sealed record PaymentWebhookMessage(
    string Provider,
    string ProviderEventId,
    Guid PaymentIntentId,
    string ProviderRef,
    string EventType,
    DateTimeOffset OccurredAt,
    string Payload);

/// <summary>
/// Port for PSP adapters. Production adapters must never store card data.
/// </summary>
public interface IPaymentGateway
{
    /// <summary>
    /// Initiates checkout and returns the provider reference and redirect URL.
    /// </summary>
    Task<PaymentGatewayResponse> InitiateAsync(
        PaymentGatewayRequest request,
        CancellationToken cancellationToken);

    /// <summary>
    /// Verifies the provider signature and parses the webhook payload.
    /// </summary>
    PaymentWebhookMessage VerifyWebhook(PaymentWebhookRequest request);
}

/// <summary>
/// Persistence abstraction for payment intents.
/// </summary>
public interface IPaymentIntentRepository
{
    /// <summary>
    /// Adds an intent and saves changes.
    /// </summary>
    Task AddAsync(PaymentIntent intent, CancellationToken cancellationToken);

    /// <summary>
    /// Returns an intent by id, or <c>null</c>.
    /// </summary>
    Task<PaymentIntent?> GetByIdAsync(Guid id, CancellationToken cancellationToken);

    /// <summary>
    /// Returns the intent for an order and currency, or <c>null</c>.
    /// </summary>
    Task<PaymentIntent?> GetByOrderAndCurrencyAsync(
        Guid orderId,
        string currency,
        CancellationToken cancellationToken);

    /// <summary>
    /// Returns all intents for an order.
    /// </summary>
    Task<IReadOnlyList<PaymentIntent>> GetAllByOrderIdAsync(
        Guid orderId,
        CancellationToken cancellationToken);

    /// <summary>
    /// Persists pending changes.
    /// </summary>
    Task SaveChangesAsync(CancellationToken cancellationToken);
}

/// <summary>
/// Persistence abstraction for deduplicated provider webhooks.
/// </summary>
public interface IPaymentWebhookEventRepository
{
    /// <summary>
    /// Adds a webhook event and saves changes.
    /// </summary>
    Task AddAsync(PaymentWebhookEvent webhookEvent, CancellationToken cancellationToken);

    /// <summary>
    /// Returns a webhook event by provider and provider event id, or <c>null</c>.
    /// </summary>
    Task<PaymentWebhookEvent?> GetAsync(
        string provider,
        string providerEventId,
        CancellationToken cancellationToken);

    /// <summary>
    /// Persists pending changes.
    /// </summary>
    Task SaveChangesAsync(CancellationToken cancellationToken);
}

/// <summary>
/// Raised when a gateway cannot initiate checkout.
/// </summary>
public sealed class PaymentGatewayException(string message, Exception? innerException = null)
    : Exception(message, innerException);
