using Hani.Contracts.Catalog;
using Hani.Modules.Marketplace.Application;
using Hani.Modules.Marketplace.Application.Queries.Seo;
using Microsoft.Extensions.Options;
using Shouldly;

namespace Hani.UnitTests.Marketplace;

public sealed class SeoHandlerTests
{
    [Fact]
    public async Task Product_Seo_Should_Build_Canonical_Alternates_And_JsonLd()
    {
        var catalog = new FakeCatalogReadService();
        var productId = Guid.CreateVersion7();
        var destinationId = Guid.CreateVersion7();

        catalog.Details[productId] = new CatalogProductDetails(
            productId,
            "istanbul",
            4,
            "city-break",
            new Dictionary<string, string> { ["fa"] = "تور استانبول", ["en"] = "Istanbul Tour" },
            new Dictionary<string, string> { ["fa"] = "خلاصه", ["en"] = "Summary" },
            new Dictionary<string, string> { ["fa"] = "توضیح", ["en"] = "Description" },
            [destinationId],
            SeoTitles: new Dictionary<string, string> { ["fa"] = "تور استانبول", ["en"] = "Istanbul Tour" },
            SeoDescriptions: new Dictionary<string, string> { ["fa"] = "توضیح سئو", ["en"] = "SEO description" });

        catalog.Destinations.Add(new CatalogDestinationSnapshot(
            destinationId,
            "istanbul",
            "City",
            null,
            new Dictionary<string, string> { ["fa"] = "استانبول", ["en"] = "Istanbul" }));

        var handler = new GetProductSeoQueryHandler(
            catalog,
            new FakeLanguageCatalog(),
            Options.Create(new SeoOptions { PublicBaseUrl = "https://hani.test" }));

        var result = await handler.Handle(
            new GetProductSeoQuery(productId, "en"),
            CancellationToken.None);

        result.IsSuccess.ShouldBeTrue();
        var dto = result.Value!;
        dto.CanonicalUrl.ShouldBe("https://hani.test/en/tours/istanbul");
        dto.Alternates.Count.ShouldBe(3);
        dto.Alternates.ShouldContain(link => link.Locale == "fa");
        dto.Breadcrumbs.Count.ShouldBe(4);
        dto.BreadcrumbJsonLd.ShouldContain("BreadcrumbList");
        dto.ProductJsonLd.ShouldContain("TouristTrip");
        dto.Title.ShouldBe("Istanbul Tour");
        dto.Description.ShouldBe("SEO description");
    }

    [Fact]
    public async Task Landing_Seo_Should_Include_Tour_Count_And_Collection_JsonLd()
    {
        var catalog = new FakeCatalogReadService();
        var destinationId = Guid.CreateVersion7();
        catalog.Destinations.Add(new CatalogDestinationSnapshot(
            destinationId,
            "istanbul",
            "City",
            null,
            new Dictionary<string, string> { ["fa"] = "استانبول", ["en"] = "Istanbul" }));

        var handler = new GetLandingSeoQueryHandler(
            catalog,
            new FakeLanguageCatalog(),
            Options.Create(new SeoOptions { PublicBaseUrl = "https://hani.test" }));

        var result = await handler.Handle(
            new GetLandingSeoQuery("istanbul", "fa"),
            CancellationToken.None);

        result.IsSuccess.ShouldBeTrue();
        result.Value!.CanonicalUrl.ShouldBe("https://hani.test/fa/tours/istanbul");
        result.Value.Title.ShouldBe("استانبول tours");
        result.Value.CollectionJsonLd.ShouldContain("CollectionPage");
    }

    [Fact]
    public async Task Sitemap_Should_Contain_Product_And_Destination_Urls_With_Alternates()
    {
        var catalog = new FakeCatalogReadService();
        var destinationId = Guid.CreateVersion7();
        catalog.Products.Add(new CatalogProductSummary(
            Guid.CreateVersion7(),
            "istanbul-tour",
            4,
            "city-break",
            new Dictionary<string, string> { ["fa"] = "تور استانبول" },
            [destinationId],
            DateTimeOffset.UtcNow));
        catalog.Destinations.Add(new CatalogDestinationSnapshot(
            destinationId,
            "istanbul",
            "City",
            null,
            new Dictionary<string, string> { ["fa"] = "استانبول" }));

        var handler = new GetSitemapQueryHandler(
            catalog,
            new FakeLanguageCatalog(),
            Options.Create(new SeoOptions { PublicBaseUrl = "https://hani.test" }));

        var result = await handler.Handle(new GetSitemapQuery(), CancellationToken.None);

        result.IsSuccess.ShouldBeTrue();
        var xml = result.Value!;
        xml.ShouldContain("https://hani.test/fa/tours/istanbul-tour");
        xml.ShouldContain("https://hani.test/fa/tours/istanbul");
        xml.ShouldContain("hreflang=\"en\"");
    }

    [Fact]
    public async Task Vertical_Landing_Seo_Should_Use_Localized_Labels()
    {
        var catalog = new FakeCatalogReadService();
        catalog.Verticals.Add(new CatalogVerticalSitemapEntry(
            "hotel",
            "grand-hotel",
            DateTimeOffset.UtcNow));
        catalog.Destinations.Add(new CatalogDestinationSnapshot(
            Guid.CreateVersion7(),
            "istanbul",
            "City",
            null,
            new Dictionary<string, string> { ["fa"] = "استانبول", ["en"] = "Istanbul" }));

        var handler = new GetVerticalLandingSeoQueryHandler(
            catalog,
            new FakeLanguageCatalog(),
            Options.Create(new SeoOptions
            {
                PublicBaseUrl = "https://hani.test",
                Labels = new Dictionary<string, Dictionary<string, string>>
                {
                    ["en"] = new()
                    {
                        ["Home"] = "Home",
                        ["Hotels"] = "Hotels",
                        ["VerticalTitle"] = "{0} {1}",
                        ["VerticalDescription"] = "Browse {1} {0} on Hani."
                    }
                }
            }));

        var result = await handler.Handle(
            new GetVerticalLandingSeoQuery("hotel", "istanbul", "en"),
            CancellationToken.None);

        result.IsSuccess.ShouldBeTrue();
        result.Value!.CanonicalUrl.ShouldBe("https://hani.test/en/hotels/istanbul");
        result.Value.Title.ShouldContain("Hotels");
        result.Value.CollectionJsonLd.ShouldContain("CollectionPage");
    }

    [Fact]
    public async Task Vertical_Seo_Should_Build_Hotel_JsonLd_And_Breadcrumbs()
    {
        var catalog = new FakeCatalogReadService();
        catalog.VerticalDetails["hotel:grand-hotel"] = new CatalogVerticalSnapshot(
            "hotel",
            "grand-hotel",
            new Dictionary<string, string> { ["fa"] = "هتل بزرگ", ["en"] = "Grand Hotel" },
            new Dictionary<string, string> { ["en"] = "Central hotel" },
            DateTimeOffset.UtcNow,
            Guid.CreateVersion7(),
            4.5m,
            10,
            [new CatalogFaq("Is parking available?", "Yes.")]);

        var handler = new GetVerticalSeoQueryHandler(
            catalog,
            new FakeLanguageCatalog(),
            Options.Create(new SeoOptions { PublicBaseUrl = "https://hani.test" }));

        var result = await handler.Handle(
            new GetVerticalSeoQuery("hotel", "grand-hotel", "en"),
            CancellationToken.None);

        result.IsSuccess.ShouldBeTrue();
        result.Value!.CanonicalUrl.ShouldBe("https://hani.test/en/hotels/grand-hotel");
        result.Value.Breadcrumbs.Count.ShouldBe(3);
        result.Value.EntityJsonLd.ShouldContain("\"@type\":\"Hotel\"");
        result.Value.EntityJsonLd.ShouldContain("AggregateRating");
        result.Value.EntityJsonLd.ShouldContain("FAQPage");
    }

    [Fact]
    public async Task Sitemap_Should_Include_Vertical_Urls()
    {
        var catalog = new FakeCatalogReadService();
        catalog.Verticals.Add(new CatalogVerticalSitemapEntry(
            "hotel",
            "grand-hotel",
            DateTimeOffset.UtcNow));
        catalog.Verticals.Add(new CatalogVerticalSitemapEntry(
            "flight",
            "thr-mhd",
            DateTimeOffset.UtcNow));

        var handler = new GetSitemapQueryHandler(
            catalog,
            new FakeLanguageCatalog(),
            Options.Create(new SeoOptions { PublicBaseUrl = "https://hani.test" }));

        var result = await handler.Handle(new GetSitemapQuery(), CancellationToken.None);

        result.IsSuccess.ShouldBeTrue();
        var xml = result.Value!;
        xml.ShouldContain("https://hani.test/fa/hotels/grand-hotel");
        xml.ShouldContain("https://hani.test/fa/flights/routes/thr-mhd");
    }

    [Fact]
    public async Task Robots_Should_Point_To_Sitemap_And_Disallow_Filter_Urls()
    {
        var handler = new GetRobotsQueryHandler(
            Options.Create(new SeoOptions { PublicBaseUrl = "https://hani.test" }));

        var result = await handler.Handle(new GetRobotsQuery(), CancellationToken.None);

        result.IsSuccess.ShouldBeTrue();
        var robots = result.Value!;
        robots.ShouldContain("Disallow: /market/v1/search?");
        robots.ShouldContain("Sitemap: https://hani.test/sitemap.xml");
    }
}
