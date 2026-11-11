using Hani.Modules.Payments.Domain.PaymentIntents;
using Shouldly;

namespace Hani.UnitTests.Payments;

public sealed class PaymentIntentTests
{
    [Fact]
    public void Create_Should_Start_Created_For_Hani_Merchant()
    {
        var now = new DateTimeOffset(2026, 11, 11, 10, 0, 0, TimeSpan.Zero);

        var intent = CreateIntent(now);

        intent.Status.ShouldBe(PaymentIntentStatus.Created);
        intent.Amount.ShouldBe(45_000_000m);
        intent.Currency.ShouldBe("IRR");
        intent.MerchantScope.ShouldBe("Hani");
        intent.FundsHeldBy.ShouldBe("Hani");
        intent.PspAccountRef.ShouldBe("hani-psp-main");
        intent.Version.ShouldBe(1);
        intent.DomainEvents.Count.ShouldBe(1);
    }

    [Fact]
    public void MarkPending_Should_Store_Provider_Data()
    {
        var intent = CreateIntent();

        intent.MarkPending("Mock", "mock_ref", "https://pay.example/redirect");

        intent.Status.ShouldBe(PaymentIntentStatus.Pending);
        intent.Provider.ShouldBe("Mock");
        intent.ProviderRef.ShouldBe("mock_ref");
        intent.RedirectUrl.ShouldBe("https://pay.example/redirect");
        intent.Version.ShouldBe(2);

        Should.Throw<InvalidOperationException>(() =>
            intent.MarkPending("Mock", "other", "https://pay.example/other"));
    }

    [Fact]
    public void Pending_Intent_Should_Succeed_Or_Fail()
    {
        var succeeded = CreateIntent();
        succeeded.MarkPending("Mock", "ref", "https://pay.example/redirect");
        succeeded.MarkSucceeded();
        succeeded.Status.ShouldBe(PaymentIntentStatus.Succeeded);

        var failed = CreateIntent();
        failed.MarkPending("Mock", "ref", "https://pay.example/redirect");
        failed.MarkFailed("declined");
        failed.Status.ShouldBe(PaymentIntentStatus.Failed);
        failed.FailureReason.ShouldBe("declined");
    }

    [Fact]
    public void Expire_Should_Require_Passed_Deadline()
    {
        var now = new DateTimeOffset(2026, 11, 11, 10, 0, 0, TimeSpan.Zero);
        var intent = CreateIntent(now);

        Should.Throw<InvalidOperationException>(() => intent.Expire(now.AddMinutes(1)));

        intent.Expire(now.AddMinutes(16));

        intent.Status.ShouldBe(PaymentIntentStatus.Expired);
    }

    [Fact]
    public void Create_Should_Reject_Invalid_Amount_Or_Deadline()
    {
        var now = new DateTimeOffset(2026, 11, 11, 10, 0, 0, TimeSpan.Zero);

        Should.Throw<ArgumentOutOfRangeException>(() =>
            PaymentIntent.Create(
                TestIds.Generator,
                Guid.CreateVersion7(),
                Guid.CreateVersion7(),
                0m,
                "IRR",
                "psp",
                "Hani",
                "Hani",
                now.AddMinutes(15),
                now));

        Should.Throw<ArgumentException>(() =>
            PaymentIntent.Create(
                TestIds.Generator,
                Guid.CreateVersion7(),
                Guid.CreateVersion7(),
                10m,
                "IRR",
                "psp",
                "Hani",
                "Hani",
                now,
                now));
    }

    private static PaymentIntent CreateIntent(DateTimeOffset? now = null)
    {
        var created = now ?? DateTimeOffset.UtcNow;

        return PaymentIntent.Create(
            TestIds.Generator,
            Guid.CreateVersion7(),
            Guid.CreateVersion7(),
            45_000_000m,
            "IRR",
            "hani-psp-main",
            "Hani",
            "Hani",
            created.AddMinutes(15),
            created);
    }
}
