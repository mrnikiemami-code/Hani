using System.Globalization;
using System.Security;
using System.Text;
using Hani.BuildingBlocks.Application;
using Hani.Modules.Content.Application.Abstractions;
using Microsoft.Extensions.Options;

namespace Hani.Modules.Content.Application.Queries.Sitemap;

/// <summary>
/// Public content sitemap settings.
/// </summary>
public sealed class ContentSitemapOptions
{
    /// <summary>
    /// Canonical public site base URL without a trailing slash.
    /// </summary>
    public string PublicBaseUrl { get; set; } = "https://hani.ir";
}

/// <summary>
/// Query that returns the localized content sitemap XML.
/// </summary>
public sealed record GetContentSitemapQuery : IQuery<string>;

internal sealed class GetContentSitemapQueryHandler(
    IContentRepository content,
    ILanguageCatalog languages,
    IOptions<ContentSitemapOptions> options)
    : IQueryHandler<GetContentSitemapQuery, string>
{
    public async Task<Result<string>> Handle(
        GetContentSitemapQuery request,
        CancellationToken cancellationToken)
    {
        var entries = await content.ListSitemapEntriesAsync(cancellationToken);
        var baseUrl = Normalize(options.Value.PublicBaseUrl);
        var builder = new StringBuilder();

        builder.AppendLine("<?xml version=\"1.0\" encoding=\"UTF-8\"?>");
        builder.AppendLine(
            "<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\" " +
            "xmlns:xhtml=\"http://www.w3.org/1999/xhtml\">");

        foreach (var entry in entries)
        {
            var path = BuildPath(entry);
            builder.AppendLine("  <url>");
            builder.AppendLine(
                CultureInfo.InvariantCulture,
                $"    <loc>{SecurityElement.Escape($"{baseUrl}/{languages.DefaultLanguage}/{path}")}</loc>");
            builder.AppendLine(
                CultureInfo.InvariantCulture,
                $"    <lastmod>{entry.UpdatedAt:yyyy-MM-dd}</lastmod>");

            foreach (var language in languages.SupportedLanguages)
            {
                builder.AppendLine(
                    CultureInfo.InvariantCulture,
                    $"    <xhtml:link rel=\"alternate\" hreflang=\"{SecurityElement.Escape(language)}\" " +
                    $"href=\"{SecurityElement.Escape($"{baseUrl}/{language}/{path}")}\" />");
            }

            builder.AppendLine("  </url>");
        }

        builder.AppendLine("</urlset>");
        return Result<string>.Success(builder.ToString());
    }

    private static string BuildPath(ContentSitemapEntry entry)
        => entry.Type switch
        {
            "blog" => $"blog/{entry.Slug}",
            "travelogue" => $"travelogues/{entry.Slug}",
            "video" => $"videos/{entry.Slug}",
            _ => entry.Slug
        };

    private static string Normalize(string baseUrl)
        => string.IsNullOrWhiteSpace(baseUrl)
            ? "https://hani.ir"
            : baseUrl.TrimEnd('/');
}
