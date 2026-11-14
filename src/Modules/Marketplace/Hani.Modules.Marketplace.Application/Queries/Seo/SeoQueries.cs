using Hani.BuildingBlocks.Application;

namespace Hani.Modules.Marketplace.Application.Queries.Seo;

/// <summary>
/// Query that returns canonical and structured SEO metadata for one product.
/// </summary>
public sealed record GetProductSeoQuery(Guid ProductId, string? Locale) : IQuery<ProductSeoDto>;

/// <summary>
/// Query that returns landing-page SEO metadata for one destination.
/// </summary>
public sealed record GetLandingSeoQuery(string DestinationSlug, string? Locale) : IQuery<LandingSeoDto>;

/// <summary>
/// Query that returns SEO metadata for one vertical page.
/// </summary>
public sealed record GetVerticalSeoQuery(string Type, string Slug, string? Locale)
    : IQuery<VerticalSeoDto>;

/// <summary>
/// Query that returns SEO metadata for a vertical landing page.
/// </summary>
public sealed record GetVerticalLandingSeoQuery(
    string Type,
    string? DestinationSlug,
    string? Locale) : IQuery<VerticalLandingSeoDto>;

/// <summary>
/// Query that returns the public sitemap XML.
/// </summary>
public sealed record GetSitemapQuery : IQuery<string>;

/// <summary>
/// Query that returns the public robots.txt body.
/// </summary>
public sealed record GetRobotsQuery : IQuery<string>;

/// <summary>
/// Alternate localized URL for an SEO resource.
/// </summary>
public sealed record AlternateUrlDto(string Locale, string Url);

/// <summary>
/// One breadcrumb item in localized SEO metadata.
/// </summary>
public sealed record BreadcrumbItemDto(string Name, string Url);

/// <summary>
/// SEO metadata returned for one product.
/// </summary>
public sealed record ProductSeoDto(
    Guid ProductId,
    string Slug,
    string Locale,
    string CanonicalUrl,
    string Title,
    string Description,
    string Robots,
    IReadOnlyList<AlternateUrlDto> Alternates,
    IReadOnlyList<BreadcrumbItemDto> Breadcrumbs,
    string BreadcrumbJsonLd,
    string ProductJsonLd);

/// <summary>
/// SEO metadata returned for one destination landing page.
/// </summary>
public sealed record LandingSeoDto(
    string Slug,
    string Locale,
    string CanonicalUrl,
    string Title,
    string Description,
    int ProductCount,
    string Robots,
    IReadOnlyList<AlternateUrlDto> Alternates,
    IReadOnlyList<BreadcrumbItemDto> Breadcrumbs,
    string BreadcrumbJsonLd,
    string CollectionJsonLd);

/// <summary>
/// SEO metadata returned for one hotel, restaurant, attraction, visa, or flight page.
/// </summary>
public sealed record VerticalSeoDto(
    string Type,
    string Slug,
    string Locale,
    string CanonicalUrl,
    string Title,
    string Description,
    string Robots,
    IReadOnlyList<AlternateUrlDto> Alternates,
    IReadOnlyList<BreadcrumbItemDto> Breadcrumbs,
    string BreadcrumbJsonLd,
    string EntityJsonLd);

/// <summary>
/// SEO metadata returned for one vertical landing page.
/// </summary>
public sealed record VerticalLandingSeoDto(
    string Type,
    string? DestinationSlug,
    string Locale,
    string CanonicalUrl,
    string Title,
    string Description,
    int ItemCount,
    string Robots,
    IReadOnlyList<AlternateUrlDto> Alternates,
    IReadOnlyList<BreadcrumbItemDto> Breadcrumbs,
    string BreadcrumbJsonLd,
    string CollectionJsonLd);
