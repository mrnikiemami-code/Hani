using Hani.BuildingBlocks.Domain;
using Hani.BuildingBlocks.Domain.Pricing;
using Hani.Modules.Booking.Domain.Holds;
using Hani.Modules.Booking.Domain.Orders.Events;
using Hani.Modules.Booking.Domain.Quotes;

namespace Hani.Modules.Booking.Domain.Orders;

/// <summary>
/// Confirmed marketplace order created from an active hold. The order owns an immutable
/// contract snapshot and cannot change its commercial terms after creation.
/// </summary>
public sealed class Order : AggregateRoot<Guid>
{
    private readonly List<OrderTraveler> _travelers = [];
    private readonly List<OrderLine> _lines = [];
    private readonly List<PaymentObligation> _paymentObligations = [];

    private Order()
    {
    }

    private Order(
        Guid id,
        string orderNumber,
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
        string? contactPhone,
        DateTimeOffset createdAt,
        DateTimeOffset paymentDueAt) : base(id)
    {
        OrderNumber = orderNumber;
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
        CreatedAt = createdAt;
        PaymentDueAt = paymentDueAt;
        Status = OrderStatus.PendingPayment;
    }

    /// <summary>
    /// Human-readable order number.
    /// </summary>
    public string OrderNumber { get; private set; } = string.Empty;

    /// <summary>
    /// Quote from which the order was created.
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
    /// Room type selected in the quote.
    /// </summary>
    public string RoomType { get; private set; } = string.Empty;

    /// <summary>
    /// Number of adults.
    /// </summary>
    public int Adults { get; private set; }

    /// <summary>
    /// Number of children.
    /// </summary>
    public int Children { get; private set; }

    /// <summary>
    /// Number of infants.
    /// </summary>
    public int Infants { get; private set; }

    /// <summary>
    /// Number of charged seats.
    /// </summary>
    public int Seats { get; private set; }

    /// <summary>
    /// Unit price at order creation.
    /// </summary>
    public decimal UnitPrice { get; private set; }

    /// <summary>
    /// Total price at order creation.
    /// </summary>
    public decimal Total { get; private set; }

    /// <summary>
    /// ISO currency code.
    /// </summary>
    public string Currency { get; private set; } = string.Empty;

    /// <summary>
    /// Multi-currency pricing and tax snapshot captured at order creation.
    /// </summary>
    public PricingSnapshot? Pricing { get; private set; }

    /// <summary>
    /// Effective pricing snapshot, falling back to the legacy single-currency total.
    /// </summary>
    public PricingSnapshot EffectivePricing => Pricing ?? PricingSnapshot.Single(Total, Currency);

    /// <summary>
    /// Payment state derived from per-currency obligations.
    /// </summary>
    public OrderPaymentStatus PaymentStatus
    {
        get
        {
            if (_paymentObligations.Count == 0)
            {
                return Status == OrderStatus.Paid
                    ? OrderPaymentStatus.Paid
                    : OrderPaymentStatus.Unpaid;
            }

            var paid = _paymentObligations.Count(item =>
                item.Status == PaymentObligationStatus.Paid);

            return paid == 0
                ? OrderPaymentStatus.Unpaid
                : paid == _paymentObligations.Count
                    ? OrderPaymentStatus.Paid
                    : OrderPaymentStatus.PartiallyPaid;
        }
    }

    /// <summary>
    /// Per-currency amounts due for this order.
    /// </summary>
    public IReadOnlyCollection<PaymentObligation> PaymentObligations => _paymentObligations;

    /// <summary>
    /// Contact email for the order.
    /// </summary>
    public string ContactEmail { get; private set; } = string.Empty;

    /// <summary>
    /// Optional contact phone for the order.
    /// </summary>
    public string? ContactPhone { get; private set; }

    /// <summary>
    /// Current order lifecycle state.
    /// </summary>
    public OrderStatus Status { get; private set; }

    /// <summary>
    /// Time the order was created.
    /// </summary>
    public DateTimeOffset CreatedAt { get; private set; }

    /// <summary>
    /// Deadline inherited from the consumed hold.
    /// </summary>
    public DateTimeOffset PaymentDueAt { get; private set; }

    /// <summary>
    /// Immutable contract issued with this order.
    /// </summary>
    public Contract Contract { get; private set; } = null!;

    /// <summary>
    /// Travelers captured on the order.
    /// </summary>
    public IReadOnlyCollection<OrderTraveler> Travelers => _travelers;

    /// <summary>
    /// Priced lines captured on the order.
    /// </summary>
    public IReadOnlyCollection<OrderLine> Lines => _lines;

    /// <summary>
    /// Creates an order and immutable contract from an active hold and held quote.
    /// </summary>
    public static Order Create(
        IIdGenerator ids,
        Hold hold,
        Quote quote,
        string contactEmail,
        string? contactPhone,
        IReadOnlyCollection<TravelerDetails> travelers,
        DateTimeOffset? now = null)
    {
        ArgumentNullException.ThrowIfNull(hold);
        ArgumentNullException.ThrowIfNull(quote);

        if (hold.QuoteId != quote.Id)
        {
            throw new ArgumentException("Hold and quote do not belong to the same booking.", nameof(hold));
        }

        if (hold.Status != HoldStatus.Active)
        {
            throw new InvalidOperationException("Only an active hold can create an order.");
        }

        if (quote.Status != QuoteStatus.Held)
        {
            throw new InvalidOperationException("Only a held quote can create an order.");
        }

        var createdAt = now ?? DateTimeOffset.UtcNow;

        if (hold.IsExpired(createdAt) || quote.IsExpired(createdAt))
        {
            throw new InvalidOperationException("The hold or quote has expired.");
        }

        if (string.IsNullOrWhiteSpace(contactEmail))
        {
            throw new ArgumentException("Contact email is required.", nameof(contactEmail));
        }

        ValidateTravelers(quote, travelers);

        var orderId = ids.NewId();
        var order = new Order(
            orderId,
            CreateNumber("HNI", orderId),
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
            string.IsNullOrWhiteSpace(contactPhone) ? null : contactPhone.Trim(),
            createdAt,
            hold.ExpiresAt);

        foreach (var currencyTotal in quote.EffectivePricing.Components
                     .GroupBy(component => component.Currency, StringComparer.OrdinalIgnoreCase))
        {
            order._paymentObligations.Add(new PaymentObligation(
                ids.NewId(),
                order.Id,
                currencyTotal.Key,
                currencyTotal.Sum(component => component.TotalAmount)));
        }

        foreach (var traveler in travelers)
        {
            order._travelers.Add(new OrderTraveler(
                ids.NewId(),
                order.Id,
                traveler.FullName,
                traveler.Type,
                traveler.DateOfBirth));
        }

        foreach (var component in quote.EffectivePricing.Components)
        {
            order._lines.Add(new OrderLine(
                ids.NewId(),
                order.Id,
                Contract.ContractLineDescription(quote),
                1,
                component.BaseAmount,
                component.TotalAmount,
                component.Currency));
        }

        order.Contract = Contract.Create(
            ids,
            order.Id,
            CreateNumber("CTR", ids.NewId()),
            createdAt,
            quote,
            hold,
            order.ContactEmail,
            order.ContactPhone,
            travelers);

        order.AddDomainEvent(new OrderCreatedDomainEvent(ids.NewId(), order.Id, order.Contract.Id));
        return order;
    }

    /// <summary>
    /// Marks one currency obligation paid. When every obligation is paid, the order
    /// lifecycle moves to <see cref="OrderStatus.Paid"/>.
    /// </summary>
    public void MarkObligationPaid(
        Guid? paymentObligationId,
        string currency,
        Guid? paymentIntentId,
        DateTimeOffset? now = null)
    {
        var obligation = paymentObligationId is { } id && id != Guid.Empty
            ? _paymentObligations.SingleOrDefault(item => item.Id == id)
            : _paymentObligations.FirstOrDefault(item =>
                string.Equals(item.Currency, currency, StringComparison.OrdinalIgnoreCase));

        if (obligation is null)
        {
            throw new InvalidOperationException("Payment obligation was not found.");
        }

        if (obligation.Status == PaymentObligationStatus.Paid)
        {
            return;
        }

        obligation.MarkPaid(paymentIntentId, now ?? DateTimeOffset.UtcNow);

        if (_paymentObligations.All(item => item.Status == PaymentObligationStatus.Paid))
        {
            Status = OrderStatus.Paid;
        }
    }

    /// <summary>
    /// Marks the order paid and settles every outstanding obligation.
    /// </summary>
    public void MarkPaid()
    {
        if (Status is not (OrderStatus.PendingPayment or OrderStatus.PartiallyPaid))
        {
            throw new InvalidOperationException("Only pending or partially paid orders can be paid.");
        }

        var now = DateTimeOffset.UtcNow;

        foreach (var obligation in _paymentObligations.Where(item =>
                     item.Status != PaymentObligationStatus.Paid))
        {
            obligation.MarkPaid(null, now);
        }

        Status = OrderStatus.Paid;
    }

    private static void ValidateTravelers(
        Quote quote,
        IReadOnlyCollection<TravelerDetails> travelers)
    {
        if (travelers.Count == 0)
        {
            throw new ArgumentException("At least one traveler is required.", nameof(travelers));
        }

        if (travelers.Any(traveler => string.IsNullOrWhiteSpace(traveler.FullName)))
        {
            throw new ArgumentException("Traveler full name is required.", nameof(travelers));
        }

        var adults = travelers.Count(traveler => traveler.Type == TravelerType.Adult);
        var children = travelers.Count(traveler => traveler.Type == TravelerType.Child);
        var infants = travelers.Count(traveler => traveler.Type == TravelerType.Infant);

        if (adults != quote.Adults || children != quote.Children || infants != quote.Infants)
        {
            throw new ArgumentException(
                "Traveler categories must match the quoted passenger mix.",
                nameof(travelers));
        }
    }

    private static string CreateNumber(string prefix, Guid id)
        => $"{prefix}-{id.ToString("N")[..12].ToUpperInvariant()}";
}
