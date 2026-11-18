using System.Net;
using Hani.BuildingBlocks.Domain;
using Hani.Contracts.Catalog;
using Hani.Contracts.Supply;
using Hani.Modules.Catalog.Domain.Destinations;
using Hani.Modules.Catalog.Domain.Hotels;
using Hani.Modules.Catalog.Domain.TourProducts;
using Hani.Modules.Catalog.Infrastructure.Persistence;
using Hani.Modules.Content.Domain.Content;
using Hani.Modules.Content.Infrastructure.Persistence;
using Hani.Modules.Identity.Domain.Agencies;
using Hani.Modules.Identity.Domain.Reviews;
using Hani.Modules.Identity.Infrastructure.Persistence;
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

        var seo = await client.GetAsync($"/market/v1/content/blog/{blogSlug}/seo?locale=en");
        seo.StatusCode.ShouldBe(HttpStatusCode.OK);
        seo.Content.Headers.ContentType!.MediaType.ShouldBe("application/ld+json");

        var related = await client.GetAsync($"/market/v1/content/blog/{blogSlug}/related?locale=en");
        related.StatusCode.ShouldBe(HttpStatusCode.OK);
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

    [Fact]
    public async Task Agency_Directory_And_Profile_Should_Be_Available()
    {
        var suffix = Guid.NewGuid().ToString("N")[..8];
        var slug = $"gate81-agency-{suffix}";
        Guid agencyId;

        using (var scope = fixture.Factory.CreateScope())
        {
            var db = scope.ServiceProvider.GetRequiredService<IdentityDbContext>();
            var agency = Agency.Create(
                fixture.Factory.Ids,
                slug,
                "Gate 8.1 Agency",
                "G81-001",
                "Tehran");
            agencyId = agency.Id;
            await db.Agencies.AddAsync(agency);
            await db.SaveChangesAsync();
        }

        using var client = fixture.Factory.CreateClient();
        var directory = await client.GetStringAsync($"/market/v1/agencies?q={suffix}&pageSize=10");
        directory.ShouldContain(agencyId.ToString());
        directory.ShouldContain("approvedTourCount");

        var profile = await client.GetAsync($"/market/v1/agencies/{slug}/profile");
        profile.StatusCode.ShouldBe(HttpStatusCode.OK);
    }

    [Fact]
    public async Task Home_Criteria_And_Hotel_Sort_Should_Be_Available()
    {
        using var client = fixture.Factory.CreateClient();

        (await client.GetAsync("/market/v1/home?locale=en")).StatusCode.ShouldBe(HttpStatusCode.OK);
        (await client.GetAsync("/market/v1/hotels?sortBy=newest&pageSize=3")).StatusCode.ShouldBe(HttpStatusCode.OK);
        (await client.GetAsync("/market/v1/reviews/criteria?targetType=Hotel&targetId=" +
            Guid.CreateVersion7())).StatusCode.ShouldBe(HttpStatusCode.OK);
    }

    [Fact]
    public async Task Continent_Destination_Should_Filter_Descendant_Hotels()
    {
        var suffix = Guid.NewGuid().ToString("N")[..8];
        var continentSlug = $"continent-{suffix}";
        Guid hotelId;

        using (var scope = fixture.Factory.CreateScope())
        {
            var db = scope.ServiceProvider.GetRequiredService<CatalogDbContext>();
            var continent = Destination.Create(
                fixture.Factory.Ids,
                continentSlug,
                DestinationType.Continent);
            var country = Destination.Create(
                fixture.Factory.Ids,
                $"country-{suffix}",
                DestinationType.Country,
                continent.Id);
            var city = Destination.Create(
                fixture.Factory.Ids,
                $"city-{suffix}",
                DestinationType.City,
                country.Id);
            var hotel = Hotel.Create(
                fixture.Factory.Ids,
                $"gate81-hotel-{suffix}",
                city.Id,
                4);
            hotel.Publish();
            hotelId = hotel.Id;

            await db.Destinations.AddRangeAsync(continent, country, city);
            await db.Hotels.AddAsync(hotel);
            await db.SaveChangesAsync();

            var identity = scope.ServiceProvider.GetRequiredService<IdentityDbContext>();
            var review = Review.Create(
                fixture.Factory.Ids,
                Guid.CreateVersion7(),
                ReviewTargetType.Hotel,
                hotel.Id,
                5,
                null,
                null,
                null,
                null,
                null,
                null,
                "Excellent",
                "Great stay",
                Hani.Modules.Identity.Domain.Reviews.TravelType.Couple,
                null,
                [],
                criteria: new Dictionary<string, int>
                {
                    ["Food"] = 5,
                    ["Cleanliness"] = 5,
                    ["Staff"] = 4,
                    ["Entertainment"] = 4,
                    ["Location"] = 5,
                    ["Value"] = 4
                });
            review.Publish();
            await identity.Reviews.AddAsync(review);
            await identity.SaveChangesAsync();
        }

        using var client = fixture.Factory.CreateClient();
        var body = await client.GetStringAsync(
            $"/market/v1/hotels?destinationSlug={continentSlug}&pageSize=20");
        body.ShouldContain(hotelId.ToString());

        var criteria = await client.GetStringAsync(
            $"/market/v1/reviews/criteria?targetType=Hotel&targetId={hotelId}");
        criteria.ShouldContain("\"Food\":5");
        criteria.ShouldContain("\"ReviewCount\":1");
    }
}
