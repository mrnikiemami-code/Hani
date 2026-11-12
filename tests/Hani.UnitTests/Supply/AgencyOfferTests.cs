using Hani.BuildingBlocks.Domain;
using Hani.Modules.Supply.Domain.AgencyOffers;
using Hani.Modules.Supply.Domain.AgencyOffers.Events;
using Hani.Modules.Supply.Domain.Departures;
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

    [Fact]
    public void ReplaceOptions_Should_Keep_Accommodation_And_Flights()
    {
        var offer = AgencyOffer.Create(
            TestIds.Generator,
            Guid.CreateVersion7(),
            Guid.CreateVersion7(),
            "Istanbul",
            Money.Of(1m, "IRR"));

        offer.ReplaceAccommodationOptions(
            TestIds.Generator,
            [
                new OfferAccommodationOptionDetails(
                    "Grand Deniz",
                    4,
                    RoomType.Double,
                    MealPlanType.Breakfast,
                    Money.Of(60_500_000m, "IRR"))
            ]);

        offer.ReplaceFlightOptions(
            TestIds.Generator,
            [
                new OfferFlightOptionDetails(
                    FlightDirection.Outbound,
                    "Iran Air",
                    "IR123",
                    "IKA",
                    "IST",
                    new TimeOnly(19, 30),
                    new TimeOnly(23, 0),
                    210,
                    "ECONOMY",
                    "25kg")
            ]);

        offer.AccommodationOptions.Count.ShouldBe(1);
        offer.FlightOptions.Count.ShouldBe(1);
        offer.AccommodationOptions.Single().HotelName.ShouldBe("Grand Deniz");
        offer.FlightOptions.Single().FlightNumber.ShouldBe("IR123");
    }
}
