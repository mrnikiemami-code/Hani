using Hani.BuildingBlocks.Application;
using Hani.Modules.Settlement.Domain.Payouts;

namespace Hani.Modules.Settlement.Application.Payouts;

/// <summary>Create agency settlement terms.</summary>
public sealed record CreateSettlementTermsCommand(
    Guid AgencyId,
    SettlementCycle Cycle,
    decimal MinimumPayout,
    string Currency,
    string BankAccountRef) : ICommand<Guid>;

/// <summary>Create a payout.</summary>
public sealed record CreatePayoutCommand(
    Guid AgencyId,
    DateOnly PeriodStart,
    DateOnly PeriodEnd,
    decimal Amount,
    string Currency) : ICommand<PayoutDto>;

/// <summary>Mark a payout paid.</summary>
public sealed record MarkPayoutPaidCommand(Guid PayoutId) : ICommand<bool>;

/// <summary>Read settlement terms.</summary>
public sealed record GetSettlementTermsQuery(Guid AgencyId) : IQuery<SettlementTermsDto>;

/// <summary>List payouts for an agency.</summary>
public sealed record ListPayoutsQuery(Guid AgencyId) : IQuery<IReadOnlyList<PayoutDto>>;

/// <summary>Settlement terms read model.</summary>
public sealed record SettlementTermsDto(
    Guid AgencyId,
    string Cycle,
    decimal MinimumPayout,
    string Currency,
    string BankAccountRef,
    bool IsActive);

/// <summary>Payout read model.</summary>
public sealed record PayoutDto(
    Guid PayoutId,
    Guid AgencyId,
    DateOnly PeriodStart,
    DateOnly PeriodEnd,
    decimal Amount,
    string Currency,
    string Status,
    DateTimeOffset CreatedAt,
    DateTimeOffset? PaidAt);

/// <summary>Persistence abstraction for settlement terms and payouts.</summary>
public interface IPayoutRepository
{
    /// <summary>Adds settlement terms.</summary>
    Task AddTermsAsync(AgencySettlementTerms terms, CancellationToken cancellationToken);
    /// <summary>Returns terms for an agency.</summary>
    Task<AgencySettlementTerms?> GetTermsAsync(Guid agencyId, CancellationToken cancellationToken);
    /// <summary>Adds a payout.</summary>
    Task AddPayoutAsync(Payout payout, CancellationToken cancellationToken);
    /// <summary>Returns a payout by id.</summary>
    Task<Payout?> GetPayoutAsync(Guid id, CancellationToken cancellationToken);
    /// <summary>Lists payouts for an agency.</summary>
    Task<IReadOnlyList<Payout>> ListPayoutsAsync(Guid agencyId, CancellationToken cancellationToken);
    /// <summary>Persists pending changes.</summary>
    Task SaveChangesAsync(CancellationToken cancellationToken);
}
