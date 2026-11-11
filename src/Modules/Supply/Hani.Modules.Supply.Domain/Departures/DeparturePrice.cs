using Hani.BuildingBlocks.Domain;

namespace Hani.Modules.Supply.Domain.Departures;

public sealed class DeparturePrice : Entity<Guid>
{
    private DeparturePrice()
    {
    }

    internal DeparturePrice(
        Guid id,
        Guid tourDepartureId,
        RoomType roomType,
        decimal amount,
        string currency) : base(id)
    {
        TourDepartureId = tourDepartureId;
        RoomType = roomType;
        Amount = amount;
        Currency = currency;
    }

    public Guid TourDepartureId { get; private set; }

    public RoomType RoomType { get; private set; }

    public decimal Amount { get; private set; }

    public string Currency { get; private set; } = string.Empty;

    internal void Update(Money price)
    {
        Amount = price.Amount;
        Currency = price.Currency;
    }
}
