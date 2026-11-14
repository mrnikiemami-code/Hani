using Hani.BuildingBlocks.Domain;

namespace Hani.Modules.Identity.Domain.Reviews;

/// <summary>
/// User-uploaded photo attached to a review.
/// </summary>
public sealed class ReviewPhoto : Entity<Guid>
{
    private ReviewPhoto()
    {
    }

    internal ReviewPhoto(
        Guid id,
        Guid reviewId,
        string url,
        string? caption,
        DateTimeOffset createdAt) : base(id)
    {
        ReviewId = reviewId;
        Url = url;
        Caption = caption;
        CreatedAt = createdAt;
        Status = ReviewPhotoStatus.Pending;
    }

    /// <summary>
    /// Owning review.
    /// </summary>
    public Guid ReviewId { get; private set; }

    /// <summary>
    /// Photo URL.
    /// </summary>
    public string Url { get; private set; } = string.Empty;

    /// <summary>
    /// Optional caption.
    /// </summary>
    public string? Caption { get; private set; }

    /// <summary>
    /// Moderation state.
    /// </summary>
    public ReviewPhotoStatus Status { get; private set; }

    /// <summary>
    /// Upload time.
    /// </summary>
    public DateTimeOffset CreatedAt { get; private set; }

    /// <summary>
    /// Marks the photo approved.
    /// </summary>
    public void Approve() => Status = ReviewPhotoStatus.Approved;

    /// <summary>
    /// Marks the photo rejected.
    /// </summary>
    public void Reject() => Status = ReviewPhotoStatus.Rejected;
}

/// <summary>
/// Helpful vote cast by a user on a review.
/// </summary>
public sealed class ReviewHelpful : Entity<Guid>
{
    private ReviewHelpful()
    {
    }

    internal ReviewHelpful(Guid id, Guid reviewId, Guid userId, DateTimeOffset createdAt)
        : base(id)
    {
        ReviewId = reviewId;
        UserId = userId;
        CreatedAt = createdAt;
    }

    /// <summary>
    /// Owning review.
    /// </summary>
    public Guid ReviewId { get; private set; }

    /// <summary>
    /// User who voted.
    /// </summary>
    public Guid UserId { get; private set; }

    /// <summary>
    /// Vote time.
    /// </summary>
    public DateTimeOffset CreatedAt { get; private set; }
}

/// <summary>
/// Abuse report submitted for a review.
/// </summary>
public sealed class ReviewReport : Entity<Guid>
{
    private ReviewReport()
    {
    }

    internal ReviewReport(
        Guid id,
        Guid reviewId,
        Guid userId,
        string reason,
        DateTimeOffset createdAt) : base(id)
    {
        ReviewId = reviewId;
        UserId = userId;
        Reason = reason;
        CreatedAt = createdAt;
    }

    /// <summary>
    /// Owning review.
    /// </summary>
    public Guid ReviewId { get; private set; }

    /// <summary>
    /// Reporting user.
    /// </summary>
    public Guid UserId { get; private set; }

    /// <summary>
    /// Report reason.
    /// </summary>
    public string Reason { get; private set; } = string.Empty;

    /// <summary>
    /// Report time.
    /// </summary>
    public DateTimeOffset CreatedAt { get; private set; }
}
