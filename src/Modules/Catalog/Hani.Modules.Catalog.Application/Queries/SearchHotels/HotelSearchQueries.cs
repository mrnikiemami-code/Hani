using Hani.BuildingBlocks.Application;

namespace Hani.Modules.Catalog.Application.Queries.SearchHotels;

/// <summary>
/// Query that searches canonical hotels.
/// </summary>
public sealed record SearchHotelsQuery(
    string? Locale,
    string? DestinationSlug = null,
    int? MinStars = null,
    string? Amenity = null,
    string? Q = null,
    int Page = 1,
    int PageSize = 20,
    string? SortBy = null) : IQuery<PagedResult<HotelSummaryDto>>;

/// <summary>
/// Query that returns hotels near a coordinate.
/// </summary>
public sealed record GetNearbyHotelsQuery(
    decimal Latitude,
    decimal Longitude,
    int RadiusKm = 10,
    int Limit = 20) : IQuery<IReadOnlyList<NearbyHotelDto>>;

/// <summary>
/// Hotel summary read model.
/// </summary>
public sealed record HotelSummaryDto(
    Guid HotelId,
    string Slug,
    int Stars,
    string? Address,
    decimal? Latitude,
    decimal? Longitude,
    string Name,
    int AmenityCount,
    decimal? AverageRating = null,
    int ReviewCount = 0);

/// <summary>
/// Nearby hotel result with distance in kilometres.
/// </summary>
public sealed record NearbyHotelDto(HotelSummaryDto Hotel, double DistanceKm);
