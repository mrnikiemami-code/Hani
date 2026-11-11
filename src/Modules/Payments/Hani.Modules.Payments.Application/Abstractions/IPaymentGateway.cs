using Hani.Modules.Payments.Domain.PaymentIntents;

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
    /// Returns the intent for an order, or <c>null</c>.
    /// </summary>
    Task<PaymentIntent?> GetByOrderIdAsync(Guid orderId, CancellationToken cancellationToken);

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
