using Hani.Modules.Identity.Domain.Governance;
using Hani.Modules.Settlement.Domain.Payouts;
using Shouldly;

namespace Hani.UnitTests.Governance;

public sealed class AdminGovernanceTests
{
    [Fact]
    public void Payout_Requires_Bank_Evidence_And_Approver()
    {
        var payout = Payout.Create(
            TestIds.Generator,
            Guid.CreateVersion7(),
            new DateOnly(2026, 11, 1),
            new DateOnly(2026, 11, 15),
            500_000m,
            "IRR");

        Should.Throw<ArgumentException>(() =>
            payout.MarkPaid(string.Empty, "https://documents.hani.ir/receipt.pdf", Guid.Empty));
        payout.Status.ShouldBe(PayoutStatus.Pending);
    }

    [Fact]
    public void Approval_Requires_A_Different_Administrator()
    {
        var requester = Guid.CreateVersion7();
        var approver = Guid.CreateVersion7();
        var approval = AdminApprovalRequest.CreateRefund(
            TestIds.Generator,
            Guid.CreateVersion7(),
            Guid.CreateVersion7(),
            100m,
            "USD",
            "Customer request",
            requester);

        Should.Throw<InvalidOperationException>(() => approval.Approve(requester, "self"));
        approval.Approve(approver, "checked");
        approval.Status.ShouldBe(AdminApprovalStatus.Approved);
        approval.DecidedBy.ShouldBe(approver);
    }

    [Fact]
    public void Refund_Approval_Keeps_Currency_And_Payment_Intent()
    {
        var paymentIntentId = Guid.CreateVersion7();
        var approval = AdminApprovalRequest.CreateRefund(
            TestIds.Generator,
            Guid.CreateVersion7(),
            paymentIntentId,
            535m,
            "usd",
            "Customer request",
            Guid.CreateVersion7());

        approval.Amount.ShouldBe(535m);
        approval.Currency.ShouldBe("USD");
        approval.PaymentIntentId.ShouldBe(paymentIntentId);
        approval.Status.ShouldBe(AdminApprovalStatus.Pending);
    }
}
