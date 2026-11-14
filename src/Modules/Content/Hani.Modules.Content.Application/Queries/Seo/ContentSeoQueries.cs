using System.Text.Json;
using Hani.BuildingBlocks.Application;
using Hani.Modules.Content.Application.Abstractions;
using Hani.Modules.Content.Application.Queries.Editorial;
using Hani.Modules.Content.Application.Queries.Sitemap;
using Hani.Modules.Content.Domain.Content;
using Microsoft.Extensions.Options;

namespace Hani.Modules.Content.Application.Queries.Seo;

/// <summary>Query that returns BlogPosting JSON-LD for a published post.</summary>
public sealed record GetBlogSeoQuery(string Slug, string? Locale = null) : IQuery<string>;

/// <summary>Query that returns Article JSON-LD for a published travelogue.</summary>
public sealed record GetTravelogueSeoQuery(string Slug, string? Locale = null) : IQuery<string>;

/// <summary>Query that returns VideoObject JSON-LD for a published video.</summary>
public sealed record GetVideoSeoQuery(string Slug, string? Locale = null) : IQuery<string>;

internal sealed class GetBlogSeoQueryHandler(
    IContentRepository repository,
    ILanguageCatalog languages,
    IOptions<ContentSitemapOptions> options)
    : IQueryHandler<GetBlogSeoQuery, string>
{
    public async Task<Result<string>> Handle(
        GetBlogSeoQuery request,
        CancellationToken cancellationToken)
    {
        var post = await repository.GetBlogBySlugAsync(request.Slug, cancellationToken);
        if (post is null || post.Status != ContentStatus.Published)
        {
            return Result<string>.Failure(
                Error.NotFound("HANI-CONTENT-1003", "Blog post was not found."));
        }

        var locale = languages.Normalize(request.Locale);
        var translation = ContentMapping.Resolve(post.Translations, locale, languages);
        var url = SeoUrl(options.Value.PublicBaseUrl, locale, $"blog/{post.Slug}");
        var graph = new Dictionary<string, object?>
        {
            ["@context"] = "https://schema.org",
            ["@type"] = "BlogPosting",
            ["headline"] = translation?.SeoTitle ?? translation?.Title ?? post.Slug,
            ["description"] = translation?.SeoDescription ?? translation?.Excerpt,
            ["image"] = post.CoverUrl,
            ["datePublished"] = post.PublishedAt,
            ["dateModified"] = post.UpdatedAt,
            ["author"] = new Dictionary<string, object?>
            {
                ["@type"] = "Person",
                ["identifier"] = post.AuthorUserId
            },
            ["publisher"] = Publisher(),
            ["mainEntityOfPage"] = url,
            ["inLanguage"] = locale,
            ["url"] = url,
            ["breadcrumb"] = Breadcrumb(
                options.Value.PublicBaseUrl,
                locale,
                ("Blog", "blog"),
                (translation?.Title ?? post.Slug, $"blog/{post.Slug}"))
        };

        return Result<string>.Success(JsonSerializer.Serialize(graph));
    }

    internal static Dictionary<string, object?> Publisher()
        => new()
        {
            ["@type"] = "Organization",
            ["name"] = "Hani",
            ["url"] = "https://hani.ir"
        };

    internal static string SeoUrl(string baseUrl, string locale, string path)
        => $"{Normalize(baseUrl)}/{locale}/{path}";

    internal static Dictionary<string, object?> Breadcrumb(
        string baseUrl,
        string locale,
        params (string Name, string Path)[] items)
    {
        var list = new List<object>
        {
            new Dictionary<string, object?>
            {
                ["@type"] = "ListItem",
                ["position"] = 1,
                ["name"] = "Home",
                ["item"] = $"{Normalize(baseUrl)}/{locale}"
            }
        };

        for (var index = 0; index < items.Length; index++)
        {
            list.Add(new Dictionary<string, object?>
            {
                ["@type"] = "ListItem",
                ["position"] = index + 2,
                ["name"] = items[index].Name,
                ["item"] = SeoUrl(baseUrl, locale, items[index].Path)
            });
        }

        return new Dictionary<string, object?>
        {
            ["@type"] = "BreadcrumbList",
            ["itemListElement"] = list
        };
    }

    internal static string Normalize(string baseUrl)
        => string.IsNullOrWhiteSpace(baseUrl)
            ? "https://hani.ir"
            : baseUrl.TrimEnd('/');
}

internal sealed class GetTravelogueSeoQueryHandler(
    IContentRepository repository,
    ILanguageCatalog languages,
    IOptions<ContentSitemapOptions> options)
    : IQueryHandler<GetTravelogueSeoQuery, string>
{
    public async Task<Result<string>> Handle(
        GetTravelogueSeoQuery request,
        CancellationToken cancellationToken)
    {
        var travelogue = await repository.GetTravelogueBySlugAsync(request.Slug, cancellationToken);
        if (travelogue is null || travelogue.Status != ContentStatus.Published)
        {
            return Result<string>.Failure(
                Error.NotFound("HANI-CONTENT-1004", "Travelogue was not found."));
        }

        var locale = languages.Normalize(request.Locale);
        var translation = ContentMapping.Resolve(travelogue.Translations, locale, languages);
        var url = GetBlogSeoQueryHandler.SeoUrl(
            options.Value.PublicBaseUrl,
            locale,
            $"itineraries/{travelogue.Slug}");
        var graph = new Dictionary<string, object?>
        {
            ["@context"] = "https://schema.org",
            ["@type"] = "Article",
            ["headline"] = translation?.SeoTitle ?? translation?.Title ?? travelogue.Slug,
            ["description"] = translation?.SeoDescription,
            ["image"] = travelogue.CoverUrl,
            ["datePublished"] = travelogue.PublishedAt,
            ["dateModified"] = travelogue.UpdatedAt,
            ["author"] = new Dictionary<string, object?>
            {
                ["@type"] = "Person",
                ["identifier"] = travelogue.AuthorUserId
            },
            ["publisher"] = GetBlogSeoQueryHandler.Publisher(),
            ["mainEntityOfPage"] = url,
            ["inLanguage"] = locale,
            ["url"] = url,
            ["breadcrumb"] = GetBlogSeoQueryHandler.Breadcrumb(
                options.Value.PublicBaseUrl,
                locale,
                ("Itineraries", "itineraries"),
                (translation?.Title ?? travelogue.Slug, $"itineraries/{travelogue.Slug}"))
        };

        return Result<string>.Success(JsonSerializer.Serialize(graph));
    }
}

internal sealed class GetVideoSeoQueryHandler(
    IContentRepository repository,
    ILanguageCatalog languages,
    IOptions<ContentSitemapOptions> options)
    : IQueryHandler<GetVideoSeoQuery, string>
{
    public async Task<Result<string>> Handle(
        GetVideoSeoQuery request,
        CancellationToken cancellationToken)
    {
        var video = await repository.GetVideoBySlugAsync(request.Slug, cancellationToken);
        if (video is null || video.Status != ContentStatus.Published)
        {
            return Result<string>.Failure(
                Error.NotFound("HANI-CONTENT-1005", "Video was not found."));
        }

        var locale = languages.Normalize(request.Locale);
        var translation = ContentMapping.Resolve(video.Translations, locale, languages);
        var url = GetBlogSeoQueryHandler.SeoUrl(
            options.Value.PublicBaseUrl,
            locale,
            $"videos/{video.Slug}");
        var graph = new Dictionary<string, object?>
        {
            ["@context"] = "https://schema.org",
            ["@type"] = "VideoObject",
            ["name"] = translation?.SeoTitle ?? translation?.Title ?? video.Slug,
            ["description"] = translation?.SeoDescription ?? translation?.Description,
            ["thumbnailUrl"] = video.CoverUrl,
            ["duration"] = $"PT{video.DurationSeconds / 60}M{video.DurationSeconds % 60}S",
            ["contentUrl"] = video.VideoUrl,
            ["embedUrl"] = url,
            ["uploadDate"] = video.PublishedAt,
            ["inLanguage"] = locale,
            ["author"] = new Dictionary<string, object?>
            {
                ["@type"] = "Person",
                ["identifier"] = video.AuthorUserId
            },
            ["publisher"] = GetBlogSeoQueryHandler.Publisher(),
            ["breadcrumb"] = GetBlogSeoQueryHandler.Breadcrumb(
                options.Value.PublicBaseUrl,
                locale,
                ("Videos", "videos"),
                (translation?.Title ?? video.Slug, $"videos/{video.Slug}"))
        };

        return Result<string>.Success(JsonSerializer.Serialize(graph));
    }
}
