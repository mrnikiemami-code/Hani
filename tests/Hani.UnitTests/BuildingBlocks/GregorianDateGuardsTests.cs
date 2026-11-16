using Hani.BuildingBlocks.Application;
using Shouldly;

namespace Hani.UnitTests.BuildingBlocks;

public sealed class GregorianDateGuardsTests
{
    [Theory]
    [InlineData(1900, 1, 1)]
    [InlineData(2026, 11, 16)]
    [InlineData(2100, 12, 31)]
    public void Accepted_years_pass(int year, int month, int day)
    {
        GregorianDateGuards.IsAccepted(new DateOnly(year, month, day)).ShouldBeTrue();
    }

    [Theory]
    [InlineData(1405, 8, 25)]
    [InlineData(1899, 12, 31)]
    [InlineData(2101, 1, 1)]
    public void Jalali_or_out_of_range_years_fail(int year, int month, int day)
    {
        GregorianDateGuards.IsAccepted(new DateOnly(year, month, day)).ShouldBeFalse();
    }

    [Fact]
    public void Null_dates_are_accepted()
    {
        GregorianDateGuards.IsAccepted(null).ShouldBeTrue();
        GregorianDateGuards.IsOrdered(null, null).ShouldBeTrue();
    }

    [Fact]
    public void Range_must_be_ordered()
    {
        GregorianDateGuards.IsOrdered(
            new DateOnly(2026, 11, 16),
            new DateOnly(2026, 11, 20)).ShouldBeTrue();

        GregorianDateGuards.IsOrdered(
            new DateOnly(2026, 11, 20),
            new DateOnly(2026, 11, 16)).ShouldBeFalse();
    }
}
