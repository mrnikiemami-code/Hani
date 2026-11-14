using Hani.BuildingBlocks.Domain.Pricing;
using Hani.Modules.Booking.Domain.Installments;
using Hani.Modules.Booking.Domain.Leads;
using Hani.Modules.Booking.Domain.PriceDiscrepancies;
using Hani.Modules.Booking.Domain.ReservationRequests;
using Hani.Modules.Payments.Domain.OfflinePayments;
using Shouldly;

namespace Hani.UnitTests.Booking;

public sealed class Gate4Tests
{
    [Fact]
    public void Reservation_Request_Should_Require_NonOnline_Mode_And_Confirm()
    {
        var pricing = new PricingSnapshot(
            PricingSnapshot.Single(100m, "IRR").Components,
            BookingMode: "ReservationRequest");

        var request = ReservationRequest.Create(
            TestIds.Generator,
            Guid.CreateVersion7(),
            Guid.CreateVersion7(),
            Guid.CreateVersion7(),
            Guid.CreateVersion7(),
            "Double",
            2,
            1,
            0,
            "customer@example.com",
            "+989120000000",
            "Please confirm availability.",
            pricing,
            DateTimeOffset.UtcNow.AddHours(24));

        request.Status.ShouldBe(ReservationRequestStatus.PendingAgencyReview);
        request.RequestNumber.ShouldStartWith("RSV-");

        request.Confirm("Confirmed by agency");
        request.Status.ShouldBe(ReservationRequestStatus.Confirmed);
        Should.Throw<InvalidOperationException>(() => request.Reject("too late"));
    }

    [Fact]
    public void Reservation_Request_Should_Reject_Online_Offers()
    {
        Should.Throw<InvalidOperationException>(() => ReservationRequest.Create(
            TestIds.Generator,
            Guid.CreateVersion7(),
            Guid.CreateVersion7(),
            Guid.CreateVersion7(),
            Guid.CreateVersion7(),
            "Double",
            1,
            0,
            0,
            "customer@example.com",
            null,
            null,
            PricingSnapshot.Single(100m, "IRR"),
            DateTimeOffset.UtcNow.AddHours(24)));
    }

    [Fact]
    public void Lead_Should_Be_Matched_And_Closed()
    {
        var lead = LeadRequest.Create(
            TestIds.Generator,
            LeadServiceType.Custom,
            "Japan",
            new DateOnly(2027, 4, 1),
            new DateOnly(2027, 4, 10),
            2,
            0,
            0,
            5000m,
            "USD",
            "Customer",
            "customer@example.com",
            "+989120000000",
            "Custom itinerary");

        lead.Status.ShouldBe(LeadStatus.Open);
        lead.Match(Guid.CreateVersion7(), TestIds.Generator);
        lead.Status.ShouldBe(LeadStatus.Matched);
        lead.Invitations.Count.ShouldBe(1);
        lead.Close();
        lead.Status.ShouldBe(LeadStatus.Closed);
    }

    [Fact]
    public void Lead_Distribution_Should_Invite_Distinct_Agencies_Once()
    {
        var lead = LeadRequest.Create(
            TestIds.Generator,
            LeadServiceType.Tour,
            "Istanbul",
            null,
            null,
            2,
            0,
            0,
            null,
            null,
            "Customer",
            "customer@example.com",
            "+989120000000",
            null);

        var first = Guid.CreateVersion7();
        var second = Guid.CreateVersion7();

        lead.InviteAgencies([first, second, first], TestIds.Generator)
            .ShouldBe(2);
        lead.InviteAgencies([first, second], TestIds.Generator)
            .ShouldBe(0);
        lead.Invitations.Count.ShouldBe(2);
        lead.Status.ShouldBe(LeadStatus.Matched);
    }

    [Fact]
    public void Price_Discrepancy_Should_Be_Resolved()
    {
        var report = PriceDiscrepancyReport.Create(
            TestIds.Generator,
            Guid.CreateVersion7(),
            Guid.CreateVersion7(),
            "customer@example.com",
            100m,
            "USD",
            "Displayed price differs from checkout.");

        report.Review();
        report.Status.ShouldBe(PriceDiscrepancyStatus.Reviewed);
        report.Resolve("Price corrected.");
        report.Status.ShouldBe(PriceDiscrepancyStatus.Resolved);
    }

    [Fact]
    public void Installment_Plan_Should_Schedule_And_Complete()
    {
        var plan = InstallmentPlan.Create(
            TestIds.Generator,
            Guid.CreateVersion7(),
            "IRR",
            1000m,
            3,
            30);

        plan.Installments.Count.ShouldBe(3);
        plan.Installments.Sum(item => item.Amount).ShouldBe(1000m);

        foreach (var installment in plan.Installments)
        {
            plan.Pay(installment.Sequence);
        }

        plan.Status.ShouldBe(InstallmentPlanStatus.Completed);
        plan.Installments.All(item => item.Status == InstallmentStatus.Paid).ShouldBeTrue();
    }

    [Fact]
    public void Offline_Receipt_Should_Validate_Input()
    {
        var receipt = OfflinePaymentReceipt.Create(
            TestIds.Generator,
            Guid.CreateVersion7(),
            Guid.CreateVersion7(),
            1000m,
            "IRR",
            OfflinePaymentMethod.Cash,
            "CASH-1",
            "operator");

        receipt.Amount.ShouldBe(1000m);
        receipt.Currency.ShouldBe("IRR");

        Should.Throw<ArgumentException>(() => OfflinePaymentReceipt.Create(
            TestIds.Generator,
            Guid.CreateVersion7(),
            Guid.CreateVersion7(),
            0m,
            "IRR",
            OfflinePaymentMethod.Cash,
            null,
            "operator"));
    }
}
