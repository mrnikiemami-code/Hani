using System.Globalization;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
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
    private static readonly JsonSerializerOptions JsonOptions = new(JsonSerializerDefaults.Web);

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

    /// <inheritdoc />
    public Task<PaymentRefundResponse> RefundAsync(
        PaymentRefundRequest request,
        CancellationToken cancellationToken)
    {
        if (request.Amount <= 0 || string.IsNullOrWhiteSpace(request.Currency))
        {
            throw new PaymentGatewayException("Invalid refund amount or currency.");
        }

        return Task.FromResult(new PaymentRefundResponse(
            Provider,
            $"mock_refund_{request.RefundId:N}"));
    }

    /// <inheritdoc />
    public PaymentWebhookMessage VerifyWebhook(PaymentWebhookRequest request)
    {
        if (!string.Equals(request.Provider, Provider, StringComparison.OrdinalIgnoreCase))
        {
            throw new PaymentGatewayException("Webhook provider is not supported.");
        }

        if (string.IsNullOrWhiteSpace(request.Signature) ||
            string.IsNullOrWhiteSpace(request.Timestamp))
        {
            throw new PaymentGatewayException("Webhook signature and timestamp are required.");
        }

        if (!DateTimeOffset.TryParse(
                request.Timestamp,
                CultureInfo.InvariantCulture,
                DateTimeStyles.AssumeUniversal,
                out var timestamp))
        {
            throw new PaymentGatewayException("Webhook timestamp is invalid.");
        }

        if (Math.Abs((DateTimeOffset.UtcNow - timestamp).TotalMinutes) > 5)
        {
            throw new PaymentGatewayException("Webhook timestamp is outside the allowed window.");
        }

        VerifySignature(request.Payload, request.Signature, request.Timestamp);

        MockWebhookPayload? payload;

        try
        {
            payload = JsonSerializer.Deserialize<MockWebhookPayload>(request.Payload, JsonOptions);
        }
        catch (JsonException exception)
        {
            throw new PaymentGatewayException("Webhook payload is invalid.", exception);
        }

        if (payload is null ||
            string.IsNullOrWhiteSpace(payload.EventId) ||
            payload.PaymentIntentId == Guid.Empty ||
            string.IsNullOrWhiteSpace(payload.Type))
        {
            throw new PaymentGatewayException("Webhook payload is missing required fields.");
        }

        return new PaymentWebhookMessage(
            Provider,
            payload.EventId,
            payload.PaymentIntentId,
            payload.ProviderRef ?? string.Empty,
            payload.Type,
            payload.OccurredAt == default ? timestamp : payload.OccurredAt,
            request.Payload);
    }

    private string Provider => string.IsNullOrWhiteSpace(options.Value.Provider)
        ? "Mock"
        : options.Value.Provider;

    private void VerifySignature(string payload, string signature, string timestamp)
    {
        if (string.IsNullOrWhiteSpace(options.Value.WebhookSecret))
        {
            throw new PaymentGatewayException("Webhook secret is not configured.");
        }

        var provided = signature.StartsWith("sha256=", StringComparison.OrdinalIgnoreCase)
            ? signature["sha256=".Length..]
            : signature;

        using var hmac = new HMACSHA256(Encoding.UTF8.GetBytes(options.Value.WebhookSecret));
        var expected = Convert.ToHexString(
                hmac.ComputeHash(Encoding.UTF8.GetBytes($"{timestamp}.{payload}")))
            .ToLowerInvariant();

        var expectedBytes = Encoding.UTF8.GetBytes(expected);
        var providedBytes = Encoding.UTF8.GetBytes(provided.ToLowerInvariant());

        if (!CryptographicOperations.FixedTimeEquals(expectedBytes, providedBytes))
        {
            throw new PaymentGatewayException("Webhook signature is invalid.");
        }
    }

    private sealed record MockWebhookPayload(
        string? EventId,
        Guid PaymentIntentId,
        string? ProviderRef,
        string? Type,
        DateTimeOffset OccurredAt);
}
