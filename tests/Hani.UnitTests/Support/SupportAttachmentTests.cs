using Hani.Modules.Content.Domain.Support;
using Shouldly;

namespace Hani.UnitTests.Support;

public sealed class SupportAttachmentTests
{
    [Fact]
    public void Create_Should_Start_Pending_And_Attach_Once()
    {
        var attachment = SupportAttachment.Create(
            TestIds.Generator,
            Guid.CreateVersion7(),
            "invoice.pdf",
            "application/pdf",
            1200,
            "support/ticket/attachment.pdf",
            Guid.CreateVersion7());

        attachment.MessageId.ShouldBeNull();
        attachment.ContentType.ShouldBe("application/pdf");

        var messageId = Guid.CreateVersion7();
        attachment.AttachToMessage(messageId);
        attachment.MessageId.ShouldBe(messageId);

        Should.Throw<InvalidOperationException>(() =>
            attachment.AttachToMessage(Guid.CreateVersion7()));
    }

    [Fact]
    public void Create_Should_Reject_Oversized_Files()
    {
        Should.Throw<ArgumentException>(() =>
            SupportAttachment.Create(
                TestIds.Generator,
                Guid.CreateVersion7(),
                "large.pdf",
                "application/pdf",
                11 * 1024 * 1024,
                "support/ticket/large.pdf",
                Guid.CreateVersion7()));
    }
}

public sealed class SupportTicketNumberTests
{
    [Fact]
    public void Rapidly_Created_Tickets_Should_Not_Share_Numbers()
    {
        var first = SupportTicket.Create(
            TestIds.Generator,
            null,
            "Customer",
            "customer@example.com",
            null,
            "First",
            "Booking",
            "First message");
        var second = SupportTicket.Create(
            TestIds.Generator,
            null,
            "Customer",
            "customer@example.com",
            null,
            "Second",
            "Booking",
            "Second message");

        first.TicketNumber.ShouldNotBe(second.TicketNumber);
    }
}
