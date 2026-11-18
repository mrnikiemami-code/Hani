using Hani.Modules.Admin.Application;

namespace Hani.Api;

/// <summary>Public hotel filter facets endpoint.</summary>
public static class HotelFacetEndpoints
{
    /// <summary>Maps the hotel facet endpoint.</summary>
    public static IEndpointRouteBuilder MapHotelFacetEndpoints(this IEndpointRouteBuilder app)
    {
        app.MapGet("/market/v1/hotels/facets", GetAsync)
            .WithTags("Marketplace.Catalog")
            .WithName("Marketplace.GetHotelFacets")
            .Produces<HotelFacetsDto>();
        return app;
    }

    private static async Task<IResult> GetAsync(
        IHotelFacetService facets,
        CancellationToken cancellationToken)
        => Results.Ok(await facets.GetFacetsAsync(cancellationToken));
}
