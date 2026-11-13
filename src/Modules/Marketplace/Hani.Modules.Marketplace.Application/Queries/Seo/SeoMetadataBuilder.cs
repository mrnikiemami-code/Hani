using System.Globalization;
using System.Security;
using System.Text;
using System.Text.Json;
using Hani.Contracts.Catalog;

namespace Hani.Modules.Marketplace.Application.Queries.Seo;

internal static class SeoMetadataBuilder
{
    private static readonly JsonSerializerOptions JsonOptions = new(JsonSerializerDefaults.Web);

    public static string BuildUrl(string baseUrl, string locale, string path)
    {
        var normalizedBase = string.IsNullOrWhiteSpace(baseUrl)
            ? "https://hani.ir"
            : baseUrl.TrimEnd('/');
        return $"{normalizedBase}/{locale.Trim('/')}/{path.TrimStart('/')}";
    }

    public static IReadOnlyList<AlternateUrlDto> BuildAlternates(
        string baseUrl,
        IReadOnlyList<string> languages,
        string path)
        => languages
            .Select(language => new AlternateUrlDto(language, BuildUrl(baseUrl, language, path)))
            .ToArray();

    public static string BuildBreadcrumbJsonLd(IReadOnlyList<BreadcrumbItemDto> breadcrumbs)
    {
        var items = breadcrumbs
            .Select((breadcrumb, index) => new Dictionary<string, object?>
            {
                ["@type"] = "ListItem",
                ["position"] = index + 1,
                ["name"] = breadcrumb.Name,
                ["item"] = breadcrumb.Url
            })
            .ToArray();

        return JsonSerializer.Serialize(
            new Dictionary<string, object?>
            {
                ["@context"] = "https://schema.org/",
                ["@type"] = "BreadcrumbList",
                ["itemListElement"] = items
            },
            JsonOptions);
    }

    public static string BuildTouristTripJsonLd(
        string name,
        string description,
        string canonicalUrl,
        string baseUrl)
        => JsonSerializer.Serialize(
            new Dictionary<string, object?>
            {
                ["@context"] = "https://schema.org/",
                ["@type"] = "TouristTrip",
                ["name"] = name,
                ["description"] = description,
                ["url"] = canonicalUrl,
                ["touristType"] = "Leisure",
                ["provider"] = new Dictionary<string, object?>
                {
                    ["@type"] = "Organization",
                    ["name"] = "Hani",
                    ["url"] = baseUrl.TrimEnd('/')
                }
            },
            JsonOptions);

    public static string BuildCollectionJsonLd(
        string name,
        string description,
        string canonicalUrl,
        int itemCount,
        string baseUrl)
        => JsonSerializer.Serialize(
            new Dictionary<string, object?>
            {
                ["@context"] = "https://schema.org/",
                ["@type"] = "CollectionPage",
                ["name"] = name,
                ["description"] = description,
                ["url"] = canonicalUrl,
                ["isPartOf"] = new Dictionary<string, object?>
                {
                    ["@type"] = "WebSite",
                    ["name"] = "Hani",
                    ["url"] = baseUrl.TrimEnd('/')
                },
                ["mainEntity"] = new Dictionary<string, object?>
                {
                    ["@type"] = "ItemList",
                    ["numberOfItems"] = itemCount
                }
            },
            JsonOptions);

    public static string BuildSitemap(
        string baseUrl,
        string defaultLocale,
        IReadOnlyList<string> languages,
        IReadOnlyList<CatalogProductSummary> products,
        IReadOnlyList<CatalogDestinationSnapshot> destinations)
    {
        var paths = products
            .Select(product => (Path: $"tours/{product.Slug}", Updated: product.UpdatedAt))
            .Concat(destinations.Select(destination => (
                Path: $"tours/{destination.Slug}",
                Updated: DateTimeOffset.UtcNow)))
            .DistinctBy(item => item.Path)
            .OrderBy(item => item.Path, StringComparer.OrdinalIgnoreCase)
            .ToArray();

        var builder = new StringBuilder();
        builder.AppendLine("<?xml version=\"1.0\" encoding=\"UTF-8\"?>");
        builder.AppendLine(
            "<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\" " +
            "xmlns:xhtml=\"http://www.w3.org/1999/xhtml\">");

        foreach (var item in paths)
        {
            var loc = BuildUrl(baseUrl, defaultLocale, item.Path);
            builder.AppendLine("  <url>");
            builder.AppendLine(CultureInfo.InvariantCulture, $"    <loc>{SecurityElement.Escape(loc)}</loc>");
            builder.AppendLine(CultureInfo.InvariantCulture, $"    <lastmod>{item.Updated:yyyy-MM-dd}</lastmod>");

            foreach (var language in languages)
            {
                var href = BuildUrl(baseUrl, language, item.Path);
                builder.AppendLine(
                    CultureInfo.InvariantCulture,
                    $"    <xhtml:link rel=\"alternate\" hreflang=\"{SecurityElement.Escape(language)}\" " +
                    $"href=\"{SecurityElement.Escape(href)}\" />");
            }

            builder.AppendLine("  </url>");
        }

        builder.AppendLine("</urlset>");
        return builder.ToString();
    }

    public static string BuildRobots(string baseUrl)
    {
        var normalizedBase = string.IsNullOrWhiteSpace(baseUrl)
            ? "https://hani.ir"
            : baseUrl.TrimEnd('/');

        return $"""
            User-agent: *
            Allow: /
            Disallow: /market/v1/search?
            Disallow: /market/v1/products/*/compare?

            Sitemap: {normalizedBase}/sitemap.xml
            """;
    }
}
