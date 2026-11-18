using Hani.Modules.Catalog.Application.Commands.CreateHotel;
using Hani.Modules.Catalog.Domain.Hotels;

namespace Hani.Modules.Admin.Application;

/// <summary>Admin hotel list row.</summary>
public sealed record AdminHotelDto(
    Guid Id,
    string Slug,
    int Stars,
    string? Address,
    string Name,
    Guid DestinationId,
    int RoomCount,
    int ImageCount,
    int AmenityCount,
    DateTimeOffset CreatedAt,
    string PropertyType,
    string Status);

/// <summary>Paged admin hotels.</summary>
public sealed record PagedAdminHotelsResponse(
    IReadOnlyList<AdminHotelDto> Items,
    int Page,
    int PageSize,
    int Total);

/// <summary>Admin hotel update input.</summary>
public sealed record AdminHotelUpdateInput(
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
    HotelPropertyType PropertyType,
    string? ContactPhone,
    string? WebsiteUrl,
    string? CheckInTime,
    string? CheckOutTime,
    HotelStatus Status,
    string? SeoTitle,
    string? SeoDescription);

/// <summary>Admin hotel catalog service.</summary>
public interface IAdminCatalogService
{
    Task<PagedAdminHotelsResponse> ListAsync(
        int page,
        int pageSize,
        string? q,
        string? locale,
        CancellationToken cancellationToken);
    Task<HotelDto?> GetAsync(Guid id, CancellationToken cancellationToken);
    Task<HotelDto?> UpdateAsync(
        Guid id,
        AdminHotelUpdateInput input,
        CancellationToken cancellationToken);
    Task<HotelDto?> PublishAsync(Guid id, CancellationToken cancellationToken);
}
