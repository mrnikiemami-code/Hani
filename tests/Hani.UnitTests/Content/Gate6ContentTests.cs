using Hani.Modules.Content.Domain.Content;
using Hani.Modules.Content.Domain.Growth;
using Shouldly;

namespace Hani.UnitTests.Content;

public sealed class Gate6ContentTests
{
    [Fact]
    public void Blog_Should_Publish_And_Track_Counters()
    {
        var post = BlogPost.Create(TestIds.Generator, "istanbul-guide", Guid.CreateVersion7());
        post.AddTranslation(TestIds.Generator, "en", "Istanbul", "Excerpt", "Body", "SEO", "SEO desc");
        post.Publish();
        post.IncrementView();
        post.IncrementLike();

        post.Status.ShouldBe(ContentStatus.Published);
        post.Translations.Single().Title.ShouldBe("Istanbul");
        post.ViewCount.ShouldBe(1);
        post.LikeCount.ShouldBe(1);
    }

    [Fact]
    public void Travelogue_Should_Keep_Series_And_Destinations()
    {
        var travelogue = Travelogue.Create(
            TestIds.Generator,
            "road-to-north",
            Guid.CreateVersion7(),
            "North series");
        travelogue.AddTranslation(TestIds.Generator, "fa", "سفر شمال", "متن");
        travelogue.ReplaceDestinations(TestIds.Generator, [Guid.CreateVersion7()]);

        travelogue.SeriesName.ShouldBe("North series");
        travelogue.Destinations.Count.ShouldBe(1);
    }

    [Fact]
    public void Video_Should_Validate_Level_And_Publish()
    {
        var video = Video.Create(
            TestIds.Generator,
            "aparat-video",
            Guid.CreateVersion7(),
            "https://aparat.example/v/1",
            "Aparat",
            durationSeconds: 120,
            level: 3);
        video.AddTranslation(TestIds.Generator, "en", "Video", "Description");
        video.Publish();

        video.Level.ShouldBe(3);
        video.Status.ShouldBe(ContentStatus.Published);
    }

    [Fact]
    public void Comment_Should_Be_Moderated()
    {
        var comment = ContentComment.Create(
            TestIds.Generator,
            ContentType.Blog,
            Guid.CreateVersion7(),
            null,
            "Guest",
            "Nice post");
        comment.Publish();
        comment.Status.ShouldBe(CommentStatus.Published);

        var rejected = ContentComment.Create(
            TestIds.Generator,
            ContentType.Video,
            Guid.CreateVersion7(),
            null,
            "Guest",
            "Spam");
        rejected.Reject();
        rejected.Status.ShouldBe(CommentStatus.Rejected);
    }

    [Fact]
    public void Newsletter_Should_Verify_And_Unsubscribe()
    {
        var subscription = NewsletterSubscription.Create(
            TestIds.Generator,
            "guest@example.com",
            ContactChannel.Email,
            "en",
            "123456");
        subscription.Confirm("123456");
        subscription.Status.ShouldBe(SubscriptionStatus.Confirmed);
        subscription.Unsubscribe();
        subscription.Status.ShouldBe(SubscriptionStatus.Unsubscribed);
    }

    [Fact]
    public void Campaign_Should_Activate_Within_Range_And_Register()
    {
        var now = DateTimeOffset.UtcNow;
        var campaign = Campaign.Create(
            TestIds.Generator,
            "blind-tour",
            now.AddDays(-1),
            now.AddDays(10),
            price: 12_000_000m,
            currency: "IRR",
            discountPercent: 15m);
        campaign.AddTranslation(TestIds.Generator, "fa", "تور مبهم", "توضیح");
        campaign.AddFaq(TestIds.Generator, "شرایط؟", "پاسخ");
        campaign.Activate(now);

        campaign.Status.ShouldBe(CampaignStatus.Active);
        campaign.Faqs.Count.ShouldBe(1);

        var registration = CampaignRegistration.Create(
            TestIds.Generator,
            campaign.Id,
            "Guest",
            "09120000000",
            ContactChannel.Sms);
        registration.Confirm();
        registration.Status.ShouldBe(CampaignRegistrationStatus.Confirmed);
    }

    [Fact]
    public void Notification_Should_Retry_And_Then_Send()
    {
        var notification = Notification.Create(
            TestIds.Generator,
            null,
            ContactChannel.Email,
            "welcome",
            "{}");
        var next = DateTimeOffset.UtcNow.AddMinutes(1);
        notification.MarkRetry("provider unavailable", next);

        notification.Status.ShouldBe(NotificationStatus.Pending);
        notification.AttemptCount.ShouldBe(1);
        notification.NextAttemptAt.ShouldBe(next.ToUniversalTime());

        notification.MarkSent();
        notification.Status.ShouldBe(NotificationStatus.Sent);
    }

    [Fact]
    public void Ad_Slot_Should_Return_Available_Creatives()
    {
        var slot = AdSlot.Create(TestIds.Generator, "home-below-tours", "Home");
        var creative = slot.AddCreative(
            TestIds.Generator,
            "Campaign",
            "https://cdn.example/ad.jpg",
            "https://hani.ir/campaign",
            DateTimeOffset.UtcNow.AddDays(-1),
            DateTimeOffset.UtcNow.AddDays(1));

        creative.IsAvailableAt(DateTimeOffset.UtcNow).ShouldBeTrue();
        slot.Code.ShouldBe("home-below-tours");
    }
}
