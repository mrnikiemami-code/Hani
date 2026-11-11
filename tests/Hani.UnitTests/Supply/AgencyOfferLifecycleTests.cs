using Hani.BuildingBlocks.Domain;
using Hani.Modules.Supply.Domain.AgencyOffers;
using Shouldly;

namespace Hani.UnitTests.Supply;

public sealed class AgencyOfferLifecycleTests
{
    [Fact]
    public void Submit_Approve_Should_Move_To_Approved()
    {
        var offer = CreateOffer();

        offer.SubmitForReview();
        offer.Status.ShouldBe(AgencyOfferStatus.Pending);

        offer.Approve();
        offer.Status.ShouldBe(AgencyOfferStatus.Approved);
    }

    [Fact]
    public void Reject_Should_Record_Reason_And_Allow_Resubmit()
    {
        var offer = CreateOffer();
        offer.SubmitForReview();

        offer.Reject("Missing hotel details");
        offer.Status.ShouldBe(AgencyOfferStatus.Rejected);
        offer.RejectionReason.ShouldBe("Missing hotel details");

        offer.SubmitForReview();
        offer.Status.ShouldBe(AgencyOfferStatus.Pending);
        offer.RejectionReason.ShouldBeNull();
    }

    [Fact]
    public void UpdateDetails_Should_Be_Rejected_After_Approval()
    {
        var offer = CreateOffer();
        offer.SubmitForReview();
        offer.Approve();

        Should.Throw<InvalidOperationException>(() =>
            offer.UpdateDetails("New title", Money.Of(10m, "IRR")));
    }

    [Fact]
    public void Archive_Should_Set_Archived()
    {
        var offer = CreateOffer();

        offer.Archive();

        offer.Status.ShouldBe(AgencyOfferStatus.Archived);
    }

    [Fact]
    public void Create_Should_Keep_External_Id()
    {
        var offer = AgencyOffer.Create(
            TestIds.Generator,
            Guid.CreateVersion7(),
            Guid.CreateVersion7(),
            "Istanbul",
            Money.Of(10m, "IRR"),
            " agency-offer-1 ");

        offer.ExternalId.ShouldBe("agency-offer-1");
    }

    private static AgencyOffer CreateOffer()
        => AgencyOffer.Create(
            TestIds.Generator,
            Guid.CreateVersion7(),
            Guid.CreateVersion7(),
            "Istanbul",
            Money.Of(45_000_000m, "IRR"),
            "offer-1");
}
