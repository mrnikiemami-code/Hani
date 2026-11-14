using Hani.Contracts.Catalog;
using Hani.Contracts.Supply;
using Hani.Modules.Marketplace.Application.Queries.SearchProducts;
using Shouldly;

namespace Hani.UnitTests.Marketplace;

public sealed class SearchProductsHandlerTests
{
    [Fact]
    public async Task Search_Should_Return_Localized_Title_And_Min_Price()
    {
        var catalog = new FakeCatalogReadService();
        var offers = new FakeOfferReadService();
        var productId = Guid.CreateVersion7();

        catalog.Products.Add(new CatalogProductSummary(
            productId,
            "istanbul",
            4,
            "city-break",
            new Dictionary<string, string> { ["fa"] = "استانبول", ["en"] = "Istanbul" },
            [],
            DateTimeOffset.UtcNow));

        offers.OffersByProduct[productId] =
        [
            Offer(productId, 45_000_000m, 40_000_000m),
            Offer(productId, 50_000_000m, 55_000_000m)
        ];

        var handler = new SearchProductsQueryHandler(catalog, offers, new FakeLanguageCatalog());

        var result = await handler.Handle(
            new SearchProductsQuery("en", Page: 1, PageSize: 20),
            CancellationToken.None);

        result.IsSuccess.ShouldBeTrue();
        result.Value!.TotalCount.ShouldBe(1);
        result.Value.Items[0].Title.ShouldBe("Istanbul");
        result.Value.Items[0].MinPrice.ShouldBe(40_000_000m);
        result.Value.Items[0].OfferCount.ShouldBe(2);
    }

    [Fact]
    public async Task Search_Should_Group_Min_Price_By_Currency()
    {
        var catalog = new FakeCatalogReadService();
        var offers = new FakeOfferReadService();
        var productId = Guid.CreateVersion7();

        catalog.Products.Add(new CatalogProductSummary(
            productId,
            "multi-currency",
            4,
            "city-break",
            new Dictionary<string, string> { ["en"] = "Multi currency" },
            [],
            DateTimeOffset.UtcNow));

        offers.OffersByProduct[productId] =
        [
            new OfferSnapshot(
                Guid.CreateVersion7(),
                Guid.CreateVersion7(),
                productId,
                "ext",
                "Offer",
                45_000_000m,
                "IRR",
                "Approved",
                [
                    new DepartureSnapshot(
                        Guid.CreateVersion7(),
                        new DateOnly(2026, 11, 16),
                        new DateOnly(2026, 11, 19),
                        10,
                        5,
                        "Open",
                        [
                            new DeparturePriceSnapshot("Double", 40_000_000m, "IRR"),
                            new DeparturePriceSnapshot("Double", 200m, "USD")
                        ])
                ],
                [],
                [],
                [])
        ];

        var handler = new SearchProductsQueryHandler(catalog, offers, new FakeLanguageCatalog());

        var result = await handler.Handle(
            new SearchProductsQuery("en", Page: 1, PageSize: 20),
            CancellationToken.None);

        var item = result.Value!.Items.Single();
        item.MinPrices.Count.ShouldBe(2);
        item.MinPrices.Single(price => price.Currency == "IRR").Amount.ShouldBe(40_000_000m);
        item.MinPrices.Single(price => price.Currency == "USD").Amount.ShouldBe(200m);
        item.MinPrice.ShouldBe(40_000_000m);
    }

    [Fact]
    public async Task Search_Should_Page_Items_And_Report_Total()
    {
        var catalog = new FakeCatalogReadService();
        var offers = new FakeOfferReadService();

        for (var index = 0; index < 3; index++)
        {
            var productId = Guid.CreateVersion7();
            catalog.Products.Add(new CatalogProductSummary(
                productId,
                $"product-{index}",
                3,
                "tour",
                new Dictionary<string, string> { ["fa"] = $"تور {index}" },
                [],
                DateTimeOffset.UtcNow));

            offers.OffersByProduct[productId] =
            [
                Offer(productId, 10_000_000m, 9_000_000m)
            ];
        }

        var handler = new SearchProductsQueryHandler(catalog, offers, new FakeLanguageCatalog());

        var result = await handler.Handle(
            new SearchProductsQuery("fa", Page: 2, PageSize: 2),
            CancellationToken.None);

        result.IsSuccess.ShouldBeTrue();
        result.Value!.TotalCount.ShouldBe(3);
        result.Value.Items.Count.ShouldBe(1);
        result.Value.Page.ShouldBe(2);
    }

    [Fact]
    public async Task Search_Should_Apply_Hotel_Meal_Airline_And_Agency_Filters()
    {
        var catalog = new FakeCatalogReadService();
        var offers = new FakeOfferReadService();
        var productId = Guid.CreateVersion7();
        var matchingAgency = Guid.CreateVersion7();
        var otherAgency = Guid.CreateVersion7();

        catalog.Products.Add(new CatalogProductSummary(
            productId,
            "istanbul",
            4,
            "city-break",
            new Dictionary<string, string> { ["fa"] = "استانبول" },
            [],
            DateTimeOffset.UtcNow));

        offers.OffersByProduct[productId] =
        [
            OfferWithDetails(
                productId,
                matchingAgency,
                4,
                "Breakfast",
                "Iran Air",
                20_000_000m,
                "IRR",
                new DateOnly(2026, 12, 20),
                10),
            OfferWithDetails(
                productId,
                otherAgency,
                5,
                "AllInclusive",
                "Mahan Air",
                30_000_000m,
                "IRR",
                new DateOnly(2026, 12, 20),
                10)
        ];

        var handler = new SearchProductsQueryHandler(catalog, offers, new FakeLanguageCatalog());

        var result = await handler.Handle(
            new SearchProductsQuery(
                "fa",
                HotelStars: 4,
                MealPlan: "Breakfast",
                Airline: "Iran",
                AgencyId: matchingAgency),
            CancellationToken.None);

        result.Value!.TotalCount.ShouldBe(1);
        result.Value.Items.Single().OfferCount.ShouldBe(1);
    }

    [Fact]
    public async Task Search_Should_Apply_Date_Seats_Price_Currency_And_Sort()
    {
        var catalog = new FakeCatalogReadService();
        var offers = new FakeOfferReadService();
        var productId = Guid.CreateVersion7();

        catalog.Products.Add(new CatalogProductSummary(
            productId,
            "istanbul",
            4,
            "city-break",
            new Dictionary<string, string> { ["fa"] = "استانبول" },
            [],
            DateTimeOffset.UtcNow));

        offers.OffersByProduct[productId] =
        [
            OfferWithDetails(
                productId,
                Guid.CreateVersion7(),
                4,
                "Breakfast",
                "Iran Air",
                20_000_000m,
                "IRR",
                new DateOnly(2026, 12, 20),
                10),
            OfferWithDetails(
                productId,
                Guid.CreateVersion7(),
                4,
                "Breakfast",
                "Iran Air",
                21_000_000m,
                "IRR",
                new DateOnly(2026, 12, 25),
                2)
        ];

        var handler = new SearchProductsQueryHandler(catalog, offers, new FakeLanguageCatalog());

        var result = await handler.Handle(
            new SearchProductsQuery(
                "fa",
                StartDate: new DateOnly(2026, 12, 19),
                EndDate: new DateOnly(2026, 12, 21),
                MinPrice: 15_000_000m,
                MaxPrice: 25_000_000m,
                Currency: "IRR",
                Adults: 2,
                Children: 1,
                Sort: "price_desc"),
            CancellationToken.None);

        result.Value!.TotalCount.ShouldBe(1);
        result.Value.Items.Single().MinPrice.ShouldBe(20_000_000m);
        result.Value.Items.Single().Currency.ShouldBe("IRR");
    }

    [Fact]
    public async Task Search_Should_Filter_OnlineOnly_And_Expose_Booking_Modes()
    {
        var catalog = new FakeCatalogReadService();
        var offers = new FakeOfferReadService();
        var productId = Guid.CreateVersion7();

        catalog.Products.Add(new CatalogProductSummary(
            productId,
            "mixed-booking",
            4,
            "city-break",
            new Dictionary<string, string> { ["fa"] = "تور ترکیبی" },
            [],
            DateTimeOffset.UtcNow));

        offers.OffersByProduct[productId] =
        [
            OfferWithDetails(
                productId,
                Guid.CreateVersion7(),
                4,
                "Breakfast",
                "Iran Air",
                20_000_000m,
                "IRR",
                new DateOnly(2026, 12, 20),
                10,
                "Online"),
            OfferWithDetails(
                productId,
                Guid.CreateVersion7(),
                4,
                "Breakfast",
                "Iran Air",
                21_000_000m,
                "IRR",
                new DateOnly(2026, 12, 20),
                10,
                "ReservationRequest")
        ];

        var handler = new SearchProductsQueryHandler(catalog, offers, new FakeLanguageCatalog());

        var all = await handler.Handle(
            new SearchProductsQuery("fa"),
            CancellationToken.None);
        var online = await handler.Handle(
            new SearchProductsQuery("fa", OnlineOnly: true),
            CancellationToken.None);

        all.Value!.Items.Single().BookingModes.ShouldBe(
            ["Online", "ReservationRequest"],
            ignoreOrder: true);
        all.Value.Items.Single().OfferCount.ShouldBe(2);
        online.Value!.Items.Single().BookingModes.ShouldBe(["Online"]);
        online.Value.Items.Single().OfferCount.ShouldBe(1);
    }

    [Fact]
    public async Task Search_Should_Filter_Installment_Offers()
    {
        var catalog = new FakeCatalogReadService();
        var offers = new FakeOfferReadService();
        var productId = Guid.CreateVersion7();

        catalog.Products.Add(new CatalogProductSummary(
            productId,
            "installment",
            4,
            "city-break",
            new Dictionary<string, string> { ["fa"] = "تور اقساطی" },
            [],
            DateTimeOffset.UtcNow));

        offers.OffersByProduct[productId] =
        [
            OfferWithDetails(
                productId,
                Guid.CreateVersion7(),
                4,
                "Breakfast",
                "Iran Air",
                20_000_000m,
                "IRR",
                new DateOnly(2026, 12, 20),
                10,
                "Online",
                new InstallmentTermsSnapshot(true, 0.3m, 10, 0.05m, true)),
            OfferWithDetails(
                productId,
                Guid.CreateVersion7(),
                4,
                "Breakfast",
                "Iran Air",
                21_000_000m,
                "IRR",
                new DateOnly(2026, 12, 20),
                10)
        ];

        var handler = new SearchProductsQueryHandler(catalog, offers, new FakeLanguageCatalog());

        var result = await handler.Handle(
            new SearchProductsQuery("fa", InstallmentOnly: true),
            CancellationToken.None);

        result.Value!.TotalCount.ShouldBe(1);
        result.Value.Items.Single().InstallmentAvailable.ShouldBeTrue();
        result.Value.Items.Single().OfferCount.ShouldBe(1);
    }

    [Fact]
    public async Task Search_Should_Apply_Duration_And_TourType()
    {
        var catalog = new FakeCatalogReadService();
        var offers = new FakeOfferReadService();

        foreach (var (index, duration, tourType) in new[]
                 {
                     (0, 3, "city-break"),
                     (1, 7, "beach"),
                     (2, 7, "city-break")
                 })
        {
            var productId = Guid.CreateVersion7();
            catalog.Products.Add(new CatalogProductSummary(
                productId,
                $"product-{index}",
                duration,
                tourType,
                new Dictionary<string, string> { ["fa"] = $"تور {index}" },
                [],
                DateTimeOffset.UtcNow));
            offers.OffersByProduct[productId] =
            [
                OfferWithDetails(
                    productId,
                    Guid.CreateVersion7(),
                    4,
                    "Breakfast",
                    "Iran Air",
                    20_000_000m,
                    "IRR",
                    new DateOnly(2026, 12, 20),
                    10)
            ];
        }

        var handler = new SearchProductsQueryHandler(catalog, offers, new FakeLanguageCatalog());

        var result = await handler.Handle(
            new SearchProductsQuery(
                "fa",
                MinDuration: 7,
                TourType: "city-break"),
            CancellationToken.None);

        result.Value!.TotalCount.ShouldBe(1);
        result.Value.Items.Single().TourType.ShouldBe("city-break");
        result.Value.Items.Single().DurationDays.ShouldBe(7);
    }

    private static OfferSnapshot OfferWithDetails(
        Guid productId,
        Guid agencyId,
        int hotelStars,
        string mealPlan,
        string airline,
        decimal price,
        string currency,
        DateOnly startDate,
        int seatsLeft,
        string bookingMode = "Online",
        InstallmentTermsSnapshot? installmentTerms = null)
        => new(
            Guid.CreateVersion7(),
            agencyId,
            productId,
            "ext",
            "Offer",
            price,
            currency,
            "Approved",
            [
                new DepartureSnapshot(
                    Guid.CreateVersion7(),
                    startDate,
                    startDate.AddDays(3),
                    seatsLeft,
                    seatsLeft,
                    "Open",
                    [new DeparturePriceSnapshot("Double", price, currency)])
            ],
            [
                new AccommodationOptionSnapshot(
                    Guid.CreateVersion7(),
                    "Hotel",
                    hotelStars,
                    "Double",
                    mealPlan,
                    price,
                    currency,
                    null)
            ],
            [
                new FlightOptionSnapshot(
                    Guid.CreateVersion7(),
                    "Outbound",
                    airline,
                    "IR123",
                    "IKA",
                    "IST",
                    new TimeOnly(10, 0),
                    new TimeOnly(13, 0),
                    180,
                    "ECONOMY",
                    "25kg")
            ],
            [],
            BookingMode: bookingMode,
            InstallmentTerms: installmentTerms);

    private static OfferSnapshot Offer(Guid productId, decimal basePrice, decimal departurePrice)
        => new(
            Guid.CreateVersion7(),
            Guid.CreateVersion7(),
            productId,
            "ext",
            "Offer",
            basePrice,
            "IRR",
            "Approved",
            [
                new DepartureSnapshot(
                    Guid.CreateVersion7(),
                    new DateOnly(2026, 11, 16),
                    new DateOnly(2026, 11, 19),
                    10,
                    5,
                    "Open",
                    [new DeparturePriceSnapshot("Double", departurePrice, "IRR")])
            ],
            [],
            [],
            []);
}
