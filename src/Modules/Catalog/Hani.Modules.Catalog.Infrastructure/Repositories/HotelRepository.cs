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
            .Include(hotel => hotel.Translations)
            .Include(hotel => hotel.Amenities)
            .FirstOrDefaultAsync(hotel => hotel.Slug == normalizedSlug, cancellationToken);
    }
}
