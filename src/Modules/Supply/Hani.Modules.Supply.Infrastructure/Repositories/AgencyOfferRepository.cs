using Hani.Modules.Supply.Application.Abstractions;
using Hani.Modules.Supply.Domain.AgencyOffers;
using Hani.Modules.Supply.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Hani.Modules.Supply.Infrastructure.Repositories;

internal sealed class AgencyOfferRepository(SupplyDbContext dbContext) : IAgencyOfferRepository
{
    public async Task AddAsync(AgencyOffer offer, CancellationToken cancellationToken)
    {
        await dbContext.AgencyOffers.AddAsync(offer, cancellationToken);
        await dbContext.SaveChangesAsync(cancellationToken);
    }

    public Task<AgencyOffer?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
        => dbContext.AgencyOffers
            .AsNoTracking()
            .FirstOrDefaultAsync(offer => offer.Id == id, cancellationToken);
}
