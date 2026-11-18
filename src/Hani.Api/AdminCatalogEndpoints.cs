using Hani.BuildingBlocks.Application;
using Hani.BuildingBlocks.Domain;
using Hani.Modules.Catalog.Application.Commands.CreateHotel;
using Hani.Modules.Catalog.Domain.Hotels;
using Hani.Modules.Catalog.Infrastructure.Persistence;
using Hani.Modules.Catalog.Presentation;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using Microsoft.EntityFrameworkCore;
using IResult = Microsoft.AspNetCore.Http.IResult;

namespace Hani.Api;

/// <summary>
/// Admin catalogue read models. Creation and offer approval remain in the next
/// phase-2 slice.
/// </summary>
public static class AdminCatalogEndpoints
{
    /// <summary>Maps admin catalogue endpoints.</summary>
    public static IEndpointRouteBuilder MapAdminCatalogEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/internal/v1/admin/catalog")
            .WithTags("Internal.Admin.Catalog")
            .RequireAuthorization("Admin");

        group.MapGet("/hotels", ListHotelsAsync)
            .WithName("Internal.ListAdminHotels")
            .Produces<PagedAdminHotelsResponse>();

        group.MapGet("/hotels/{id:guid}", GetHotelAsync)
            .WithName("Internal.GetAdminHotel")
            .Produces<HotelDto>();

        group.MapPut("/hotels/{id:guid}", UpdateHotelAsync)
            .WithName("Internal.UpdateAdminHotel")
            .Produces<HotelDto>();

        group.MapPost("/hotels/{id:guid}/publish", PublishHotelAsync)
            .WithName("Internal.PublishAdminHotel")
            .Produces<HotelDto>();

        return app;
    }

    private static async Task<IResult> GetHotelAsync(
        Guid id,
        CatalogDbContext db,
        CancellationToken cancellationToken)
    {
        var hotel = await LoadHotelAsync(db, id, tracked: false, cancellationToken);
        return hotel is null ? Results.NotFound() : Results.Ok(MapHotel(hotel));
    }

    private static async Task<IResult> UpdateHotelAsync(
        Guid id,
        CreateHotelRequest request,
        CatalogDbContext db,
        IIdGenerator ids,
        CancellationToken cancellationToken)
    {
        var hotel = await LoadHotelAsync(db, id, tracked: true, cancellationToken);
        if (hotel is null) return Results.NotFound();

        var propertyType = Enum.TryParse<HotelPropertyType>(request.PropertyType, true, out var parsedType)
            ? parsedType
            : HotelPropertyType.Hotel;
        var status = Enum.TryParse<HotelStatus>(request.Status, true, out var parsedStatus)
            ? parsedStatus
            : hotel.Status;
        hotel.UpdateDetails(
            request.Slug,
            request.DestinationId,
            request.Stars,
            request.Address,
            request.Latitude,
            request.Longitude,
            propertyType,
            request.ContactPhone,
            request.WebsiteUrl,
            request.CheckInTime,
            request.CheckOutTime,
            status,
            request.SeoTitle,
            request.SeoDescription);
        hotel.ReplaceTranslations(ids, request.Translations.Select(item =>
            new HotelTranslationInput(item.Locale, item.Name, item.Description)));
        hotel.ReplaceAmenities(ids, request.Amenities.Select(item =>
            new HotelAmenityInput(item.Category, item.Name)));
        hotel.ReplaceImages(ids, (request.Images ?? []).Select(item =>
            new HotelImageInput(
                item.Url,
                item.Caption,
                item.SortOrder,
                item.Category,
                item.AltText,
                item.IsCover,
                item.Source,
                item.MediaAssetId)));
        hotel.ReplaceRooms(ids, (request.Rooms ?? []).Select(item =>
            new HotelRoomInput(
                item.Name,
                item.RoomType,
                item.MealPlan,
                item.Adults,
                item.Children,
                item.Price,
                item.Currency,
                item.Description,
                item.SortOrder)));
        await db.SaveChangesAsync(cancellationToken);
        return Results.Ok(MapHotel(hotel));
    }

    private static async Task<IResult> PublishHotelAsync(
        Guid id,
        CatalogDbContext db,
        CancellationToken cancellationToken)
    {
        var hotel = await LoadHotelAsync(db, id, tracked: true, cancellationToken);
        if (hotel is null) return Results.NotFound();
        hotel.Publish();
        await db.SaveChangesAsync(cancellationToken);
        return Results.Ok(MapHotel(hotel));
    }

    private static Task<Hotel?> LoadHotelAsync(
        CatalogDbContext db,
        Guid id,
        bool tracked,
        CancellationToken cancellationToken)
    {
        IQueryable<Hotel> query = db.Hotels
            .Include(item => item.Translations)
            .Include(item => item.Images)
            .Include(item => item.Amenities)
            .Include(item => item.Rooms);
        if (!tracked) query = query.AsNoTracking();
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
        hotel.Translations.Select(item => new HotelTranslationDto(item.Locale, item.Name, item.Description)).ToArray(),
        hotel.Amenities.Select(item => new HotelAmenityDto(item.Category, item.Name)).ToArray(),
        hotel.Images.OrderBy(item => item.SortOrder).Select(item => new HotelImageDto(
            item.Url, item.Caption, item.SortOrder, item.Category, item.AltText,
            item.IsCover, item.Source, item.MediaAssetId)).ToArray(),
        hotel.Rooms.OrderBy(item => item.SortOrder).Select(item => new HotelRoomDto(
            item.Name, item.RoomType, item.MealPlan, item.Adults, item.Children,
            item.Price, item.Currency, item.Description, item.SortOrder)).ToArray(),
        PropertyType: hotel.PropertyType.ToString(),
        ContactPhone: hotel.ContactPhone,
        WebsiteUrl: hotel.WebsiteUrl,
        CheckInTime: hotel.CheckInTime,
        CheckOutTime: hotel.CheckOutTime,
        Status: hotel.Status.ToString(),
        SeoTitle: hotel.SeoTitle,
        SeoDescription: hotel.SeoDescription);

    private static async Task<IResult> ListHotelsAsync(
        [FromQuery] int page,
        [FromQuery] int pageSize,
        [FromQuery] string? q,
        [FromQuery] string? locale,
        ILanguageCatalog languages,
        CatalogDbContext db,
        CancellationToken cancellationToken)
    {
        var normalizedPage = page <= 0 ? 1 : page;
        var normalizedPageSize = pageSize is <= 0 or > 100 ? 20 : pageSize;
        var normalizedLocale = languages.Normalize(locale);
        var query = db.Hotels
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

        return Results.Ok(new PagedAdminHotelsResponse(
            items,
            normalizedPage,
            normalizedPageSize,
            total));
    }
}

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

/// <summary>Paged admin hotel list.</summary>
public sealed record PagedAdminHotelsResponse(
    IReadOnlyList<AdminHotelDto> Items,
    int Page,
    int PageSize,
    int Total);
