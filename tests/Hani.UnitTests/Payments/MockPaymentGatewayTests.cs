using System.Security.Cryptography;
using System.Text;
using Hani.Modules.Payments.Application;
using Hani.Modules.Payments.Application.Abstractions;
using Hani.Modules.Payments.Infrastructure.Gateways;
using Microsoft.Extensions.Options;
using Shouldly;

namespace Hani.UnitTests.Payments;

public sealed class MockPaymentGatewayTests
{
    [Fact]
    public async Task Initiate_Should_Return_Provider_Reference_And_Redirect()
    {
        var gateway = CreateGateway();
        var intentId = Guid.CreateVersion7();
        var request = new PaymentGatewayRequest(
            intentId,
            Guid.CreateVersion7(),
            45_000_000m,
            "IRR",
            "https://app.hani.ir/payments/return");

        var response = await gateway.InitiateAsync(request, CancellationToken.None);

        response.Provider.ShouldBe("Mock");
        response.ProviderRef.ShouldBe($"mock_{intentId:N}");
        response.RedirectUrl.ShouldContain($"intent={intentId}");
        response.RedirectUrl.ShouldContain($"providerRef=mock_{intentId:N}");
    }

    [Fact]
    public async Task Initiate_Should_Reject_Invalid_Amount()
    {
        var gateway = CreateGateway();
        var request = new PaymentGatewayRequest(
            Guid.CreateVersion7(),
            Guid.CreateVersion7(),
            0m,
            "IRR",
            "https://app.hani.ir/payments/return");

        await Should.ThrowAsync<PaymentGatewayException>(() =>
            gateway.InitiateAsync(request, CancellationToken.None));
    }

    [Fact]
    public void VerifyWebhook_Should_Accept_Valid_Signature_And_Parse_Payload()
    {
        var gateway = CreateGateway();
        var intentId = Guid.CreateVersion7();
        var timestamp = DateTimeOffset.UtcNow.ToString("o");
        var payload =
            $$"""{"eventId":"evt_1","paymentIntentId":"{{intentId}}","providerRef":"mock_ref","type":"payment.succeeded","occurredAt":"{{timestamp}}"}""";
        var signature = Sign(timestamp, payload);

        var message = gateway.VerifyWebhook(new PaymentWebhookRequest(
            "Mock",
            payload,
            signature,
            timestamp));

        message.Provider.ShouldBe("Mock");
        message.ProviderEventId.ShouldBe("evt_1");
        message.PaymentIntentId.ShouldBe(intentId);
        message.ProviderRef.ShouldBe("mock_ref");
        message.EventType.ShouldBe("payment.succeeded");
    }

    [Fact]
    public void VerifyWebhook_Should_Reject_Invalid_Signature()
    {
        var gateway = CreateGateway();
        var timestamp = DateTimeOffset.UtcNow.ToString("o");
        var payload =
            """{"eventId":"evt_1","paymentIntentId":"01a1cbce-2cd1-7fff-8809-49a6477bd24a","providerRef":"mock_ref","type":"payment.succeeded"}""";

        Should.Throw<PaymentGatewayException>(() =>
            gateway.VerifyWebhook(new PaymentWebhookRequest(
                "Mock",
                payload,
                "sha256=bad",
                timestamp)));
    }

    private static string Sign(string timestamp, string payload)
    {
        using var hmac = new HMACSHA256(Encoding.UTF8.GetBytes("test-webhook-secret"));
        var hash = hmac.ComputeHash(Encoding.UTF8.GetBytes($"{timestamp}.{payload}"));
        return "sha256=" + Convert.ToHexString(hash).ToLowerInvariant();
    }

    private static MockPaymentGateway CreateGateway()
        => new(Options.Create(new PaymentOptions
        {
            Provider = "Mock",
            PspAccountRef = "hani-psp-main",
            MerchantScope = "Hani",
            FundsHeldBy = "Hani",
            ReturnUrlBase = "https://app.hani.ir/payments/return",
            WebhookSecret = "test-webhook-secret"
        }));
}
