using Hani.BuildingBlocks.Domain;

namespace Hani.Modules.Settlement.Domain.Payouts;

/// <summary>Settlement cycle.</summary>
public enum SettlementCycle
{
    Weekly = 0,
    Monthly = 1
}

/// <summary>Agency payout terms.</summary>
public sealed class AgencySettlementTerms : AggregateRoot<Guid>
{
    private AgencySettlementTerms()
    {
    }

    private AgencySettlementTerms(
        Guid id,
        Guid agencyId,
        SettlementCycle cycle,
        decimal minimumPayout,
        string currency,
        string bankAccountRef) : base(id)
    {
        AgencyId = agencyId;
        Cycle = cycle;
        MinimumPayout = minimumPayout;
        Currency = currency.Trim().ToUpperInvariant();
        BankAccountRef = bankAccountRef.Trim();
        IsActive = true;
        CreatedAt = DateTimeOffset.UtcNow;
    }

    /// <summary>Agency id.</summary>
    public Guid AgencyId { get; private set; }

    /// <summary>Settlement cycle.</summary>
    public SettlementCycle Cycle { get; private set; }

    /// <summary>Minimum payout amount.</summary>
    public decimal MinimumPayout { get; private set; }

    /// <summary>Currency.</summary>
    public string Currency { get; private set; } = string.Empty;

    /// <summary>Masked bank account reference.</summary>
    public string BankAccountRef { get; private set; } = string.Empty;

    /// <summary>Whether terms are active.</summary>
    public bool IsActive { get; private set; }

    /// <summary>Creation time.</summary>
    public DateTimeOffset CreatedAt { get; private set; }

    /// <summary>Creates settlement terms.</summary>
    public static AgencySettlementTerms Create(
        IIdGenerator ids,
        Guid agencyId,
        SettlementCycle cycle,
        decimal minimumPayout,
        string currency,
        string bankAccountRef)
    {
        if (agencyId == Guid.Empty ||
            minimumPayout < 0 ||
            string.IsNullOrWhiteSpace(currency) ||
            string.IsNullOrWhiteSpace(bankAccountRef))
        {
            throw new ArgumentException("Agency, non-negative minimum, currency, and bank account are required.");
        }

        return new AgencySettlementTerms(
            ids.NewId(),
            agencyId,
            cycle,
            minimumPayout,
            currency,
            bankAccountRef);
    }

    /// <summary>Deactivates the terms.</summary>
    public void Deactivate() => IsActive = false;
}

/// <summary>Payout lifecycle state.</summary>
public enum PayoutStatus
{
    Pending = 0,
    Paid = 1,
    Cancelled = 2
}

/// <summary>Periodic agency payout.</summary>
public sealed class Payout : AggregateRoot<Guid>
{
    private Payout()
    {
    }

    private Payout(
        Guid id,
        Guid agencyId,
        DateOnly periodStart,
        DateOnly periodEnd,
        decimal amount,
        string currency) : base(id)
    {
        AgencyId = agencyId;
        PeriodStart = periodStart;
        PeriodEnd = periodEnd;
        Amount = amount;
        Currency = currency.Trim().ToUpperInvariant();
        Status = PayoutStatus.Pending;
        CreatedAt = DateTimeOffset.UtcNow;
    }

    /// <summary>Agency id.</summary>
    public Guid AgencyId { get; private set; }

    /// <summary>Period start.</summary>
    public DateOnly PeriodStart { get; private set; }

    /// <summary>Period end.</summary>
    public DateOnly PeriodEnd { get; private set; }

    /// <summary>Payout amount.</summary>
    public decimal Amount { get; private set; }

    /// <summary>Currency.</summary>
    public string Currency { get; private set; } = string.Empty;

    /// <summary>Payout status.</summary>
    public PayoutStatus Status { get; private set; }

    /// <summary>Creation time.</summary>
    public DateTimeOffset CreatedAt { get; private set; }

    /// <summary>Payment time.</summary>
    public DateTimeOffset? PaidAt { get; private set; }

    /// <summary>Creates a pending payout.</summary>
    public static Payout Create(
        IIdGenerator ids,
        Guid agencyId,
        DateOnly periodStart,
        DateOnly periodEnd,
        decimal amount,
        string currency)
    {
        if (agencyId == Guid.Empty || periodEnd < periodStart || amount < 0 ||
            string.IsNullOrWhiteSpace(currency))
        {
            throw new ArgumentException("Agency, valid period, non-negative amount, and currency are required.");
        }

        return new Payout(ids.NewId(), agencyId, periodStart, periodEnd, amount, currency);
    }

    /// <summary>Marks the payout paid.</summary>
    public void MarkPaid(DateTimeOffset? now = null)
    {
        Status = PayoutStatus.Paid;
        PaidAt = now ?? DateTimeOffset.UtcNow;
    }

    /// <summary>Cancels the payout.</summary>
    public void Cancel() => Status = PayoutStatus.Cancelled;
}
