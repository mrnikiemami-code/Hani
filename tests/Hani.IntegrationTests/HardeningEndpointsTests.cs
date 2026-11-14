using System.Net;
using Hani.BuildingBlocks.Domain;
using Hani.Contracts.Catalog;
using Hani.Contracts.Supply;
using Hani.Modules.Catalog.Domain.TourProducts;
using Hani.Modules.Catalog.Infrastructure.Persistence;
using Hani.Modules.Content.Domain.Content;
using Hani.Modules.Content.Infrastructure.Persistence;
using Hani.Modules.Supply.Domain.AgencyOffers;
using Hani.Modules.Supply.Domain.Departures;
using Hani.Modules.Supply.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Shouldly;

namespace Hani.IntegrationTests;

/// <summary>
/// Verifies Gate 8 hardening behaviour against PostgreSQL and the real HTTP pipeline.
/// </summary>
public sealed class HardeningEndpointsTests(PostgresFixture fixture)
    : IClassFixture<PostgresFixture>
{
    private static readonly System.Text.Json.JsonSerializerOptions JsonOptions = new()
    {
        PropertyNameCaseInsensitive = true
    };

    [Fact]
    public async Task Ready_Health_Should_Be_Healthy_And_Set_Security_Headers()
    {
        using var client = fixture.Factory.CreateClient();

        var response = await client.GetAsync("/health/ready");

        response.StatusCode.ShouldBe(HttpStatusCode.OK);
        response.Headers.GetValues("X-Content-Type-Options").Single().ShouldBe("nosniff");
        response.Headers.GetValues("X-Frame-Options").Single().ShouldBe("DENY");
        response.Headers.GetValues("Content-Security-Policy").Single()
            .ShouldBe("default-src 'none'; frame-ancestors 'none'");
    }

    [Fact]
    public async Task Content_Sitemap_Should_Include_Published_Editorial_Content()
    {
        var suffix = Guid.NewGuid().ToString("N")[..8];
        var blogSlug = $"gate8-content-sitemap-{suffix}";
        using (var scope = fixture.Factory.CreateScope())
        {
            var db = scope.ServiceProvider.GetRequiredService<ContentDbContext>();
            var post = BlogPost.Create(
                fixture.Factory.Ids,
                blogSlug,
                Guid.CreateVersion7());
            post.AddTranslation(
                fixture.Factory.Ids,
                "en",
                "Gate 8 content",
                "Sitemap coverage",
                "Published content must appear in the sitemap.");
            post.Publish();
            await db.BlogPosts.AddAsync(post);
            await db.SaveChangesAsync();
        }

        using var client = fixture.Factory.CreateClient();
        var xml = await client.GetStringAsync("/content-sitemap.xml");

        xml.ShouldContain($"<loc>https://hani.test/fa/blog/{blogSlug}</loc>");
        xml.ShouldContain("hreflang=\"en\"");
        xml.ShouldContain("hreflang=\"ar\"");
    }

    [Fact]
    public async Task Search_Should_Use_Batched_Offers_And_Return_Seeded_Product()
    {
        var agencyId = Guid.CreateVersion7();
        var suffix = Guid.NewGuid().ToString("N")[..8];
        var destinationSlug = $"gate8-destination-{suffix}";
        var productSlug = $"gate8-search-{suffix}";
        var productTitle = $"Gate 8 Search Product {suffix}";
        Guid productId;

        using (var scope = fixture.Factory.CreateScope())
        {
            var catalog = scope.ServiceProvider.GetRequiredService<CatalogDbContext>();
            var destination = Hani.Modules.Catalog.Domain.Destinations.Destination.Create(
                fixture.Factory.Ids,
                destinationSlug,
                Hani.Modules.Catalog.Domain.Destinations.DestinationType.City);
            destination.AddTranslation(fixture.Factory.Ids, "en", "Gate 8 Destination");
            await catalog.Destinations.AddAsync(destination);

            var product = TourProduct.Create(
                fixture.Factory.Ids,
                productSlug,
                5,
                "city-break");
            productId = product.Id;
            product.AddDestination(fixture.Factory.Ids, destination);
            product.AddTranslation(
                fixture.Factory.Ids,
                "en",
                productTitle,
                "Read model verification",
                "Used by integration tests.");
            product.Publish(fixture.Factory.Ids);
            await catalog.TourProducts.AddAsync(product);
            await catalog.SaveChangesAsync();

            var supply = scope.ServiceProvider.GetRequiredService<SupplyDbContext>();
            var offer = AgencyOffer.Create(
                fixture.Factory.Ids,
                agencyId,
                productId,
                "Gate 8 Offer",
                Money.Of(12_000_000m, "IRR"));
            offer.SubmitForReview();
            offer.Approve();
            await supply.AgencyOffers.AddAsync(offer);

            var departure = TourDeparture.Create(
                fixture.Factory.Ids,
                offer.Id,
                new DateOnly(2026, 12, 1),
                new DateOnly(2026, 12, 6),
                10,
                [(RoomType.Double, Money.Of(12_000_000m, "IRR"))]);
            await supply.TourDepartures.AddAsync(departure);
            await supply.SaveChangesAsync();
        }

        using var client = fixture.Factory.CreateClient();

        using (var scope = fixture.Factory.CreateScope())
        {
            var catalogRead = scope.ServiceProvider.GetRequiredService<ICatalogReadService>();
            var direct = await catalogRead.SearchPublishedAsync(
                new CatalogProductFilter(SearchTerm: suffix),
                0,
                10,
                CancellationToken.None);
            direct.Count.ShouldBe(1);

            var offerRead = scope.ServiceProvider.GetRequiredService<IOfferReadService>();
            var directOffers = await offerRead.GetApprovedOffersByProductIdsAsync(
                [productId],
                CancellationToken.None);
            directOffers.ShouldContainKey(productId);
            directOffers[productId].Count.ShouldBe(1);
        }

        var response = await client.GetAsync(
            "/market/v1/search?locale=en&page=1&pageSize=20");
        var body = await response.Content.ReadAsStringAsync();
        response.StatusCode.ShouldBe(HttpStatusCode.OK, body);
        var result = System.Text.Json.JsonSerializer.Deserialize<SearchResponse>(
            body,
            JsonOptions);

        result.ShouldNotBeNull();
        result.TotalCount.ShouldBe(1);
        result.Items.Single().ProductId.ShouldBe(productId);
        result.Items.Single().Title.ShouldBe(productTitle);
        result.Items.Single().OfferCount.ShouldBe(1);
    }

    private sealed record SearchResponse(
        IReadOnlyList<SearchItem> Items,
        int Page,
        int PageSize,
        int TotalCount);

    private sealed record SearchItem(
        Guid ProductId,
        string Slug,
        string Title,
        int OfferCount);
}
