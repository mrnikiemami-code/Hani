using Hani.BuildingBlocks.Domain;
using Hani.BuildingBlocks.Domain.Pricing;
using Hani.Modules.Booking.Domain.Holds;
using Hani.Modules.Booking.Domain.Quotes;

namespace Hani.Modules.Booking.Domain.Orders;

/// <summary>
/// Immutable snapshot of the commercial terms issued with an order.
/// </summary>
public sealed class Contract : Entity<Guid>
{
    private readonly List<ContractTraveler> _travelers = [];
    private readonly List<ContractLine> _lines = [];

    private Contract()
    {
    }

    private Contract(
        Guid id,
        Guid orderId,
        string contractNumber,
        DateTimeOffset issuedAt,
        Guid quoteId,
        Guid holdId,
        Guid agencyId,
        Guid agencyOfferId,
        Guid departureId,
        string roomType,
        int adults,
        int children,
        int infants,
        int seats,
        decimal unitPrice,
        decimal total,
        string currency,
        PricingSnapshot pricing,
        string contactEmail,
        string? contactPhone) : base(id)
    {
        OrderId = orderId;
        ContractNumber = contractNumber;
        IssuedAt = issuedAt;
        QuoteId = quoteId;
        HoldId = holdId;
        AgencyId = agencyId;
        AgencyOfferId = agencyOfferId;
        DepartureId = departureId;
        RoomType = roomType;
        Adults = adults;
        Children = children;
        Infants = infants;
        Seats = seats;
        UnitPrice = unitPrice;
        Total = total;
        Currency = currency;
        Pricing = pricing;
        ContactEmail = contactEmail;
        ContactPhone = contactPhone;
    }

    /// <summary>
    /// Owning order identifier.
    /// </summary>
    public Guid OrderId { get; private set; }

    /// <summary>
    /// Human-readable contract number.
    /// </summary>
    public string ContractNumber { get; private set; } = string.Empty;

    /// <summary>
    /// Time the contract snapshot was issued.
    /// </summary>
    public DateTimeOffset IssuedAt { get; private set; }

    /// <summary>
    /// Quote from which the contract was issued.
    /// </summary>
    public Guid QuoteId { get; private set; }

    /// <summary>
    /// Hold consumed by the order.
    /// </summary>
    public Guid HoldId { get; private set; }

    /// <summary>
    /// Selling agency identifier.
    /// </summary>
    public Guid AgencyId { get; private set; }

    /// <summary>
    /// Agency offer identifier.
    /// </summary>
    public Guid AgencyOfferId { get; private set; }

    /// <summary>
    /// Departure identifier.
    /// </summary>
    public Guid DepartureId { get; private set; }

    /// <summary>
    /// Room type captured at issuance.
    /// </summary>
    public string RoomType { get; private set; } = string.Empty;

    /// <summary>
    /// Number of adults captured at issuance.
    /// </summary>
    public int Adults { get; private set; }

    /// <summary>
    /// Number of children captured at issuance.
    /// </summary>
    public int Children { get; private set; }

    /// <summary>
    /// Number of infants captured at issuance.
    /// </summary>
    public int Infants { get; private set; }

    /// <summary>
    /// Number of charged seats captured at issuance.
    /// </summary>
    public int Seats { get; private set; }

    /// <summary>
    /// Unit price captured at issuance.
    /// </summary>
    public decimal UnitPrice { get; private set; }

    /// <summary>
    /// Total price captured at issuance.
    /// </summary>
    public decimal Total { get; private set; }

    /// <summary>
    /// ISO currency code captured at issuance.
    /// </summary>
    public string Currency { get; private set; } = string.Empty;

    /// <summary>
    /// Multi-currency pricing and tax snapshot captured at issuance.
    /// </summary>
    public PricingSnapshot? Pricing { get; private set; }

    /// <summary>
    /// Effective pricing snapshot, falling back to the legacy single-currency total.
    /// </summary>
    public PricingSnapshot EffectivePricing => Pricing ?? PricingSnapshot.Single(Total, Currency);

    /// <summary>
    /// Contact email captured at issuance.
    /// </summary>
    public string ContactEmail { get; private set; } = string.Empty;

    /// <summary>
    /// Optional contact phone captured at issuance.
    /// </summary>
    public string? ContactPhone { get; private set; }

    /// <summary>
    /// Immutable traveler snapshots.
    /// </summary>
    public IReadOnlyCollection<ContractTraveler> Travelers => _travelers;

    /// <summary>
    /// Immutable priced line snapshots.
    /// </summary>
    public IReadOnlyCollection<ContractLine> Lines => _lines;

    internal static Contract Create(
        IIdGenerator ids,
        Guid orderId,
        string contractNumber,
        DateTimeOffset issuedAt,
        Quote quote,
        Hold hold,
        string contactEmail,
        string? contactPhone,
        IReadOnlyCollection<TravelerDetails> travelers)
    {
        var contract = new Contract(
            ids.NewId(),
            orderId,
            contractNumber,
            issuedAt,
            quote.Id,
            hold.Id,
            quote.AgencyId,
            quote.AgencyOfferId,
            quote.DepartureId,
            quote.RoomType,
            quote.Adults,
            quote.Children,
            quote.Infants,
            quote.Seats,
            quote.UnitPrice,
            quote.Total,
            quote.Currency,
            quote.EffectivePricing,
            contactEmail.Trim(),
            string.IsNullOrWhiteSpace(contactPhone) ? null : contactPhone.Trim());

        foreach (var traveler in travelers)
        {
            contract._travelers.Add(new ContractTraveler(
                ids.NewId(),
                contract.Id,
                traveler.FullName,
                traveler.Type,
                traveler.DateOfBirth));
        }

        foreach (var component in quote.EffectivePricing.Components)
        {
            contract._lines.Add(new ContractLine(
                ids.NewId(),
                contract.Id,
                ContractLineDescription(quote),
                1,
                component.BaseAmount,
                component.TotalAmount,
                component.Currency));
        }

        return contract;
    }

    internal static string ContractLineDescription(Quote quote)
        => $"Departure {quote.DepartureId} - {quote.RoomType}";
}
