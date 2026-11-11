using Hani.Modules.Payments.Application;
using Hani.Modules.Payments.Application.Abstractions;
using Microsoft.Extensions.Options;

namespace Hani.Modules.Payments.Infrastructure.Gateways;

/// <summary>
/// Deterministic mock PSP used for local development and tests.
/// It never handles card data and is replaced by a real adapter in production.
/// </summary>
public sealed class MockPaymentGateway(IOptions<PaymentOptions> options) : IPaymentGateway
{
    /// <inheritdoc />
    public Task<PaymentGatewayResponse> InitiateAsync(
        PaymentGatewayRequest request,
        CancellationToken cancellationToken)
    {
        if (request.Amount <= 0 || string.IsNullOrWhiteSpace(request.Currency))
        {
            throw new PaymentGatewayException("Invalid payment amount or currency.");
        }

        var providerRef = $"mock_{request.PaymentIntentId:N}";
        var separator = request.ReturnUrl.Contains('?', StringComparison.Ordinal) ? '&' : '?';
        var redirectUrl =
            $"{request.ReturnUrl}{separator}intent={request.PaymentIntentId}&providerRef={providerRef}";

        return Task.FromResult(new PaymentGatewayResponse(
            string.IsNullOrWhiteSpace(options.Value.Provider) ? "Mock" : options.Value.Provider,
            providerRef,
            redirectUrl));
    }
}
