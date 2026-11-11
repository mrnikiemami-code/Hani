using Hani.Modules.Supply.Domain.AgencyOffers;

namespace Hani.Modules.Supply.Application.Abstractions;

public interface IAgencyOfferRepository
{
    Task AddAsync(AgencyOffer offer, CancellationToken cancellationToken);

    Task<AgencyOffer?> GetByIdAsync(
        Guid id,
        Guid agencyId,
        CancellationToken cancellationToken);

    Task<AgencyOffer?> GetByIdAsync(
        Guid id,
        CancellationToken cancellationToken);

    Task<AgencyOffer?> GetByExternalIdAsync(
        Guid agencyId,
        string externalId,
        CancellationToken cancellationToken);

    Task SaveChangesAsync(CancellationToken cancellationToken);
}
