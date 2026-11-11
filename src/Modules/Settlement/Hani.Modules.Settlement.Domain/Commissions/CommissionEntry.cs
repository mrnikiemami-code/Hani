using Hani.BuildingBlocks.Domain;
using Hani.Modules.Settlement.Domain.Commissions.Events;

namespace Hani.Modules.Settlement.Domain.Commissions;

/// <summary>
/// Commission accrued for one paid order, with a snapshot of the applied rule.
/// </summary>
public sealed class CommissionEntry : AggregateRoot<Guid>
{
    private CommissionEntry()
    {
    }

    private CommissionEntry(
        Guid id,
        Guid orderId,
        Guid agencyId,
        ProductType productType,
        decimal grossAmount,
        decimal rate,
        decimal commissionAmount,
        decimal netAmount,
        string currency,
        Guid? ruleId,
        string ruleSource,
        Guid ledgerTransactionId,
        DateTimeOffset createdAt) : base(id)
    {
        OrderId = orderId;
        AgencyId = agencyId;
        ProductType = productType;
        GrossAmount = grossAmount;
        Rate = rate;
        CommissionAmount = commissionAmount;
        NetAmount = netAmount;
        Currency = currency;
        RuleId = ruleId;
        RuleSource = ruleSource;
        LedgerTransactionId = ledgerTransactionId;
        CreatedAt = createdAt;
        Status = CommissionStatus.Accrued;
    }

    /// <summary>
    /// Unique paid order.
    /// </summary>
    public Guid OrderId { get; private set; }

    /// <summary>
    /// Selling agency.
    /// </summary>
    public Guid AgencyId { get; private set; }

    /// <summary>
    /// Product category snapshot.
    /// </summary>
    public ProductType ProductType { get; private set; }

    /// <summary>
    /// Gross order amount.
    /// </summary>
    public decimal GrossAmount { get; private set; }

    /// <summary>
    /// Applied commission rate.
    /// </summary>
    public decimal Rate { get; private set; }

    /// <summary>
    /// Commission amount.
    /// </summary>
    public decimal CommissionAmount { get; private set; }

    /// <summary>
    /// Amount payable to the agency.
    /// </summary>
    public decimal NetAmount { get; private set; }

    /// <summary>
    /// ISO currency code.
    /// </summary>
    public string Currency { get; private set; } = string.Empty;

    /// <summary>
    /// Applied rule id, when a configured rule was used.
    /// </summary>
    public Guid? RuleId { get; private set; }

    /// <summary>
    /// Rule source snapshot, for example <c>Rule</c> or <c>Default</c>.
    /// </summary>
    public string RuleSource { get; private set; } = string.Empty;

    /// <summary>
    /// Ledger transaction posted for this commission.
    /// </summary>
    public Guid LedgerTransactionId { get; private set; }

    /// <summary>
    /// Current lifecycle state.
    /// </summary>
    public CommissionStatus Status { get; private set; }

    /// <summary>
    /// Creation time.
    /// </summary>
    public DateTimeOffset CreatedAt { get; private set; }

    /// <summary>
    /// Creates an accrued commission entry.
    /// </summary>
    public static CommissionEntry Create(
        IIdGenerator ids,
        Guid orderId,
        Guid agencyId,
        ProductType productType,
        decimal grossAmount,
        decimal rate,
        decimal commissionAmount,
        decimal netAmount,
        string currency,
        Guid? ruleId,
        string ruleSource,
        Guid ledgerTransactionId,
        DateTimeOffset? now = null)
    {
        if (orderId == Guid.Empty || agencyId == Guid.Empty)
        {
            throw new ArgumentException("Order and agency are required.");
        }

        if (grossAmount <= 0m || commissionAmount < 0m || netAmount < 0m)
        {
            throw new ArgumentOutOfRangeException(nameof(grossAmount));
        }

        if (commissionAmount + netAmount != grossAmount)
        {
            throw new ArgumentException("Commission and net amount must equal gross amount.");
        }

        if (rate < 0m || rate > 1m)
        {
            throw new ArgumentOutOfRangeException(nameof(rate));
        }

        if (string.IsNullOrWhiteSpace(currency) ||
            string.IsNullOrWhiteSpace(ruleSource) ||
            ledgerTransactionId == Guid.Empty)
        {
            throw new ArgumentException("Currency, rule source, and ledger transaction are required.");
        }

        var entry = new CommissionEntry(
            ids.NewId(),
            orderId,
            agencyId,
            productType,
            grossAmount,
            rate,
            commissionAmount,
            netAmount,
            currency.ToUpperInvariant(),
            ruleId,
            ruleSource.Trim(),
            ledgerTransactionId,
            now ?? DateTimeOffset.UtcNow);

        entry.AddDomainEvent(new CommissionAccruedDomainEvent(
            ids.NewId(),
            entry.Id,
            orderId,
            commissionAmount));

        return entry;
    }
}
