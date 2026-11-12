using Hani.BuildingBlocks.Domain.Pricing;
using Hani.Modules.Booking.Domain.Holds;
using Hani.Modules.Booking.Domain.Orders;
using Hani.Modules.Booking.Domain.Quotes;
using Shouldly;

namespace Hani.UnitTests.Booking;

public sealed class OrderTests
{
    [Fact]
    public void Create_Should_Issue_Order_And_Immutable_Contract()
    {
        var quote = CreateQuote();
        quote.MarkHeld();
        var hold = Hold.Create(TestIds.Generator, quote.Id, quote.DepartureId, quote.Seats);

        var order = Order.Create(
            TestIds.Generator,
            hold,
            quote,
            "traveler@example.com",
            "+989120000000",
            CreateTravelers());

        order.Status.ShouldBe(OrderStatus.PendingPayment);
        order.OrderNumber.ShouldStartWith("HNI-");
        order.Contract.ContractNumber.ShouldStartWith("CTR-");
        order.Contract.Total.ShouldBe(quote.Total);
        order.Contract.Currency.ShouldBe(quote.Currency);
        order.Contract.Travelers.Count.ShouldBe(3);
        order.Contract.Lines.Count.ShouldBe(1);
        order.Travelers.Count.ShouldBe(3);
        order.Lines.Count.ShouldBe(1);
        order.DomainEvents.Count.ShouldBe(1);
        order.PaymentDueAt.ShouldBe(hold.ExpiresAt);
    }

    [Fact]
    public void Create_Should_Reject_Non_Active_Hold()
    {
        var quote = CreateQuote();
        quote.MarkHeld();
        var hold = Hold.Create(TestIds.Generator, quote.Id, quote.DepartureId, quote.Seats);
        hold.Release();

        Should.Throw<InvalidOperationException>(() =>
            Order.Create(
                TestIds.Generator,
                hold,
                quote,
                "traveler@example.com",
                null,
                CreateTravelers()));
    }

    [Fact]
    public void Create_Should_Reject_Traveler_Count_Mismatch()
    {
        var quote = CreateQuote();
        quote.MarkHeld();
        var hold = Hold.Create(TestIds.Generator, quote.Id, quote.DepartureId, quote.Seats);

        Should.Throw<ArgumentException>(() =>
            Order.Create(
                TestIds.Generator,
                hold,
                quote,
                "traveler@example.com",
                null,
                [
                    new TravelerDetails("Only Adult", TravelerType.Adult)
                ]));
    }

    [Fact]
    public void MarkPaid_Should_Change_Status_Once()
    {
        var quote = CreateQuote();
        quote.MarkHeld();
        var hold = Hold.Create(TestIds.Generator, quote.Id, quote.DepartureId, quote.Seats);
        var order = Order.Create(
            TestIds.Generator,
            hold,
            quote,
            "traveler@example.com",
            null,
            CreateTravelers());

        order.MarkPaid();
        order.Status.ShouldBe(OrderStatus.Paid);

        Should.Throw<InvalidOperationException>(() => order.MarkPaid());
    }

    [Fact]
    public void Create_Should_Preserve_MultiCurrency_Pricing_Snapshot()
    {
        var pricing = new PricingSnapshot(
        [
            new PriceComponentSnapshot(
                PriceComponentKind.Base,
                200m,
                "IRR",
                new TaxChargeSnapshot(TaxStatus.Applicable, 0.01m, 2m),
                new TaxChargeSnapshot(TaxStatus.Applicable, 0.09m, 18m),
                220m),
            new PriceComponentSnapshot(
                PriceComponentKind.Base,
                10m,
                "USD",
                new TaxChargeSnapshot(TaxStatus.NotApplicable, 0m, 0m),
                new TaxChargeSnapshot(TaxStatus.Applicable, 0.05m, 0.5m),
                10.5m)
        ]);

        var quote = Quote.Create(
            TestIds.Generator,
            Guid.CreateVersion7(),
            Guid.CreateVersion7(),
            Guid.CreateVersion7(),
            "Double",
            2,
            1,
            0,
            3,
            100m,
            220m,
            "IRR",
            pricing: pricing);
        quote.MarkHeld();
        var hold = Hold.Create(TestIds.Generator, quote.Id, quote.DepartureId, quote.Seats);

        var order = Order.Create(
            TestIds.Generator,
            hold,
            quote,
            "traveler@example.com",
            null,
            CreateTravelers());

        order.EffectivePricing.Components.Count.ShouldBe(2);
        order.Lines.Count.ShouldBe(2);
        order.Contract.Lines.Count.ShouldBe(2);
        order.Contract.EffectivePricing.Find("USD")!.TotalAmount.ShouldBe(10.5m);
        order.PaymentObligations.Count.ShouldBe(2);
        order.PaymentStatus.ShouldBe(OrderPaymentStatus.Unpaid);

        var irr = order.PaymentObligations.Single(item => item.Currency == "IRR");
        order.MarkObligationPaid(irr.Id, "IRR", Guid.CreateVersion7());
        order.PaymentStatus.ShouldBe(OrderPaymentStatus.PartiallyPaid);

        var usd = order.PaymentObligations.Single(item => item.Currency == "USD");
        order.MarkObligationPaid(usd.Id, "USD", Guid.CreateVersion7());
        order.PaymentStatus.ShouldBe(OrderPaymentStatus.Paid);
        order.Status.ShouldBe(OrderStatus.Paid);
    }

    private static Quote CreateQuote()
        => Quote.Create(
            TestIds.Generator,
            Guid.CreateVersion7(),
            Guid.CreateVersion7(),
            Guid.CreateVersion7(),
            "Double",
            2,
            1,
            0,
            3,
            100m,
            250m,
            "IRR");

    private static TravelerDetails[] CreateTravelers()
        =>
        [
            new TravelerDetails("Adult One", TravelerType.Adult),
            new TravelerDetails("Adult Two", TravelerType.Adult),
            new TravelerDetails("Child One", TravelerType.Child)
        ];
}
