using Hani.Modules.Payments.Domain.PaymentWebhooks;
using Shouldly;

namespace Hani.UnitTests.Payments;

public sealed class PaymentWebhookEventTests
{
    [Fact]
    public void Create_Should_Start_Received_And_Process()
    {
        var now = new DateTimeOffset(2026, 11, 11, 10, 0, 0, TimeSpan.Zero);

        var webhook = PaymentWebhookEvent.Create(
            TestIds.Generator,
            "Mock",
            "evt_1",
            Guid.CreateVersion7(),
            "payment.succeeded",
            "{}",
            now);

        webhook.Status.ShouldBe(PaymentWebhookStatus.Received);
        webhook.ProcessedAt.ShouldBeNull();

        webhook.MarkProcessed(now.AddSeconds(1));
        webhook.Status.ShouldBe(PaymentWebhookStatus.Processed);
        webhook.ProcessedAt.ShouldBe(now.AddSeconds(1));
    }

    [Fact]
    public void Create_Should_Require_Provider_Event_And_Payload()
    {
        Should.Throw<ArgumentException>(() =>
            PaymentWebhookEvent.Create(
                TestIds.Generator,
                string.Empty,
                "evt_1",
                Guid.CreateVersion7(),
                "payment.succeeded",
                "{}"));
    }
}
