using Hani.BuildingBlocks.Domain;
using Hani.Modules.Supply.Domain.Departures.Events;

namespace Hani.Modules.Supply.Domain.Departures;

/// <summary>
/// Concrete departure of an agency offer with capacity and prices.
/// </summary>
public sealed class TourDeparture : AggregateRoot<Guid>
{
    private readonly List<DeparturePrice> _prices = [];

    private TourDeparture()
    {
    }

    private TourDeparture(
        Guid id,
        Guid agencyOfferId,
        DateOnly startDate,
        DateOnly endDate,
        int capacity) : base(id)
    {
        AgencyOfferId = agencyOfferId;
        StartDate = startDate;
        EndDate = endDate;
        Capacity = capacity;
        SeatsLeft = capacity;
        Status = DepartureStatus.Open;
        Version = 1;
        CreatedAt = DateTimeOffset.UtcNow;
        UpdatedAt = CreatedAt;
    }

    public Guid AgencyOfferId { get; private set; }

    public DateOnly StartDate { get; private set; }

    public DateOnly EndDate { get; private set; }

    public int Capacity { get; private set; }

    public int SeatsLeft { get; private set; }

    public DepartureStatus Status { get; private set; }

    public long Version { get; private set; }

    public DateTimeOffset CreatedAt { get; private set; }

    public DateTimeOffset UpdatedAt { get; private set; }

    public IReadOnlyCollection<DeparturePrice> Prices => _prices;

    public static TourDeparture Create(
        IIdGenerator ids,
        Guid agencyOfferId,
        DateOnly startDate,
        DateOnly endDate,
        int capacity,
        IReadOnlyCollection<(RoomType RoomType, Money Price)> prices)
    {
        if (agencyOfferId == Guid.Empty)
        {
            throw new ArgumentException("Agency offer id is required.", nameof(agencyOfferId));
        }

        if (endDate <= startDate)
        {
            throw new ArgumentException("End date must be after start date.", nameof(endDate));
        }

        ArgumentOutOfRangeException.ThrowIfNegativeOrZero(capacity);

        if (prices.Count == 0)
        {
            throw new ArgumentException("At least one price is required.", nameof(prices));
        }

        if (prices
                .Select(price => (price.RoomType, Currency: price.Price.Currency.ToUpperInvariant()))
                .Distinct()
                .Count() != prices.Count)
        {
            throw new ArgumentException("Duplicate room type and currency combinations are not allowed.", nameof(prices));
        }

        var departure = new TourDeparture(
            ids.NewId(),
            agencyOfferId,
            startDate,
            endDate,
            capacity);

        foreach (var (roomType, price) in prices)
        {
            departure._prices.Add(new DeparturePrice(
                ids.NewId(),
                departure.Id,
                roomType,
                price.Amount,
                price.Currency));
        }

        departure.AddDomainEvent(new TourDepartureCreatedDomainEvent(
            ids.NewId(),
            departure.Id,
            agencyOfferId));

        return departure;
    }

    public void UpdateAvailability(int seatsLeft, long expectedVersion)
    {
        EnsureVersion(expectedVersion);

        if (Status is DepartureStatus.Closed or DepartureStatus.Cancelled)
        {
            throw new InvalidOperationException("Departure is not open for capacity changes.");
        }

        if (seatsLeft < 0 || seatsLeft > Capacity)
        {
            throw new ArgumentOutOfRangeException(nameof(seatsLeft));
        }

        SeatsLeft = seatsLeft;
        Status = seatsLeft == 0 ? DepartureStatus.SoldOut : DepartureStatus.Open;
        Touch();
    }

    public bool TryReserve(int seats)
    {
        if (seats <= 0 || Status != DepartureStatus.Open || seats > SeatsLeft)
        {
            return false;
        }

        SeatsLeft -= seats;

        if (SeatsLeft == 0)
        {
            Status = DepartureStatus.SoldOut;
        }

        Touch();
        return true;
    }

    public void Release(int seats)
    {
        ArgumentOutOfRangeException.ThrowIfNegativeOrZero(seats);

        if (Status is DepartureStatus.Closed or DepartureStatus.Cancelled)
        {
            throw new InvalidOperationException("Departure is not open for release.");
        }

        SeatsLeft = Math.Min(Capacity, SeatsLeft + seats);

        if (Status == DepartureStatus.SoldOut && SeatsLeft > 0)
        {
            Status = DepartureStatus.Open;
        }

        Touch();
    }

    public void UpdatePrice(IIdGenerator ids, RoomType roomType, Money price, long expectedVersion)
    {
        EnsureVersion(expectedVersion);

        var existing = _prices.SingleOrDefault(item =>
            item.RoomType == roomType &&
            string.Equals(item.Currency, price.Currency, StringComparison.OrdinalIgnoreCase));

        if (existing is null)
        {
            _prices.Add(new DeparturePrice(
                ids.NewId(),
                Id,
                roomType,
                price.Amount,
                price.Currency));
        }
        else
        {
            existing.Update(price);
        }

        Touch();
    }

    public void Close()
    {
        Status = DepartureStatus.Closed;
        Touch();
    }

    private void EnsureVersion(long expectedVersion)
    {
        if (expectedVersion != Version)
        {
            throw new DepartureConcurrencyException(Id, expectedVersion, Version);
        }
    }

    private void Touch()
    {
        Version++;
        UpdatedAt = DateTimeOffset.UtcNow;
    }
}
