using Hani.Modules.Catalog.Domain.Destinations;
using Hani.Modules.Catalog.Domain.TourProducts;

namespace Hani.Modules.Catalog.Application.Abstractions;

/// <summary>
/// Persistence abstraction for shared tour products.
/// </summary>
public interface ITourProductRepository
{
    /// <summary>
    /// Adds a product and saves changes.
    /// </summary>
    Task AddAsync(TourProduct tourProduct, CancellationToken cancellationToken);

    /// <summary>
    /// Returns a product with translations and destinations, or <c>null</c>.
    /// </summary>
    Task<TourProduct?> GetByIdAsync(Guid id, CancellationToken cancellationToken);

    /// <summary>
    /// Persists pending changes.
    /// </summary>
    Task SaveChangesAsync(CancellationToken cancellationToken);
}

/// <summary>
/// Persistence abstraction for destinations.
/// </summary>
public interface IDestinationRepository
{
    /// <summary>
    /// Adds a destination and saves changes.
    /// </summary>
    Task AddAsync(Destination destination, CancellationToken cancellationToken);

    /// <summary>
    /// Loads destinations by id; missing ids are omitted.
    /// </summary>
    Task<IReadOnlyCollection<Destination>> GetByIdsAsync(
        IReadOnlyCollection<Guid> ids,
        CancellationToken cancellationToken);
}
