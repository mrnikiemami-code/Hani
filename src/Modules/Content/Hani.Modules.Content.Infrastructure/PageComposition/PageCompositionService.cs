using System.Text.Json;
using Hani.Modules.Content.Application.PageComposition;
using Hani.Modules.Content.Domain.Settings;
using Hani.Modules.Content.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Hani.Modules.Content.Infrastructure.PageComposition;

internal sealed class PageCompositionService(ContentDbContext dbContext)
    : IPageCompositionService
{
    private const string Prefix = "page:";
    private const string PublishedSuffix = ":published";
    private const int MaxBytes = 100_000;

    public async Task<IReadOnlyList<PageCompositionListItemDto>> ListAsync(
        string? locale,
        CancellationToken cancellationToken)
    {
        var normalizedLocale = NormalizeLocale(locale);
        var rows = await dbContext.HomePageSettings
            .AsNoTracking()
            .Where(item => item.Locale == normalizedLocale && item.Key.StartsWith(Prefix))
            .ToArrayAsync(cancellationToken);

        var publishedKeys = rows
            .Where(item => item.Key.EndsWith(PublishedSuffix, StringComparison.Ordinal))
            .Select(item => item.Key[..^PublishedSuffix.Length])
            .ToHashSet(StringComparer.OrdinalIgnoreCase);

        return rows
            .Where(item => !item.Key.EndsWith(PublishedSuffix, StringComparison.Ordinal))
            .Select(item => new PageCompositionListItemDto(
                item.Key[Prefix.Length..],
                item.Locale,
                true,
                publishedKeys.Contains(item.Key),
                item.UpdatedAt,
                rows.FirstOrDefault(published =>
                    published.Key == $"{item.Key}{PublishedSuffix}")?.UpdatedAt))
            .OrderBy(item => item.PageKey, StringComparer.Ordinal)
            .ToArray();
    }

    public async Task<PageCompositionDto?> GetAsync(
        string pageKey,
        string? locale,
        bool published,
        CancellationToken cancellationToken)
    {
        var normalizedKey = NormalizePageKey(pageKey);
        var normalizedLocale = NormalizeLocale(locale);
        var key = BuildKey(normalizedKey, published);
        var entity = await dbContext.HomePageSettings
            .AsNoTracking()
            .FirstOrDefaultAsync(
                item => item.Key == key && item.Locale == normalizedLocale,
                cancellationToken);

        return entity is null
            ? null
            : ToDto(normalizedKey, normalizedLocale, published, entity.SettingsJson, entity.UpdatedAt);
    }

    public async Task<PageCompositionDto> SaveDraftAsync(
        string pageKey,
        string? locale,
        JsonElement data,
        CancellationToken cancellationToken)
    {
        var normalizedKey = NormalizePageKey(pageKey);
        var normalizedLocale = NormalizeLocale(locale);
        ValidateJson(data);
        var json = data.GetRawText();
        var storageKey = BuildKey(normalizedKey, published: false);
        var entity = await dbContext.HomePageSettings
            .FirstOrDefaultAsync(
                item => item.Key == storageKey && item.Locale == normalizedLocale,
                cancellationToken);

        if (entity is null)
        {
            entity = HomePageSettings.Create(storageKey, normalizedLocale, json);
            await dbContext.HomePageSettings.AddAsync(entity, cancellationToken);
        }
        else
        {
            entity.Update(json);
        }

        await dbContext.SaveChangesAsync(cancellationToken);
        return ToDto(normalizedKey, normalizedLocale, false, json, entity.UpdatedAt);
    }

    public async Task<PageCompositionDto> PublishAsync(
        string pageKey,
        string? locale,
        CancellationToken cancellationToken)
    {
        var normalizedKey = NormalizePageKey(pageKey);
        var normalizedLocale = NormalizeLocale(locale);
        var draft = await dbContext.HomePageSettings
            .AsNoTracking()
            .FirstOrDefaultAsync(
                item => item.Key == BuildKey(normalizedKey, published: false) &&
                    item.Locale == normalizedLocale,
                cancellationToken);

        if (draft is null)
        {
            throw new ArgumentException("A draft page composition is required before publishing.");
        }

        var publishedKey = BuildKey(normalizedKey, published: true);
        var published = await dbContext.HomePageSettings
            .FirstOrDefaultAsync(
                item => item.Key == publishedKey && item.Locale == normalizedLocale,
                cancellationToken);
        if (published is null)
        {
            published = HomePageSettings.Create(
                publishedKey,
                normalizedLocale,
                draft.SettingsJson);
            await dbContext.HomePageSettings.AddAsync(published, cancellationToken);
        }
        else
        {
            published.Update(draft.SettingsJson);
        }

        await dbContext.SaveChangesAsync(cancellationToken);
        return ToDto(
            normalizedKey,
            normalizedLocale,
            true,
            draft.SettingsJson,
            published.UpdatedAt);
    }

    private static PageCompositionDto ToDto(
        string pageKey,
        string locale,
        bool published,
        string json,
        DateTimeOffset updatedAt)
    {
        using var document = JsonDocument.Parse(json);
        return new PageCompositionDto(
            pageKey,
            locale,
            published ? "Published" : "Draft",
            document.RootElement.Clone(),
            updatedAt,
            published ? updatedAt : null);
    }

    private static void ValidateJson(JsonElement data)
    {
        if (data.ValueKind != JsonValueKind.Object)
        {
            throw new ArgumentException("Page composition data must be a JSON object.");
        }

        if (data.GetRawText().Length > MaxBytes)
        {
            throw new ArgumentException("Page composition data must be at most 100 KB.");
        }
    }

    private static string NormalizePageKey(string pageKey)
    {
        var normalized = pageKey.Trim().ToLowerInvariant();
        if (!PageCompositionCatalog.IsKnown(normalized))
        {
            throw new ArgumentException($"Unknown page key '{pageKey}'.");
        }

        return normalized;
    }

    private static string NormalizeLocale(string? locale) =>
        string.IsNullOrWhiteSpace(locale)
            ? "fa"
            : locale.Trim().ToLowerInvariant();

    private static string BuildKey(string pageKey, bool published) =>
        $"{Prefix}{pageKey}{(published ? PublishedSuffix : string.Empty)}";
}
