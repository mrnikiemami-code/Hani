using Hani.Modules.Settlement.Domain.Commissions;
using Hani.Modules.Settlement.Domain.Ledger;
using Hani.Modules.Settlement.Domain.Payouts;
using Microsoft.EntityFrameworkCore;

namespace Hani.Modules.Settlement.Infrastructure.Persistence;

/// <summary>
/// EF Core context for the settlement schema.
/// </summary>
public sealed class SettlementDbContext(DbContextOptions<SettlementDbContext> options)
    : DbContext(options)
{
    /// <summary>
    /// Agency/product commission rules.
    /// </summary>
    public DbSet<AgencyCommissionRule> CommissionRules => Set<AgencyCommissionRule>();

    /// <summary>
    /// Accrued commission entries.
    /// </summary>
    public DbSet<CommissionEntry> CommissionEntries => Set<CommissionEntry>();

    /// <summary>
    /// Double-entry ledger transactions.
    /// </summary>
    public DbSet<LedgerTransaction> LedgerTransactions => Set<LedgerTransaction>();

    public DbSet<AgencySettlementTerms> AgencySettlementTerms => Set<AgencySettlementTerms>();

    public DbSet<Payout> Payouts => Set<Payout>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.HasDefaultSchema("settlement");
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(SettlementDbContext).Assembly);
    }
}
