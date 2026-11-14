using Hani.Modules.Identity.Domain.Claims;
using Hani.Modules.Identity.Domain.Media;
using Hani.Modules.Identity.Domain.Reviews;

namespace Hani.Modules.Identity.Application.Commands.Engagement;

internal static class EngagementMappings
{
    public static ReviewDto ToDto(Review review, string username, string displayName, string? avatarUrl)
        => new(
            review.Id,
            review.UserId,
            username,
            displayName,
            avatarUrl,
            review.TargetType.ToString(),
            review.TargetId,
            review.Rating,
            review.FoodRating,
            review.CleanlinessRating,
            review.StaffRating,
            review.EntertainmentRating,
            review.LocationRating,
            review.ValueRating,
            review.Title,
            review.Comment,
            review.TravelType.ToString(),
            review.VisitDate,
            review.Status.ToString(),
            review.HelpfulCount,
            review.ReportCount,
            review.CreatedAt,
            review.PublishedAt,
            review.Photos
                .Select(photo => new ReviewPhotoDto(
                    photo.Id,
                    photo.Url,
                    photo.Caption,
                    photo.Status.ToString()))
                .ToArray(),
            review.Criteria,
            review.ProofType.ToString(),
            review.ProofUrl,
            review.OwnerReply,
            review.OwnerRepliedAt);

    public static ClaimDto ToDto(OwnershipClaim claim)
        => new(
            claim.Id,
            claim.UserId,
            claim.TargetType.ToString(),
            claim.TargetId,
            claim.ClaimType.ToString(),
            claim.FullName,
            claim.Email,
            claim.Phone,
            claim.Message,
            claim.EvidenceUrl,
            claim.Status.ToString(),
            claim.CreatedAt,
            claim.ReviewedAt,
            claim.RejectionReason);

    public static MediaDto ToDto(MediaAsset asset)
        => new(
            asset.Id,
            asset.OwnerUserId,
            asset.Url,
            asset.ContentType,
            asset.SizeBytes,
            asset.Kind.ToString(),
            asset.Status.ToString(),
            asset.CreatedAt,
            asset.ModeratedAt,
            asset.RejectionReason);
}
