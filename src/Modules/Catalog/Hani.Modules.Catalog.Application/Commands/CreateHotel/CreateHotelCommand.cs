using Hani.BuildingBlocks.Application;
using Hani.Modules.Catalog.Domain.Hotels;

namespace Hani.Modules.Catalog.Application.Commands.CreateHotel;

/// <summary>
/// Command that creates a canonical hotel with translations and amenities.
/// </summary>
public sealed record CreateHotelCommand(
    string Slug,
    Guid DestinationId,
    int Stars,
    string? Address,
    decimal? Latitude,
    decimal? Longitude,
    IReadOnlyList<HotelTranslationInput> Translations,
    IReadOnlyList<HotelAmenityInput> Amenities) : ICommand<Guid>;

/// <summary>
/// Hotel read model.
/// </summary>
public sealed record HotelDto(
    Guid HotelId,
    string Slug,
    Guid DestinationId,
    int Stars,
    string? Address,
    decimal? Latitude,
    decimal? Longitude,
    IReadOnlyList<HotelTranslationDto> Translations,
    IReadOnlyList<HotelAmenityDto> Amenities);

/// <summary>
/// Hotel translation read model.
/// </summary>
public sealed record HotelTranslationDto(string Locale, string Name, string? Description);

/// <summary>
/// Hotel amenity read model.
/// </summary>
public sealed record HotelAmenityDto(string Category, string Name);
