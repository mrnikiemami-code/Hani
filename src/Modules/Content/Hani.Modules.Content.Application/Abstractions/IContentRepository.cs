using Hani.Modules.Content.Domain.Content;
using Hani.Modules.Content.Domain.Dashboard;
using Hani.Modules.Content.Domain.Growth;

namespace Hani.Modules.Content.Application.Abstractions;

/// <summary>
/// Persistence abstraction for content and growth aggregates.
/// </summary>
public interface IContentRepository
{
    /// <summary>Adds a category and saves changes.</summary>
    Task AddCategoryAsync(ContentCategory category, CancellationToken cancellationToken);
    /// <summary>Returns a category by type and slug.</summary>
    Task<ContentCategory?> GetCategoryBySlugAsync(ContentType type, string slug, CancellationToken cancellationToken);

    /// <summary>Adds a blog post and saves changes.</summary>
    Task AddBlogAsync(BlogPost post, CancellationToken cancellationToken);
    /// <summary>Returns a blog post with translations by slug.</summary>
    Task<BlogPost?> GetBlogBySlugAsync(string slug, CancellationToken cancellationToken);
    /// <summary>Returns published blog posts.</summary>
    Task<IReadOnlyList<BlogPost>> ListBlogAsync(string? locale, Guid? categoryId, string? query, int skip, int take, CancellationToken cancellationToken);
    /// <summary>Counts published blog posts.</summary>
    Task<int> CountBlogAsync(Guid? categoryId, string? query, CancellationToken cancellationToken);

    /// <summary>Adds a travelogue and saves changes.</summary>
    Task AddTravelogueAsync(Travelogue travelogue, CancellationToken cancellationToken);
    /// <summary>Returns a travelogue by slug.</summary>
    Task<Travelogue?> GetTravelogueBySlugAsync(string slug, CancellationToken cancellationToken);
    /// <summary>Lists published travelogues.</summary>
    Task<IReadOnlyList<Travelogue>> ListTraveloguesAsync(string? locale, Guid? destinationId, string? series, int skip, int take, CancellationToken cancellationToken);
    /// <summary>Counts published travelogues.</summary>
    Task<int> CountTraveloguesAsync(Guid? destinationId, string? series, CancellationToken cancellationToken);

    /// <summary>Adds a video and saves changes.</summary>
    Task AddVideoAsync(Video video, CancellationToken cancellationToken);
    /// <summary>Returns a video by slug.</summary>
    Task<Video?> GetVideoBySlugAsync(string slug, CancellationToken cancellationToken);
    /// <summary>Lists published videos.</summary>
    Task<IReadOnlyList<Video>> ListVideosAsync(string? locale, Guid? categoryId, int? level, int skip, int take, CancellationToken cancellationToken);
    /// <summary>Counts published videos.</summary>
    Task<int> CountVideosAsync(Guid? categoryId, int? level, CancellationToken cancellationToken);

    /// <summary>Adds a comment and saves changes.</summary>
    Task AddCommentAsync(ContentComment comment, CancellationToken cancellationToken);
    /// <summary>Returns a comment by id.</summary>
    Task<ContentComment?> GetCommentAsync(Guid id, CancellationToken cancellationToken);
    /// <summary>Lists published comments for content.</summary>
    Task<IReadOnlyList<ContentComment>> ListCommentsAsync(ContentType type, Guid contentId, int skip, int take, CancellationToken cancellationToken);

    /// <summary>Counts published comments for content.</summary>
    Task<int> CountCommentsAsync(ContentType type, Guid contentId, CancellationToken cancellationToken);

    /// <summary>Adds an ad slot and saves changes.</summary>
    Task AddAdSlotAsync(AdSlot slot, CancellationToken cancellationToken);
    /// <summary>Returns an active ad slot by code.</summary>
    Task<AdSlot?> GetAdSlotAsync(string code, CancellationToken cancellationToken);
    /// <summary>Adds an ad event and saves changes.</summary>
    Task AddAdEventAsync(AdEvent adEvent, CancellationToken cancellationToken);

    /// <summary>Adds or updates a newsletter subscription.</summary>
    Task AddSubscriptionAsync(NewsletterSubscription subscription, CancellationToken cancellationToken);
    /// <summary>Returns a subscription by channel and contact.</summary>
    Task<NewsletterSubscription?> GetSubscriptionAsync(ContactChannel channel, string contact, CancellationToken cancellationToken);

    /// <summary>Adds a campaign and saves changes.</summary>
    Task AddCampaignAsync(Campaign campaign, CancellationToken cancellationToken);
    /// <summary>Returns a campaign by slug.</summary>
    Task<Campaign?> GetCampaignBySlugAsync(string slug, CancellationToken cancellationToken);
    /// <summary>Lists active campaigns.</summary>
    Task<IReadOnlyList<Campaign>> ListCampaignsAsync(int skip, int take, CancellationToken cancellationToken);
    /// <summary>Adds a campaign registration and saves changes.</summary>
    Task AddCampaignRegistrationAsync(CampaignRegistration registration, CancellationToken cancellationToken);

    /// <summary>Adds a notification and saves changes.</summary>
    Task AddNotificationAsync(Notification notification, CancellationToken cancellationToken);

    /// <summary>Returns a notification by id.</summary>
    Task<Notification?> GetNotificationAsync(Guid id, CancellationToken cancellationToken);

    /// <summary>Lists pending or retryable notifications due before the supplied time.</summary>
    Task<IReadOnlyList<Notification>> ListDueNotificationsAsync(
        DateTimeOffset dueBefore,
        int take,
        CancellationToken cancellationToken);
    /// <summary>Adds an analytics event and saves changes.</summary>
    Task AddAnalyticsEventAsync(AnalyticsEvent analyticsEvent, CancellationToken cancellationToken);

    /// <summary>Counts analytics events with optional filters.</summary>
    Task<int> CountAnalyticsAsync(
        string? eventName,
        DateTimeOffset? from,
        DateTimeOffset? to,
        CancellationToken cancellationToken);

    /// <summary>Groups analytics counts by entity type.</summary>
    Task<IReadOnlyList<AnalyticsBreakdown>> GroupAnalyticsByEntityTypeAsync(
        string? eventName,
        DateTimeOffset? from,
        DateTimeOffset? to,
        CancellationToken cancellationToken);

    /// <summary>Counts content by author and family for author stats.</summary>
    Task<AuthorContentCounts> CountByAuthorAsync(Guid authorUserId, CancellationToken cancellationToken);

    /// <summary>Adds a dashboard message.</summary>
    Task AddUserMessageAsync(UserMessage message, CancellationToken cancellationToken);
    /// <summary>Returns a dashboard message by id.</summary>
    Task<UserMessage?> GetUserMessageAsync(Guid id, CancellationToken cancellationToken);
    /// <summary>Lists messages for a user.</summary>
    Task<IReadOnlyList<UserMessage>> ListUserMessagesAsync(Guid userId, int skip, int take, CancellationToken cancellationToken);
    /// <summary>Counts messages for a user.</summary>
    Task<int> CountUserMessagesAsync(Guid userId, CancellationToken cancellationToken);
    /// <summary>Adds a user document.</summary>
    Task AddUserDocumentAsync(UserDocument document, CancellationToken cancellationToken);
    /// <summary>Returns a user document by id.</summary>
    Task<UserDocument?> GetUserDocumentAsync(Guid id, CancellationToken cancellationToken);
    /// <summary>Lists documents for a user.</summary>
    Task<IReadOnlyList<UserDocument>> ListUserDocumentsAsync(Guid userId, int skip, int take, CancellationToken cancellationToken);
    /// <summary>Counts documents for a user.</summary>
    Task<int> CountUserDocumentsAsync(Guid userId, CancellationToken cancellationToken);

    /// <summary>Persists pending changes.</summary>
    Task SaveChangesAsync(CancellationToken cancellationToken);
}

/// <summary>
/// Content counts used by author profiles.
/// </summary>
public sealed record AuthorContentCounts(int Blogs, int Travelogues, int Videos);

/// <summary>
/// Analytics count grouped by entity family.
/// </summary>
public sealed record AnalyticsBreakdown(string EntityType, int Count);
