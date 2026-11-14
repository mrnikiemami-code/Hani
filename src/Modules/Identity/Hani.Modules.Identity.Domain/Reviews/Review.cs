using Hani.BuildingBlocks.Domain;

namespace Hani.Modules.Identity.Domain.Reviews;

/// <summary>
/// Multi-criteria user review for a marketplace entity.
/// </summary>
public sealed class Review : AggregateRoot<Guid>
{
    private readonly List<ReviewPhoto> _photos = [];
    private readonly List<ReviewHelpful> _helpfulVotes = [];
    private readonly List<ReviewReport> _reports = [];

    private Review()
    {
    }

    private Review(
        Guid id,
        Guid userId,
        ReviewTargetType targetType,
        Guid targetId,
        int rating,
        int? foodRating,
        int? cleanlinessRating,
        int? staffRating,
        int? entertainmentRating,
        int? locationRating,
        int? valueRating,
        string? title,
        string comment,
        TravelType travelType,
        DateOnly? visitDate,
        DateTimeOffset createdAt) : base(id)
    {
        UserId = userId;
        TargetType = targetType;
        TargetId = targetId;
        Rating = rating;
        FoodRating = foodRating;
        CleanlinessRating = cleanlinessRating;
        StaffRating = staffRating;
        EntertainmentRating = entertainmentRating;
        LocationRating = locationRating;
        ValueRating = valueRating;
        Title = title;
        Comment = comment;
        TravelType = travelType;
        VisitDate = visitDate;
        CreatedAt = createdAt;
        Status = ReviewStatus.Pending;
    }

    /// <summary>
    /// Author user id.
    /// </summary>
    public Guid UserId { get; private set; }

    /// <summary>
    /// Reviewed entity type.
    /// </summary>
    public ReviewTargetType TargetType { get; private set; }

    /// <summary>
    /// Reviewed entity id.
    /// </summary>
    public Guid TargetId { get; private set; }

    /// <summary>
    /// Overall rating from 1 to 5.
    /// </summary>
    public int Rating { get; private set; }

    /// <summary>
    /// Food quality rating.
    /// </summary>
    public int? FoodRating { get; private set; }

    /// <summary>
    /// Cleanliness rating.
    /// </summary>
    public int? CleanlinessRating { get; private set; }

    /// <summary>
    /// Staff rating.
    /// </summary>
    public int? StaffRating { get; private set; }

    /// <summary>
    /// Entertainment rating.
    /// </summary>
    public int? EntertainmentRating { get; private set; }

    /// <summary>
    /// Location rating.
    /// </summary>
    public int? LocationRating { get; private set; }

    /// <summary>
    /// Value-for-money rating.
    /// </summary>
    public int? ValueRating { get; private set; }

    /// <summary>
    /// Optional review title.
    /// </summary>
    public string? Title { get; private set; }

    /// <summary>
    /// Review body.
    /// </summary>
    public string Comment { get; private set; } = string.Empty;

    /// <summary>
    /// Travel-party context.
    /// </summary>
    public TravelType TravelType { get; private set; }

    /// <summary>
    /// Visit date.
    /// </summary>
    public DateOnly? VisitDate { get; private set; }

    /// <summary>
    /// Moderation state.
    /// </summary>
    public ReviewStatus Status { get; private set; }

    /// <summary>
    /// Rejection reason when rejected.
    /// </summary>
    public string? ModerationReason { get; private set; }

    /// <summary>
    /// Creation time.
    /// </summary>
    public DateTimeOffset CreatedAt { get; private set; }

    /// <summary>
    /// Publication time.
    /// </summary>
    public DateTimeOffset? PublishedAt { get; private set; }

    /// <summary>
    /// Number of helpful votes.
    /// </summary>
    public int HelpfulCount { get; private set; }

    /// <summary>
    /// Number of abuse reports.
    /// </summary>
    public int ReportCount { get; private set; }

    /// <summary>
    /// Review photos.
    /// </summary>
    public IReadOnlyCollection<ReviewPhoto> Photos => _photos;

    /// <summary>
    /// Helpful votes.
    /// </summary>
    public IReadOnlyCollection<ReviewHelpful> HelpfulVotes => _helpfulVotes;

    /// <summary>
    /// Abuse reports.
    /// </summary>
    public IReadOnlyCollection<ReviewReport> Reports => _reports;

    /// <summary>
    /// Creates a pending review.
    /// </summary>
    public static Review Create(
        IIdGenerator ids,
        Guid userId,
        ReviewTargetType targetType,
        Guid targetId,
        int rating,
        int? foodRating,
        int? cleanlinessRating,
        int? staffRating,
        int? entertainmentRating,
        int? locationRating,
        int? valueRating,
        string? title,
        string comment,
        TravelType travelType,
        DateOnly? visitDate,
        IReadOnlyCollection<ReviewPhotoInput> photos,
        DateTimeOffset? now = null)
    {
        if (userId == Guid.Empty || targetId == Guid.Empty)
        {
            throw new ArgumentException("User and target are required.");
        }

        if (rating is < 1 or > 5)
        {
            throw new ArgumentOutOfRangeException(nameof(rating), "Rating must be between 1 and 5.");
        }

        ValidateOptionalRating(foodRating, nameof(foodRating));
        ValidateOptionalRating(cleanlinessRating, nameof(cleanlinessRating));
        ValidateOptionalRating(staffRating, nameof(staffRating));
        ValidateOptionalRating(entertainmentRating, nameof(entertainmentRating));
        ValidateOptionalRating(locationRating, nameof(locationRating));
        ValidateOptionalRating(valueRating, nameof(valueRating));

        if (string.IsNullOrWhiteSpace(comment) || comment.Trim().Length < 3)
        {
            throw new ArgumentException("Review comment is required.", nameof(comment));
        }

        if (comment.Trim().Length > 4000)
        {
            throw new ArgumentException("Review comment is too long.", nameof(comment));
        }

        if (photos.Count > 5)
        {
            throw new ArgumentException("A review can have at most five photos.", nameof(photos));
        }

        var createdAt = now ?? DateTimeOffset.UtcNow;
        var review = new Review(
            ids.NewId(),
            userId,
            targetType,
            targetId,
            rating,
            foodRating,
            cleanlinessRating,
            staffRating,
            entertainmentRating,
            locationRating,
            valueRating,
            string.IsNullOrWhiteSpace(title) ? null : title.Trim(),
            comment.Trim(),
            travelType,
            visitDate,
            createdAt);

        foreach (var photo in photos)
        {
            review.AddPhoto(ids, photo.Url, photo.Caption, createdAt);
        }

        return review;
    }

    /// <summary>
    /// Adds a photo while the review is pending.
    /// </summary>
    public ReviewPhoto AddPhoto(
        IIdGenerator ids,
        string url,
        string? caption,
        DateTimeOffset? now = null)
    {
        if (Status != ReviewStatus.Pending)
        {
            throw new InvalidOperationException("Photos can only be added to pending reviews.");
        }

        if (string.IsNullOrWhiteSpace(url))
        {
            throw new ArgumentException("Photo URL is required.", nameof(url));
        }

        if (_photos.Count >= 5)
        {
            throw new InvalidOperationException("A review can have at most five photos.");
        }

        var photo = new ReviewPhoto(
            ids.NewId(),
            Id,
            url.Trim(),
            string.IsNullOrWhiteSpace(caption) ? null : caption.Trim(),
            now ?? DateTimeOffset.UtcNow);
        _photos.Add(photo);
        return photo;
    }

    /// <summary>
    /// Publishes a pending review.
    /// </summary>
    public void Publish(DateTimeOffset? now = null)
    {
        if (Status != ReviewStatus.Pending)
        {
            throw new InvalidOperationException("Only pending reviews can be published.");
        }

        Status = ReviewStatus.Published;
        PublishedAt = now ?? DateTimeOffset.UtcNow;

        foreach (var photo in _photos)
        {
            photo.Approve();
        }
    }

    /// <summary>
    /// Rejects a pending review.
    /// </summary>
    public void Reject(string reason, DateTimeOffset? now = null)
    {
        if (Status != ReviewStatus.Pending)
        {
            throw new InvalidOperationException("Only pending reviews can be rejected.");
        }

        if (string.IsNullOrWhiteSpace(reason))
        {
            throw new ArgumentException("Moderation reason is required.", nameof(reason));
        }

        Status = ReviewStatus.Rejected;
        ModerationReason = reason.Trim();
        PublishedAt = now ?? DateTimeOffset.UtcNow;

        foreach (var photo in _photos)
        {
            photo.Reject();
        }
    }

    /// <summary>
    /// Marks a review helpful once per user.
    /// </summary>
    public bool MarkHelpful(
        IIdGenerator ids,
        Guid userId,
        DateTimeOffset? now = null)
    {
        if (Status != ReviewStatus.Published || userId == Guid.Empty)
        {
            return false;
        }

        if (_helpfulVotes.Any(vote => vote.UserId == userId))
        {
            return false;
        }

        _helpfulVotes.Add(new ReviewHelpful(
            ids.NewId(),
            Id,
            userId,
            now ?? DateTimeOffset.UtcNow));
        HelpfulCount++;
        return true;
    }

    /// <summary>
    /// Adds an abuse report while the review is published.
    /// </summary>
    public bool Report(
        IIdGenerator ids,
        Guid userId,
        string reason,
        DateTimeOffset? now = null)
    {
        if (Status != ReviewStatus.Published || userId == Guid.Empty)
        {
            return false;
        }

        if (string.IsNullOrWhiteSpace(reason))
        {
            throw new ArgumentException("Report reason is required.", nameof(reason));
        }

        if (_reports.Any(report => report.UserId == userId))
        {
            return false;
        }

        _reports.Add(new ReviewReport(
            ids.NewId(),
            Id,
            userId,
            reason.Trim(),
            now ?? DateTimeOffset.UtcNow));
        ReportCount++;
        return true;
    }

    private static void ValidateOptionalRating(int? rating, string parameter)
    {
        if (rating is < 1 or > 5)
        {
            throw new ArgumentOutOfRangeException(parameter, "Criteria ratings must be between 1 and 5.");
        }
    }
}

/// <summary>
/// Review photo input.
/// </summary>
public sealed record ReviewPhotoInput(string Url, string? Caption = null);
