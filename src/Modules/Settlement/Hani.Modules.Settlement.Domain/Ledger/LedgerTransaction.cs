using Hani.BuildingBlocks.Domain;

namespace Hani.Modules.Settlement.Domain.Ledger;

/// <summary>
/// Input line for a double-entry ledger transaction.
/// </summary>
public sealed record LedgerEntryInput(
    string AccountCode,
    decimal Debit,
    decimal Credit,
    string Description);

/// <summary>
/// Immutable double-entry transaction. Debits and credits must balance.
/// </summary>
public sealed class LedgerTransaction : AggregateRoot<Guid>
{
    private readonly List<LedgerEntry> _entries = [];

    private LedgerTransaction()
    {
    }

    private LedgerTransaction(
        Guid id,
        string referenceType,
        Guid referenceId,
        string currency,
        DateTimeOffset createdAt) : base(id)
    {
        ReferenceType = referenceType;
        ReferenceId = referenceId;
        Currency = currency;
        CreatedAt = createdAt;
    }

    /// <summary>
    /// Domain object that produced the transaction.
    /// </summary>
    public string ReferenceType { get; private set; } = string.Empty;

    /// <summary>
    /// Identifier of the referenced domain object.
    /// </summary>
    public Guid ReferenceId { get; private set; }

    /// <summary>
    /// ISO currency code.
    /// </summary>
    public string Currency { get; private set; } = string.Empty;

    /// <summary>
    /// Creation time.
    /// </summary>
    public DateTimeOffset CreatedAt { get; private set; }

    /// <summary>
    /// Debit and credit lines.
    /// </summary>
    public IReadOnlyCollection<LedgerEntry> Entries => _entries;

    /// <summary>
    /// Creates a balanced transaction.
    /// </summary>
    public static LedgerTransaction Create(
        IIdGenerator ids,
        string referenceType,
        Guid referenceId,
        string currency,
        IReadOnlyCollection<LedgerEntryInput> entries,
        DateTimeOffset? now = null)
    {
        if (string.IsNullOrWhiteSpace(referenceType) || referenceId == Guid.Empty)
        {
            throw new ArgumentException("Ledger reference type and id are required.");
        }

        if (string.IsNullOrWhiteSpace(currency))
        {
            throw new ArgumentException("Ledger currency is required.", nameof(currency));
        }

        if (entries.Count < 2)
        {
            throw new ArgumentException("A double-entry transaction needs at least two lines.", nameof(entries));
        }

        decimal debitTotal = 0m;
        decimal creditTotal = 0m;

        foreach (var entry in entries)
        {
            if (string.IsNullOrWhiteSpace(entry.AccountCode))
            {
                throw new ArgumentException("Ledger account code is required.", nameof(entries));
            }

            if (entry.Debit < 0m || entry.Credit < 0m)
            {
                throw new ArgumentException("Ledger amounts cannot be negative.", nameof(entries));
            }

            if ((entry.Debit > 0m) == (entry.Credit > 0m))
            {
                throw new ArgumentException(
                    "Each ledger line must contain either a debit or a credit.",
                    nameof(entries));
            }

            debitTotal += entry.Debit;
            creditTotal += entry.Credit;
        }

        if (debitTotal != creditTotal || debitTotal <= 0m)
        {
            throw new ArgumentException("Ledger transaction must balance and be non-zero.", nameof(entries));
        }

        var transaction = new LedgerTransaction(
            ids.NewId(),
            referenceType.Trim(),
            referenceId,
            currency.ToUpperInvariant(),
            now ?? DateTimeOffset.UtcNow);

        foreach (var entry in entries)
        {
            transaction._entries.Add(new LedgerEntry(
                ids.NewId(),
                transaction.Id,
                entry.AccountCode.Trim(),
                entry.Debit,
                entry.Credit,
                entry.Description));
        }

        return transaction;
    }
}
