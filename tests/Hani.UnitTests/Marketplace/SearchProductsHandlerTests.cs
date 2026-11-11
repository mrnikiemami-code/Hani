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
    public async Task Search_Should_Page_Items_And_Report_Total()
    {
        var catalog = new FakeCatalogReadService();
        var offers = new FakeOfferReadService();

        for (var index = 0; index < 3; index++)
        {
            catalog.Products.Add(new CatalogProductSummary(
                Guid.CreateVersion7(),
                $"product-{index}",
                3,
                "tour",
                new Dictionary<string, string> { ["fa"] = $"تور {index}" },
                [],
                DateTimeOffset.UtcNow));
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
            ]);
}
