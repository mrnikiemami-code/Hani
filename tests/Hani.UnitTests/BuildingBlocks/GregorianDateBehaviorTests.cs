using Hani.BuildingBlocks.Application;
using MediatR;
using Shouldly;

namespace Hani.UnitTests.BuildingBlocks;

public sealed class GregorianDateBehaviorTests
{
    private static RequestHandlerDelegate<Result<string>> Next(bool[] called) =>
        _ =>
        {
            called[0] = true;
            return Task.FromResult(Result<string>.Success("ok"));
        };

    [Fact]
    public async Task Rejects_jalali_shaped_year_before_handler()
    {
        var behavior = new GregorianDateBehavior<TestRequest, Result<string>>();
        var called = new[] { false };
        var request = new TestRequest(new DateOnly(1405, 8, 25), null);

        var result = await behavior.Handle(
            request,
            Next(called),
            CancellationToken.None);

        result.IsSuccess.ShouldBeFalse();
        result.Error!.Code.ShouldBe("HANI-COMMON-1003");
        result.Error.Errors!.ShouldContainKey("StartDate");
        called[0].ShouldBeFalse();
    }

    [Fact]
    public async Task Rejects_reversed_range()
    {
        var behavior = new GregorianDateBehavior<TestRequest, Result<string>>();
        var called = new[] { false };
        var request = new TestRequest(
            new DateOnly(2026, 11, 20),
            new DateOnly(2026, 11, 16));

        var result = await behavior.Handle(
            request,
            Next(called),
            CancellationToken.None);

        result.IsSuccess.ShouldBeFalse();
        result.Error!.Errors!.ShouldContainKey("StartDate");
        called[0].ShouldBeFalse();
    }

    [Fact]
    public async Task Accepts_ordered_gregorian_dates()
    {
        var behavior = new GregorianDateBehavior<TestRequest, Result<string>>();
        var called = new[] { false };
        var request = new TestRequest(
            new DateOnly(2026, 11, 16),
            new DateOnly(2026, 11, 20));

        var result = await behavior.Handle(
            request,
            Next(called),
            CancellationToken.None);

        result.IsSuccess.ShouldBeTrue();
        called[0].ShouldBeTrue();
    }

    private sealed record TestRequest(DateOnly? StartDate, DateOnly? EndDate);
}
