using Hani.BuildingBlocks.Application;
using Hani.Modules.Catalog.Domain.Places;

namespace Hani.Modules.Catalog.Application.Commands.CreatePlace;

/// <summary>
/// Command that creates a canonical restaurant or attraction.
/// </summary>
public sealed record CreatePlaceCommand(
    string Slug,
    PlaceType Type,
    Guid DestinationId,
    string Category,
    string? Cuisine,
    string? PriceBand,
    bool Reservable,
    bool OnlineReservable,
    decimal? Latitude,
    decimal? Longitude,
    IReadOnlyList<PlaceTranslationInput> Translations,
    IReadOnlyList<string> Amenities) : ICommand<Guid>;

/// <summary>
/// Place read model.
/// </summary>
public sealed record PlaceDto(
    Guid PlaceId,
    string Slug,
    string Type,
    Guid DestinationId,
    string Category,
    string? Cuisine,
    string? PriceBand,
    bool Reservable,
    bool OnlineReservable,
    decimal? Latitude,
    decimal? Longitude,
    IReadOnlyList<PlaceTranslationDto> Translations,
    IReadOnlyList<string> Amenities);

/// <summary>
/// Place translation read model.
/// </summary>
public sealed record PlaceTranslationDto(string Locale, string Name, string? Description);

/// <summary>
/// Nearby place result with distance in kilometres.
/// </summary>
public sealed record NearbyPlaceDto(PlaceDto Place, double DistanceKm);
