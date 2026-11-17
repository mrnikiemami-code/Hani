using Hani.BuildingBlocks.Domain;
using Hani.Modules.Content.Application.Media;
using Hani.Modules.Content.Domain.Media;
using Hani.Modules.Content.Infrastructure.Persistence;

namespace Hani.Modules.Content.Infrastructure.Storage;

internal sealed class MediaAssetService(
    IMediaAssetRepository repository,
    IContentMediaStorage storage,
    IImageProcessor processor,
    IIdGenerator ids,
    ContentDbContext dbContext) : IMediaAssetService
{
    private const long MaxUploadBytes = 15 * 1024 * 1024;

    public async Task<MediaAssetDto> UploadAsync(
        Stream content,
        MediaUploadInput input,
        CancellationToken cancellationToken)
    {
        if (input.SizeBytes is <= 0 or > MaxUploadBytes)
        {
            throw new ArgumentException("Media size must be between 1 byte and 15 MB.");
        }

        if (string.IsNullOrWhiteSpace(input.AltText))
        {
            throw new ArgumentException("Alt text is required.");
        }

        var processed = await processor.ProcessAsync(content, cancellationToken);
        var existing = await repository.GetByHashAsync(processed.Hash, cancellationToken);
        if (existing is not null)
        {
            return Map(existing);
        }

        var canonical = processed.Variants.Single(variant => variant.IsCanonical);
        var canonicalKey = BuildKey(processed.Hash, canonical.Width);
        var asset = MediaAsset.Create(
            ids.NewId(),
            canonicalKey,
            input.FileName,
            input.ContentType,
            input.SizeBytes,
            processed.Width,
            processed.Height,
            processed.Hash,
            input.AltText);
        asset.UpdateMetadata(input.AltText, input.Caption, input.Credit);
        asset.UpdateLibrary(input.FolderId, input.Tags ?? [], input.FocalX, input.FocalY);

        foreach (var variant in processed.Variants)
        {
            var key = BuildKey(processed.Hash, variant.Width);
            await storage.SaveAsync(
                key,
                new MemoryStream(variant.Content),
                "image/webp",
                cancellationToken);
            asset.AddVariant(
                ids.NewId(),
                key,
                variant.Format,
                variant.Width,
                variant.Height,
                variant.Content.LongLength,
                variant.IsCanonical);
        }

        await repository.AddAsync(asset, cancellationToken);
        await repository.SaveChangesAsync(cancellationToken);
        AddAudit(asset.Id, "Uploaded");
        await repository.SaveChangesAsync(cancellationToken);
        return Map(asset);
    }

    public async Task<MediaAssetDto?> GetAsync(Guid id, CancellationToken cancellationToken)
    {
        var asset = await repository.GetAsync(id, cancellationToken);
        return asset is null ? null : Map(asset);
    }

    public async Task<(IReadOnlyList<MediaAssetDto> Items, int Total)> ListAsync(
        int page,
        int pageSize,
        string? query,
        Guid? folderId,
        CancellationToken cancellationToken)
    {
        var normalizedPage = Math.Max(1, page);
        var normalizedPageSize = Math.Clamp(pageSize, 1, 100);
        var (items, total) = await repository.ListAsync(
            normalizedPage,
            normalizedPageSize,
            query,
            folderId,
            cancellationToken);

        return (items.Select(Map).ToArray(), total);
    }

    public async Task<MediaAssetDto?> UpdateMetadataAsync(
        Guid id,
        string altText,
        string? caption,
        string? credit,
        Guid? folderId,
        IReadOnlyCollection<string>? tags,
        int? focalX,
        int? focalY,
        CancellationToken cancellationToken)
    {
        var asset = await repository.GetAsync(id, cancellationToken);
        if (asset is null)
        {
            return null;
        }

        asset.UpdateMetadata(altText, caption, credit);
        asset.UpdateLibrary(folderId, tags ?? [], focalX, focalY);
        AddAudit(asset.Id, "MetadataUpdated");
        await repository.SaveChangesAsync(cancellationToken);
        return Map(asset);
    }

    public async Task<MediaAssetDto?> ReplaceAsync(
        Guid id,
        Stream content,
        MediaUploadInput input,
        CancellationToken cancellationToken)
    {
        var asset = await repository.GetAsync(id, cancellationToken);
        if (asset is null)
        {
            return null;
        }

        var processed = await processor.ProcessAsync(content, cancellationToken);
        var existing = await repository.GetByHashAsync(processed.Hash, cancellationToken);
        if (existing is not null && existing.Id != id)
        {
            throw new InvalidOperationException("An identical media asset already exists.");
        }

        var oldVariants = asset.Variants.ToArray();
        var canonical = processed.Variants.Single(variant => variant.IsCanonical);
        asset.ReplaceImage(
            BuildKey(processed.Hash, canonical.Width),
            input.ContentType,
            input.SizeBytes,
            processed.Width,
            processed.Height,
            processed.Hash);
        asset.UpdateMetadata(input.AltText, input.Caption, input.Credit);
        asset.UpdateLibrary(input.FolderId, input.Tags ?? [], input.FocalX, input.FocalY);

        foreach (var variant in processed.Variants)
        {
            var key = BuildKey(processed.Hash, variant.Width);
            await storage.SaveAsync(
                key,
                new MemoryStream(variant.Content),
                "image/webp",
                cancellationToken);
            asset.AddVariant(
                ids.NewId(),
                key,
                variant.Format,
                variant.Width,
                variant.Height,
                variant.Content.LongLength,
                variant.IsCanonical);
        }

        AddAudit(asset.Id, "Replaced", input.FileName);
        await repository.SaveChangesAsync(cancellationToken);
        foreach (var old in oldVariants)
        {
            await storage.DeleteAsync(old.StorageKey, cancellationToken);
        }

        return Map(asset);
    }

    public async Task<bool> DeleteAsync(Guid id, CancellationToken cancellationToken)
    {
        var asset = await repository.GetAsync(id, cancellationToken);
        if (asset is null)
        {
            return false;
        }

        foreach (var variant in asset.Variants)
        {
            await storage.DeleteAsync(variant.StorageKey, cancellationToken);
        }

        AddAudit(asset.Id, "Deleted", asset.OriginalFileName);
        repository.Remove(asset);
        await repository.SaveChangesAsync(cancellationToken);
        return true;
    }

    private MediaAssetDto Map(MediaAsset asset)
    {
        var variants = asset.Variants
            .OrderBy(variant => variant.Width)
            .Select(variant => new MediaVariantDto(
                variant.Format,
                variant.Width,
                variant.Height,
                variant.SizeBytes,
                storage.PublicUrl(variant.StorageKey),
                variant.IsCanonical))
            .ToArray();

        return new MediaAssetDto(
            asset.Id,
            asset.OriginalFileName,
            asset.ContentType,
            asset.SizeBytes,
            asset.Width,
            asset.Height,
            asset.AltText,
            asset.Caption,
            asset.Credit,
            asset.FolderId,
            asset.Tags,
            asset.FocalX,
            asset.FocalY,
            storage.PublicUrl(asset.StorageKey),
            asset.CreatedAt,
            variants);
    }

    private void AddAudit(Guid mediaAssetId, string action, string? detail = null)
    {
        dbContext.MediaAuditLogs.Add(new MediaAuditLog(
            ids.NewId(),
            mediaAssetId,
            action,
            detail));
    }

    private static string BuildKey(string hash, int width) =>
        $"{hash[..2]}/{hash}/{width}.webp";
}
