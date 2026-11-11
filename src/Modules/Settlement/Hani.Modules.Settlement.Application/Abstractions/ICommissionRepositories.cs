using Hani.Modules.Settlement.Domain.Commissions;
using Hani.Modules.Settlement.Domain.Ledger;

namespace Hani.Modules.Settlement.Application.Abstractions;

/// <summary>
/// Persistence abstraction for agency commission rules.
/// </summary>
public interface ICommissionRuleRepository
{
    /// <summary>
    /// Adds a rule and saves changes.
    /// </summary>
    Task AddAsync(AgencyCommissionRule rule, CancellationToken cancellationToken);

    /// <summary>
    /// Returns the most recent effective rule for an agency and product, or <c>null</c>.
    /// </summary>
    Task<AgencyCommissionRule?> FindEffectiveAsync(
        Guid agencyId,
        ProductType productType,
        DateTimeOffset at,
        CancellationToken cancellationToken);
}

/// <summary>
/// Persistence abstraction for commission entries and their ledger transactions.
/// </summary>
public interface ICommissionEntryRepository
{
    /// <summary>
    /// Adds a commission entry and ledger transaction atomically and saves changes.
    /// </summary>
    Task AddAsync(
        CommissionEntry entry,
        LedgerTransaction transaction,
        CancellationToken cancellationToken);

    /// <summary>
    /// Returns the commission entry for an order, or <c>null</c>.
    /// </summary>
    Task<CommissionEntry?> GetByOrderIdAsync(Guid orderId, CancellationToken cancellationToken);

    /// <summary>
    /// Persists pending changes.
    /// </summary>
    Task SaveChangesAsync(CancellationToken cancellationToken);
}

/// <summary>
/// Read abstraction for ledger transactions.
/// </summary>
public interface ILedgerTransactionRepository
{
    /// <summary>
    /// Returns a ledger transaction with lines, or <c>null</c>.
    /// </summary>
    Task<LedgerTransaction?> GetByIdAsync(Guid id, CancellationToken cancellationToken);
}
