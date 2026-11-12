using Hani.BuildingBlocks.Domain;
using Hani.BuildingBlocks.Domain.Pricing;

namespace Hani.Modules.Supply.Domain.AgencyOffers;

/// <summary>
/// Tax and duty treatment applied to an offer currency.
/// </summary>
public sealed class OfferTaxRule : Entity<Guid>
{
    private OfferTaxRule()
    {
    }

    internal OfferTaxRule(
        Guid id,
        Guid agencyOfferId,
        string currency,
        TaxStatus vatStatus,
        decimal vatRate,
        TaxStatus dutyStatus,
        decimal dutyRate,
        string? exemptionReason) : base(id)
    {
        AgencyOfferId = agencyOfferId;
        Currency = currency;
        VatStatus = vatStatus;
        VatRate = vatRate;
        DutyStatus = dutyStatus;
        DutyRate = dutyRate;
        ExemptionReason = exemptionReason;
    }

    /// <summary>
    /// Owning agency offer.
    /// </summary>
    public Guid AgencyOfferId { get; private set; }

    /// <summary>
    /// ISO currency code.
    /// </summary>
    public string Currency { get; private set; } = string.Empty;

    /// <summary>
    /// VAT treatment.
    /// </summary>
    public TaxStatus VatStatus { get; private set; }

    /// <summary>
    /// VAT rate as a fraction of the base amount.
    /// </summary>
    public decimal VatRate { get; private set; }

    /// <summary>
    /// Duty treatment.
    /// </summary>
    public TaxStatus DutyStatus { get; private set; }

    /// <summary>
    /// Duty rate as a fraction of the base amount.
    /// </summary>
    public decimal DutyRate { get; private set; }

    /// <summary>
    /// Optional legal reason for exemption or non-application.
    /// </summary>
    public string? ExemptionReason { get; private set; }
}

/// <summary>
/// Tax rule input for an offer currency.
/// </summary>
public sealed record OfferTaxRuleDetails(
    string Currency,
    TaxStatus VatStatus,
    decimal VatRate,
    TaxStatus DutyStatus,
    decimal DutyRate,
    string? ExemptionReason = null);
