using Hani.Modules.Payments.Domain.Invoices;
using Hani.Modules.Payments.Domain.Refunds;
using Hani.Modules.Settlement.Domain.Payouts;
using Shouldly;

namespace Hani.UnitTests.Gate7;

public sealed class Gate7BillingTests
{
    [Fact]
    public void Refund_Should_Process_With_Provider_Reference()
    {
        var refund = Refund.Create(
            TestIds.Generator,
            Guid.CreateVersion7(),
            Guid.CreateVersion7(),
            1_000_000m,
            "IRR",
            "Customer cancellation");

        refund.Status.ShouldBe(RefundStatus.Requested);
        refund.MarkProcessed("refund-123");
        refund.Status.ShouldBe(RefundStatus.Processed);
        refund.ProviderRef.ShouldBe("refund-123");
    }

    [Fact]
    public void Invoice_Should_Be_Issued_With_Seller_And_Issuer()
    {
        var invoice = Invoice.Create(
            TestIds.Generator,
            Guid.CreateVersion7(),
            "Hani",
            "Agency",
            "buyer@example.com",
            10_000_000m,
            900_000m,
            10_900_000m,
            "IRR");

        invoice.InvoiceNumber.ShouldStartWith("INV-");
        invoice.Status.ShouldBe(InvoiceStatus.Issued);
        invoice.Total.ShouldBe(10_900_000m);
    }

    [Fact]
    public void Payout_Terms_And_Payout_Should_Be_Created()
    {
        var terms = AgencySettlementTerms.Create(
            TestIds.Generator,
            Guid.CreateVersion7(),
            SettlementCycle.Weekly,
            5_000_000m,
            "IRR",
            "bank-***-1234");
        var payout = Payout.Create(
            TestIds.Generator,
            terms.AgencyId,
            new DateOnly(2026, 11, 1),
            new DateOnly(2026, 11, 7),
            12_000_000m,
            "IRR");

        terms.Cycle.ShouldBe(SettlementCycle.Weekly);
        payout.Status.ShouldBe(PayoutStatus.Pending);
        payout.MarkPaid();
        payout.Status.ShouldBe(PayoutStatus.Paid);
    }
}
