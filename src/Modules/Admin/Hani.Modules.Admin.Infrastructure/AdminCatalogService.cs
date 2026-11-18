using Hani.Modules.Admin.Application;
using Hani.Modules.Catalog.Application.Commands.CreateHotel;
using Hani.Modules.Catalog.Domain.Hotels;
using Microsoft.EntityFrameworkCore;

namespace Hani.Modules.Admin.Infrastructure;

internal sealed partial class AdminService : IAdminCatalogService
{
    public async Task<PagedAdminHotelsResponse> ListAsync(
        int page,
        int pageSize,
        string? q,
        string? locale,
        CancellationToken cancellationToken)
    {
        var normalizedPage = page <= 0 ? 1 : page;
        var normalizedPageSize = pageSize is <= 0 or > 100 ? 20 : pageSize;
        var normalizedLocale = languages.Normalize(locale);
        var query = catalog.Hotels
            .AsNoTracking()
            .Include(item => item.Translations)
            .Include(item => item.Rooms)
            .Include(item => item.Images)
            .Include(item => item.Amenities)
            .AsQueryable();

        if (!string.IsNullOrWhiteSpace(q))
        {
            var term = q.Trim();
            query = query.Where(item =>
                EF.Functions.ILike(item.Slug, $"%{term}%") ||
                item.Translations.Any(translation =>
                    EF.Functions.ILike(translation.Name, $"%{term}%")));
        }

        var total = await query.CountAsync(cancellationToken);
        var hotels = await query
            .OrderByDescending(item => item.CreatedAt)
            .Skip((normalizedPage - 1) * normalizedPageSize)
            .Take(normalizedPageSize)
            .ToArrayAsync(cancellationToken);

        var items = hotels.Select(item => new AdminHotelDto(
            item.Id,
            item.Slug,
            item.Stars,
            item.Address,
            item.Translations
                .FirstOrDefault(translation => translation.Locale == normalizedLocale)
                ?.Name
                ?? item.Translations.FirstOrDefault()?.Name
                ?? item.Slug,
            item.DestinationId,
            item.Rooms.Count,
            item.Images.Count,
            item.Amenities.Count,
            item.CreatedAt,
            item.PropertyType.ToString(),
            item.Status.ToString())).ToArray();

        return new PagedAdminHotelsResponse(
            items,
            normalizedPage,
            normalizedPageSize,
            total);
    }

    public async Task<HotelDto?> GetAsync(Guid id, CancellationToken cancellationToken)
    {
        var hotel = await LoadHotelAsync(id, tracked: false, cancellationToken);
        return hotel is null ? null : MapHotel(hotel);
    }

    public async Task<HotelDto?> UpdateAsync(
        Guid id,
        AdminHotelUpdateInput input,
        CancellationToken cancellationToken)
    {
        var hotel = await LoadHotelAsync(id, tracked: true, cancellationToken);
        if (hotel is null)
        {
            return null;
        }

        hotel.UpdateDetails(
            input.Slug,
            input.DestinationId,
            input.Stars,
            input.Address,
            input.Latitude,
            input.Longitude,
            input.PropertyType,
            input.ContactPhone,
            input.WebsiteUrl,
            input.CheckInTime,
            input.CheckOutTime,
            input.Status,
            input.SeoTitle,
            input.SeoDescription);
        hotel.ReplaceTranslations(ids, input.Translations);
        hotel.ReplaceAmenities(ids, input.Amenities);
        hotel.ReplaceImages(ids, input.Images);
        hotel.ReplaceRooms(ids, input.Rooms);
        await catalog.SaveChangesAsync(cancellationToken);
        return MapHotel(hotel);
    }

    public async Task<HotelDto?> PublishAsync(Guid id, CancellationToken cancellationToken)
    {
        var hotel = await LoadHotelAsync(id, tracked: true, cancellationToken);
        if (hotel is null)
        {
            return null;
        }

        hotel.Publish();
        await catalog.SaveChangesAsync(cancellationToken);
        return MapHotel(hotel);
    }

    private Task<Hotel?> LoadHotelAsync(
        Guid id,
        bool tracked,
        CancellationToken cancellationToken)
    {
        IQueryable<Hotel> query = catalog.Hotels
            .Include(item => item.Translations)
            .Include(item => item.Images)
            .Include(item => item.Amenities)
            .Include(item => item.Rooms);
        if (!tracked)
        {
            query = query.AsNoTracking();
        }

        return query.FirstOrDefaultAsync(item => item.Id == id, cancellationToken);
    }

    private static HotelDto MapHotel(Hotel hotel) => new(
        hotel.Id,
        hotel.Slug,
        hotel.DestinationId,
        hotel.Stars,
        hotel.Address,
        hotel.Latitude,
        hotel.Longitude,
        hotel.Translations.Select(item => new HotelTranslationDto(
            item.Locale, item.Name, item.Description, item.Policies)).ToArray(),
        hotel.Amenities
            .OrderBy(item => item.SortOrder)
            .Select(item => new HotelAmenityDto(
                item.Category, item.Name, item.Code, item.Icon, item.SortOrder))
            .ToArray(),
        hotel.Images.OrderBy(item => item.SortOrder).Select(item => new HotelImageDto(
            item.Url, item.Caption, item.SortOrder, item.Category, item.AltText,
            item.IsCover, item.Source, item.MediaAssetId)).ToArray(),
        hotel.Rooms.OrderBy(item => item.SortOrder).Select(item => new HotelRoomDto(
            item.Name, item.RoomType, item.MealPlan, item.Adults, item.Children,
            item.Price, item.Currency, item.Description, item.SortOrder,
            item.Inventory, item.MaxOccupancy, item.RoomSize, item.BedType,
            item.View, item.RatePlan, item.CancellationPolicy, item.TaxPercent,
            item.StopSell)).ToArray(),
        PropertyType: hotel.PropertyType.ToString(),
        ContactPhone: hotel.ContactPhone,
        WebsiteUrl: hotel.WebsiteUrl,
        CheckInTime: hotel.CheckInTime,
        CheckOutTime: hotel.CheckOutTime,
        Status: hotel.Status.ToString(),
        SeoTitle: hotel.SeoTitle,
        SeoDescription: hotel.SeoDescription);
}
