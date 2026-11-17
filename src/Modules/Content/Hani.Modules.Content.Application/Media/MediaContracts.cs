using Hani.Modules.Content.Domain.Media;

namespace Hani.Modules.Content.Application.Media;

/// <summary>
/// Persistence contract for media assets.
/// </summary>
public interface IMediaAssetRepository
{
    /// <summary>Adds a new media asset.</summary>
    Task AddAsync(MediaAsset asset, CancellationToken cancellationToken);

    /// <summary>Gets an asset with variants.</summary>
    Task<MediaAsset?> GetAsync(Guid id, CancellationToken cancellationToken);

    /// <summary>Finds an asset by content hash.</summary>
    Task<MediaAsset?> GetByHashAsync(string hash, CancellationToken cancellationToken);

    /// <summary>Lists assets with optional text search.</summary>
    Task<(IReadOnlyList<MediaAsset> Items, int Total)> ListAsync(
        int page,
        int pageSize,
        string? query,
        CancellationToken cancellationToken);

    /// <summary>Removes an asset and its variants.</summary>
    void Remove(MediaAsset asset);

    /// <summary>Saves pending changes.</summary>
    Task SaveChangesAsync(CancellationToken cancellationToken);
}

/// <summary>
/// Storage provider contract for media files.
/// </summary>
public interface IContentMediaStorage
{
    /// <summary>Saves a file under a stable storage key.</summary>
    Task SaveAsync(
        string key,
        Stream content,
        string contentType,
        CancellationToken cancellationToken);

    /// <summary>Deletes a stored file.</summary>
    Task DeleteAsync(string key, CancellationToken cancellationToken);

    /// <summary>Returns the public URL for a stored key.</summary>
    string PublicUrl(string key);
}

/// <summary>
/// Image processing contract; phase 1 converts every supported image to WebP.
/// </summary>
public interface IImageProcessor
{
    /// <summary>Decodes an image and produces responsive WebP variants.</summary>
    Task<ProcessedImage> ProcessAsync(
        Stream content,
        CancellationToken cancellationToken);
}

/// <summary>One processed image variant.</summary>
public sealed record ProcessedVariant(
    string Format,
    int Width,
    int Height,
    byte[] Content,
    bool IsCanonical);

/// <summary>Result of image conversion.</summary>
public sealed record ProcessedImage(
    int Width,
    int Height,
    string Hash,
    IReadOnlyList<ProcessedVariant> Variants);

/// <summary>Media write input used by the admin endpoint.</summary>
public sealed record MediaUploadInput(
    string FileName,
    string ContentType,
    long SizeBytes,
    string AltText,
    string? Caption,
    string? Credit,
    Guid? FolderId = null,
    IReadOnlyCollection<string>? Tags = null,
    int? FocalX = null,
    int? FocalY = null);

/// <summary>Media read model.</summary>
public sealed record MediaAssetDto(
    Guid Id,
    string OriginalFileName,
    string ContentType,
    long SizeBytes,
    int Width,
    int Height,
    string AltText,
    string? Caption,
    string? Credit,
    Guid? FolderId,
    IReadOnlyList<string> Tags,
    int? FocalX,
    int? FocalY,
    string Url,
    DateTimeOffset CreatedAt,
    IReadOnlyList<MediaVariantDto> Variants);

/// <summary>Media variant read model.</summary>
public sealed record MediaVariantDto(
    string Format,
    int Width,
    int Height,
    long SizeBytes,
    string Url,
    bool IsCanonical);

/// <summary>
/// Application service for the content media library.
/// </summary>
public interface IMediaAssetService
{
    /// <summary>Uploads and converts a media file.</summary>
    Task<MediaAssetDto> UploadAsync(
        Stream content,
        MediaUploadInput input,
        CancellationToken cancellationToken);

    /// <summary>Gets one public media asset.</summary>
    Task<MediaAssetDto?> GetAsync(Guid id, CancellationToken cancellationToken);

    /// <summary>Lists media assets.</summary>
    Task<(IReadOnlyList<MediaAssetDto> Items, int Total)> ListAsync(
        int page,
        int pageSize,
        string? query,
        CancellationToken cancellationToken);

    /// <summary>Updates alt/caption/credit metadata.</summary>
    Task<MediaAssetDto?> UpdateMetadataAsync(
        Guid id,
        string altText,
        string? caption,
        string? credit,
        Guid? folderId,
        IReadOnlyCollection<string>? tags,
        int? focalX,
        int? focalY,
        CancellationToken cancellationToken);

    /// <summary>Replaces the image binary while keeping the asset id.</summary>
    Task<MediaAssetDto?> ReplaceAsync(
        Guid id,
        Stream content,
        MediaUploadInput input,
        CancellationToken cancellationToken);

    /// <summary>Deletes a media asset and its stored variants.</summary>
    Task<bool> DeleteAsync(Guid id, CancellationToken cancellationToken);
}
