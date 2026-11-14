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
            .Include(place => place.Translations)
            .Include(place => place.Amenities)
            .FirstOrDefaultAsync(place => place.Slug == normalizedSlug, cancellationToken);
    }

    public async Task<IReadOnlyList<Place>> ListAsync(
        PlaceType? type,
        CancellationToken cancellationToken)
    {
        var query = dbContext.Places
            .AsNoTracking()
            .Include(place => place.Translations)
            .Include(place => place.Amenities)
            .AsQueryable();

        if (type is not null)
        {
            query = query.Where(place => place.Type == type);
        }

        return await query.ToArrayAsync(cancellationToken);
    }
}
