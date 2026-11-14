using Hani.BuildingBlocks.Domain;

namespace Hani.Modules.Identity.Domain.Media;

/// <summary>
/// Intended use of an uploaded media asset.
/// </summary>
public enum MediaKind
{
    ReviewPhoto = 0,
    ClaimEvidence = 1,
    Avatar = 2,
    Other = 3
}

/// <summary>
/// Moderation state of a media asset.
/// </summary>
public enum MediaStatus
{
    Pending = 0,
    Approved = 1,
    Rejected = 2
}

/// <summary>
/// User-uploaded media asset awaiting moderation.
/// </summary>
public sealed class MediaAsset : AggregateRoot<Guid>
{
    private MediaAsset()
    {
    }

    private MediaAsset(
        Guid id,
        Guid ownerUserId,
        string url,
        string contentType,
        long sizeBytes,
        MediaKind kind,
        DateTimeOffset createdAt) : base(id)
    {
        OwnerUserId = ownerUserId;
        Url = url;
        ContentType = contentType;
        SizeBytes = sizeBytes;
        Kind = kind;
        CreatedAt = createdAt;
        Status = MediaStatus.Pending;
    }

    /// <summary>
    /// Uploading user.
    /// </summary>
    public Guid OwnerUserId { get; private set; }

    /// <summary>
    /// Public media URL.
    /// </summary>
    public string Url { get; private set; } = string.Empty;

    /// <summary>
    /// MIME type.
    /// </summary>
    public string ContentType { get; private set; } = string.Empty;

    /// <summary>
    /// File size in bytes.
    /// </summary>
    public long SizeBytes { get; private set; }

    /// <summary>
    /// Intended use.
    /// </summary>
    public MediaKind Kind { get; private set; }

    /// <summary>
    /// Moderation state.
    /// </summary>
    public MediaStatus Status { get; private set; }

    /// <summary>
    /// Upload time.
    /// </summary>
    public DateTimeOffset CreatedAt { get; private set; }

    /// <summary>
    /// Moderation time.
    /// </summary>
    public DateTimeOffset? ModeratedAt { get; private set; }

    /// <summary>
    /// Rejection reason.
    /// </summary>
    public string? RejectionReason { get; private set; }

    /// <summary>
    /// Creates a pending media asset.
    /// </summary>
    public static MediaAsset Create(
        IIdGenerator ids,
        Guid ownerUserId,
        string url,
        string contentType,
        long sizeBytes,
        MediaKind kind,
        DateTimeOffset? now = null)
    {
        if (ownerUserId == Guid.Empty)
        {
            throw new ArgumentException("Owner user is required.", nameof(ownerUserId));
        }

        if (string.IsNullOrWhiteSpace(url) || string.IsNullOrWhiteSpace(contentType))
        {
            throw new ArgumentException("Media URL and content type are required.");
        }

        if (sizeBytes <= 0 || sizeBytes > 20 * 1024 * 1024)
        {
            throw new ArgumentOutOfRangeException(nameof(sizeBytes), "Media size must be between 1 byte and 20 MB.");
        }

        return new MediaAsset(
            ids.NewId(),
            ownerUserId,
            url.Trim(),
            contentType.Trim().ToLowerInvariant(),
            sizeBytes,
            kind,
            now ?? DateTimeOffset.UtcNow);
    }

    /// <summary>
    /// Approves the media asset.
    /// </summary>
    public void Approve(DateTimeOffset? now = null)
    {
        if (Status != MediaStatus.Pending)
        {
            throw new InvalidOperationException("Only pending media can be approved.");
        }

        Status = MediaStatus.Approved;
        ModeratedAt = now ?? DateTimeOffset.UtcNow;
    }

    /// <summary>
    /// Rejects the media asset.
    /// </summary>
    public void Reject(string reason, DateTimeOffset? now = null)
    {
        if (Status != MediaStatus.Pending)
        {
            throw new InvalidOperationException("Only pending media can be rejected.");
        }

        if (string.IsNullOrWhiteSpace(reason))
        {
            throw new ArgumentException("Rejection reason is required.", nameof(reason));
        }

        Status = MediaStatus.Rejected;
        RejectionReason = reason.Trim();
        ModeratedAt = now ?? DateTimeOffset.UtcNow;
    }
}
