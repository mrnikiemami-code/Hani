using Hani.Modules.Content.Application.Abstractions;
using Hani.Modules.Content.Domain.Content;
using Hani.Modules.Content.Domain.Growth;
using Hani.Modules.Content.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Hani.Modules.Content.Infrastructure.Repositories;

internal sealed class ContentRepository(ContentDbContext dbContext) : IContentRepository
{
    public async Task AddCategoryAsync(ContentCategory category, CancellationToken cancellationToken)
    {
        await dbContext.Categories.AddAsync(category, cancellationToken);
        await dbContext.SaveChangesAsync(cancellationToken);
    }

    public Task<ContentCategory?> GetCategoryBySlugAsync(
        ContentType type,
        string slug,
        CancellationToken cancellationToken)
    {
        var normalized = slug.Trim().ToLowerInvariant();
        return dbContext.Categories
            .Include(item => item.Translations)
            .FirstOrDefaultAsync(
                item => item.Type == type && item.Slug == normalized,
                cancellationToken);
    }

    public async Task AddBlogAsync(BlogPost post, CancellationToken cancellationToken)
    {
        await dbContext.BlogPosts.AddAsync(post, cancellationToken);
        await dbContext.SaveChangesAsync(cancellationToken);
    }

    public Task<BlogPost?> GetBlogBySlugAsync(string slug, CancellationToken cancellationToken)
    {
        var normalized = slug.Trim().ToLowerInvariant();
        return dbContext.BlogPosts
            .Include(item => item.Translations)
            .FirstOrDefaultAsync(item => item.Slug == normalized, cancellationToken);
    }

    public async Task<IReadOnlyList<BlogPost>> ListBlogAsync(
        string? locale,
        Guid? categoryId,
        string? query,
        int skip,
        int take,
        CancellationToken cancellationToken)
    {
        var source = dbContext.BlogPosts
            .AsNoTracking()
            .Include(item => item.Translations)
            .Where(item => item.Status == ContentStatus.Published);

        if (categoryId is not null)
        {
            source = source.Where(item => item.CategoryId == categoryId);
        }

        if (!string.IsNullOrWhiteSpace(query))
        {
            var term = query.Trim();
            source = source.Where(item => item.Translations.Any(translation =>
                translation.Title.Contains(term) ||
                translation.Excerpt.Contains(term) ||
                translation.Body.Contains(term)));
        }

        return await source
            .OrderByDescending(item => item.PublishedAt)
            .Skip(skip)
            .Take(take)
            .ToArrayAsync(cancellationToken);
    }

    public Task<int> CountBlogAsync(Guid? categoryId, string? query, CancellationToken cancellationToken)
    {
        var source = dbContext.BlogPosts.Where(item => item.Status == ContentStatus.Published);

        if (categoryId is not null)
        {
            source = source.Where(item => item.CategoryId == categoryId);
        }

        if (!string.IsNullOrWhiteSpace(query))
        {
            var term = query.Trim();
            source = source.Where(item => item.Translations.Any(translation =>
                translation.Title.Contains(term) ||
                translation.Excerpt.Contains(term) ||
                translation.Body.Contains(term)));
        }

        return source.CountAsync(cancellationToken);
    }

    public async Task AddTravelogueAsync(Travelogue travelogue, CancellationToken cancellationToken)
    {
        await dbContext.Travelogues.AddAsync(travelogue, cancellationToken);
        await dbContext.SaveChangesAsync(cancellationToken);
    }

    public Task<Travelogue?> GetTravelogueBySlugAsync(string slug, CancellationToken cancellationToken)
    {
        var normalized = slug.Trim().ToLowerInvariant();
        return dbContext.Travelogues
            .Include(item => item.Translations)
            .Include(item => item.Destinations)
            .FirstOrDefaultAsync(item => item.Slug == normalized, cancellationToken);
    }

    public async Task<IReadOnlyList<Travelogue>> ListTraveloguesAsync(
        string? locale,
        Guid? destinationId,
        string? series,
        int skip,
        int take,
        CancellationToken cancellationToken)
    {
        var source = dbContext.Travelogues
            .AsNoTracking()
            .Include(item => item.Translations)
            .Include(item => item.Destinations)
            .Where(item => item.Status == ContentStatus.Published);

        if (destinationId is not null)
        {
            source = source.Where(item => item.Destinations.Any(destination => destination.DestinationId == destinationId));
        }

        if (!string.IsNullOrWhiteSpace(series))
        {
            var seriesName = series.Trim();
            source = source.Where(item => item.SeriesName == seriesName);
        }

        return await source
            .OrderByDescending(item => item.PublishedAt)
            .Skip(skip)
            .Take(take)
            .ToArrayAsync(cancellationToken);
    }

    public Task<int> CountTraveloguesAsync(
        Guid? destinationId,
        string? series,
        CancellationToken cancellationToken)
    {
        var source = dbContext.Travelogues.Where(item => item.Status == ContentStatus.Published);

        if (destinationId is not null)
        {
            source = source.Where(item => item.Destinations.Any(destination => destination.DestinationId == destinationId));
        }

        if (!string.IsNullOrWhiteSpace(series))
        {
            var seriesName = series.Trim();
            source = source.Where(item => item.SeriesName == seriesName);
        }

        return source.CountAsync(cancellationToken);
    }

    public async Task AddVideoAsync(Video video, CancellationToken cancellationToken)
    {
        await dbContext.Videos.AddAsync(video, cancellationToken);
        await dbContext.SaveChangesAsync(cancellationToken);
    }

    public Task<Video?> GetVideoBySlugAsync(string slug, CancellationToken cancellationToken)
    {
        var normalized = slug.Trim().ToLowerInvariant();
        return dbContext.Videos
            .Include(item => item.Translations)
            .FirstOrDefaultAsync(item => item.Slug == normalized, cancellationToken);
    }

    public async Task<IReadOnlyList<Video>> ListVideosAsync(
        string? locale,
        Guid? categoryId,
        int? level,
        int skip,
        int take,
        CancellationToken cancellationToken)
    {
        var source = dbContext.Videos
            .AsNoTracking()
            .Include(item => item.Translations)
            .Where(item => item.Status == ContentStatus.Published);

        if (categoryId is not null)
        {
            source = source.Where(item => item.CategoryId == categoryId);
        }

        if (level is not null)
        {
            source = source.Where(item => item.Level == level);
        }

        return await source
            .OrderByDescending(item => item.PublishedAt)
            .Skip(skip)
            .Take(take)
            .ToArrayAsync(cancellationToken);
    }

    public Task<int> CountVideosAsync(Guid? categoryId, int? level, CancellationToken cancellationToken)
    {
        var source = dbContext.Videos.Where(item => item.Status == ContentStatus.Published);

        if (categoryId is not null)
        {
            source = source.Where(item => item.CategoryId == categoryId);
        }

        if (level is not null)
        {
            source = source.Where(item => item.Level == level);
        }

        return source.CountAsync(cancellationToken);
    }

    public async Task AddCommentAsync(ContentComment comment, CancellationToken cancellationToken)
    {
        await dbContext.Comments.AddAsync(comment, cancellationToken);
        await dbContext.SaveChangesAsync(cancellationToken);
    }

    public Task<ContentComment?> GetCommentAsync(Guid id, CancellationToken cancellationToken)
        => dbContext.Comments.FirstOrDefaultAsync(item => item.Id == id, cancellationToken);

    public async Task<IReadOnlyList<ContentComment>> ListCommentsAsync(
        ContentType type,
        Guid contentId,
        int skip,
        int take,
        CancellationToken cancellationToken)
        => await dbContext.Comments
            .AsNoTracking()
            .Where(item =>
                item.ContentType == type &&
                item.ContentId == contentId &&
                item.Status == CommentStatus.Published)
            .OrderBy(item => item.CreatedAt)
            .Skip(skip)
            .Take(take)
            .ToArrayAsync(cancellationToken);

    public Task<int> CountCommentsAsync(
        ContentType type,
        Guid contentId,
        CancellationToken cancellationToken)
        => dbContext.Comments.CountAsync(
            item => item.ContentType == type &&
                item.ContentId == contentId &&
                item.Status == CommentStatus.Published,
            cancellationToken);

    public async Task AddAdSlotAsync(AdSlot slot, CancellationToken cancellationToken)
    {
        await dbContext.AdSlots.AddAsync(slot, cancellationToken);
        await dbContext.SaveChangesAsync(cancellationToken);
    }

    public Task<AdSlot?> GetAdSlotAsync(string code, CancellationToken cancellationToken)
    {
        var normalized = code.Trim().ToLowerInvariant();
        return dbContext.AdSlots
            .Include(item => item.Creatives)
            .FirstOrDefaultAsync(item => item.Code == normalized, cancellationToken);
    }

    public async Task AddAdEventAsync(AdEvent adEvent, CancellationToken cancellationToken)
    {
        await dbContext.AdEvents.AddAsync(adEvent, cancellationToken);
        await dbContext.SaveChangesAsync(cancellationToken);
    }

    public async Task AddSubscriptionAsync(NewsletterSubscription subscription, CancellationToken cancellationToken)
    {
        if (dbContext.Entry(subscription).State == EntityState.Detached)
        {
            await dbContext.NewsletterSubscriptions.AddAsync(subscription, cancellationToken);
        }

        await dbContext.SaveChangesAsync(cancellationToken);
    }

    public Task<NewsletterSubscription?> GetSubscriptionAsync(
        ContactChannel channel,
        string contact,
        CancellationToken cancellationToken)
    {
        var normalized = contact.Trim();
        return dbContext.NewsletterSubscriptions
            .FirstOrDefaultAsync(item => item.Channel == channel && item.Contact == normalized, cancellationToken);
    }

    public async Task AddCampaignAsync(Campaign campaign, CancellationToken cancellationToken)
    {
        await dbContext.Campaigns.AddAsync(campaign, cancellationToken);
        await dbContext.SaveChangesAsync(cancellationToken);
    }

    public Task<Campaign?> GetCampaignBySlugAsync(string slug, CancellationToken cancellationToken)
    {
        var normalized = slug.Trim().ToLowerInvariant();
        return dbContext.Campaigns
            .Include(item => item.Translations)
            .Include(item => item.Faqs)
            .FirstOrDefaultAsync(item => item.Slug == normalized, cancellationToken);
    }

    public async Task<IReadOnlyList<Campaign>> ListCampaignsAsync(
        int skip,
        int take,
        CancellationToken cancellationToken)
        => await dbContext.Campaigns
            .AsNoTracking()
            .Include(item => item.Translations)
            .Include(item => item.Faqs)
            .Where(item => item.Status == CampaignStatus.Active)
            .OrderBy(item => item.StartsAt)
            .Skip(skip)
            .Take(take)
            .ToArrayAsync(cancellationToken);

    public async Task AddCampaignRegistrationAsync(
        CampaignRegistration registration,
        CancellationToken cancellationToken)
    {
        await dbContext.CampaignRegistrations.AddAsync(registration, cancellationToken);
        await dbContext.SaveChangesAsync(cancellationToken);
    }

    public async Task AddNotificationAsync(Notification notification, CancellationToken cancellationToken)
    {
        await dbContext.Notifications.AddAsync(notification, cancellationToken);
        await dbContext.SaveChangesAsync(cancellationToken);
    }

    public async Task AddAnalyticsEventAsync(AnalyticsEvent analyticsEvent, CancellationToken cancellationToken)
    {
        await dbContext.AnalyticsEvents.AddAsync(analyticsEvent, cancellationToken);
        await dbContext.SaveChangesAsync(cancellationToken);
    }

    public Task<int> CountAnalyticsAsync(
        string? eventName,
        DateTimeOffset? from,
        DateTimeOffset? to,
        CancellationToken cancellationToken)
        => ApplyAnalyticsFilter(eventName, from, to).CountAsync(cancellationToken);

    public async Task<IReadOnlyList<AnalyticsBreakdown>> GroupAnalyticsByEntityTypeAsync(
        string? eventName,
        DateTimeOffset? from,
        DateTimeOffset? to,
        CancellationToken cancellationToken)
    {
        var rows = await ApplyAnalyticsFilter(eventName, from, to)
            .GroupBy(item => item.EntityType)
            .Select(group => new { EntityType = group.Key, Count = group.Count() })
            .OrderByDescending(item => item.Count)
            .ToArrayAsync(cancellationToken);

        return rows
            .Select(item => new AnalyticsBreakdown(item.EntityType, item.Count))
            .ToArray();
    }

    private IQueryable<AnalyticsEvent> ApplyAnalyticsFilter(
        string? eventName,
        DateTimeOffset? from,
        DateTimeOffset? to)
    {
        var query = dbContext.AnalyticsEvents.AsNoTracking().AsQueryable();

        if (!string.IsNullOrWhiteSpace(eventName))
        {
            var name = eventName.Trim();
            query = query.Where(item => item.EventName == name);
        }

        if (from is not null)
        {
            query = query.Where(item => item.OccurredAt >= from);
        }

        if (to is not null)
        {
            query = query.Where(item => item.OccurredAt <= to);
        }

        return query;
    }

    public async Task<AuthorContentCounts> CountByAuthorAsync(
        Guid authorUserId,
        CancellationToken cancellationToken)
    {
        var blogs = await dbContext.BlogPosts.CountAsync(
            item => item.AuthorUserId == authorUserId && item.Status == ContentStatus.Published,
            cancellationToken);
        var travelogues = await dbContext.Travelogues.CountAsync(
            item => item.AuthorUserId == authorUserId && item.Status == ContentStatus.Published,
            cancellationToken);
        var videos = await dbContext.Videos.CountAsync(
            item => item.AuthorUserId == authorUserId && item.Status == ContentStatus.Published,
            cancellationToken);

        return new AuthorContentCounts(blogs, travelogues, videos);
    }

    public Task SaveChangesAsync(CancellationToken cancellationToken)
        => dbContext.SaveChangesAsync(cancellationToken);
}
