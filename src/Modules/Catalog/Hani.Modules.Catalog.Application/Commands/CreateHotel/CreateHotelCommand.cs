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
    IReadOnlyList<HotelAmenityInput> Amenities,
    IReadOnlyList<HotelImageInput> Images,
    IReadOnlyList<HotelRoomInput> Rooms,
    string? PropertyType = null,
    string? ContactPhone = null,
    string? WebsiteUrl = null,
    string? CheckInTime = null,
    string? CheckOutTime = null,
    string? SeoTitle = null,
    string? SeoDescription = null,
    string? Status = null) : ICommand<Guid>;

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
    IReadOnlyList<HotelAmenityDto> Amenities,
    IReadOnlyList<HotelImageDto> Images,
    IReadOnlyList<HotelRoomDto> Rooms,
    decimal? AverageRating = null,
    int ReviewCount = 0,
    decimal? RecommendationPercent = null,
    int? RankInCity = null,
    IReadOnlyList<string>? UserPhotos = null,
    string? PropertyType = null,
    string? ContactPhone = null,
    string? WebsiteUrl = null,
    string? CheckInTime = null,
    string? CheckOutTime = null,
    string? Status = null,
    string? SeoTitle = null,
    string? SeoDescription = null);

/// <summary>
/// Hotel translation read model.
/// </summary>
public sealed record HotelTranslationDto(string Locale, string Name, string? Description);

/// <summary>
/// Hotel amenity read model.
/// </summary>
public sealed record HotelAmenityDto(string Category, string Name);

/// <summary>
/// Hotel gallery image read model.
/// </summary>
public sealed record HotelImageDto(
    string Url,
    string? Caption,
    int SortOrder,
    string? Category = null,
    string? AltText = null,
    bool IsCover = false,
    string? Source = null,
    Guid? MediaAssetId = null);

/// <summary>
/// Hotel room read model.
/// </summary>
public sealed record HotelRoomDto(
    string Name,
    string RoomType,
    string MealPlan,
    int Adults,
    int Children,
    decimal Price,
    string Currency,
    string? Description,
    int SortOrder);
