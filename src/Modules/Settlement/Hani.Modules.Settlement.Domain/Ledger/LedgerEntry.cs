using Hani.BuildingBlocks.Domain;

namespace Hani.Modules.Settlement.Domain.Ledger;

/// <summary>
/// One debit or credit line of a double-entry transaction.
/// </summary>
public sealed class LedgerEntry : Entity<Guid>
{
    private LedgerEntry()
    {
    }

    internal LedgerEntry(
        Guid id,
        Guid transactionId,
        string accountCode,
        decimal debit,
        decimal credit,
        string description) : base(id)
    {
        TransactionId = transactionId;
        AccountCode = accountCode;
        Debit = debit;
        Credit = credit;
        Description = description;
    }

    /// <summary>
    /// Owning ledger transaction.
    /// </summary>
    public Guid TransactionId { get; private set; }

    /// <summary>
    /// Chart-of-accounts code.
    /// </summary>
    public string AccountCode { get; private set; } = string.Empty;

    /// <summary>
    /// Debit amount (zero for credit lines).
    /// </summary>
    public decimal Debit { get; private set; }

    /// <summary>
    /// Credit amount (zero for debit lines).
    /// </summary>
    public decimal Credit { get; private set; }

    /// <summary>
    /// Human-readable entry description.
    /// </summary>
    public string Description { get; private set; } = string.Empty;
}
