using Hani.Modules.Content.Domain.Growth;
using Hani.Modules.Content.Domain.Support;
using Shouldly;

namespace Hani.UnitTests.Operations;

public sealed class OperationsTests
{
    [Fact]
    public void Customer_Reply_Reopens_Waiting_Ticket()
    {
        var ticket = SupportTicket.Create(
            TestIds.Generator,
            null,
            "Test Customer",
            "customer@example.com",
            null,
            "Booking issue",
            "Booking",
            "Please check my booking.");

        ticket.AddMessage(
            TestIds.Generator,
            SupportAuthorType.Admin,
            Guid.CreateVersion7(),
            "We are checking it.");
        ticket.Status.ShouldBe(SupportTicketStatus.WaitingCustomer);

        ticket.AddMessage(
            TestIds.Generator,
            SupportAuthorType.Customer,
            null,
            "Any update?");
        ticket.Status.ShouldBe(SupportTicketStatus.Open);
        ticket.Messages.Count.ShouldBe(3);
    }

    [Fact]
    public void Failed_Notification_Can_Be_Requeued()
    {
        var notification = Notification.Create(
            TestIds.Generator,
            null,
            ContactChannel.Email,
            "welcome",
            "{\"name\":\"Test\"}");
        notification.MarkFailed("smtp_error");
        notification.Status.ShouldBe(NotificationStatus.Failed);

        notification.Retry();
        notification.Status.ShouldBe(NotificationStatus.Pending);
        notification.LastError.ShouldBeNull();
        notification.NextAttemptAt.ShouldNotBeNull();
    }
}
