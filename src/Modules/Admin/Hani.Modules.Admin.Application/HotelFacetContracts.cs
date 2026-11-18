namespace Hani.Modules.Admin.Application;

/// <summary>Public hotel filter facets.</summary>
public sealed record HotelFacetsDto(
    int Total,
    IReadOnlyList<HotelStarFacet> Stars,
    IReadOnlyList<HotelAmenityFacet> Amenities);

/// <summary>Hotel count by star.</summary>
public sealed record HotelStarFacet(int Stars, int Count);

/// <summary>Amenity facet with matching hotel count.</summary>
public sealed record HotelAmenityFacet(
    string Category,
    string Code,
    string Name,
    int Count);

/// <summary>Hotel facet read service.</summary>
public interface IHotelFacetService
{
    /// <summary>Returns published hotel facets.</summary>
    Task<HotelFacetsDto> GetFacetsAsync(CancellationToken cancellationToken);
}
