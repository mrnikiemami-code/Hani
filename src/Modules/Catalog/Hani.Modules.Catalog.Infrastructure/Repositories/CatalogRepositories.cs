using Hani.Modules.Catalog.Application.Abstractions;
using Hani.Modules.Catalog.Domain.Destinations;
using Hani.Modules.Catalog.Domain.TourProducts;
using Hani.Modules.Catalog.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Hani.Modules.Catalog.Infrastructure.Repositories;

internal sealed class TourProductRepository(CatalogDbContext dbContext) : ITourProductRepository
{
    public async Task AddAsync(TourProduct tourProduct, CancellationToken cancellationToken)
    {
        await dbContext.TourProducts.AddAsync(tourProduct, cancellationToken);
        await dbContext.SaveChangesAsync(cancellationToken);
    }

    public Task<TourProduct?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
        => dbContext.TourProducts
            .FirstOrDefaultAsync(product => product.Id == id, cancellationToken);

    public Task SaveChangesAsync(CancellationToken cancellationToken)
        => dbContext.SaveChangesAsync(cancellationToken);
}

internal sealed class DestinationRepository(CatalogDbContext dbContext) : IDestinationRepository
{
    public async Task AddAsync(Destination destination, CancellationToken cancellationToken)
    {
        await dbContext.Destinations.AddAsync(destination, cancellationToken);
        await dbContext.SaveChangesAsync(cancellationToken);
    }

    public async Task<IReadOnlyCollection<Destination>> GetByIdsAsync(
        IReadOnlyCollection<Guid> ids,
        CancellationToken cancellationToken)
        => await dbContext.Destinations
            .Where(destination => ids.Contains(destination.Id))
            .ToArrayAsync(cancellationToken);
}
