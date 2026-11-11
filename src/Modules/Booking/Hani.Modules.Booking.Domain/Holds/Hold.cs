using Hani.BuildingBlocks.Domain;
using Hani.Modules.Booking.Domain.Holds.Events;

namespace Hani.Modules.Booking.Domain.Holds;

/// <summary>
/// Time-limited reservation of seats for a quote.
/// </summary>
public sealed class Hold : AggregateRoot<Guid>
{
    private Hold()
    {
    }

    private Hold(
        Guid id,
        Guid quoteId,
        Guid departureId,
        int seats,
        DateTimeOffset createdAt,
        DateTimeOffset expiresAt) : base(id)
    {
        QuoteId = quoteId;
        DepartureId = departureId;
        Seats = seats;
        CreatedAt = createdAt;
        ExpiresAt = expiresAt;
        Status = HoldStatus.Active;
    }

    public Guid QuoteId { get; private set; }

    public Guid DepartureId { get; private set; }

    public int Seats { get; private set; }

    public HoldStatus Status { get; private set; }

    public DateTimeOffset CreatedAt { get; private set; }

    public DateTimeOffset ExpiresAt { get; private set; }

    public static Hold Create(
        IIdGenerator ids,
        Guid quoteId,
        Guid departureId,
        int seats,
        DateTimeOffset? now = null)
    {
        if (quoteId == Guid.Empty || departureId == Guid.Empty || seats < 1)
        {
            throw new ArgumentException("Quote, departure, and seats are required.");
        }

        var createdAt = now ?? DateTimeOffset.UtcNow;
        var hold = new Hold(
            ids.NewId(),
            quoteId,
            departureId,
            seats,
            createdAt,
            createdAt.AddMinutes(15));

        hold.AddDomainEvent(new HoldCreatedDomainEvent(ids.NewId(), hold.Id, quoteId));
        return hold;
    }

    /// <summary>
    /// True when the hold validity window has passed.
    /// </summary>
    public bool IsExpired(DateTimeOffset now) => now >= ExpiresAt;

    /// <summary>
    /// Releases the hold; seats must be returned by the inventory service.
    /// </summary>
    public void Release()
    {
        if (Status == HoldStatus.Active)
        {
            Status = HoldStatus.Released;
        }
    }

    /// <summary>
    /// Marks the hold as consumed by a confirmed booking.
    /// </summary>
    public void Consume()
    {
        if (Status != HoldStatus.Active)
        {
            throw new InvalidOperationException("Only active holds can be consumed.");
        }

        Status = HoldStatus.Consumed;
    }

    /// <summary>
    /// Expires the hold if it is still active.
    /// </summary>
    public void Expire()
    {
        if (Status == HoldStatus.Active)
        {
            Status = HoldStatus.Expired;
        }
    }
}
