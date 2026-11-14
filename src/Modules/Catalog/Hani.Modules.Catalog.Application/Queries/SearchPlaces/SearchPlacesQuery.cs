using Hani.BuildingBlocks.Application;
using Hani.Modules.Catalog.Domain.Places;

namespace Hani.Modules.Catalog.Application.Queries.SearchPlaces;

/// <summary>
/// Query that searches restaurants or attractions.
/// </summary>
public sealed record SearchPlacesQuery(
    string? Locale,
    PlaceType? Type = null,
    string? DestinationSlug = null,
    string? Category = null,
    string? Cuisine = null,
    string? PriceBand = null,
    string? Amenity = null,
    bool? Reservable = null,
    bool? OnlineReservable = null,
    string? Q = null,
    int Page = 1,
    int PageSize = 20,
    string? SortBy = null) : IQuery<PagedResult<PlaceSummaryDto>>;

/// <summary>
/// Place summary read model.
/// </summary>
public sealed record PlaceSummaryDto(
    Guid PlaceId,
    string Slug,
    string Type,
    string Category,
    string? Cuisine,
    string? PriceBand,
    bool Reservable,
    bool OnlineReservable,
    decimal? Latitude,
    decimal? Longitude,
    string Name,
    int AmenityCount,
    decimal? AverageRating = null,
    int ReviewCount = 0);
