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
        Dictionary<string, int> criteria,
        ReviewProofType proofType,
        string? proofUrl,
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
        Criteria = criteria;
        ProofType = proofType;
        ProofUrl = proofUrl;
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
    /// Target-specific criterion scores keyed by canonical criterion name.
    /// </summary>
    public Dictionary<string, int> Criteria { get; private set; } = [];

    /// <summary>
    /// Proof type supplied by the reviewer.
    /// </summary>
    public ReviewProofType ProofType { get; private set; }

    /// <summary>
    /// Proof file URL.
    /// </summary>
    public string? ProofUrl { get; private set; }

    /// <summary>
    /// Optional public reply from the entity owner.
    /// </summary>
    public string? OwnerReply { get; private set; }

    /// <summary>
    /// Time of the owner reply.
    /// </summary>
    public DateTimeOffset? OwnerRepliedAt { get; private set; }

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
        DateTimeOffset? now = null,
        IReadOnlyDictionary<string, int>? criteria = null,
        ReviewProofType proofType = ReviewProofType.None,
        string? proofUrl = null)
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

        var normalizedCriteria = NormalizeCriteria(targetType, criteria, foodRating, cleanlinessRating, staffRating, entertainmentRating, locationRating, valueRating);

        if (proofType != ReviewProofType.None && string.IsNullOrWhiteSpace(proofUrl))
        {
            throw new ArgumentException("Proof URL is required when proof type is supplied.", nameof(proofUrl));
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
            normalizedCriteria,
            proofType,
            string.IsNullOrWhiteSpace(proofUrl) ? null : proofUrl.Trim(),
            createdAt);

        foreach (var photo in photos)
        {
            review.AddPhoto(ids, photo.Url, photo.Caption, createdAt);
        }

        return review;
    }

    /// <summary>
    /// Adds or replaces the public owner reply.
    /// </summary>
    public void Reply(string reply, DateTimeOffset? now = null)
    {
        if (string.IsNullOrWhiteSpace(reply))
        {
            throw new ArgumentException("Reply is required.", nameof(reply));
        }

        if (reply.Trim().Length > 2000)
        {
            throw new ArgumentException("Reply is too long.", nameof(reply));
        }

        OwnerReply = reply.Trim();
        OwnerRepliedAt = now ?? DateTimeOffset.UtcNow;
    }

    private static Dictionary<string, int> NormalizeCriteria(
        ReviewTargetType targetType,
        IReadOnlyDictionary<string, int>? criteria,
        int? foodRating,
        int? cleanlinessRating,
        int? staffRating,
        int? entertainmentRating,
        int? locationRating,
        int? valueRating)
    {
        var allowed = targetType switch
        {
            ReviewTargetType.Hotel =>
                new[] { "Food", "Cleanliness", "Staff", "Entertainment", "Location", "Value" },
            ReviewTargetType.Restaurant =>
                new[] { "Quality", "Service", "Atmosphere", "Price" },
            ReviewTargetType.Agency =>
                new[] { "Staff", "Location", "Documents", "Support", "Contract", "TourLeader", "Price" },
            _ => []
        };

        var result = criteria is null
            ? new Dictionary<string, int>(StringComparer.OrdinalIgnoreCase)
            : new Dictionary<string, int>(criteria, StringComparer.OrdinalIgnoreCase);

        if (targetType == ReviewTargetType.Hotel && result.Count == 0)
        {
            AddIfPresent(result, "Food", foodRating);
            AddIfPresent(result, "Cleanliness", cleanlinessRating);
            AddIfPresent(result, "Staff", staffRating);
            AddIfPresent(result, "Entertainment", entertainmentRating);
            AddIfPresent(result, "Location", locationRating);
            AddIfPresent(result, "Value", valueRating);
        }

        foreach (var item in result)
        {
            if (!allowed.Contains(item.Key, StringComparer.OrdinalIgnoreCase))
            {
                throw new ArgumentException(
                    $"Criterion '{item.Key}' is not valid for {targetType}.",
                    nameof(criteria));
            }

            if (item.Value is < 1 or > 5)
            {
                throw new ArgumentOutOfRangeException(
                    nameof(criteria),
                    $"Criterion '{item.Key}' must be between 1 and 5.");
            }
        }

        if (targetType is ReviewTargetType.Restaurant or ReviewTargetType.Agency && result.Count == 0)
        {
            throw new ArgumentException(
                $"At least one criterion is required for {targetType}.",
                nameof(criteria));
        }

        return result.ToDictionary(
            item => allowed.First(name => string.Equals(name, item.Key, StringComparison.OrdinalIgnoreCase)),
            item => item.Value,
            StringComparer.OrdinalIgnoreCase);
    }

    private static void AddIfPresent(Dictionary<string, int> criteria, string key, int? value)
    {
        if (value is not null)
        {
            criteria[key] = value.Value;
        }
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
