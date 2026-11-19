using System.Globalization;
using System.Net;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using Hani.Modules.Payments.Application;
using Hani.Modules.Payments.Application.Abstractions;
using Hani.Modules.Payments.Infrastructure.Gateways;
using Microsoft.Extensions.Options;
using Shouldly;

namespace Hani.UnitTests.Payments;

public sealed class HttpPaymentGatewayTests
{
    [Fact]
    public async Task Initiate_Should_Post_To_Provider_And_Parse_Checkout()
    {
        HttpRequestMessage? captured = null;
        var gateway = CreateGateway(request =>
        {
            captured = request;
            return Json(HttpStatusCode.OK, new
            {
                providerRef = "psp-ref-1",
                redirectUrl = "https://psp.test/checkout/1"
            });
        });

        var result = await gateway.InitiateAsync(
            new PaymentGatewayRequest(
                Guid.CreateVersion7(),
                Guid.CreateVersion7(),
                120m,
                "IRR",
                "https://hani.test/return"),
            CancellationToken.None);

        result.Provider.ShouldBe("TestPsp");
        result.ProviderRef.ShouldBe("psp-ref-1");
        result.RedirectUrl.ShouldBe("https://psp.test/checkout/1");
        captured.ShouldNotBeNull();
        captured!.RequestUri!.ToString().ShouldBe("https://psp.test/payments");
        captured.Headers.Authorization!.Scheme.ShouldBe("Bearer");
        captured.Headers.Authorization.Parameter.ShouldBe("secret");
    }

    [Fact]
    public async Task VerifyWebhook_Should_Accept_Valid_Signature_And_Reject_Invalid()
    {
        var gateway = CreateGateway(_ => Json(HttpStatusCode.OK, new { }));
        var timestamp = DateTimeOffset.UtcNow.ToString("O", CultureInfo.InvariantCulture);
        var payload = JsonSerializer.Serialize(new
        {
            eventId = "evt-1",
            paymentIntentId = Guid.CreateVersion7(),
            providerRef = "psp-ref-1",
            type = "payment.succeeded",
            occurredAt = DateTimeOffset.UtcNow
        });
        var signature = Sign(timestamp, payload);

        var message = gateway.VerifyWebhook(new PaymentWebhookRequest(
            "TestPsp",
            payload,
            signature,
            timestamp));
        message.ProviderEventId.ShouldBe("evt-1");
        message.EventType.ShouldBe("payment.succeeded");

        Should.Throw<PaymentGatewayException>(() =>
            gateway.VerifyWebhook(new PaymentWebhookRequest(
                "TestPsp",
                payload,
                "bad-signature",
                timestamp)));
    }

    [Fact]
    public async Task Refund_Should_Post_And_Parse_Provider_Reference()
    {
        var gateway = CreateGateway(_ => Json(HttpStatusCode.OK, new
        {
            providerRef = "refund-ref-1"
        }));

        var result = await gateway.RefundAsync(
            new PaymentRefundRequest(
                Guid.CreateVersion7(),
                Guid.CreateVersion7(),
                50m,
                "USD",
                "psp-ref-1"),
            CancellationToken.None);

        result.ProviderRef.ShouldBe("refund-ref-1");
    }

    private static HttpPaymentGateway CreateGateway(
        Func<HttpRequestMessage, HttpResponseMessage> responder)
        => new(
            Options.Create(new PaymentOptions
            {
                Provider = "TestPsp",
                BaseUrl = "https://psp.test",
                ApiKey = "secret",
                WebhookSecret = "webhook-secret-with-enough-length",
                InitiatePath = "/payments",
                RefundPath = "/refunds"
            }),
            new TestHttpClientFactory(new TestHandler(responder)));

    private static HttpResponseMessage Json(HttpStatusCode status, object value)
        => new(status)
        {
            Content = new StringContent(
                JsonSerializer.Serialize(value),
                Encoding.UTF8,
                "application/json")
        };

    private static string Sign(string timestamp, string payload)
    {
        using var hmac = new HMACSHA256(
            Encoding.UTF8.GetBytes("webhook-secret-with-enough-length"));
        return Convert.ToHexString(
            hmac.ComputeHash(Encoding.UTF8.GetBytes($"{timestamp}.{payload}")))
            .ToLowerInvariant();
    }

    private sealed class TestHttpClientFactory(HttpMessageHandler handler)
        : IHttpClientFactory
    {
        public HttpClient CreateClient(string name) => new(handler, disposeHandler: false);
    }

    private sealed class TestHandler(
        Func<HttpRequestMessage, HttpResponseMessage> responder) : HttpMessageHandler
    {
        protected override Task<HttpResponseMessage> SendAsync(
            HttpRequestMessage request,
            CancellationToken cancellationToken)
            => Task.FromResult(responder(request));
    }
}
