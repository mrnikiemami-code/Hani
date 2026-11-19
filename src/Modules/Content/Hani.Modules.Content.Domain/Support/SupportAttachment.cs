using Hani.BuildingBlocks.Domain;

namespace Hani.Modules.Content.Domain.Support;

/// <summary>Security scan state for a support attachment.</summary>
public enum SupportAttachmentScanState
{
    Unscanned = 0,
    Clean = 1,
    Infected = 2
}

/// <summary>
/// Private attachment uploaded for a support ticket. Attachments are linked to
/// a message after the message is created and are never public URLs.
/// </summary>
public sealed class SupportAttachment : Entity<Guid>
{
    private SupportAttachment()
    {
    }

    private SupportAttachment(
        Guid id,
        Guid ticketId,
        Guid? messageId,
        string fileName,
        string contentType,
        long sizeBytes,
        string storageKey,
        Guid uploadedBy,
        DateTimeOffset createdAt) : base(id)
    {
        TicketId = ticketId;
        MessageId = messageId;
        FileName = fileName;
        ContentType = contentType;
        SizeBytes = sizeBytes;
        StorageKey = storageKey;
        UploadedBy = uploadedBy;
        CreatedAt = createdAt;
    }

    /// <summary>Owning support ticket.</summary>
    public Guid TicketId { get; private set; }

    /// <summary>Linked message, or null while the upload is pending.</summary>
    public Guid? MessageId { get; private set; }

    /// <summary>Original display file name.</summary>
    public string FileName { get; private set; } = string.Empty;

    /// <summary>Validated MIME type.</summary>
    public string ContentType { get; private set; } = string.Empty;

    /// <summary>File size in bytes.</summary>
    public long SizeBytes { get; private set; }

    /// <summary>Private storage key; never exposed to clients.</summary>
    public string StorageKey { get; private set; } = string.Empty;

    /// <summary>Customer or administrator who uploaded the file.</summary>
    public Guid UploadedBy { get; private set; }

    /// <summary>Upload time.</summary>
    public DateTimeOffset CreatedAt { get; private set; }

    /// <summary>Antivirus scan state.</summary>
    public SupportAttachmentScanState ScanState { get; private set; } =
        SupportAttachmentScanState.Unscanned;

    /// <summary>Last scan time, when a scanner was available.</summary>
    public DateTimeOffset? ScannedAt { get; private set; }

    /// <summary>Private storage key for the generated image thumbnail.</summary>
    public string? ThumbnailStorageKey { get; private set; }

    /// <summary>Creates a pending attachment.</summary>
    public static SupportAttachment Create(
        IIdGenerator ids,
        Guid ticketId,
        string fileName,
        string contentType,
        long sizeBytes,
        string storageKey,
        Guid uploadedBy,
        DateTimeOffset? now = null)
    {
        if (ticketId == Guid.Empty)
        {
            throw new ArgumentException("An attachment requires a support ticket.", nameof(ticketId));
        }

        if (string.IsNullOrWhiteSpace(fileName) ||
            string.IsNullOrWhiteSpace(contentType) ||
            string.IsNullOrWhiteSpace(storageKey))
        {
            throw new ArgumentException("Attachment name, content type, and storage key are required.");
        }

        if (sizeBytes is <= 0 or > 10 * 1024 * 1024)
        {
            throw new ArgumentException(
                "Attachment size must be between 1 byte and 10 MB.",
                nameof(sizeBytes));
        }

        return new SupportAttachment(
            ids.NewId(),
            ticketId,
            null,
            fileName.Trim(),
            contentType.Trim().ToLowerInvariant(),
            sizeBytes,
            storageKey.Trim(),
            uploadedBy,
            now ?? DateTimeOffset.UtcNow);
    }

    /// <summary>Records a clean antivirus result.</summary>
    public void MarkScanClean(DateTimeOffset? now = null)
    {
        ScanState = SupportAttachmentScanState.Clean;
        ScannedAt = now ?? DateTimeOffset.UtcNow;
    }

    /// <summary>Records an infected antivirus result.</summary>
    public void MarkScanInfected(DateTimeOffset? now = null)
    {
        ScanState = SupportAttachmentScanState.Infected;
        ScannedAt = now ?? DateTimeOffset.UtcNow;
    }

    /// <summary>Stores the generated thumbnail key.</summary>
    public void SetThumbnail(string storageKey)
    {
        if (string.IsNullOrWhiteSpace(storageKey))
        {
            throw new ArgumentException("A thumbnail storage key is required.", nameof(storageKey));
        }

        ThumbnailStorageKey = storageKey.Trim();
    }

    /// <summary>Links the pending attachment to a created message once.</summary>
    public void AttachToMessage(Guid messageId)
    {
        if (messageId == Guid.Empty)
        {
            throw new ArgumentException("A message id is required.", nameof(messageId));
        }

        if (MessageId is not null)
        {
            throw new InvalidOperationException("Attachment is already linked to a message.");
        }

        MessageId = messageId;
    }
}
