using Hani.Modules.Booking.Domain.Holds;
using Hani.Modules.Booking.Domain.Quotes;
using Shouldly;

namespace Hani.UnitTests.Booking;

public sealed class BookingDomainTests
{
    [Fact]
    public void Quote_Should_Expire_After_Fifteen_Minutes()
    {
        var now = new DateTimeOffset(2026, 11, 11, 10, 0, 0, TimeSpan.Zero);
        var quote = Quote.Create(
            TestIds.Generator,
            Guid.CreateVersion7(),
            Guid.CreateVersion7(),
            Guid.CreateVersion7(),
            "Double",
            2,
            0,
            0,
            2,
            45_000_000m,
            90_000_000m,
            "IRR",
            now);

        quote.IsExpired(now.AddMinutes(14)).ShouldBeFalse();
        quote.IsExpired(now.AddMinutes(16)).ShouldBeTrue();
        quote.Status.ShouldBe(QuoteStatus.Active);
    }

    [Fact]
    public void Quote_Should_Be_Held_Once()
    {
        var quote = CreateQuote();

        quote.MarkHeld();
        quote.Status.ShouldBe(QuoteStatus.Held);

        Should.Throw<InvalidOperationException>(() => quote.MarkHeld());
    }

    [Fact]
    public void Quote_Should_Be_Converted_Once()
    {
        var quote = CreateQuote();
        quote.MarkHeld();

        quote.MarkConverted();
        quote.Status.ShouldBe(QuoteStatus.Converted);

        Should.Throw<InvalidOperationException>(() => quote.MarkConverted());
    }

    [Fact]
    public void Quote_Should_Return_To_Active_When_Hold_Is_Released()
    {
        var quote = CreateQuote();
        quote.MarkHeld();

        quote.ReleaseHold();

        quote.Status.ShouldBe(QuoteStatus.Active);
    }

    [Fact]
    public void Hold_Should_Release_And_Consume()
    {
        var active = CreateHold();
        active.Release();
        active.Status.ShouldBe(HoldStatus.Released);

        var consumable = CreateHold();
        consumable.Consume();
        consumable.Status.ShouldBe(HoldStatus.Consumed);
    }

    [Fact]
    public void Hold_Should_Expire()
    {
        var now = new DateTimeOffset(2026, 11, 11, 10, 0, 0, TimeSpan.Zero);
        var hold = Hold.Create(
            TestIds.Generator,
            Guid.CreateVersion7(),
            Guid.CreateVersion7(),
            2,
            now);

        hold.IsExpired(now.AddMinutes(14)).ShouldBeFalse();
        hold.IsExpired(now.AddMinutes(16)).ShouldBeTrue();
    }

    private static Quote CreateQuote()
        => Quote.Create(
            TestIds.Generator,
            Guid.CreateVersion7(),
            Guid.CreateVersion7(),
            Guid.CreateVersion7(),
            "Double",
            2,
            0,
            0,
            2,
            10m,
            20m,
            "IRR");

    private static Hold CreateHold()
        => Hold.Create(
            TestIds.Generator,
            Guid.CreateVersion7(),
            Guid.CreateVersion7(),
            2);
}
