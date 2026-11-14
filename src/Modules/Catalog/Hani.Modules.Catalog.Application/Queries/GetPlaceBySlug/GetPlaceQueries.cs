using Hani.BuildingBlocks.Application;
using Hani.Modules.Catalog.Application.Commands.CreatePlace;
using Hani.Modules.Catalog.Domain.Places;

namespace Hani.Modules.Catalog.Application.Queries.GetPlaceBySlug;

/// <summary>
/// Query that returns a canonical place by slug.
/// </summary>
public sealed record GetPlaceBySlugQuery(string Slug) : IQuery<PlaceDto>;

/// <summary>
/// Query that returns nearby restaurants or attractions.
/// </summary>
public sealed record GetNearbyPlacesQuery(
    decimal Latitude,
    decimal Longitude,
    PlaceType? Type = null,
    int RadiusKm = 10,
    int Limit = 20) : IQuery<IReadOnlyList<NearbyPlaceDto>>;
