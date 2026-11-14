using Hani.Modules.Settlement.Application.Payouts;
using Hani.Modules.Settlement.Domain.Payouts;
using Hani.Modules.Settlement.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Hani.Modules.Settlement.Infrastructure.Repositories;

internal sealed class PayoutRepository(SettlementDbContext dbContext) : IPayoutRepository
{
    public async Task AddTermsAsync(AgencySettlementTerms terms, CancellationToken cancellationToken)
    {
        await dbContext.AgencySettlementTerms.AddAsync(terms, cancellationToken);
        await dbContext.SaveChangesAsync(cancellationToken);
    }

    public Task<AgencySettlementTerms?> GetTermsAsync(Guid agencyId, CancellationToken cancellationToken)
        => dbContext.AgencySettlementTerms
            .AsNoTracking()
            .OrderByDescending(item => item.CreatedAt)
            .FirstOrDefaultAsync(item => item.AgencyId == agencyId && item.IsActive, cancellationToken);

    public async Task AddPayoutAsync(Payout payout, CancellationToken cancellationToken)
    {
        await dbContext.Payouts.AddAsync(payout, cancellationToken);
        await dbContext.SaveChangesAsync(cancellationToken);
    }

    public Task<Payout?> GetPayoutAsync(Guid id, CancellationToken cancellationToken)
        => dbContext.Payouts.FirstOrDefaultAsync(item => item.Id == id, cancellationToken);

    public async Task<IReadOnlyList<Payout>> ListPayoutsAsync(Guid agencyId, CancellationToken cancellationToken)
        => await dbContext.Payouts
            .AsNoTracking()
            .Where(item => item.AgencyId == agencyId)
            .OrderByDescending(item => item.CreatedAt)
            .ToArrayAsync(cancellationToken);

    public Task SaveChangesAsync(CancellationToken cancellationToken)
        => dbContext.SaveChangesAsync(cancellationToken);
}
