using Hani.BuildingBlocks.Application;
using Hani.BuildingBlocks.AspNetCore;
using Hani.BuildingBlocks.Domain;
using Hani.Modules.Content.Domain.Content;
using Hani.Modules.Content.Domain.Media;
using Hani.Modules.Content.Infrastructure.Persistence;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using IResult = Microsoft.AspNetCore.Http.IResult;

namespace Hani.Api;

/// <summary>
/// Admin/public content CMS endpoints backed by ContentEntry.
/// </summary>
public static class ContentEntryEndpoints
{
    /// <summary>Maps content CMS endpoints.</summary>
    public static IEndpointRouteBuilder MapContentEntryEndpoints(this IEndpointRouteBuilder app)
    {
        var admin = app.MapGroup("/internal/v1/content-entries")
            .WithTags("Internal.Content")
            .RequireAuthorization("Admin");

        admin.MapGet("", ListAdminAsync);
        admin.MapGet("/{id:guid}", GetAdminAsync);
        admin.MapPost("", CreateAsync);
        admin.MapPut("/{id:guid}", UpdateAsync);
        admin.MapPost("/{id:guid}/publish", PublishAsync);
        admin.MapPost("/{id:guid}/unpublish", UnpublishAsync);
        admin.MapPost("/{id:guid}/revisions/{revisionId:guid}/restore", RestoreRevisionAsync);
        admin.MapPost("/{id:guid}/schedule", ScheduleAsync);
        admin.MapDelete("/{id:guid}", DeleteAsync);

        var market = app.MapGroup("/market/v1/content-entries")
            .WithTags("Marketplace.Content");

        market.MapGet("", ListPublishedAsync);
        market.MapGet("/{slug}", GetPublishedAsync);

        return app;
    }

    private static async Task<IResult> ListAdminAsync(
        [FromQuery] string? locale,
        [FromQuery] ContentEntryType? type,
        ContentDbContext db,
        CancellationToken cancellationToken)
    {
        var query = db.ContentEntries.AsNoTracking().AsQueryable();
        if (!string.IsNullOrWhiteSpace(locale))
        {
            query = query.Where(item => item.Locale == locale.ToLowerInvariant());
        }
        if (type is not null)
        {
            query = query.Where(item => item.Type == type);
        }

        var items = await query
            .OrderByDescending(item => item.UpdatedAt)
            .Select(item => new ContentEntryDto(
                item.Id, item.Type, item.Slug, item.Locale, item.Title, item.Excerpt,
                item.Body, item.HeroMediaId, item.HeroImageUrl, item.SeoTitle,
                item.SeoDescription, item.Status, item.PublishedAt, item.ScheduledAt,
                item.CreatedAt, item.UpdatedAt, item.Revisions.Count))
            .ToArrayAsync(cancellationToken);
        return Results.Ok(items);
    }

    private static async Task<IResult> GetAdminAsync(
        Guid id,
        ContentDbContext db,
        CancellationToken cancellationToken)
    {
        var entry = await db.ContentEntries
            .AsNoTracking()
            .Include(item => item.Revisions)
            .FirstOrDefaultAsync(item => item.Id == id, cancellationToken);
        return entry is null
            ? Results.NotFound()
            : Results.Ok(ToDto(entry));
    }

    private static async Task<IResult> CreateAsync(
        ContentEntryWriteRequest request,
        HttpContext context,
        ILanguageCatalog languages,
        ContentDbContext db,
        IIdGenerator ids,
        CancellationToken cancellationToken)
    {
        if (!Enum.IsDefined(request.Type) || string.IsNullOrWhiteSpace(request.Title) ||
            string.IsNullOrWhiteSpace(request.Slug))
        {
            return context.ToProblem(
                Error.Validation("HANI-CONTENT-1001", "Title, slug, and a valid type are required."));
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

        await db.ContentEntries.AddAsync(entry, cancellationToken);
        await SyncUsageAsync(entry, db, ids, cancellationToken);
        await db.SaveChangesAsync(cancellationToken);
        return Results.Ok(ToDto(entry));
    }

    private static async Task<IResult> UpdateAsync(
        Guid id,
        ContentEntryWriteRequest request,
        HttpContext context,
        ILanguageCatalog languages,
        ContentDbContext db,
        IIdGenerator ids,
        CancellationToken cancellationToken)
    {
        var entry = await db.ContentEntries
            .Include(item => item.Revisions)
            .FirstOrDefaultAsync(item => item.Id == id, cancellationToken);
        if (entry is null)
        {
            return Results.NotFound();
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
        entry.ChangeClassification(request.Type, languages.Normalize(request.Locale));
        await SyncUsageAsync(entry, db, ids, cancellationToken);
        await db.SaveChangesAsync(cancellationToken);
        return Results.Ok(ToDto(entry));
    }

    private static async Task<IResult> PublishAsync(
        Guid id,
        ContentDbContext db,
        CancellationToken cancellationToken)
    {
        var entry = await db.ContentEntries.FirstOrDefaultAsync(item => item.Id == id, cancellationToken);
        if (entry is null) return Results.NotFound();
        entry.Publish();
        await db.SaveChangesAsync(cancellationToken);
        return Results.Ok(ToDto(entry));
    }

    private static async Task<IResult> UnpublishAsync(
        Guid id,
        ContentDbContext db,
        CancellationToken cancellationToken)
    {
        var entry = await db.ContentEntries.FirstOrDefaultAsync(item => item.Id == id, cancellationToken);
        if (entry is null) return Results.NotFound();
        entry.Unpublish();
        await db.SaveChangesAsync(cancellationToken);
        return Results.Ok(ToDto(entry));
    }

    private static async Task<IResult> ScheduleAsync(
        Guid id,
        ScheduleContentRequest request,
        HttpContext context,
        ContentDbContext db,
        CancellationToken cancellationToken)
    {
        if (request.ScheduledAt <= DateTimeOffset.UtcNow)
        {
            return context.ToProblem(
                Error.Validation("HANI-CONTENT-1002", "Scheduled time must be in the future."));
        }

        var entry = await db.ContentEntries.FirstOrDefaultAsync(item => item.Id == id, cancellationToken);
        if (entry is null) return Results.NotFound();
        entry.Schedule(request.ScheduledAt);
        await db.SaveChangesAsync(cancellationToken);
        return Results.Ok(ToDto(entry));
    }

    private static async Task<IResult> DeleteAsync(
        Guid id,
        ContentDbContext db,
        CancellationToken cancellationToken)
    {
        var entry = await db.ContentEntries.FirstOrDefaultAsync(item => item.Id == id, cancellationToken);
        if (entry is null) return Results.NoContent();
        db.MediaUsages.RemoveRange(
            db.MediaUsages.Where(usage =>
                usage.EntityType == "ContentEntry" &&
                usage.EntityId == entry.Id.ToString()));
        db.ContentEntries.Remove(entry);
        await db.SaveChangesAsync(cancellationToken);
        return Results.NoContent();
    }

    private static async Task<IResult> ListPublishedAsync(
        [FromQuery] string? locale,
        [FromQuery] ContentEntryType? type,
        ILanguageCatalog languages,
        ContentDbContext db,
        CancellationToken cancellationToken)
    {
        var normalizedLocale = languages.Normalize(locale);
        var query = db.ContentEntries
            .AsNoTracking()
            .Where(item => item.Locale == normalizedLocale &&
                (item.Status == ContentStatus.Published ||
                 (item.Status == ContentStatus.Scheduled && item.ScheduledAt <= DateTimeOffset.UtcNow)));
        if (type is not null)
        {
            query = query.Where(item => item.Type == type);
        }

        var items = await query
            .OrderByDescending(item => item.PublishedAt)
            .Select(item => new ContentEntryDto(
                item.Id, item.Type, item.Slug, item.Locale, item.Title, item.Excerpt,
                item.Body, item.HeroMediaId, item.HeroImageUrl, item.SeoTitle,
                item.SeoDescription, item.Status, item.PublishedAt, item.ScheduledAt,
                item.CreatedAt, item.UpdatedAt, item.Revisions.Count))
            .ToArrayAsync(cancellationToken);
        return Results.Ok(items);
    }

    private static async Task<IResult> RestoreRevisionAsync(
        Guid id,
        Guid revisionId,
        ContentDbContext db,
        IIdGenerator ids,
        CancellationToken cancellationToken)
    {
        var entry = await db.ContentEntries
            .Include(item => item.Revisions)
            .FirstOrDefaultAsync(item => item.Id == id, cancellationToken);
        var revision = entry?.Revisions.FirstOrDefault(item => item.Id == revisionId);
        if (entry is null || revision is null)
        {
            return Results.NotFound();
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
        await SyncUsageAsync(entry, db, ids, cancellationToken);
        await db.SaveChangesAsync(cancellationToken);
        return Results.Ok(ToDto(entry));
    }

    private static async Task SyncUsageAsync(
        ContentEntry entry,
        ContentDbContext db,
        IIdGenerator ids,
        CancellationToken cancellationToken)
    {
        var entityId = entry.Id.ToString();
        var existing = await db.MediaUsages
            .Where(usage => usage.EntityType == "ContentEntry" && usage.EntityId == entityId)
            .ToArrayAsync(cancellationToken);
        if (existing.Length > 0)
        {
            db.MediaUsages.RemoveRange(existing);
        }

        if (entry.HeroMediaId is { } mediaId)
        {
            await db.MediaUsages.AddAsync(
                new MediaUsage(ids.NewId(), mediaId, "ContentEntry", entityId, "HeroMedia"),
                cancellationToken);
        }
    }

    private static async Task<IResult> GetPublishedAsync(
        string slug,
        [FromQuery] string? locale,
        [FromQuery] ContentEntryType? type,
        ILanguageCatalog languages,
        ContentDbContext db,
        CancellationToken cancellationToken)
    {
        var normalizedLocale = languages.Normalize(locale);
        var entry = await db.ContentEntries
            .AsNoTracking()
            .FirstOrDefaultAsync(item =>
                item.Slug == slug.ToLowerInvariant() &&
                item.Locale == normalizedLocale &&
                item.Type == (type ?? ContentEntryType.Page) &&
                (item.Status == ContentStatus.Published ||
                 (item.Status == ContentStatus.Scheduled && item.ScheduledAt <= DateTimeOffset.UtcNow)),
                cancellationToken);
        return entry is null ? Results.NotFound() : Results.Ok(ToDto(entry));
    }

    private static ContentEntryDto ToDto(ContentEntry entry) => new(
        entry.Id, entry.Type, entry.Slug, entry.Locale, entry.Title, entry.Excerpt,
        entry.Body, entry.HeroMediaId, entry.HeroImageUrl, entry.SeoTitle,
        entry.SeoDescription, entry.Status, entry.PublishedAt, entry.ScheduledAt,
        entry.CreatedAt, entry.UpdatedAt, entry.Revisions.Count);
}

/// <summary>Content entry read/write model.</summary>
public sealed record ContentEntryDto(
    Guid Id,
    ContentEntryType Type,
    string Slug,
    string Locale,
    string Title,
    string? Excerpt,
    string Body,
    Guid? HeroMediaId,
    string? HeroImageUrl,
    string? SeoTitle,
    string? SeoDescription,
    ContentStatus Status,
    DateTimeOffset? PublishedAt,
    DateTimeOffset? ScheduledAt,
    DateTimeOffset CreatedAt,
    DateTimeOffset UpdatedAt,
    int RevisionCount);

/// <summary>Content entry write request.</summary>
/// <summary>Schedule publication request.</summary>
public sealed record ScheduleContentRequest(DateTimeOffset ScheduledAt);

public sealed record ContentEntryWriteRequest(
    ContentEntryType Type,
    string Slug,
    string Locale,
    string Title,
    string? Excerpt,
    string? Body,
    Guid? HeroMediaId,
    string? HeroImageUrl,
    string? SeoTitle,
    string? SeoDescription);
