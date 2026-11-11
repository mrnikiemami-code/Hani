using Hani.BuildingBlocks.Domain;
using Hani.Modules.Supply.Domain.Departures;
using Shouldly;

namespace Hani.UnitTests.Supply;

public sealed class TourDepartureTests
{
    private static readonly DateOnly Start = new(2026, 11, 16);
    private static readonly DateOnly End = new(2026, 11, 19);

    [Fact]
    public void Create_Should_Start_Open_With_Full_Capacity()
    {
        var departure = CreateDeparture();

        departure.Status.ShouldBe(DepartureStatus.Open);
        departure.SeatsLeft.ShouldBe(10);
        departure.Version.ShouldBe(1);
        departure.Prices.Count.ShouldBe(2);
    }

    [Fact]
    public void TryReserve_Should_Decrement_And_Mark_SoldOut()
    {
        var departure = CreateDeparture(capacity: 2);

        departure.TryReserve(2).ShouldBeTrue();

        departure.SeatsLeft.ShouldBe(0);
        departure.Status.ShouldBe(DepartureStatus.SoldOut);
        departure.Version.ShouldBe(2);
    }

    [Fact]
    public void TryReserve_Should_Reject_When_Not_Enough_Seats()
    {
        var departure = CreateDeparture(capacity: 2);

        departure.TryReserve(3).ShouldBeFalse();

        departure.SeatsLeft.ShouldBe(2);
        departure.Status.ShouldBe(DepartureStatus.Open);
    }

    [Fact]
    public void UpdateAvailability_Should_Reject_Stale_Version()
    {
        var departure = CreateDeparture();

        Should.Throw<DepartureConcurrencyException>(() =>
            departure.UpdateAvailability(5, expectedVersion: 99));
    }

    [Fact]
    public void UpdatePrice_Should_Change_Existing_Price()
    {
        var departure = CreateDeparture();
        var version = departure.Version;

        departure.UpdatePrice(TestIds.Generator, RoomType.Double, Money.Of(50_000_000m, "IRR"), version);

        var price = departure.Prices.Single(item => item.RoomType == RoomType.Double);
        price.Amount.ShouldBe(50_000_000m);
        price.Currency.ShouldBe("IRR");
    }

    [Fact]
    public void Release_Should_Reopen_SoldOut_Departure()
    {
        var departure = CreateDeparture(capacity: 1);
        departure.TryReserve(1);

        departure.Release(1);

        departure.SeatsLeft.ShouldBe(1);
        departure.Status.ShouldBe(DepartureStatus.Open);
    }

    private static TourDeparture CreateDeparture(int capacity = 10)
        => TourDeparture.Create(
            TestIds.Generator,
            Guid.CreateVersion7(),
            Start,
            End,
            capacity,
            [
                (RoomType.Double, Money.Of(45_000_000m, "IRR")),
                (RoomType.Single, Money.Of(60_000_000m, "IRR"))
            ]);
}
