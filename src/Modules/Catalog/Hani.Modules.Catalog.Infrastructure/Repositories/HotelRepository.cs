using Hani.Modules.Catalog.Application.Abstractions;
using Hani.Modules.Catalog.Domain.Hotels;
using Hani.Modules.Catalog.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Hani.Modules.Catalog.Infrastructure.Repositories;

internal sealed class HotelRepository(CatalogDbContext dbContext) : IHotelRepository
{
    public async Task AddAsync(Hotel hotel, CancellationToken cancellationToken)
    {
        await dbContext.Hotels.AddAsync(hotel, cancellationToken);
        await dbContext.SaveChangesAsync(cancellationToken);
    }

    public Task<Hotel?> GetBySlugAsync(string slug, CancellationToken cancellationToken)
    {
        var normalizedSlug = slug.Trim().ToLowerInvariant();

        return dbContext.Hotels
            .AsNoTracking()
            .AsSplitQuery()
            .Include(hotel => hotel.Translations)
            .Include(hotel => hotel.Amenities)
            .Include(hotel => hotel.Images)
            .Include(hotel => hotel.Rooms)
            .FirstOrDefaultAsync(
                hotel => hotel.Slug == normalizedSlug && hotel.Status == HotelStatus.Published,
                cancellationToken);
    }

    public async Task<IReadOnlyList<Hotel>> SearchAsync(
        HotelFilter filter,
        int skip,
        int take,
        CancellationToken cancellationToken)
    {
        var destinationIds = await ResolveDestinationIdsAsync(
            filter.DestinationSlug,
            cancellationToken);
        return await ApplyFilter(filter, destinationIds)
            .OrderByDescending(hotel => hotel.Stars)
            .ThenBy(hotel => hotel.Slug)
            .Skip(skip)
            .Take(take)
            .ToArrayAsync(cancellationToken);
    }

    public async Task<int> CountAsync(HotelFilter filter, CancellationToken cancellationToken)
    {
        var destinationIds = await ResolveDestinationIdsAsync(
            filter.DestinationSlug,
            cancellationToken);
        return await ApplyFilter(filter, destinationIds).CountAsync(cancellationToken);
    }

    public async Task<IReadOnlyList<Hotel>> ListWithCoordinatesAsync(
        CancellationToken cancellationToken)
        => await dbContext.Hotels
            .AsNoTracking()
            .AsSplitQuery()
            .Include(hotel => hotel.Translations)
            .Include(hotel => hotel.Amenities)
            .Include(hotel => hotel.Images)
            .Include(hotel => hotel.Rooms)
            .Where(hotel => hotel.Status == HotelStatus.Published &&
                hotel.Latitude != null && hotel.Longitude != null)
            .ToArrayAsync(cancellationToken);

    public async Task<IReadOnlyList<Hotel>> ListByDestinationAsync(
        Guid destinationId,
        CancellationToken cancellationToken)
        => await dbContext.Hotels
            .AsNoTracking()
            .Where(hotel => hotel.DestinationId == destinationId &&
                hotel.Status == HotelStatus.Published)
            .ToArrayAsync(cancellationToken);

    public async Task<IReadOnlyList<Hotel>> ListByDestinationsAsync(
        IReadOnlyCollection<Guid> destinationIds,
        CancellationToken cancellationToken)
    {
        if (destinationIds.Count == 0)
        {
            return [];
        }

        var ids = destinationIds.Distinct().ToArray();
        return await dbContext.Hotels
            .AsNoTracking()
            .Where(hotel => ids.Contains(hotel.DestinationId) &&
                hotel.Status == HotelStatus.Published)
            .ToArrayAsync(cancellationToken);
    }

    private async Task<IReadOnlyCollection<Guid>?> ResolveDestinationIdsAsync(
        string? slug,
        CancellationToken cancellationToken)
    {
        if (string.IsNullOrWhiteSpace(slug))
        {
            return null;
        }

        return await DestinationHierarchy.ResolveIdsAsync(dbContext, slug, cancellationToken);
    }

    private IQueryable<Hotel> ApplyFilter(
        HotelFilter filter,
        IReadOnlyCollection<Guid>? destinationIds)
    {
        var query = dbContext.Hotels
            .AsNoTracking()
            .AsSplitQuery()
            .Include(hotel => hotel.Translations)
            .Include(hotel => hotel.Amenities)
            .Include(hotel => hotel.Images)
            .Include(hotel => hotel.Rooms)
            .Where(hotel => hotel.Status == HotelStatus.Published)
            .AsQueryable();

        if (destinationIds is not null)
        {
            query = query.Where(hotel => destinationIds.Contains(hotel.DestinationId));
        }

        if (filter.MinStars is { } minStars)
        {
            query = query.Where(hotel => hotel.Stars >= minStars);
        }

        if (!string.IsNullOrWhiteSpace(filter.Amenity))
        {
            var amenity = filter.Amenity.Trim();
            query = query.Where(hotel => hotel.Amenities.Any(item => item.Name == amenity));
        }

        if (!string.IsNullOrWhiteSpace(filter.SearchTerm))
        {
            var term = filter.SearchTerm.Trim();
            query = query.Where(hotel =>
                hotel.Slug.Contains(term) ||
                hotel.Translations.Any(translation => translation.Name.Contains(term)));
        }

        return query;
    }
}
