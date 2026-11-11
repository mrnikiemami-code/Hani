using Hani.Modules.Supply.Domain.Departures;

namespace Hani.Modules.Supply.Application.Abstractions;

/// <summary>
/// Persistence abstraction for departures and their prices.
/// </summary>
public interface IDepartureRepository
{
    /// <summary>
    /// Adds a departure and saves changes.
    /// </summary>
    Task AddAsync(TourDeparture departure, CancellationToken cancellationToken);

    /// <summary>
    /// Returns a departure by id without tenant scoping.
    /// </summary>
    Task<TourDeparture?> GetByIdAsync(Guid id, CancellationToken cancellationToken);

    /// <summary>
    /// Returns a departure only when its parent offer belongs to the given agency.
    /// </summary>
    Task<TourDeparture?> GetByIdForAgencyAsync(
        Guid id,
        Guid agencyId,
        CancellationToken cancellationToken);

    /// <summary>
    /// Lists departures for one offer, sorted by start date.
    /// </summary>
    Task<IReadOnlyList<TourDeparture>> GetByOfferIdAsync(
        Guid agencyOfferId,
        CancellationToken cancellationToken);

    /// <summary>
    /// Persists pending changes.
    /// </summary>
    Task SaveChangesAsync(CancellationToken cancellationToken);
}
