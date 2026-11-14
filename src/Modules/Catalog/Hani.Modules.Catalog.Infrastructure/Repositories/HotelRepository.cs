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
            .FirstOrDefaultAsync(hotel => hotel.Slug == normalizedSlug, cancellationToken);
    }

    public async Task<IReadOnlyList<Hotel>> SearchAsync(
        HotelFilter filter,
        int skip,
        int take,
        CancellationToken cancellationToken)
        => await ApplyFilter(filter)
            .OrderByDescending(hotel => hotel.Stars)
            .ThenBy(hotel => hotel.Slug)
            .Skip(skip)
            .Take(take)
            .ToArrayAsync(cancellationToken);

    public Task<int> CountAsync(HotelFilter filter, CancellationToken cancellationToken)
        => ApplyFilter(filter).CountAsync(cancellationToken);

    public async Task<IReadOnlyList<Hotel>> ListWithCoordinatesAsync(
        CancellationToken cancellationToken)
        => await dbContext.Hotels
            .AsNoTracking()
            .AsSplitQuery()
            .Include(hotel => hotel.Translations)
            .Include(hotel => hotel.Amenities)
            .Include(hotel => hotel.Images)
            .Where(hotel => hotel.Latitude != null && hotel.Longitude != null)
            .ToArrayAsync(cancellationToken);

    private IQueryable<Hotel> ApplyFilter(HotelFilter filter)
    {
        var query = dbContext.Hotels
            .AsNoTracking()
            .AsSplitQuery()
            .Include(hotel => hotel.Translations)
            .Include(hotel => hotel.Amenities)
            .Include(hotel => hotel.Images)
            .AsQueryable();

        if (!string.IsNullOrWhiteSpace(filter.DestinationSlug))
        {
            var slug = filter.DestinationSlug.Trim();
            var destinationIds = dbContext.Destinations
                .Where(destination => destination.Slug == slug)
                .Select(destination => destination.Id);

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
