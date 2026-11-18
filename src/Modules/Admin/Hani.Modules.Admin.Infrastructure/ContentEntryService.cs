using Hani.Modules.Admin.Application;
using Hani.Modules.Content.Domain.Content;
using Hani.Modules.Content.Domain.Media;
using Microsoft.EntityFrameworkCore;

namespace Hani.Modules.Admin.Infrastructure;

internal sealed partial class AdminService : IContentEntryService
{
    public async Task<ContentEntryListResponse> ListAdminAsync(
        int page,
        int pageSize,
        string? q,
        string? locale,
        ContentEntryType? type,
        ContentStatus? status,
        CancellationToken cancellationToken)
    {
        var normalizedPage = page <= 0 ? 1 : page;
        var normalizedPageSize = pageSize is <= 0 or > 100 ? 10 : pageSize;
        var query = content.ContentEntries.AsNoTracking().AsQueryable();
        if (!string.IsNullOrWhiteSpace(locale))
        {
            var normalizedLocale = locale.ToLowerInvariant();
            query = query.Where(item => item.Locale == normalizedLocale);
        }
        if (type is not null)
        {
            query = query.Where(item => item.Type == type);
        }
        if (status is not null)
        {
            query = query.Where(item => item.Status == status);
        }
        if (!string.IsNullOrWhiteSpace(q))
        {
            var term = q.Trim();
            query = query.Where(item =>
                EF.Functions.ILike(item.Title, $"%{term}%") ||
                EF.Functions.ILike(item.Slug, $"%{term}%"));
        }

        var total = await query.CountAsync(cancellationToken);
        var items = await query
            .OrderByDescending(item => item.UpdatedAt)
            .Skip((normalizedPage - 1) * normalizedPageSize)
            .Take(normalizedPageSize)
            .Select(item => new ContentEntryDto(
                item.Id, item.Type, item.Slug, item.Locale, item.Title, item.Excerpt,
                item.Body, item.HeroMediaId, item.HeroImageUrl, item.SeoTitle,
                item.SeoDescription, item.Status, item.PublishedAt, item.ScheduledAt,
                item.CreatedAt, item.UpdatedAt, item.Revisions.Count))
            .ToArrayAsync(cancellationToken);
        return new ContentEntryListResponse(items, normalizedPage, normalizedPageSize, total);
    }

    public async Task<ContentEntryDto?> GetAdminAsync(
        Guid id,
        CancellationToken cancellationToken)
    {
        var entry = await content.ContentEntries
            .AsNoTracking()
            .Include(item => item.Revisions)
            .FirstOrDefaultAsync(item => item.Id == id, cancellationToken);
        return entry is null ? null : ToContentDto(entry);
    }

    public async Task<ContentEntryDto> CreateAsync(
        ContentEntryWriteRequest request,
        CancellationToken cancellationToken)
    {
        if (!Enum.IsDefined(request.Type) ||
            string.IsNullOrWhiteSpace(request.Title) ||
            string.IsNullOrWhiteSpace(request.Slug))
        {
            throw new ArgumentException("Title, slug, and a valid type are required.");
        }

        var entry = ContentEntry.Create(
            ids.NewId(),
            request.Type,
            request.Slug,
            languages.Normalize(request.Locale),
            request.Title,
            request.Excerpt,
            request.Body ?? string.Empty,
            request.HeroMediaId,
            request.HeroImageUrl,
            request.SeoTitle,
            request.SeoDescription);
        await content.ContentEntries.AddAsync(entry, cancellationToken);
        await SyncContentUsageAsync(entry, cancellationToken);
        await content.SaveChangesAsync(cancellationToken);
        return ToContentDto(entry);
    }

    public async Task<ContentEntryDto?> UpdateAsync(
        Guid id,
        ContentEntryWriteRequest request,
        CancellationToken cancellationToken)
    {
        var entry = await content.ContentEntries
            .Include(item => item.Revisions)
            .FirstOrDefaultAsync(item => item.Id == id, cancellationToken);
        if (entry is null)
        {
            return null;
        }

        entry.Update(
            request.Slug,
            request.Title,
            request.Excerpt,
            request.Body ?? string.Empty,
            request.HeroMediaId,
            request.HeroImageUrl,
            request.SeoTitle,
            request.SeoDescription,
            ids.NewId());
        content.ContentEntryRevisions.Add(entry.Revisions.Last());
        entry.ChangeClassification(request.Type, languages.Normalize(request.Locale));
        await SyncContentUsageAsync(entry, cancellationToken);
        await content.SaveChangesAsync(cancellationToken);
        return ToContentDto(entry);
    }

    public async Task<ContentEntryDto?> PublishEntryAsync(Guid id, CancellationToken cancellationToken)
    {
        var entry = await content.ContentEntries
            .FirstOrDefaultAsync(item => item.Id == id, cancellationToken);
        if (entry is null)
        {
            return null;
        }

        entry.Publish();
        await content.SaveChangesAsync(cancellationToken);
        return ToContentDto(entry);
    }

    public async Task<ContentEntryDto?> UnpublishEntryAsync(Guid id, CancellationToken cancellationToken)
    {
        var entry = await content.ContentEntries
            .FirstOrDefaultAsync(item => item.Id == id, cancellationToken);
        if (entry is null)
        {
            return null;
        }

        entry.Unpublish();
        await content.SaveChangesAsync(cancellationToken);
        return ToContentDto(entry);
    }

    public async Task<ContentEntryDto?> ScheduleAsync(
        Guid id,
        DateTimeOffset scheduledAt,
        CancellationToken cancellationToken)
    {
        if (scheduledAt <= DateTimeOffset.UtcNow)
        {
            throw new ArgumentException("Scheduled time must be in the future.");
        }

        var entry = await content.ContentEntries
            .FirstOrDefaultAsync(item => item.Id == id, cancellationToken);
        if (entry is null)
        {
            return null;
        }

        entry.Schedule(scheduledAt);
        await content.SaveChangesAsync(cancellationToken);
        return ToContentDto(entry);
    }

    public async Task DeleteAsync(Guid id, CancellationToken cancellationToken)
    {
        var entry = await content.ContentEntries
            .FirstOrDefaultAsync(item => item.Id == id, cancellationToken);
        if (entry is null)
        {
            return;
        }

        content.MediaUsages.RemoveRange(
            content.MediaUsages.Where(usage =>
                usage.EntityType == "ContentEntry" &&
                usage.EntityId == entry.Id.ToString()));
        content.ContentEntries.Remove(entry);
        await content.SaveChangesAsync(cancellationToken);
    }

    public async Task<IReadOnlyList<ContentEntryDto>> ListPublishedAsync(
        string? locale,
        ContentEntryType? type,
        CancellationToken cancellationToken)
    {
        var normalizedLocale = languages.Normalize(locale);
        var query = content.ContentEntries
            .AsNoTracking()
            .Where(item => item.Locale == normalizedLocale &&
                (item.Status == ContentStatus.Published ||
                 (item.Status == ContentStatus.Scheduled &&
                  item.ScheduledAt <= DateTimeOffset.UtcNow)));
        if (type is not null)
        {
            query = query.Where(item => item.Type == type);
        }

        return await query
            .OrderByDescending(item => item.PublishedAt)
            .Select(item => new ContentEntryDto(
                item.Id, item.Type, item.Slug, item.Locale, item.Title, item.Excerpt,
                item.Body, item.HeroMediaId, item.HeroImageUrl, item.SeoTitle,
                item.SeoDescription, item.Status, item.PublishedAt, item.ScheduledAt,
                item.CreatedAt, item.UpdatedAt, item.Revisions.Count))
            .ToArrayAsync(cancellationToken);
    }

    public async Task<ContentEntryDto?> GetPublishedAsync(
        string slug,
        string? locale,
        ContentEntryType? type,
        CancellationToken cancellationToken)
    {
        var normalizedLocale = languages.Normalize(locale);
        var normalizedSlug = slug.ToLowerInvariant();
        var entry = await content.ContentEntries
            .AsNoTracking()
            .FirstOrDefaultAsync(item =>
                item.Slug == normalizedSlug &&
                item.Locale == normalizedLocale &&
                item.Type == (type ?? ContentEntryType.Page) &&
                (item.Status == ContentStatus.Published ||
                 (item.Status == ContentStatus.Scheduled &&
                  item.ScheduledAt <= DateTimeOffset.UtcNow)),
                cancellationToken);
        return entry is null ? null : ToContentDto(entry);
    }

    public async Task<ContentEntryDto?> RestoreRevisionAsync(
        Guid id,
        Guid revisionId,
        CancellationToken cancellationToken)
    {
        var entry = await content.ContentEntries
            .Include(item => item.Revisions)
            .FirstOrDefaultAsync(item => item.Id == id, cancellationToken);
        var revision = entry?.Revisions.FirstOrDefault(item => item.Id == revisionId);
        if (entry is null || revision is null)
        {
            return null;
        }

        entry.Update(
            entry.Slug,
            revision.Title,
            revision.Excerpt,
            revision.Body,
            revision.HeroMediaId,
            revision.HeroImageUrl,
            revision.SeoTitle,
            revision.SeoDescription,
            ids.NewId());
        content.ContentEntryRevisions.Add(entry.Revisions.Last());
        await SyncContentUsageAsync(entry, cancellationToken);
        await content.SaveChangesAsync(cancellationToken);
        return ToContentDto(entry);
    }

    private async Task SyncContentUsageAsync(
        ContentEntry entry,
        CancellationToken cancellationToken)
    {
        var entityId = entry.Id.ToString();
        var existing = await content.MediaUsages
            .Where(usage => usage.EntityType == "ContentEntry" && usage.EntityId == entityId)
            .ToArrayAsync(cancellationToken);
        if (existing.Length > 0)
        {
            content.MediaUsages.RemoveRange(existing);
        }

        if (entry.HeroMediaId is { } mediaId)
        {
            await content.MediaUsages.AddAsync(
                new MediaUsage(ids.NewId(), mediaId, "ContentEntry", entityId, "HeroMedia"),
                cancellationToken);
        }
    }

    private static ContentEntryDto ToContentDto(ContentEntry entry) => new(
        entry.Id, entry.Type, entry.Slug, entry.Locale, entry.Title, entry.Excerpt,
        entry.Body, entry.HeroMediaId, entry.HeroImageUrl, entry.SeoTitle,
        entry.SeoDescription, entry.Status, entry.PublishedAt, entry.ScheduledAt,
        entry.CreatedAt, entry.UpdatedAt, entry.Revisions.Count);
}
