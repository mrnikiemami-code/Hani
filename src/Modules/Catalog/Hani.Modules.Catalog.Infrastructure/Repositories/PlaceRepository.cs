using Hani.Modules.Catalog.Application.Abstractions;
using Hani.Modules.Catalog.Domain.Places;
using Hani.Modules.Catalog.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Hani.Modules.Catalog.Infrastructure.Repositories;

internal sealed class PlaceRepository(CatalogDbContext dbContext) : IPlaceRepository
{
    public async Task AddAsync(Place place, CancellationToken cancellationToken)
    {
        await dbContext.Places.AddAsync(place, cancellationToken);
        await dbContext.SaveChangesAsync(cancellationToken);
    }

    public Task<Place?> GetBySlugAsync(string slug, CancellationToken cancellationToken)
    {
        var normalizedSlug = slug.Trim().ToLowerInvariant();

        return dbContext.Places
            .AsNoTracking()
            .AsSplitQuery()
            .Include(place => place.Translations)
            .Include(place => place.Amenities)
            .Include(place => place.MenuItems)
            .FirstOrDefaultAsync(place => place.Slug == normalizedSlug, cancellationToken);
    }

    public async Task<IReadOnlyList<Place>> ListAsync(
        PlaceType? type,
        CancellationToken cancellationToken)
    {
        var query = dbContext.Places
            .AsNoTracking()
            .AsSplitQuery()
            .Include(place => place.Translations)
            .Include(place => place.Amenities)
            .Include(place => place.MenuItems)
            .AsQueryable();

        if (type is not null)
        {
            query = query.Where(place => place.Type == type);
        }

        return await query.ToArrayAsync(cancellationToken);
    }

    public async Task<IReadOnlyList<Place>> SearchAsync(
        PlaceFilter filter,
        int skip,
        int take,
        CancellationToken cancellationToken)
        => await ApplyFilter(filter)
            .OrderBy(place => place.Category)
            .ThenBy(place => place.Slug)
            .Skip(skip)
            .Take(take)
            .ToArrayAsync(cancellationToken);

    public Task<int> CountAsync(PlaceFilter filter, CancellationToken cancellationToken)
        => ApplyFilter(filter).CountAsync(cancellationToken);

    private IQueryable<Place> ApplyFilter(PlaceFilter filter)
    {
        var query = dbContext.Places
            .AsNoTracking()
            .AsSplitQuery()
            .Include(place => place.Translations)
            .Include(place => place.Amenities)
            .AsQueryable();

        if (filter.Type is not null)
        {
            query = query.Where(place => place.Type == filter.Type);
        }

        if (!string.IsNullOrWhiteSpace(filter.DestinationSlug))
        {
            var slug = filter.DestinationSlug.Trim();
            var destinationIds = dbContext.Destinations
                .Where(destination => destination.Slug == slug)
                .Select(destination => destination.Id);

            query = query.Where(place => destinationIds.Contains(place.DestinationId));
        }

        if (!string.IsNullOrWhiteSpace(filter.Category))
        {
            var category = filter.Category.Trim();
            query = query.Where(place => place.Category == category);
        }

        if (!string.IsNullOrWhiteSpace(filter.Cuisine))
        {
            var cuisine = filter.Cuisine.Trim();
            query = query.Where(place => place.Cuisine == cuisine);
        }

        if (!string.IsNullOrWhiteSpace(filter.PriceBand))
        {
            var priceBand = filter.PriceBand.Trim();
            query = query.Where(place => place.PriceBand == priceBand);
        }

        if (!string.IsNullOrWhiteSpace(filter.Amenity))
        {
            var amenity = filter.Amenity.Trim();
            query = query.Where(place => place.Amenities.Any(item => item.Name == amenity));
        }

        if (filter.Reservable is { } reservable)
        {
            query = query.Where(place => place.Reservable == reservable);
        }

        if (filter.OnlineReservable is { } onlineReservable)
        {
            query = query.Where(place => place.OnlineReservable == onlineReservable);
        }

        if (!string.IsNullOrWhiteSpace(filter.SearchTerm))
        {
            var term = filter.SearchTerm.Trim();
            query = query.Where(place =>
                place.Slug.Contains(term) ||
                place.Translations.Any(translation => translation.Name.Contains(term)));
        }

        return query;
    }
}
