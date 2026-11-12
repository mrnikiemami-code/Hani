using Hani.BuildingBlocks.Application;

namespace Hani.Modules.Settlement.Application.Queries.GetCommission;

/// <summary>
/// Query that reads the commission accrued for an order.
/// </summary>
public sealed record GetCommissionQuery(Guid OrderId, string? Currency = null) : IQuery<CommissionDto>;

/// <summary>
/// Commission read model with the applied rule snapshot.
/// </summary>
public sealed record CommissionDto(
    Guid CommissionEntryId,
    Guid OrderId,
    Guid AgencyId,
    string ProductType,
    decimal GrossAmount,
    decimal Rate,
    decimal CommissionAmount,
    decimal NetAmount,
    string Currency,
    Guid? RuleId,
    string RuleSource,
    Guid LedgerTransactionId,
    string Status,
    DateTimeOffset CreatedAt);
