using Hani.BuildingBlocks.Application;

namespace Hani.Modules.Catalog.Application.Queries.GetGeoNearby;

/// <summary>
/// Query that returns hotels and places within a radius of a coordinate.
/// </summary>
public sealed record GetGeoNearbyQuery(
    decimal Latitude,
    decimal Longitude,
    int RadiusKm = 10,
    int Limit = 20,
    string? Type = null) : IQuery<IReadOnlyList<GeoNearbyItemDto>>;

/// <summary>
/// Unified nearby item for map and geo landing surfaces.
/// </summary>
public sealed record GeoNearbyItemDto(
    string Type,
    Guid Id,
    string Slug,
    string Name,
    decimal Latitude,
    decimal Longitude,
    double DistanceKm);
