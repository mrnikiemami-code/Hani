using Hani.Modules.Supply.Application.Abstractions;
using Hani.Modules.Supply.Domain.Departures;
using Hani.Modules.Supply.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Hani.Modules.Supply.Infrastructure.Repositories;

internal sealed class DepartureRepository(SupplyDbContext dbContext) : IDepartureRepository
{
    public async Task AddAsync(TourDeparture departure, CancellationToken cancellationToken)
    {
        await dbContext.TourDepartures.AddAsync(departure, cancellationToken);
        await dbContext.SaveChangesAsync(cancellationToken);
    }

    public Task<TourDeparture?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
        => dbContext.TourDepartures
            .FirstOrDefaultAsync(departure => departure.Id == id, cancellationToken);

    public Task<TourDeparture?> GetByIdForAgencyAsync(
        Guid id,
        Guid agencyId,
        CancellationToken cancellationToken)
        => (from departure in dbContext.TourDepartures
            join offer in dbContext.AgencyOffers on departure.AgencyOfferId equals offer.Id
            where departure.Id == id && offer.AgencyId == agencyId
            select departure)
            .FirstOrDefaultAsync(cancellationToken);

    public async Task<IReadOnlyList<TourDeparture>> GetByOfferIdAsync(
        Guid agencyOfferId,
        CancellationToken cancellationToken)
        => await dbContext.TourDepartures
            .AsNoTracking()
            .Where(departure => departure.AgencyOfferId == agencyOfferId)
            .OrderBy(departure => departure.StartDate)
            .ToArrayAsync(cancellationToken);

    public Task SaveChangesAsync(CancellationToken cancellationToken)
        => dbContext.SaveChangesAsync(cancellationToken);
}
