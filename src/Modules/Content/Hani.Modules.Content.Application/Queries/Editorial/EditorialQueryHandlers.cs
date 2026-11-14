using Hani.BuildingBlocks.Application;
using Hani.Modules.Content.Application.Abstractions;
using Hani.Modules.Content.Domain.Content;

namespace Hani.Modules.Content.Application.Queries.Editorial;

internal sealed class SearchBlogQueryHandler(
    IContentRepository repository,
    ILanguageCatalog languages)
    : IQueryHandler<SearchBlogQuery, PagedResult<BlogSummaryDto>>
{
    public async Task<Result<PagedResult<BlogSummaryDto>>> Handle(
        SearchBlogQuery request,
        CancellationToken cancellationToken)
    {
        var page = Math.Max(1, request.Page);
        var pageSize = Math.Clamp(request.PageSize, 1, 50);
        Guid? categoryId = null;

        if (!string.IsNullOrWhiteSpace(request.CategorySlug))
        {
            categoryId = (await repository.GetCategoryBySlugAsync(
                ContentType.Blog,
                request.CategorySlug,
                cancellationToken))?.Id;
        }

        var items = await repository.ListBlogAsync(
            request.Locale,
            categoryId,
            request.Q,
            (page - 1) * pageSize,
            pageSize,
            cancellationToken);
        var total = await repository.CountBlogAsync(categoryId, request.Q, cancellationToken);
        var locale = languages.Normalize(request.Locale);

        return Result<PagedResult<BlogSummaryDto>>.Success(
            new PagedResult<BlogSummaryDto>(
                items.Select(item => Map(item, locale, languages)).ToArray(),
                page,
                pageSize,
                total));
    }

    internal static BlogSummaryDto Map(BlogPost post, string locale, ILanguageCatalog languages)
    {
        var translation = ContentMapping.Resolve(post.Translations, locale, languages);
        return new BlogSummaryDto(
            post.Id,
            post.Slug,
            translation?.Title ?? post.Slug,
            translation?.Excerpt ?? string.Empty,
            post.CoverUrl,
            post.PublishedAt,
            post.ViewCount,
            post.LikeCount);
    }
}

internal sealed class GetBlogQueryHandler(
    IContentRepository repository,
    ILanguageCatalog languages)
    : IQueryHandler<GetBlogQuery, BlogDetailDto>
{
    public async Task<Result<BlogDetailDto>> Handle(
        GetBlogQuery request,
        CancellationToken cancellationToken)
    {
        var post = await repository.GetBlogBySlugAsync(request.Slug, cancellationToken);

        if (post is null || post.Status != ContentStatus.Published)
        {
            return Result<BlogDetailDto>.Failure(Error.NotFound("HANI-CONTENT-1003", "Blog post was not found."));
        }

        post.IncrementView();
        await repository.SaveChangesAsync(cancellationToken);
        var locale = languages.Normalize(request.Locale);
        var translation = ContentMapping.Resolve(post.Translations, locale, languages);
        var commentCount = await repository.CountCommentsAsync(ContentType.Blog, post.Id, cancellationToken);

        return Result<BlogDetailDto>.Success(new BlogDetailDto(
            post.Id,
            post.Slug,
            translation?.Locale ?? locale,
            translation?.Title ?? post.Slug,
            translation?.Excerpt ?? string.Empty,
            translation?.Body ?? string.Empty,
            translation?.SeoTitle,
            translation?.SeoDescription,
            post.CoverUrl,
            post.AuthorUserId,
            post.PublishedAt,
            post.ViewCount,
            post.LikeCount,
            commentCount));
    }
}

internal sealed class SearchTraveloguesQueryHandler(
    IContentRepository repository,
    ILanguageCatalog languages)
    : IQueryHandler<SearchTraveloguesQuery, PagedResult<TravelogueSummaryDto>>
{
    public async Task<Result<PagedResult<TravelogueSummaryDto>>> Handle(
        SearchTraveloguesQuery request,
        CancellationToken cancellationToken)
    {
        var page = Math.Max(1, request.Page);
        var pageSize = Math.Clamp(request.PageSize, 1, 50);
        var items = await repository.ListTraveloguesAsync(
            request.Locale,
            request.DestinationId,
            request.Series,
            (page - 1) * pageSize,
            pageSize,
            cancellationToken);
        var total = await repository.CountTraveloguesAsync(
            request.DestinationId,
            request.Series,
            cancellationToken);
        var locale = languages.Normalize(request.Locale);

        return Result<PagedResult<TravelogueSummaryDto>>.Success(
            new PagedResult<TravelogueSummaryDto>(
                items.Select(item =>
                {
                    var translation = ContentMapping.Resolve(item.Translations, locale, languages);
                    return new TravelogueSummaryDto(
                        item.Id,
                        item.Slug,
                        translation?.Title ?? item.Slug,
                        item.CoverUrl,
                        item.SeriesName,
                        item.PublishedAt,
                        item.ViewCount,
                        item.LikeCount);
                }).ToArray(),
                page,
                pageSize,
                total));
    }
}

internal sealed class GetTravelogueQueryHandler(
    IContentRepository repository,
    ILanguageCatalog languages)
    : IQueryHandler<GetTravelogueQuery, TravelogueDetailDto>
{
    public async Task<Result<TravelogueDetailDto>> Handle(
        GetTravelogueQuery request,
        CancellationToken cancellationToken)
    {
        var travelogue = await repository.GetTravelogueBySlugAsync(request.Slug, cancellationToken);

        if (travelogue is null || travelogue.Status != ContentStatus.Published)
        {
            return Result<TravelogueDetailDto>.Failure(
                Error.NotFound("HANI-CONTENT-1005", "Travelogue was not found."));
        }

        travelogue.IncrementView();
        await repository.SaveChangesAsync(cancellationToken);
        var locale = languages.Normalize(request.Locale);
        var translation = ContentMapping.Resolve(travelogue.Translations, locale, languages);
        var commentCount = await repository.CountCommentsAsync(
            ContentType.Travelogue,
            travelogue.Id,
            cancellationToken);

        return Result<TravelogueDetailDto>.Success(new TravelogueDetailDto(
            travelogue.Id,
            travelogue.Slug,
            translation?.Locale ?? locale,
            translation?.Title ?? travelogue.Slug,
            translation?.Body ?? string.Empty,
            translation?.SeoTitle,
            translation?.SeoDescription,
            travelogue.CoverUrl,
            travelogue.SeriesName,
            travelogue.AuthorUserId,
            travelogue.Destinations.Select(item => item.DestinationId).ToArray(),
            travelogue.PublishedAt,
            travelogue.ViewCount,
            travelogue.LikeCount,
            commentCount));
    }
}

internal sealed class SearchVideosQueryHandler(
    IContentRepository repository,
    ILanguageCatalog languages)
    : IQueryHandler<SearchVideosQuery, PagedResult<VideoSummaryDto>>
{
    public async Task<Result<PagedResult<VideoSummaryDto>>> Handle(
        SearchVideosQuery request,
        CancellationToken cancellationToken)
    {
        var page = Math.Max(1, request.Page);
        var pageSize = Math.Clamp(request.PageSize, 1, 50);
        var items = await repository.ListVideosAsync(
            request.Locale,
            request.CategoryId,
            request.Level,
            (page - 1) * pageSize,
            pageSize,
            cancellationToken);
        var total = await repository.CountVideosAsync(
            request.CategoryId,
            request.Level,
            cancellationToken);
        var locale = languages.Normalize(request.Locale);

        return Result<PagedResult<VideoSummaryDto>>.Success(
            new PagedResult<VideoSummaryDto>(
                items.Select(item =>
                {
                    var translation = ContentMapping.Resolve(item.Translations, locale, languages);
                    return new VideoSummaryDto(
                        item.Id,
                        item.Slug,
                        translation?.Title ?? item.Slug,
                        item.Provider,
                        item.CoverUrl,
                        item.DurationSeconds,
                        item.Level,
                        item.PublishedAt,
                        item.ViewCount,
                        item.LikeCount);
                }).ToArray(),
                page,
                pageSize,
                total));
    }
}

internal sealed class GetVideoQueryHandler(
    IContentRepository repository,
    ILanguageCatalog languages)
    : IQueryHandler<GetVideoQuery, VideoDetailDto>
{
    public async Task<Result<VideoDetailDto>> Handle(
        GetVideoQuery request,
        CancellationToken cancellationToken)
    {
        var video = await repository.GetVideoBySlugAsync(request.Slug, cancellationToken);

        if (video is null || video.Status != ContentStatus.Published)
        {
            return Result<VideoDetailDto>.Failure(Error.NotFound("HANI-CONTENT-1007", "Video was not found."));
        }

        video.IncrementView();
        await repository.SaveChangesAsync(cancellationToken);
        var locale = languages.Normalize(request.Locale);
        var translation = ContentMapping.Resolve(video.Translations, locale, languages);
        var commentCount = await repository.CountCommentsAsync(ContentType.Video, video.Id, cancellationToken);

        return Result<VideoDetailDto>.Success(new VideoDetailDto(
            video.Id,
            video.Slug,
            translation?.Locale ?? locale,
            translation?.Title ?? video.Slug,
            translation?.Description ?? string.Empty,
            translation?.SeoTitle,
            translation?.SeoDescription,
            video.VideoUrl,
            video.Provider,
            video.CoverUrl,
            video.DurationSeconds,
            video.Level,
            video.AuthorUserId,
            video.PublishedAt,
            video.ViewCount,
            video.LikeCount,
            commentCount));
    }
}

internal sealed class ListCommentsQueryHandler(IContentRepository repository)
    : IQueryHandler<ListCommentsQuery, PagedResult<CommentDto>>
{
    public async Task<Result<PagedResult<CommentDto>>> Handle(
        ListCommentsQuery request,
        CancellationToken cancellationToken)
    {
        var page = Math.Max(1, request.Page);
        var pageSize = Math.Clamp(request.PageSize, 1, 50);
        var items = await repository.ListCommentsAsync(
            request.ContentType,
            request.ContentId,
            (page - 1) * pageSize,
            pageSize,
            cancellationToken);
        var total = await repository.CountCommentsAsync(
            request.ContentType,
            request.ContentId,
            cancellationToken);

        return Result<PagedResult<CommentDto>>.Success(
            new PagedResult<CommentDto>(
                items.Select(item => new CommentDto(
                    item.Id,
                    item.UserId,
                    item.AuthorName,
                    item.Body,
                    item.ParentId,
                    item.CreatedAt)).ToArray(),
                page,
                pageSize,
                total));
    }
}

internal sealed class GetAuthorContentStatsQueryHandler(IContentRepository repository)
    : IQueryHandler<GetAuthorContentStatsQuery, AuthorContentStatsDto>
{
    public async Task<Result<AuthorContentStatsDto>> Handle(
        GetAuthorContentStatsQuery request,
        CancellationToken cancellationToken)
    {
        var counts = await repository.CountByAuthorAsync(request.UserId, cancellationToken);
        return Result<AuthorContentStatsDto>.Success(new AuthorContentStatsDto(
            request.UserId,
            counts.Blogs,
            counts.Travelogues,
            counts.Videos));
    }
}

internal sealed class GetTrendingContentQueryHandler(
    IContentRepository repository,
    ILanguageCatalog languages)
    : IQueryHandler<GetTrendingContentQuery, IReadOnlyList<TrendingContentDto>>
{
    public async Task<Result<IReadOnlyList<TrendingContentDto>>> Handle(
        GetTrendingContentQuery request,
        CancellationToken cancellationToken)
    {
        var locale = languages.Normalize(request.Locale);
        var take = Math.Clamp(request.Limit, 1, 50);
        var blogs = await repository.ListBlogAsync(null, null, null, 0, take, cancellationToken);
        var travelogues = await repository.ListTraveloguesAsync(null, null, null, 0, take, cancellationToken);
        var videos = await repository.ListVideosAsync(null, null, null, 0, take, cancellationToken);

        var items = blogs
            .Select(post =>
            {
                var translation = ContentMapping.Resolve(post.Translations, locale, languages);
                return new TrendingContentDto(
                    "Blog",
                    post.Id,
                    post.Slug,
                    translation?.Title ?? post.Slug,
                    post.ViewCount,
                    post.LikeCount);
            })
            .Concat(travelogues.Select(item =>
            {
                var translation = ContentMapping.Resolve(item.Translations, locale, languages);
                return new TrendingContentDto(
                    "Travelogue",
                    item.Id,
                    item.Slug,
                    translation?.Title ?? item.Slug,
                    item.ViewCount,
                    item.LikeCount);
            }))
            .Concat(videos.Select(item =>
            {
                var translation = ContentMapping.Resolve(item.Translations, locale, languages);
                return new TrendingContentDto(
                    "Video",
                    item.Id,
                    item.Slug,
                    translation?.Title ?? item.Slug,
                    item.ViewCount,
                    item.LikeCount);
            }))
            .OrderByDescending(item => item.ViewCount + (item.LikeCount * 3))
            .Take(take)
            .ToArray();

        return Result<IReadOnlyList<TrendingContentDto>>.Success(items);
    }
}

internal static class ContentMapping
{
    public static BlogPostTranslation? Resolve(
        IEnumerable<BlogPostTranslation> translations,
        string locale,
        ILanguageCatalog languages)
        => translations.FirstOrDefault(item => item.Locale == locale)
            ?? translations.FirstOrDefault(item => item.Locale == languages.DefaultLanguage)
            ?? translations.FirstOrDefault();

    public static TravelogueTranslation? Resolve(
        IEnumerable<TravelogueTranslation> translations,
        string locale,
        ILanguageCatalog languages)
        => translations.FirstOrDefault(item => item.Locale == locale)
            ?? translations.FirstOrDefault(item => item.Locale == languages.DefaultLanguage)
            ?? translations.FirstOrDefault();

    public static VideoTranslation? Resolve(
        IEnumerable<VideoTranslation> translations,
        string locale,
        ILanguageCatalog languages)
        => translations.FirstOrDefault(item => item.Locale == locale)
            ?? translations.FirstOrDefault(item => item.Locale == languages.DefaultLanguage)
            ?? translations.FirstOrDefault();
}
