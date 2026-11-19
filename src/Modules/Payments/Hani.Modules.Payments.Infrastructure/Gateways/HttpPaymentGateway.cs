using System.Globalization;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using Hani.Modules.Payments.Application;
using Hani.Modules.Payments.Application.Abstractions;
using Microsoft.Extensions.Options;

namespace Hani.Modules.Payments.Infrastructure.Gateways;

/// <summary>
/// Generic HTTPS PSP adapter for checkout, refund, and HMAC webhooks.
/// Concrete PSPs adapt their payloads to this contract.
/// </summary>
public sealed class HttpPaymentGateway(
    IOptions<PaymentOptions> options,
    IHttpClientFactory httpClientFactory) : IPaymentGateway
{
    private static readonly JsonSerializerOptions JsonOptions = new(JsonSerializerDefaults.Web);

    /// <inheritdoc />
    public async Task<PaymentGatewayResponse> InitiateAsync(
        PaymentGatewayRequest request,
        CancellationToken cancellationToken)
    {
        EnsureConfigured();
        if (request.Amount <= 0 || string.IsNullOrWhiteSpace(request.Currency))
        {
            throw new PaymentGatewayException("Invalid payment amount or currency.");
        }

        using var message = new HttpRequestMessage(
            HttpMethod.Post,
            Url(options.Value.InitiatePath))
        {
            Content = JsonContent.Create(new
            {
                paymentIntentId = request.PaymentIntentId,
                orderId = request.OrderId,
                amount = request.Amount,
                currency = request.Currency,
                returnUrl = request.ReturnUrl
            })
        };
        message.Headers.Authorization = new AuthenticationHeaderValue(
            "Bearer",
            options.Value.ApiKey);

        var client = httpClientFactory.CreateClient("payments");
        using var response = await client.SendAsync(message, cancellationToken);
        if (!response.IsSuccessStatusCode)
        {
            throw new PaymentGatewayException(
                $"Payment provider returned {(int)response.StatusCode} during checkout initiation.");
        }

        var payload = await response.Content.ReadFromJsonAsync<CheckoutResponse>(
            JsonOptions,
            cancellationToken);
        if (payload is null ||
            string.IsNullOrWhiteSpace(payload.ProviderRef) ||
            string.IsNullOrWhiteSpace(payload.RedirectUrl))
        {
            throw new PaymentGatewayException("Payment provider returned an invalid checkout response.");
        }

        return new PaymentGatewayResponse(
            Provider,
            payload.ProviderRef,
            payload.RedirectUrl);
    }

    /// <inheritdoc />
    public async Task<PaymentRefundResponse> RefundAsync(
        PaymentRefundRequest request,
        CancellationToken cancellationToken)
    {
        EnsureConfigured();
        if (request.Amount <= 0 || string.IsNullOrWhiteSpace(request.Currency))
        {
            throw new PaymentGatewayException("Invalid refund amount or currency.");
        }

        using var message = new HttpRequestMessage(
            HttpMethod.Post,
            Url(options.Value.RefundPath))
        {
            Content = JsonContent.Create(new
            {
                refundId = request.RefundId,
                orderId = request.OrderId,
                amount = request.Amount,
                currency = request.Currency,
                paymentIntentRef = request.PaymentIntentRef
            })
        };
        message.Headers.Authorization = new AuthenticationHeaderValue(
            "Bearer",
            options.Value.ApiKey);

        var client = httpClientFactory.CreateClient("payments");
        using var response = await client.SendAsync(message, cancellationToken);
        if (!response.IsSuccessStatusCode)
        {
            throw new PaymentGatewayException(
                $"Payment provider returned {(int)response.StatusCode} during refund.");
        }

        var payload = await response.Content.ReadFromJsonAsync<RefundResponse>(
            JsonOptions,
            cancellationToken);
        if (payload is null || string.IsNullOrWhiteSpace(payload.ProviderRef))
        {
            throw new PaymentGatewayException("Payment provider returned an invalid refund response.");
        }

        return new PaymentRefundResponse(Provider, payload.ProviderRef);
    }

    /// <inheritdoc />
    public PaymentWebhookMessage VerifyWebhook(PaymentWebhookRequest request)
    {
        EnsureConfigured();
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

        var tolerance = Math.Clamp(options.Value.WebhookToleranceMinutes, 1, 60);
        if (Math.Abs((DateTimeOffset.UtcNow - timestamp).TotalMinutes) > tolerance)
        {
            throw new PaymentGatewayException("Webhook timestamp is outside the allowed window.");
        }

        VerifySignature(request.Payload, request.Signature, request.Timestamp);
        ProviderWebhookPayload? payload;
        try
        {
            payload = JsonSerializer.Deserialize<ProviderWebhookPayload>(
                request.Payload,
                JsonOptions);
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
        ? "Http"
        : options.Value.Provider;

    private void EnsureConfigured()
    {
        if (string.IsNullOrWhiteSpace(options.Value.BaseUrl) ||
            string.IsNullOrWhiteSpace(options.Value.ApiKey) ||
            string.IsNullOrWhiteSpace(options.Value.WebhookSecret))
        {
            throw new PaymentGatewayException(
                "Payment provider base URL, API key, and webhook secret are required.");
        }
    }

    private string Url(string path)
        => $"{options.Value.BaseUrl.TrimEnd('/')}/{path.TrimStart('/')}";

    private void VerifySignature(string payload, string signature, string timestamp)
    {
        var provided = signature.StartsWith("sha256=", StringComparison.OrdinalIgnoreCase)
            ? signature["sha256=".Length..]
            : signature;
        using var hmac = new HMACSHA256(
            Encoding.UTF8.GetBytes(options.Value.WebhookSecret));
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

    private sealed record CheckoutResponse(string? ProviderRef, string? RedirectUrl);

    private sealed record RefundResponse(string? ProviderRef);

    private sealed record ProviderWebhookPayload(
        string? EventId,
        Guid PaymentIntentId,
        string? ProviderRef,
        string? Type,
        DateTimeOffset OccurredAt);
}
