using Hani.Modules.Identity.Domain.Agencies;
using Hani.Modules.Identity.Domain.Claims;
using Hani.Modules.Identity.Domain.Media;
using Hani.Modules.Identity.Domain.Reviews;
using Shouldly;

namespace Hani.UnitTests.Identity;

public sealed class EngagementTests
{
    [Fact]
    public void Review_Should_Publish_And_Accept_Helpful_And_Report()
    {
        var now = DateTimeOffset.UtcNow;
        var userId = Guid.CreateVersion7();
        var review = Review.Create(
            TestIds.Generator,
            userId,
            ReviewTargetType.Hotel,
            Guid.CreateVersion7(),
            5,
            4,
            5,
            5,
            4,
            5,
            5,
            "Excellent",
            "Great hotel and very helpful staff.",
            TravelType.Family,
            new DateOnly(2026, 10, 1),
            [new ReviewPhotoInput("https://cdn.example/photo.jpg", "Room")],
            now);

        review.Status.ShouldBe(ReviewStatus.Pending);
        review.Photos.Count.ShouldBe(1);

        review.Publish(now.AddMinutes(1));
        review.Status.ShouldBe(ReviewStatus.Published);
        review.Photos.Single().Status.ShouldBe(ReviewPhotoStatus.Approved);

        review.MarkHelpful(TestIds.Generator, Guid.CreateVersion7(), now.AddMinutes(2))
            .ShouldBeTrue();
        review.HelpfulCount.ShouldBe(1);

        review.Report(TestIds.Generator, Guid.CreateVersion7(), "Spam", now.AddMinutes(3))
            .ShouldBeTrue();
        review.ReportCount.ShouldBe(1);
    }

    [Fact]
    public void Claim_Should_Approve_And_Reject_Only_When_Pending()
    {
        var claim = OwnershipClaim.Create(
            TestIds.Generator,
            Guid.CreateVersion7(),
            ReviewTargetType.Hotel,
            Guid.CreateVersion7(),
            ClaimType.Ownership,
            "Owner Name",
            "owner@example.com",
            "+989120000000",
            "I own this hotel and want to manage its information.",
            null);

        claim.Approve();
        claim.Status.ShouldBe(ClaimStatus.Approved);
        Should.Throw<InvalidOperationException>(() => claim.Reject("late"));
    }

    [Fact]
    public void Media_Should_Enforce_Size_And_Moderation()
    {
        var media = MediaAsset.Create(
            TestIds.Generator,
            Guid.CreateVersion7(),
            "https://cdn.example/photo.jpg",
            "image/jpeg",
            1024,
            MediaKind.ReviewPhoto);

        media.Approve();
        media.Status.ShouldBe(MediaStatus.Approved);
        Should.Throw<InvalidOperationException>(() => media.Reject("late"));

        Should.Throw<ArgumentOutOfRangeException>(() => MediaAsset.Create(
            TestIds.Generator,
            Guid.CreateVersion7(),
            "https://cdn.example/big.jpg",
            "image/jpeg",
            21 * 1024 * 1024,
            MediaKind.ReviewPhoto));
    }

    [Fact]
    public void Agency_Onboarding_Should_Be_Pending_Then_Approved()
    {
        var agency = Agency.CreateOnboarding(
            TestIds.Generator,
            Guid.CreateVersion7(),
            "new-agency",
            "New Agency",
            "B-123",
            "Tehran",
            "https://agency.example",
            "agency@example.com",
            "+989120000000",
            "Agency bio",
            [
                new AgencyDocumentInput(
                    AgencyDocumentType.License,
                    "https://cdn.example/license.pdf")
            ]);

        agency.Status.ShouldBe(AgencyStatus.Pending);
        agency.Documents.Count.ShouldBe(1);

        agency.Approve();
        agency.Status.ShouldBe(AgencyStatus.Active);
        agency.Documents.Single().Status.ShouldBe(AgencyDocumentStatus.Approved);
    }
}
