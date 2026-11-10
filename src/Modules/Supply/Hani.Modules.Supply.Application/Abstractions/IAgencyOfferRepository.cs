using Hani.Modules.Supply.Domain.AgencyOffers;

namespace Hani.Modules.Supply.Application.Abstractions;

public interface IAgencyOfferRepository
{
    Task AddAsync(AgencyOffer offer, CancellationToken cancellationToken);

    Task<AgencyOffer?> GetByIdAsync(Guid id, CancellationToken cancellationToken);
}
