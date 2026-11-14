using Hani.BuildingBlocks.Application;
using Hani.Modules.Content.Domain.Content;

namespace Hani.Modules.Content.Application.Queries.Editorial;

/// <summary>Search published blog posts.</summary>
public sealed record SearchBlogQuery(
    string? Locale = null,
    string? CategorySlug = null,
    string? Q = null,
    int Page = 1,
    int PageSize = 20) : IQuery<PagedResult<BlogSummaryDto>>;

/// <summary>Read one blog post.</summary>
public sealed record GetBlogQuery(string Slug, string? Locale = null) : IQuery<BlogDetailDto>;

/// <summary>Search published travelogues.</summary>
public sealed record SearchTraveloguesQuery(
    string? Locale = null,
    Guid? DestinationId = null,
    string? Series = null,
    int Page = 1,
    int PageSize = 20) : IQuery<PagedResult<TravelogueSummaryDto>>;

/// <summary>Read one travelogue.</summary>
public sealed record GetTravelogueQuery(string Slug, string? Locale = null) : IQuery<TravelogueDetailDto>;

/// <summary>Search published videos.</summary>
public sealed record SearchVideosQuery(
    string? Locale = null,
    Guid? CategoryId = null,
    int? Level = null,
    int Page = 1,
    int PageSize = 20) : IQuery<PagedResult<VideoSummaryDto>>;

/// <summary>Read one video.</summary>
public sealed record GetVideoQuery(string Slug, string? Locale = null) : IQuery<VideoDetailDto>;

/// <summary>List published comments for content.</summary>
public sealed record ListCommentsQuery(
    ContentType ContentType,
    Guid ContentId,
    int Page = 1,
    int PageSize = 20) : IQuery<PagedResult<CommentDto>>;

/// <summary>Read author content counts for the public profile.</summary>
public sealed record GetAuthorContentStatsQuery(Guid UserId) : IQuery<AuthorContentStatsDto>;

/// <summary>Trending content across blog, travelogue, and video.</summary>
public sealed record GetTrendingContentQuery(string? Locale = null, int Limit = 10)
    : IQuery<IReadOnlyList<TrendingContentDto>>;

/// <summary>Blog summary read model.</summary>
public sealed record BlogSummaryDto(
    Guid PostId,
    string Slug,
    string Title,
    string Excerpt,
    string? CoverUrl,
    DateTimeOffset? PublishedAt,
    int ViewCount,
    int LikeCount);

/// <summary>Blog detail read model.</summary>
public sealed record BlogDetailDto(
    Guid PostId,
    string Slug,
    string Locale,
    string Title,
    string Excerpt,
    string Body,
    string? SeoTitle,
    string? SeoDescription,
    string? CoverUrl,
    Guid AuthorUserId,
    DateTimeOffset? PublishedAt,
    int ViewCount,
    int LikeCount,
    int CommentCount);

/// <summary>Travelogue summary read model.</summary>
public sealed record TravelogueSummaryDto(
    Guid TravelogueId,
    string Slug,
    string Title,
    string? CoverUrl,
    string? SeriesName,
    DateTimeOffset? PublishedAt,
    int ViewCount,
    int LikeCount);

/// <summary>Travelogue detail read model.</summary>
public sealed record TravelogueDetailDto(
    Guid TravelogueId,
    string Slug,
    string Locale,
    string Title,
    string Body,
    string? SeoTitle,
    string? SeoDescription,
    string? CoverUrl,
    string? SeriesName,
    Guid AuthorUserId,
    IReadOnlyList<Guid> DestinationIds,
    DateTimeOffset? PublishedAt,
    int ViewCount,
    int LikeCount,
    int CommentCount);

/// <summary>Video summary read model.</summary>
public sealed record VideoSummaryDto(
    Guid VideoId,
    string Slug,
    string Title,
    string Provider,
    string? CoverUrl,
    int DurationSeconds,
    int Level,
    DateTimeOffset? PublishedAt,
    int ViewCount,
    int LikeCount);

/// <summary>Video detail read model.</summary>
public sealed record VideoDetailDto(
    Guid VideoId,
    string Slug,
    string Locale,
    string Title,
    string Description,
    string? SeoTitle,
    string? SeoDescription,
    string VideoUrl,
    string Provider,
    string? CoverUrl,
    int DurationSeconds,
    int Level,
    Guid AuthorUserId,
    DateTimeOffset? PublishedAt,
    int ViewCount,
    int LikeCount,
    int CommentCount);

/// <summary>Comment read model.</summary>
public sealed record CommentDto(
    Guid CommentId,
    Guid? UserId,
    string AuthorName,
    string Body,
    Guid? ParentId,
    DateTimeOffset CreatedAt);

/// <summary>Author content stats read model.</summary>
public sealed record AuthorContentStatsDto(
    Guid UserId,
    int Blogs,
    int Travelogues,
    int Videos);

/// <summary>Trending content item.</summary>
public sealed record TrendingContentDto(
    string ContentType,
    Guid ContentId,
    string Slug,
    string Title,
    int ViewCount,
    int LikeCount);
