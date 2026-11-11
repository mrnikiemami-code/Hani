using Hani.Contracts.Catalog;
using Hani.Contracts.Supply;
using Hani.Modules.Marketplace.Application.Queries.GetProductComparison;
using Shouldly;

namespace Hani.UnitTests.Marketplace;

public sealed class ProductComparisonHandlerTests
{
    [Fact]
    public async Task Compare_Should_Sort_Offers_By_Min_Price_And_Resolve_Agency_Names()
    {
        var productId = Guid.CreateVersion7();
        var catalog = new FakeCatalogReadService();
        var offers = new FakeOfferReadService();
        var agencies = new FakeAgencyReadService();

        catalog.Details[productId] = new CatalogProductDetails(
            productId,
            "istanbul",
            4,
            "city-break",
            new Dictionary<string, string> { ["fa"] = "استانبول" },
            new Dictionary<string, string> { ["fa"] = "خلاصه" },
            new Dictionary<string, string> { ["fa"] = "توضیحات" },
            []);

        var agencyA = Guid.CreateVersion7();
        var agencyB = Guid.CreateVersion7();
        agencies.Names[agencyA] = "Agency A";
        agencies.Names[agencyB] = "Agency B";

        offers.OffersByProduct[productId] =
        [
            Offer(productId, agencyA, 60_000_000m),
            Offer(productId, agencyB, 45_000_000m)
        ];

        var handler = new GetProductComparisonQueryHandler(catalog, offers, agencies, new FakeLanguageCatalog());

        var result = await handler.Handle(
            new GetProductComparisonQuery(productId, "fa"),
            CancellationToken.None);

        result.IsSuccess.ShouldBeTrue();
        result.Value!.Offers.Count.ShouldBe(2);
        result.Value.Offers[0].MinPrice.ShouldBe(45_000_000m);
        result.Value.Offers[0].AgencyName.ShouldBe("Agency B");
        result.Value.Title.ShouldBe("استانبول");
    }

    [Fact]
    public async Task Compare_Should_Return_NotFound_For_Unknown_Product()
    {
        var handler = new GetProductComparisonQueryHandler(
            new FakeCatalogReadService(),
            new FakeOfferReadService(),
            new FakeAgencyReadService(),
            new FakeLanguageCatalog());

        var result = await handler.Handle(
            new GetProductComparisonQuery(Guid.CreateVersion7(), "fa"),
            CancellationToken.None);

        result.IsSuccess.ShouldBeFalse();
        result.Error!.Type.ShouldBe(Hani.BuildingBlocks.Application.ErrorType.NotFound);
    }

    private static OfferSnapshot Offer(Guid productId, Guid agencyId, decimal price)
        => new(
            Guid.CreateVersion7(),
            agencyId,
            productId,
            "ext",
            "Offer",
            price,
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
                    [new DeparturePriceSnapshot("Double", price, "IRR")])
            ]);
}
