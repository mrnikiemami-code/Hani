using Hani.BuildingBlocks.Application;

namespace Hani.Modules.Settlement.Application.Queries.GetLedgerTransaction;

/// <summary>
/// Query that reads a double-entry ledger transaction.
/// </summary>
public sealed record GetLedgerTransactionQuery(Guid TransactionId)
    : IQuery<LedgerTransactionDto>;

/// <summary>
/// Ledger transaction read model.
/// </summary>
public sealed record LedgerTransactionDto(
    Guid TransactionId,
    string ReferenceType,
    Guid ReferenceId,
    string Currency,
    DateTimeOffset CreatedAt,
    IReadOnlyList<LedgerLineDto> Entries);

/// <summary>
/// Ledger line read model.
/// </summary>
public sealed record LedgerLineDto(
    Guid EntryId,
    string AccountCode,
    decimal Debit,
    decimal Credit,
    string Description);
