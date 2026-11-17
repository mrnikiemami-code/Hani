using Hani.BuildingBlocks.Domain;

namespace Hani.Modules.Content.Domain.Media;

/// <summary>
/// Uploaded media asset; the binary lives in the configured storage provider.
/// </summary>
public sealed class MediaAsset : AggregateRoot<Guid>
{
    private readonly List<MediaVariant> _variants = [];

    private MediaAsset()
    {
    }

    private MediaAsset(
        Guid id,
        string storageKey,
        string originalFileName,
        string contentType,
        long sizeBytes,
        int width,
        int height,
        string hash,
        string altText)
        : base(id)
    {
        StorageKey = storageKey;
        OriginalFileName = originalFileName;
        ContentType = contentType;
        SizeBytes = sizeBytes;
        Width = width;
        Height = height;
        Hash = hash;
        AltText = altText;
        IsPublic = true;
        CreatedAt = DateTimeOffset.UtcNow;
        UpdatedAt = CreatedAt;
    }

    /// <summary>Storage key of the canonical WebP image.</summary>
    public string StorageKey { get; private set; } = string.Empty;

    /// <summary>Original client file name.</summary>
    public string OriginalFileName { get; private set; } = string.Empty;

    /// <summary>Original MIME type.</summary>
    public string ContentType { get; private set; } = string.Empty;

    /// <summary>Original file size in bytes.</summary>
    public long SizeBytes { get; private set; }

    /// <summary>Canonical image width in pixels.</summary>
    public int Width { get; private set; }

    /// <summary>Canonical image height in pixels.</summary>
    public int Height { get; private set; }

    /// <summary>SHA-256 content hash used for deduplication and immutable keys.</summary>
    public string Hash { get; private set; } = string.Empty;

    /// <summary>SEO alternative text.</summary>
    public string AltText { get; private set; } = string.Empty;

    /// <summary>Optional editorial caption.</summary>
    public string? Caption { get; private set; }

    /// <summary>Optional photo credit.</summary>
    public string? Credit { get; private set; }

    /// <summary>Whether the media can be served publicly.</summary>
    public bool IsPublic { get; private set; }

    /// <summary>Creation time.</summary>
    public DateTimeOffset CreatedAt { get; private set; }

    /// <summary>Last update time.</summary>
    public DateTimeOffset UpdatedAt { get; private set; }

    /// <summary>Generated WebP variants.</summary>
    public IReadOnlyCollection<MediaVariant> Variants => _variants;

    /// <summary>Creates a media asset and its canonical WebP variant.</summary>
    public static MediaAsset Create(
        Guid id,
        string storageKey,
        string originalFileName,
        string contentType,
        long sizeBytes,
        int width,
        int height,
        string hash,
        string altText)
    {
        if (string.IsNullOrWhiteSpace(storageKey))
        {
            throw new ArgumentException("Storage key is required.", nameof(storageKey));
        }

        if (string.IsNullOrWhiteSpace(altText))
        {
            throw new ArgumentException("Alt text is required.", nameof(altText));
        }

        return new MediaAsset(
            id,
            storageKey,
            originalFileName,
            contentType,
            sizeBytes,
            width,
            height,
            hash,
            altText.Trim());
    }

    /// <summary>Adds a generated variant.</summary>
    public MediaVariant AddVariant(
        Guid id,
        string storageKey,
        string format,
        int width,
        int height,
        long sizeBytes,
        bool isCanonical = false)
    {
        var variant = new MediaVariant(
            id,
            Id,
            storageKey,
            format,
            width,
            height,
            sizeBytes,
            isCanonical);
        _variants.Add(variant);
        return variant;
    }

    /// <summary>Updates editorial and SEO metadata.</summary>
    public void UpdateMetadata(string altText, string? caption, string? credit)
    {
        if (string.IsNullOrWhiteSpace(altText))
        {
            throw new ArgumentException("Alt text is required.", nameof(altText));
        }

        AltText = altText.Trim();
        Caption = string.IsNullOrWhiteSpace(caption) ? null : caption.Trim();
        Credit = string.IsNullOrWhiteSpace(credit) ? null : credit.Trim();
        UpdatedAt = DateTimeOffset.UtcNow;
    }
}

/// <summary>
/// Generated responsive WebP variant of a media asset.
/// </summary>
public sealed class MediaVariant : Entity<Guid>
{
    private MediaVariant()
    {
    }

    internal MediaVariant(
        Guid id,
        Guid mediaAssetId,
        string storageKey,
        string format,
        int width,
        int height,
        long sizeBytes,
        bool isCanonical) : base(id)
    {
        MediaAssetId = mediaAssetId;
        StorageKey = storageKey;
        Format = format;
        Width = width;
        Height = height;
        SizeBytes = sizeBytes;
        IsCanonical = isCanonical;
    }

    /// <summary>Parent media asset id.</summary>
    public Guid MediaAssetId { get; private set; }

    /// <summary>Storage key.</summary>
    public string StorageKey { get; private set; } = string.Empty;

    /// <summary>Variant format, always webp in phase 1.</summary>
    public string Format { get; private set; } = string.Empty;

    /// <summary>Variant width.</summary>
    public int Width { get; private set; }

    /// <summary>Variant height.</summary>
    public int Height { get; private set; }

    /// <summary>Variant size in bytes.</summary>
    public long SizeBytes { get; private set; }

    /// <summary>Whether this is the canonical image URL.</summary>
    public bool IsCanonical { get; private set; }
}
