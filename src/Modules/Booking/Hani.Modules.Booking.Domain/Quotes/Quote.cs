using Hani.BuildingBlocks.Domain;
using Hani.Modules.Booking.Domain.Quotes.Events;

namespace Hani.Modules.Booking.Domain.Quotes;

/// <summary>
/// Priced, time-limited offer for a departure and passenger mix.
/// </summary>
public sealed class Quote : AggregateRoot<Guid>
{
    private Quote()
    {
    }

    private Quote(
        Guid id,
        Guid departureId,
        Guid agencyOfferId,
        Guid agencyId,
        string roomType,
        int adults,
        int children,
        int infants,
        int seats,
        decimal unitPrice,
        decimal total,
        string currency,
        DateTimeOffset createdAt,
        DateTimeOffset expiresAt) : base(id)
    {
        DepartureId = departureId;
        AgencyOfferId = agencyOfferId;
        AgencyId = agencyId;
        RoomType = roomType;
        Adults = adults;
        Children = children;
        Infants = infants;
        Seats = seats;
        UnitPrice = unitPrice;
        Total = total;
        Currency = currency;
        CreatedAt = createdAt;
        ExpiresAt = expiresAt;
        Status = QuoteStatus.Active;
    }

    public Guid DepartureId { get; private set; }

    public Guid AgencyOfferId { get; private set; }

    public Guid AgencyId { get; private set; }

    public string RoomType { get; private set; } = string.Empty;

    public int Adults { get; private set; }

    public int Children { get; private set; }

    public int Infants { get; private set; }

    public int Seats { get; private set; }

    public decimal UnitPrice { get; private set; }

    public decimal Total { get; private set; }

    public string Currency { get; private set; } = string.Empty;

    public QuoteStatus Status { get; private set; }

    public DateTimeOffset CreatedAt { get; private set; }

    public DateTimeOffset ExpiresAt { get; private set; }

    public static Quote Create(
        IIdGenerator ids,
        Guid departureId,
        Guid agencyOfferId,
        Guid agencyId,
        string roomType,
        int adults,
        int children,
        int infants,
        int seats,
        decimal unitPrice,
        decimal total,
        string currency,
        DateTimeOffset? now = null)
    {
        if (departureId == Guid.Empty || agencyOfferId == Guid.Empty || agencyId == Guid.Empty)
        {
            throw new ArgumentException("Departure, offer, and agency are required.");
        }

        if (string.IsNullOrWhiteSpace(roomType) || string.IsNullOrWhiteSpace(currency))
        {
            throw new ArgumentException("Room type and currency are required.");
        }

        if (adults < 1 || children < 0 || infants < 0 || seats < 1)
        {
            throw new ArgumentOutOfRangeException(nameof(adults));
        }

        var createdAt = now ?? DateTimeOffset.UtcNow;
        var quote = new Quote(
            ids.NewId(),
            departureId,
            agencyOfferId,
            agencyId,
            roomType.Trim(),
            adults,
            children,
            infants,
            seats,
            unitPrice,
            total,
            currency.ToUpperInvariant(),
            createdAt,
            createdAt.AddMinutes(15));

        quote.AddDomainEvent(new QuoteCreatedDomainEvent(ids.NewId(), quote.Id, departureId));
        return quote;
    }

    /// <summary>
    /// True when the quote validity window has passed.
    /// </summary>
    public bool IsExpired(DateTimeOffset now) => now >= ExpiresAt;

    /// <summary>
    /// Marks the quote as used by an active hold.
    /// </summary>
    public void MarkHeld()
    {
        if (Status != QuoteStatus.Active)
        {
            throw new InvalidOperationException("Only active quotes can be held.");
        }

        Status = QuoteStatus.Held;
    }

    /// <summary>
    /// Returns a held quote to active after its hold is released.
    /// </summary>
    public void ReleaseHold()
    {
        if (Status == QuoteStatus.Held)
        {
            Status = QuoteStatus.Active;
        }
    }

    /// <summary>
    /// Marks a held quote as converted into an order.
    /// </summary>
    public void MarkConverted()
    {
        if (Status != QuoteStatus.Held)
        {
            throw new InvalidOperationException("Only a held quote can be converted.");
        }

        Status = QuoteStatus.Converted;
    }

    /// <summary>
    /// Expires the quote if it is still active.
    /// </summary>
    public void Expire()
    {
        if (Status == QuoteStatus.Active)
        {
            Status = QuoteStatus.Expired;
        }
    }
}
