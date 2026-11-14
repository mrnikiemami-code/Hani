using Hani.BuildingBlocks.Domain;

namespace Hani.Modules.Payments.Domain.Reconciliation;

/// <summary>Reconciliation batch state.</summary>
public enum ReconciliationStatus
{
    Open = 0,
    Balanced = 1,
    Mismatched = 2
}

/// <summary>
/// Provider reconciliation record for one period and currency.
/// </summary>
public sealed class ReconciliationRecord : AggregateRoot<Guid>
{
    private ReconciliationRecord()
    {
    }

    private ReconciliationRecord(
        Guid id,
        string provider,
        DateOnly periodStart,
        DateOnly periodEnd,
        string currency,
        decimal expectedAmount,
        decimal actualAmount) : base(id)
    {
        Provider = provider.Trim();
        PeriodStart = periodStart;
        PeriodEnd = periodEnd;
        Currency = currency.Trim().ToUpperInvariant();
        ExpectedAmount = expectedAmount;
        ActualAmount = actualAmount;
        Difference = actualAmount - expectedAmount;
        Status = Difference == 0
            ? ReconciliationStatus.Balanced
            : ReconciliationStatus.Mismatched;
        CreatedAt = DateTimeOffset.UtcNow;
    }

    /// <summary>Provider name.</summary>
    public string Provider { get; private set; } = string.Empty;

    /// <summary>Period start.</summary>
    public DateOnly PeriodStart { get; private set; }

    /// <summary>Period end.</summary>
    public DateOnly PeriodEnd { get; private set; }

    /// <summary>Currency.</summary>
    public string Currency { get; private set; } = string.Empty;

    /// <summary>Expected amount.</summary>
    public decimal ExpectedAmount { get; private set; }

    /// <summary>Actual provider amount.</summary>
    public decimal ActualAmount { get; private set; }

    /// <summary>Difference.</summary>
    public decimal Difference { get; private set; }

    /// <summary>Status.</summary>
    public ReconciliationStatus Status { get; private set; }

    /// <summary>Creation time.</summary>
    public DateTimeOffset CreatedAt { get; private set; }

    /// <summary>Creates a reconciliation record.</summary>
    public static ReconciliationRecord Create(
        IIdGenerator ids,
        string provider,
        DateOnly periodStart,
        DateOnly periodEnd,
        string currency,
        decimal expectedAmount,
        decimal actualAmount)
    {
        if (string.IsNullOrWhiteSpace(provider) ||
            string.IsNullOrWhiteSpace(currency) ||
            periodEnd < periodStart)
        {
            throw new ArgumentException("Provider, period, and currency are required.");
        }

        return new ReconciliationRecord(
            ids.NewId(),
            provider,
            periodStart,
            periodEnd,
            currency,
            expectedAmount,
            actualAmount);
    }
}
