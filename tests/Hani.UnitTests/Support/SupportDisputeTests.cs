using Hani.Modules.Content.Domain.Support;
using Shouldly;

namespace Hani.UnitTests.Support;

public sealed class SupportDisputeTests
{
    [Fact]
    public void Create_Should_Open_Dispute_With_Amount()
    {
        var actor = Guid.CreateVersion7();
        var dispute = SupportDispute.Create(
            TestIds.Generator,
            Guid.CreateVersion7(),
            Guid.CreateVersion7(),
            SupportDisputeType.Refund,
            1_500_000m,
            "irr",
            "  Refund requested  ",
            "https://example.com/evidence.pdf",
            actor);

        dispute.Status.ShouldBe(SupportDisputeStatus.Open);
        dispute.Currency.ShouldBe("IRR");
        dispute.Description.ShouldBe("Refund requested");
        dispute.OpenedBy.ShouldBe(actor);
        dispute.ResolvedAt.ShouldBeNull();
    }

    [Fact]
    public void Resolve_Should_Require_Resolution()
    {
        var dispute = CreateDispute();

        Should.Throw<ArgumentException>(() =>
            dispute.SetStatus(
                SupportDisputeStatus.Resolved,
                Guid.CreateVersion7()));
    }

    [Fact]
    public void Resolve_Should_Set_Terminal_State()
    {
        var actor = Guid.CreateVersion7();
        var dispute = CreateDispute();

        dispute.SetStatus(
            SupportDisputeStatus.Resolved,
            actor,
            "Refund approved");

        dispute.Status.ShouldBe(SupportDisputeStatus.Resolved);
        dispute.Resolution.ShouldBe("Refund approved");
        dispute.ResolvedBy.ShouldBe(actor);
        dispute.ResolvedAt.ShouldNotBeNull();
    }

    [Fact]
    public void Closed_Dispute_Cannot_Change_Again()
    {
        var dispute = CreateDispute();
        dispute.SetStatus(
            SupportDisputeStatus.Rejected,
            Guid.CreateVersion7(),
            "Outside policy");

        Should.Throw<InvalidOperationException>(() =>
            dispute.SetStatus(
                SupportDisputeStatus.Investigating,
                Guid.CreateVersion7()));
    }

    private static SupportDispute CreateDispute()
        => SupportDispute.Create(
            TestIds.Generator,
            Guid.CreateVersion7(),
            null,
            SupportDisputeType.ServiceQuality,
            null,
            null,
            "Service issue",
            null,
            Guid.CreateVersion7());
}
