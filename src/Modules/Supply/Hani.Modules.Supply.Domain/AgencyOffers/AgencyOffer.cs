using Hani.BuildingBlocks.Domain;
using Hani.Modules.Supply.Domain.AgencyOffers.Events;
using Hani.Modules.Supply.Domain.Departures;

namespace Hani.Modules.Supply.Domain.AgencyOffers;

/// <summary>
/// Agency-specific offer on a shared tour product.
/// </summary>
public sealed class AgencyOffer : AggregateRoot<Guid>
{
    private readonly List<OfferAccommodationOption> _accommodationOptions = [];
    private readonly List<OfferFlightOption> _flightOptions = [];
    private readonly List<OfferTaxRule> _taxRules = [];

    private AgencyOffer()
    {
    }

    private AgencyOffer(
        Guid id,
        Guid agencyId,
        string externalId,
        Guid tourProductId,
        string title,
        Money basePrice,
        BookingMode bookingMode = BookingMode.Online,
        CollectionMode collectionMode = CollectionMode.HaniOnline,
        SellerOfRecord sellerOfRecord = SellerOfRecord.Hani,
        InvoiceIssuer invoiceIssuer = InvoiceIssuer.Hani,
        InstallmentTerms? installmentTerms = null) : base(id)
    {
        AgencyId = agencyId;
        ExternalId = externalId;
        TourProductId = tourProductId;
        Title = title;
        BasePrice = basePrice;
        BookingMode = bookingMode;
        CollectionMode = collectionMode;
        SellerOfRecord = sellerOfRecord;
        InvoiceIssuer = invoiceIssuer;
        InstallmentTerms = installmentTerms ?? InstallmentTerms.None;
        Status = AgencyOfferStatus.Draft;
        CreatedAt = DateTimeOffset.UtcNow;
        UpdatedAt = CreatedAt;
    }

    public Guid AgencyId { get; private set; }

    public string ExternalId { get; private set; } = string.Empty;

    public Guid TourProductId { get; private set; }

    public string Title { get; private set; } = string.Empty;

    public Money BasePrice { get; private set; }

    /// <summary>
    /// Online booking or agency reservation request.
    /// </summary>
    public BookingMode BookingMode { get; private set; }

    /// <summary>
    /// Payment collection channel.
    /// </summary>
    public CollectionMode CollectionMode { get; private set; }

    /// <summary>
    /// Party legally selling the booking.
    /// </summary>
    public SellerOfRecord SellerOfRecord { get; private set; }

    /// <summary>
    /// Party issuing the customer invoice.
    /// </summary>
    public InvoiceIssuer InvoiceIssuer { get; private set; }

    /// <summary>
    /// Agency-specific installment rules for this offer.
    /// </summary>
    public InstallmentTerms InstallmentTerms { get; private set; } = InstallmentTerms.None;

    /// <summary>
    /// Hotel/room/board options.
    /// </summary>
    public IReadOnlyCollection<OfferAccommodationOption> AccommodationOptions => _accommodationOptions;

    /// <summary>
    /// Outbound/inbound flight details.
    /// </summary>
    public IReadOnlyCollection<OfferFlightOption> FlightOptions => _flightOptions;

    /// <summary>
    /// VAT and duty rules per offer currency.
    /// </summary>
    public IReadOnlyCollection<OfferTaxRule> TaxRules => _taxRules;

    public AgencyOfferStatus Status { get; private set; }

    public string? RejectionReason { get; private set; }

    public DateTimeOffset CreatedAt { get; private set; }

    public DateTimeOffset UpdatedAt { get; private set; }

    public static AgencyOffer Create(
        IIdGenerator ids,
        Guid agencyId,
        Guid tourProductId,
        string title,
        Money basePrice,
        string externalId = "",
        BookingMode bookingMode = BookingMode.Online,
        CollectionMode collectionMode = CollectionMode.HaniOnline,
        SellerOfRecord sellerOfRecord = SellerOfRecord.Hani,
        InvoiceIssuer invoiceIssuer = InvoiceIssuer.Hani,
        InstallmentTerms? installmentTerms = null)
    {
        if (agencyId == Guid.Empty)
        {
            throw new ArgumentException("Agency id is required.", nameof(agencyId));
        }

        if (tourProductId == Guid.Empty)
        {
            throw new ArgumentException("Tour product id is required.", nameof(tourProductId));
        }

        if (string.IsNullOrWhiteSpace(title))
        {
            throw new ArgumentException("Title is required.", nameof(title));
        }

        var offer = new AgencyOffer(
            ids.NewId(),
            agencyId,
            externalId.Trim(),
            tourProductId,
            title.Trim(),
            basePrice,
            bookingMode,
            collectionMode,
            sellerOfRecord,
            invoiceIssuer,
            installmentTerms);

        offer.AddDomainEvent(new AgencyOfferCreatedDomainEvent(ids.NewId(), offer.Id, agencyId));

        return offer;
    }

    /// <summary>
    /// Sets booking and collection modes while the offer is editable.
    /// </summary>
    public void SetBookingTerms(
        BookingMode bookingMode,
        CollectionMode collectionMode,
        SellerOfRecord sellerOfRecord = SellerOfRecord.Hani,
        InvoiceIssuer invoiceIssuer = InvoiceIssuer.Hani)
    {
        EnsureEditable();
        BookingMode = bookingMode;
        CollectionMode = collectionMode;
        SellerOfRecord = sellerOfRecord;
        InvoiceIssuer = invoiceIssuer;
        Touch();
    }

    /// <summary>
    /// Sets or clears installment rules while the offer is editable.
    /// </summary>
    public void SetInstallmentTerms(InstallmentTerms? terms)
    {
        EnsureEditable();
        InstallmentTerms = terms ?? InstallmentTerms.None;
        Touch();
    }

    public void UpdateDetails(string title, Money basePrice)
    {
        if (Status is AgencyOfferStatus.Approved or AgencyOfferStatus.Archived)
        {
            throw new InvalidOperationException("Only draft, rejected, or pending offers can be edited.");
        }

        if (string.IsNullOrWhiteSpace(title))
        {
            throw new ArgumentException("Title is required.", nameof(title));
        }

        Title = title.Trim();
        BasePrice = basePrice;
        Touch();
    }

    public void SubmitForReview()
    {
        if (Status is not (AgencyOfferStatus.Draft or AgencyOfferStatus.Rejected))
        {
            throw new InvalidOperationException("Only draft or rejected offers can be submitted.");
        }

        Status = AgencyOfferStatus.Pending;
        RejectionReason = null;
        Touch();
    }

    public void Approve()
    {
        if (Status != AgencyOfferStatus.Pending)
        {
            throw new InvalidOperationException("Only pending offers can be approved.");
        }

        Status = AgencyOfferStatus.Approved;
        RejectionReason = null;
        Touch();
    }

    public void Reject(string reason)
    {
        if (Status != AgencyOfferStatus.Pending)
        {
            throw new InvalidOperationException("Only pending offers can be rejected.");
        }

        if (string.IsNullOrWhiteSpace(reason))
        {
            throw new ArgumentException("Rejection reason is required.", nameof(reason));
        }

        Status = AgencyOfferStatus.Rejected;
        RejectionReason = reason.Trim();
        Touch();
    }

    public void Archive()
    {
        if (Status == AgencyOfferStatus.Archived)
        {
            return;
        }

        Status = AgencyOfferStatus.Archived;
        Touch();
    }

    /// <summary>
    /// Replaces all accommodation options. Only draft, rejected, or pending offers can be edited.
    /// </summary>
    public void ReplaceAccommodationOptions(
        IIdGenerator ids,
        IReadOnlyCollection<OfferAccommodationOptionDetails> options)
    {
        EnsureEditable();

        _accommodationOptions.Clear();

        foreach (var option in options)
        {
            if (string.IsNullOrWhiteSpace(option.HotelName))
            {
                throw new ArgumentException("Hotel name is required.", nameof(options));
            }

            if (option.HotelStars is < 1 or > 5)
            {
                throw new ArgumentOutOfRangeException(nameof(options), "Hotel stars must be between 1 and 5.");
            }

            if (option.Price.Amount <= 0m)
            {
                throw new ArgumentOutOfRangeException(nameof(options), "Accommodation price must be positive.");
            }

            _accommodationOptions.Add(new OfferAccommodationOption(
                ids.NewId(),
                Id,
                option.HotelId,
                option.HotelName.Trim(),
                option.HotelStars,
                option.RoomType,
                option.MealPlan,
                option.Price,
                string.IsNullOrWhiteSpace(option.Description) ? null : option.Description.Trim()));
        }

        Touch();
    }

    /// <summary>
    /// Replaces all flight options. Only draft, rejected, or pending offers can be edited.
    /// </summary>
    public void ReplaceFlightOptions(
        IIdGenerator ids,
        IReadOnlyCollection<OfferFlightOptionDetails> options)
    {
        EnsureEditable();

        _flightOptions.Clear();

        foreach (var option in options)
        {
            if (string.IsNullOrWhiteSpace(option.Airline) ||
                string.IsNullOrWhiteSpace(option.FlightNumber) ||
                string.IsNullOrWhiteSpace(option.DepartureAirport) ||
                string.IsNullOrWhiteSpace(option.ArrivalAirport))
            {
                throw new ArgumentException("Flight identifiers and airports are required.", nameof(options));
            }

            if (option.DurationMinutes <= 0)
            {
                throw new ArgumentOutOfRangeException(nameof(options), "Flight duration must be positive.");
            }

            _flightOptions.Add(new OfferFlightOption(
                ids.NewId(),
                Id,
                option.Direction,
                option.Airline.Trim(),
                option.FlightNumber.Trim(),
                option.DepartureAirport.Trim(),
                option.ArrivalAirport.Trim(),
                option.DepartureTime,
                option.ArrivalTime,
                option.DurationMinutes,
                string.IsNullOrWhiteSpace(option.Cabin) ? "ECONOMY" : option.Cabin.Trim(),
                string.IsNullOrWhiteSpace(option.BaggageAllowance)
                    ? string.Empty
                    : option.BaggageAllowance.Trim()));
        }

        Touch();
    }

    /// <summary>
    /// Replaces all tax rules. Rates must be between 0 and 1 and currencies unique.
    /// </summary>
    public void ReplaceTaxRules(
        IIdGenerator ids,
        IReadOnlyCollection<OfferTaxRuleDetails> rules)
    {
        EnsureEditable();

        if (rules.Select(rule => rule.Currency.Trim().ToUpperInvariant()).Distinct().Count() != rules.Count)
        {
            throw new ArgumentException("Duplicate tax-rule currencies are not allowed.", nameof(rules));
        }

        _taxRules.Clear();

        foreach (var rule in rules)
        {
            if (string.IsNullOrWhiteSpace(rule.Currency))
            {
                throw new ArgumentException("Tax-rule currency is required.", nameof(rules));
            }

            if (rule.VatRate is < 0m or > 1m || rule.DutyRate is < 0m or > 1m)
            {
                throw new ArgumentOutOfRangeException(nameof(rules), "Tax rates must be between 0 and 1.");
            }

            _taxRules.Add(new OfferTaxRule(
                ids.NewId(),
                Id,
                rule.Currency.Trim().ToUpperInvariant(),
                rule.VatStatus,
                rule.VatRate,
                rule.DutyStatus,
                rule.DutyRate,
                string.IsNullOrWhiteSpace(rule.ExemptionReason) ? null : rule.ExemptionReason.Trim()));
        }

        Touch();
    }

    private void EnsureEditable()
    {
        if (Status is AgencyOfferStatus.Approved or AgencyOfferStatus.Archived)
        {
            throw new InvalidOperationException("Only draft, rejected, or pending offers can be edited.");
        }
    }

    private void Touch() => UpdatedAt = DateTimeOffset.UtcNow;
}

/// <summary>
/// Accommodation option input.
/// </summary>
public sealed record OfferAccommodationOptionDetails(
    string HotelName,
    int HotelStars,
    RoomType RoomType,
    MealPlanType MealPlan,
    Money Price,
    string? Description = null,
    Guid? HotelId = null);

/// <summary>
/// Flight option input.
/// </summary>
public sealed record OfferFlightOptionDetails(
    FlightDirection Direction,
    string Airline,
    string FlightNumber,
    string DepartureAirport,
    string ArrivalAirport,
    TimeOnly DepartureTime,
    TimeOnly ArrivalTime,
    int DurationMinutes,
    string Cabin,
    string BaggageAllowance);
