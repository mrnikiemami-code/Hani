using Hani.Modules.Catalog.Domain.Flights;
using Hani.Modules.Catalog.Domain.TourProducts;
using Hani.Modules.Catalog.Domain.Visas;
using Shouldly;

namespace Hani.UnitTests.Catalog;

public sealed class AdminEditDomainTests
{
    [Fact]
    public void Tour_UpdateBasics_And_UpsertTranslation_Should_Update_Content()
    {
        var product = TourProduct.Create(
            TestIds.Generator,
            "edit-tour",
            3,
            "city-break");
        product.AddTranslation(
            TestIds.Generator,
            "en",
            "Original title",
            "Original summary",
            "Original description");

        product.UpdateBasics(
            6,
            "cultural",
            TourCategory.Luxury,
            TravelType.Air,
            TourScope.Domestic,
            "https://example.com/cover.jpg");
        product.UpsertTranslation(
            TestIds.Generator,
            "en",
            "Updated title",
            "Updated summary",
            "Updated description");

        product.DurationDays.ShouldBe(6);
        product.TourType.ShouldBe("cultural");
        product.Category.ShouldBe(TourCategory.Luxury);
        product.TravelType.ShouldBe(TravelType.Air);
        product.Scope.ShouldBe(TourScope.Domestic);
        product.CoverImageUrl.ShouldBe("https://example.com/cover.jpg");
        product.Translations.Count.ShouldBe(1);
        product.Translations.Single().Title.ShouldBe("Updated title");
        product.Translations.Single().Summary.ShouldBe("Updated summary");
    }

    [Fact]
    public void Visa_UpdateType_And_Translation_Should_Update_Pricing()
    {
        var country = VisaCountry.Create(TestIds.Generator, "edit-visa", "EV", "https://cover");
        country.AddTranslation(TestIds.Generator, "en", "Original", "Original description");
        var type = country.AddType(
            TestIds.Generator,
            new VisaTypeInput(
                "Tourist",
                "Single",
                "Electronic",
                3,
                5,
                30,
                100m,
                50m,
                "USD",
                [],
                [],
                []));

        country.UpdateBasics("NV", "https://new-cover");
        country.UpsertTranslation(TestIds.Generator, "en", "Updated", "Updated description");
        country.UpdateType(
            type.Id,
            new VisaTypeInput(
                "Business",
                "Multiple",
                "Embassy",
                7,
                10,
                90,
                250m,
                125m,
                "EUR",
                [],
                [],
                []));

        country.CountryCode.ShouldBe("NV");
        country.CoverImageUrl.ShouldBe("https://new-cover");
        country.Translations.Single().Name.ShouldBe("Updated");
        country.Types.Single().Code.ShouldBe("Business");
        country.Types.Single().EntryType.ShouldBe("Multiple");
        country.Types.Single().ProcessingDaysMax.ShouldBe(10);
        country.Types.Single().PriceAdult.ShouldBe(250m);
        country.Types.Single().Currency.ShouldBe("EUR");
    }

    [Fact]
    public void FlightRoute_Update_Should_Replace_Offers()
    {
        var route = FlightRoute.Create(
            TestIds.Generator,
            "old-route",
            "AAA",
            "BBB",
            "Origin",
            "Destination",
            true,
            [
                new FlightOfferInput(
                    "IR100",
                    "IR",
                    "Iran Air",
                    new DateOnly(2026, 12, 1),
                    new TimeOnly(8, 0),
                    new TimeOnly(9, 0),
                    60,
                    0,
                    "Economy",
                    "20kg",
                    100m,
                    "USD",
                    "Provider",
                    "https://provider/1")
            ]);

        route.Update(
            TestIds.Generator,
            "new-route",
            "CCC",
            "DDD",
            "New origin",
            "New destination",
            false,
            [
                new FlightOfferInput(
                    "IR200",
                    "IR",
                    "Iran Air",
                    new DateOnly(2026, 12, 2),
                    new TimeOnly(10, 0),
                    new TimeOnly(11, 30),
                    90,
                    1,
                    "Business",
                    "30kg",
                    200m,
                    "EUR",
                    "Provider",
                    "https://provider/2")
            ]);

        route.Slug.ShouldBe("new-route");
        route.OriginCode.ShouldBe("CCC");
        route.DestinationCode.ShouldBe("DDD");
        route.OriginCity.ShouldBe("New origin");
        route.IsActive.ShouldBeFalse();
        route.Offers.Count.ShouldBe(1);
        route.Offers.Single().FlightNumber.ShouldBe("IR200");
        route.Offers.Single().Stops.ShouldBe(1);
        route.Offers.Single().Price.ShouldBe(200m);
    }
}
