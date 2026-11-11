using Hani.Modules.Catalog.Domain.Destinations;
using Hani.Modules.Catalog.Domain.TourProducts;

namespace Hani.Modules.Catalog.Application.Abstractions;

public interface ITourProductRepository
{
    Task AddAsync(TourProduct tourProduct, CancellationToken cancellationToken);

    Task<TourProduct?> GetByIdAsync(Guid id, CancellationToken cancellationToken);

    Task SaveChangesAsync(CancellationToken cancellationToken);
}

public interface IDestinationRepository
{
    Task AddAsync(Destination destination, CancellationToken cancellationToken);

    Task<IReadOnlyCollection<Destination>> GetByIdsAsync(
        IReadOnlyCollection<Guid> ids,
        CancellationToken cancellationToken);
}
