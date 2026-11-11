using Hani.BuildingBlocks.Domain;

namespace Hani.Modules.Settlement.Domain.Commissions;

/// <summary>
/// Commission rate rule for an agency and product type, with an effective window.
/// </summary>
public sealed class AgencyCommissionRule : AggregateRoot<Guid>
{
    private AgencyCommissionRule()
    {
    }

    private AgencyCommissionRule(
        Guid id,
        Guid agencyId,
        ProductType productType,
        decimal rate,
        decimal? minAmount,
        decimal? maxAmount,
        DateTimeOffset effectiveFrom,
        DateTimeOffset? effectiveTo) : base(id)
    {
        AgencyId = agencyId;
        ProductType = productType;
        Rate = rate;
        MinAmount = minAmount;
        MaxAmount = maxAmount;
        EffectiveFrom = effectiveFrom;
        EffectiveTo = effectiveTo;
    }

    /// <summary>
    /// Agency the rule belongs to.
    /// </summary>
    public Guid AgencyId { get; private set; }

    /// <summary>
    /// Product category.
    /// </summary>
    public ProductType ProductType { get; private set; }

    /// <summary>
    /// Commission rate between zero and one.
    /// </summary>
    public decimal Rate { get; private set; }

    /// <summary>
    /// Optional minimum commission amount.
    /// </summary>
    public decimal? MinAmount { get; private set; }

    /// <summary>
    /// Optional maximum commission amount.
    /// </summary>
    public decimal? MaxAmount { get; private set; }

    /// <summary>
    /// Inclusive start of the effective window.
    /// </summary>
    public DateTimeOffset EffectiveFrom { get; private set; }

    /// <summary>
    /// Exclusive end of the effective window.
    /// </summary>
    public DateTimeOffset? EffectiveTo { get; private set; }

    /// <summary>
    /// True when the rule applies at the supplied time.
    /// </summary>
    public bool IsEffectiveAt(DateTimeOffset at)
        => at >= EffectiveFrom && (EffectiveTo is null || at < EffectiveTo);

    /// <summary>
    /// Creates a commission rule.
    /// </summary>
    public static AgencyCommissionRule Create(
        IIdGenerator ids,
        Guid agencyId,
        ProductType productType,
        decimal rate,
        decimal? minAmount,
        decimal? maxAmount,
        DateTimeOffset effectiveFrom,
        DateTimeOffset? effectiveTo)
    {
        if (agencyId == Guid.Empty)
        {
            throw new ArgumentException("Agency is required.", nameof(agencyId));
        }

        if (rate < 0m || rate > 1m)
        {
            throw new ArgumentOutOfRangeException(nameof(rate), "Rate must be between zero and one.");
        }

        if (minAmount is < 0m || maxAmount is < 0m)
        {
            throw new ArgumentOutOfRangeException(nameof(minAmount));
        }

        if (minAmount is not null && maxAmount is not null && minAmount > maxAmount)
        {
            throw new ArgumentException("Minimum commission cannot exceed maximum.");
        }

        if (effectiveTo is not null && effectiveTo <= effectiveFrom)
        {
            throw new ArgumentException("Effective end must be after effective start.");
        }

        return new AgencyCommissionRule(
            ids.NewId(),
            agencyId,
            productType,
            rate,
            minAmount,
            maxAmount,
            effectiveFrom,
            effectiveTo);
    }
}
