using Hani.Modules.Supply.Domain.Departures;

namespace Hani.Modules.Supply.Application.Abstractions;

public interface IDepartureRepository
{
    Task AddAsync(TourDeparture departure, CancellationToken cancellationToken);

    Task<TourDeparture?> GetByIdAsync(Guid id, CancellationToken cancellationToken);

    Task<TourDeparture?> GetByIdForAgencyAsync(
        Guid id,
        Guid agencyId,
        CancellationToken cancellationToken);

    Task<IReadOnlyList<TourDeparture>> GetByOfferIdAsync(
        Guid agencyOfferId,
        CancellationToken cancellationToken);

    Task SaveChangesAsync(CancellationToken cancellationToken);
}
