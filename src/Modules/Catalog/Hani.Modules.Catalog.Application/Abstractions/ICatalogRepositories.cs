using Hani.Modules.Catalog.Domain.Destinations;
using Hani.Modules.Catalog.Domain.Flights;
using Hani.Modules.Catalog.Domain.Hotels;
using Hani.Modules.Catalog.Domain.Places;
using Hani.Modules.Catalog.Domain.TourProducts;
using Hani.Modules.Catalog.Domain.Visas;

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

    /// <summary>
    /// Searches hotels with structural filters.
    /// </summary>
    Task<IReadOnlyList<Hotel>> SearchAsync(
        HotelFilter filter,
        int skip,
        int take,
        CancellationToken cancellationToken);

    /// <summary>
    /// Counts hotels matching the filter.
    /// </summary>
    Task<int> CountAsync(HotelFilter filter, CancellationToken cancellationToken);

    /// <summary>
    /// Lists hotels that have coordinates.
    /// </summary>
    Task<IReadOnlyList<Hotel>> ListWithCoordinatesAsync(CancellationToken cancellationToken);

    /// <summary>
    /// Lists hotels in one destination for city ranking.
    /// </summary>
    Task<IReadOnlyList<Hotel>> ListByDestinationAsync(
        Guid destinationId,
        CancellationToken cancellationToken);
}

/// <summary>
/// Hotel search filter.
/// </summary>
public sealed record HotelFilter(
    string? DestinationSlug = null,
    int? MinStars = null,
    string? Amenity = null,
    string? SearchTerm = null);

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

    /// <summary>
    /// Searches places with structural filters.
    /// </summary>
    Task<IReadOnlyList<Place>> SearchAsync(
        PlaceFilter filter,
        int skip,
        int take,
        CancellationToken cancellationToken);

    /// <summary>
    /// Counts places matching the filter.
    /// </summary>
    Task<int> CountAsync(PlaceFilter filter, CancellationToken cancellationToken);

    /// <summary>
    /// Lists places in one destination for city ranking.
    /// </summary>
    Task<IReadOnlyList<Place>> ListByDestinationAsync(
        Guid destinationId,
        PlaceType? type,
        CancellationToken cancellationToken);
}

/// <summary>
/// Flight metasearch provider abstraction. The current adapter reads provider offers from the Catalog store; future external providers can implement the same seam.
/// </summary>
public interface IFlightProvider
{
    /// <summary>
    /// Searches provider-backed flight offers for a route and date.
    /// </summary>
    Task<IReadOnlyList<FlightRoute>> SearchAsync(
        string? origin,
        string? destination,
        DateOnly? departureDate,
        string? cabin,
        CancellationToken cancellationToken);
}

/// <summary>
/// Persistence abstraction for airline and airport reference data.
/// </summary>
public interface IFlightReferenceRepository
{
    /// <summary>Adds an airline and saves changes.</summary>
    Task AddAirlineAsync(Airline airline, CancellationToken cancellationToken);

    /// <summary>Adds an airport and saves changes.</summary>
    Task AddAirportAsync(Airport airport, CancellationToken cancellationToken);

    /// <summary>Lists active airlines.</summary>
    Task<IReadOnlyList<Airline>> ListAirlinesAsync(CancellationToken cancellationToken);

    /// <summary>Lists airports.</summary>
    Task<IReadOnlyList<Airport>> ListAirportsAsync(CancellationToken cancellationToken);
}

/// <summary>
/// Persistence abstraction for flight routes.
/// </summary>
public interface IFlightRouteRepository
{
    /// <summary>
    /// Adds a route and saves changes.
    /// </summary>
    Task AddAsync(FlightRoute route, CancellationToken cancellationToken);

    /// <summary>
    /// Returns an active route by slug, or <c>null</c>.
    /// </summary>
    Task<FlightRoute?> GetBySlugAsync(string slug, CancellationToken cancellationToken);

    /// <summary>
    /// Searches active routes and offers.
    /// </summary>
    Task<IReadOnlyList<FlightRoute>> SearchAsync(
        string? origin,
        string? destination,
        DateOnly? departureDate,
        string? cabin,
        CancellationToken cancellationToken);
}

/// <summary>
/// Persistence abstraction for visa countries.
/// </summary>
public interface IVisaRepository
{
    /// <summary>
    /// Adds a visa country and saves changes.
    /// </summary>
    Task AddAsync(VisaCountry country, CancellationToken cancellationToken);

    /// <summary>
    /// Returns a visa country by slug, or <c>null</c>.
    /// </summary>
    Task<VisaCountry?> GetBySlugAsync(string slug, CancellationToken cancellationToken);

    /// <summary>
    /// Lists visa countries.
    /// </summary>
    Task<IReadOnlyList<VisaCountry>> ListAsync(CancellationToken cancellationToken);
}

/// <summary>
/// Place search filter.
/// </summary>
public sealed record PlaceFilter(
    PlaceType? Type = null,
    string? DestinationSlug = null,
    string? Category = null,
    string? Cuisine = null,
    string? PriceBand = null,
    string? Amenity = null,
    bool? Reservable = null,
    bool? OnlineReservable = null,
    string? MealPeriod = null,
    string? DietaryOption = null,
    string? SearchTerm = null);
