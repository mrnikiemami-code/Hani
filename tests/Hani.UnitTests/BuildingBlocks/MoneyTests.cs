using Hani.BuildingBlocks.Domain;
using Shouldly;

namespace Hani.UnitTests.BuildingBlocks;

public sealed class MoneyTests
{
    [Fact]
    public void Of_Should_Normalize_Currency()
    {
        var money = Money.Of(1_000m, "irr");

        money.Amount.ShouldBe(1_000m);
        money.Currency.ShouldBe("IRR");
    }

    [Fact]
    public void Of_Should_Reject_Negative_Amount()
    {
        Should.Throw<ArgumentOutOfRangeException>(() => Money.Of(-1m, "IRR"));
    }

    [Fact]
    public void Of_Should_Reject_Invalid_Currency()
    {
        Should.Throw<ArgumentException>(() => Money.Of(1m, "IR"));
    }
}
