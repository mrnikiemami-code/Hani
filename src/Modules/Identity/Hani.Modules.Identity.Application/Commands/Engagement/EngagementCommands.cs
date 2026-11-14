using Hani.BuildingBlocks.Application;
using Hani.Modules.Identity.Domain.Claims;
using Hani.Modules.Identity.Domain.Media;
using Hani.Modules.Identity.Domain.Reviews;

namespace Hani.Modules.Identity.Application.Commands.Engagement;

/// <summary>
/// Command that creates a pending review for a marketplace entity.
/// </summary>
public sealed record CreateReviewCommand(
    Guid UserId,
    ReviewTargetType TargetType,
    Guid TargetId,
    int Rating,
    int? FoodRating,
    int? CleanlinessRating,
    int? StaffRating,
    int? EntertainmentRating,
    int? LocationRating,
    int? ValueRating,
    string? Title,
    string Comment,
    TravelType TravelType,
    DateOnly? VisitDate,
    IReadOnlyList<ReviewPhotoInput> Photos,
    IReadOnlyDictionary<string, int>? Criteria = null,
    ReviewProofType ProofType = ReviewProofType.None,
    string? ProofUrl = null) : ICommand<ReviewDto>;

/// <summary>
/// Command that adds the owner reply to a review.
/// </summary>
public sealed record ReplyToReviewCommand(Guid ReviewId, string Reply) : ICommand<bool>;

/// <summary>
/// Query that returns published reviews for a target.
/// </summary>
public sealed record GetReviewsQuery(
    ReviewTargetType TargetType,
    Guid TargetId,
    int? MinRating = null,
    string? Sort = null,
    int Page = 1,
    int PageSize = 20) : IQuery<PagedResult<ReviewDto>>;

/// <summary>
/// Query that returns reviews awaiting moderation.
/// </summary>
public sealed record GetPendingReviewsQuery(int Page = 1, int PageSize = 20)
    : IQuery<PagedResult<ReviewDto>>;

/// <summary>
/// Command that publishes a pending review.
/// </summary>
public sealed record PublishReviewCommand(Guid ReviewId) : ICommand<bool>;

/// <summary>
/// Command that rejects a pending review.
/// </summary>
public sealed record RejectReviewCommand(Guid ReviewId, string Reason) : ICommand<bool>;

/// <summary>
/// Command that marks a review helpful.
/// </summary>
public sealed record MarkReviewHelpfulCommand(Guid UserId, Guid ReviewId) : ICommand<bool>;

/// <summary>
/// Command that reports a published review.
/// </summary>
public sealed record ReportReviewCommand(Guid UserId, Guid ReviewId, string Reason) : ICommand<bool>;

/// <summary>
/// Command that creates an ownership or correction claim.
/// </summary>
public sealed record CreateClaimCommand(
    Guid UserId,
    ReviewTargetType TargetType,
    Guid TargetId,
    ClaimType ClaimType,
    string FullName,
    string Email,
    string? Phone,
    string Message,
    string? EvidenceUrl) : ICommand<ClaimDto>;

/// <summary>
/// Query that lists claims for the admin panel.
/// </summary>
public sealed record GetClaimsQuery(string? Status, int Page = 1, int PageSize = 20)
    : IQuery<PagedResult<ClaimDto>>;

/// <summary>
/// Command that approves a pending claim.
/// </summary>
public sealed record ApproveClaimCommand(Guid ClaimId) : ICommand<bool>;

/// <summary>
/// Command that rejects a pending claim.
/// </summary>
public sealed record RejectClaimCommand(Guid ClaimId, string Reason) : ICommand<bool>;

/// <summary>
/// Command that registers a media asset for moderation.
/// </summary>
public sealed record RegisterMediaCommand(
    Guid UserId,
    string Url,
    string ContentType,
    long SizeBytes,
    MediaKind Kind) : ICommand<MediaDto>;

/// <summary>
/// Query that lists media for the admin panel.
/// </summary>
public sealed record GetMediaQuery(string? Status, int Page = 1, int PageSize = 20)
    : IQuery<PagedResult<MediaDto>>;

/// <summary>
/// Command that approves a pending media asset.
/// </summary>
public sealed record ApproveMediaCommand(Guid MediaId) : ICommand<bool>;

/// <summary>
/// Command that rejects a pending media asset.
/// </summary>
public sealed record RejectMediaCommand(Guid MediaId, string Reason) : ICommand<bool>;

/// <summary>
/// Review read model.
/// </summary>
public sealed record ReviewDto(
    Guid ReviewId,
    Guid UserId,
    string AuthorUsername,
    string AuthorDisplayName,
    string? AuthorAvatarUrl,
    string TargetType,
    Guid TargetId,
    int Rating,
    int? FoodRating,
    int? CleanlinessRating,
    int? StaffRating,
    int? EntertainmentRating,
    int? LocationRating,
    int? ValueRating,
    string? Title,
    string Comment,
    string TravelType,
    DateOnly? VisitDate,
    string Status,
    int HelpfulCount,
    int ReportCount,
    DateTimeOffset CreatedAt,
    DateTimeOffset? PublishedAt,
    IReadOnlyList<ReviewPhotoDto> Photos,
    IReadOnlyDictionary<string, int> Criteria,
    string ProofType,
    string? ProofUrl,
    string? OwnerReply,
    DateTimeOffset? OwnerRepliedAt);

/// <summary>
/// Review photo read model.
/// </summary>
public sealed record ReviewPhotoDto(Guid PhotoId, string Url, string? Caption, string Status);

/// <summary>
/// Claim read model.
/// </summary>
public sealed record ClaimDto(
    Guid ClaimId,
    Guid UserId,
    string TargetType,
    Guid TargetId,
    string ClaimType,
    string FullName,
    string Email,
    string? Phone,
    string Message,
    string? EvidenceUrl,
    string Status,
    DateTimeOffset CreatedAt,
    DateTimeOffset? ReviewedAt,
    string? RejectionReason);

/// <summary>
/// Media moderation read model.
/// </summary>
public sealed record MediaDto(
    Guid MediaId,
    Guid OwnerUserId,
    string Url,
    string ContentType,
    long SizeBytes,
    string Kind,
    string Status,
    DateTimeOffset CreatedAt,
    DateTimeOffset? ModeratedAt,
    string? RejectionReason);
