using Hani.BuildingBlocks.Domain;
using Hani.Modules.Supply.Domain.AgencyOffers;
using Hani.Modules.Supply.Domain.AgencyOffers.Events;
using Shouldly;

namespace Hani.UnitTests.Supply;

public sealed class AgencyOfferTests
{
    [Fact]
    public void Create_Should_Set_Draft_Status_And_Raise_Event()
    {
        var offer = AgencyOffer.Create(
            TestIds.Generator,
            Guid.CreateVersion7(),
            Guid.CreateVersion7(),
            "Istanbul 4 nights",
            Money.Of(45_000_000m, "IRR"));

        offer.Status.ShouldBe(AgencyOfferStatus.Draft);
        offer.DomainEvents.Count.ShouldBe(1);
        offer.DomainEvents.Single().ShouldBeOfType<AgencyOfferCreatedDomainEvent>();
    }

    [Fact]
    public void Create_Should_Reject_Empty_Agency()
    {
        Should.Throw<ArgumentException>(() => AgencyOffer.Create(
            TestIds.Generator,
            Guid.Empty,
            Guid.CreateVersion7(),
            "Istanbul",
            Money.Of(1m, "IRR")));
    }

    [Fact]
    public void Create_Should_Trim_Title()
    {
        var offer = AgencyOffer.Create(
            TestIds.Generator,
            Guid.CreateVersion7(),
            Guid.CreateVersion7(),
            "  Istanbul  ",
            Money.Of(1m, "IRR"));

        offer.Title.ShouldBe("Istanbul");
    }
}
