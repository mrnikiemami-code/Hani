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

    private static MockPaymentGateway CreateGateway()
        => new(Options.Create(new PaymentOptions
        {
            Provider = "Mock",
            PspAccountRef = "hani-psp-main",
            MerchantScope = "Hani",
            FundsHeldBy = "Hani",
            ReturnUrlBase = "https://app.hani.ir/payments/return"
        }));
}
