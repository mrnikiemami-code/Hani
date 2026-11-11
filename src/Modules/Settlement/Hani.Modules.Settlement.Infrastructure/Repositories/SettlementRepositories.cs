using Hani.Modules.Settlement.Application.Abstractions;
using Hani.Modules.Settlement.Domain.Commissions;
using Hani.Modules.Settlement.Domain.Ledger;
using Hani.Modules.Settlement.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Hani.Modules.Settlement.Infrastructure.Repositories;

internal sealed class CommissionRuleRepository(SettlementDbContext dbContext)
    : ICommissionRuleRepository
{
    public async Task AddAsync(AgencyCommissionRule rule, CancellationToken cancellationToken)
    {
        await dbContext.CommissionRules.AddAsync(rule, cancellationToken);
        await dbContext.SaveChangesAsync(cancellationToken);
    }

    public Task<AgencyCommissionRule?> FindEffectiveAsync(
        Guid agencyId,
        ProductType productType,
        DateTimeOffset at,
        CancellationToken cancellationToken)
        => dbContext.CommissionRules
            .Where(rule =>
                rule.AgencyId == agencyId &&
                rule.ProductType == productType &&
                rule.EffectiveFrom <= at &&
                (rule.EffectiveTo == null || rule.EffectiveTo > at))
            .OrderByDescending(rule => rule.EffectiveFrom)
            .FirstOrDefaultAsync(cancellationToken);
}

internal sealed class CommissionEntryRepository(SettlementDbContext dbContext)
    : ICommissionEntryRepository
{
    public async Task AddAsync(
        CommissionEntry entry,
        LedgerTransaction transaction,
        CancellationToken cancellationToken)
    {
        await dbContext.CommissionEntries.AddAsync(entry, cancellationToken);
        await dbContext.LedgerTransactions.AddAsync(transaction, cancellationToken);
        await dbContext.SaveChangesAsync(cancellationToken);
    }

    public Task<CommissionEntry?> GetByOrderIdAsync(
        Guid orderId,
        CancellationToken cancellationToken)
        => dbContext.CommissionEntries.FirstOrDefaultAsync(
            entry => entry.OrderId == orderId,
            cancellationToken);

    public Task SaveChangesAsync(CancellationToken cancellationToken)
        => dbContext.SaveChangesAsync(cancellationToken);
}

internal sealed class LedgerTransactionRepository(SettlementDbContext dbContext)
    : ILedgerTransactionRepository
{
    public Task<LedgerTransaction?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
        => dbContext.LedgerTransactions
            .Include(transaction => transaction.Entries)
            .FirstOrDefaultAsync(transaction => transaction.Id == id, cancellationToken);
}
