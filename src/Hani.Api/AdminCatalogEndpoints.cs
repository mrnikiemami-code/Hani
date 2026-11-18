using Hani.BuildingBlocks.Application;
using Hani.Modules.Catalog.Infrastructure.Persistence;
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

        return app;
    }

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
            item.CreatedAt)).ToArray();

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
    DateTimeOffset CreatedAt);

/// <summary>Paged admin hotel list.</summary>
public sealed record PagedAdminHotelsResponse(
    IReadOnlyList<AdminHotelDto> Items,
    int Page,
    int PageSize,
    int Total);
