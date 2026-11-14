using Hani.Modules.Catalog.Domain.Destinations;
using Hani.Modules.Catalog.Domain.Hotels;
using Hani.Modules.Catalog.Domain.Places;
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

/// <summary>
/// Persistence abstraction for canonical hotels.
/// </summary>
public interface IHotelRepository
{
    /// <summary>
    /// Adds a hotel and saves changes.
    /// </summary>
    Task AddAsync(Hotel hotel, CancellationToken cancellationToken);

    /// <summary>
    /// Returns a hotel with translations and amenities, or <c>null</c>.
    /// </summary>
    Task<Hotel?> GetBySlugAsync(string slug, CancellationToken cancellationToken);
}

/// <summary>
/// Persistence abstraction for restaurants and attractions.
/// </summary>
public interface IPlaceRepository
{
    /// <summary>
    /// Adds a place and saves changes.
    /// </summary>
    Task AddAsync(Place place, CancellationToken cancellationToken);

    /// <summary>
    /// Returns a place by slug, or <c>null</c>.
    /// </summary>
    Task<Place?> GetBySlugAsync(string slug, CancellationToken cancellationToken);

    /// <summary>
    /// Lists places with coordinates, optionally filtered by type.
    /// </summary>
    Task<IReadOnlyList<Place>> ListAsync(PlaceType? type, CancellationToken cancellationToken);
}
