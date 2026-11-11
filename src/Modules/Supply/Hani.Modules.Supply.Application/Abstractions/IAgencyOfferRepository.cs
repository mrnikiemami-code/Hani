using Hani.Modules.Supply.Domain.AgencyOffers;

namespace Hani.Modules.Supply.Application.Abstractions;

/// <summary>
/// Persistence abstraction for agency offers, scoped by agency.
/// </summary>
public interface IAgencyOfferRepository
{
    /// <summary>
    /// Adds a new offer and saves changes.
    /// </summary>
    Task AddAsync(AgencyOffer offer, CancellationToken cancellationToken);

    /// <summary>
    /// Returns an offer only when it belongs to the given agency.
    /// </summary>
    Task<AgencyOffer?> GetByIdAsync(
        Guid id,
        Guid agencyId,
        CancellationToken cancellationToken);

    /// <summary>
    /// Returns an offer by id without tenant scoping (internal moderation only).
    /// </summary>
    Task<AgencyOffer?> GetByIdAsync(
        Guid id,
        CancellationToken cancellationToken);

    /// <summary>
    /// Returns an offer by the agency's external id; used for idempotent upsert.
    /// </summary>
    Task<AgencyOffer?> GetByExternalIdAsync(
        Guid agencyId,
        string externalId,
        CancellationToken cancellationToken);

    /// <summary>
    /// Persists pending changes.
    /// </summary>
    Task SaveChangesAsync(CancellationToken cancellationToken);
}
