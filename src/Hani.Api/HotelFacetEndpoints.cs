using Hani.Modules.Catalog.Domain.Hotels;
using Hani.Modules.Catalog.Infrastructure.Persistence;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using Microsoft.EntityFrameworkCore;
using IResult = Microsoft.AspNetCore.Http.IResult;

namespace Hani.Api;

/// <summary>
/// Public hotel filter facets with counts for the Lastsecond-style sidebar.
/// </summary>
public static class HotelFacetEndpoints
{
    public static IEndpointRouteBuilder MapHotelFacetEndpoints(this IEndpointRouteBuilder app)
    {
        app.MapGet("/market/v1/hotels/facets", GetAsync)
            .WithTags("Marketplace.Catalog")
            .WithName("Marketplace.GetHotelFacets")
            .Produces<HotelFacetsDto>();
        return app;
    }

    private static async Task<IResult> GetAsync(
        CatalogDbContext db,
        CancellationToken cancellationToken)
    {
        var hotels = await db.Hotels
            .AsNoTracking()
            .Include(hotel => hotel.Amenities)
            .Where(hotel => hotel.Status == HotelStatus.Published)
            .ToArrayAsync(cancellationToken);

        var stars = Enumerable.Range(1, 5)
            .Select(star => new HotelStarFacet(star, hotels.Count(hotel => hotel.Stars == star)))
            .ToArray();
        var amenities = hotels
            .SelectMany(hotel => hotel.Amenities)
            .GroupBy(amenity => new
            {
                amenity.Category,
                amenity.Code,
                amenity.Name
            })
            .Select(group => new HotelAmenityFacet(
                group.Key.Category,
                group.Key.Code,
                group.Key.Name,
                group.Select(item => item.HotelId).Distinct().Count()))
            .OrderBy(item => item.Category)
            .ThenByDescending(item => item.Count)
            .ThenBy(item => item.Name)
            .ToArray();

        return Results.Ok(new HotelFacetsDto(hotels.Length, stars, amenities));
    }
}

/// <summary>Public hotel filter facets with counts.</summary>
public sealed record HotelFacetsDto(
    int Total,
    IReadOnlyList<HotelStarFacet> Stars,
    IReadOnlyList<HotelAmenityFacet> Amenities);

/// <summary>Hotel count for one star level.</summary>
public sealed record HotelStarFacet(int Stars, int Count);

/// <summary>Amenity facet with matching published hotel count.</summary>
public sealed record HotelAmenityFacet(
    string Category,
    string Code,
    string Name,
    int Count);
