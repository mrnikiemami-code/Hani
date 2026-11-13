using Hani.BuildingBlocks.Application;
using Hani.Contracts.Catalog;
using Microsoft.Extensions.Options;

namespace Hani.Modules.Marketplace.Application.Queries.Seo;

internal sealed class GetProductSeoQueryHandler(
    ICatalogReadService catalog,
    ILanguageCatalog languages,
    IOptions<SeoOptions> options)
    : IQueryHandler<GetProductSeoQuery, ProductSeoDto>
{
    public async Task<Result<ProductSeoDto>> Handle(
        GetProductSeoQuery request,
        CancellationToken cancellationToken)
    {
        var product = await catalog.GetPublishedByIdAsync(
            request.ProductId,
            cancellationToken);

        if (product is null)
        {
            return Result<ProductSeoDto>.Failure(
                Error.NotFound("HANI-MARKET-1303", "Published product was not found."));
        }

        var locale = languages.Normalize(request.Locale);
        var title = Resolve(product.Titles, locale);
        var description = Resolve(product.Summaries, locale);
        var seoTitle = ResolveOptional(product.SeoTitles, locale) ?? title;
        var seoDescription = ResolveOptional(product.SeoDescriptions, locale) ?? description;

        var destinations = await catalog.GetDestinationsAsync(
            product.DestinationIds,
            cancellationToken);

        var baseUrl = options.Value.PublicBaseUrl;
        var path = $"tours/{product.Slug}";
        var canonicalUrl = SeoMetadataBuilder.BuildUrl(baseUrl, locale, path);

        var breadcrumbs = new List<BreadcrumbItemDto>
        {
            new("Home", SeoMetadataBuilder.BuildUrl(baseUrl, locale, string.Empty)),
            new("Tours", SeoMetadataBuilder.BuildUrl(baseUrl, locale, "tours"))
        };

        foreach (var destinationId in product.DestinationIds)
        {
            var destination = destinations.FirstOrDefault(item => item.Id == destinationId);

            if (destination is not null)
            {
                breadcrumbs.Add(new BreadcrumbItemDto(
                    Resolve(destination.Names, locale),
                    SeoMetadataBuilder.BuildUrl(baseUrl, locale, $"tours/{destination.Slug}")));
            }
        }

        breadcrumbs.Add(new BreadcrumbItemDto(seoTitle, canonicalUrl));

        return Result<ProductSeoDto>.Success(new ProductSeoDto(
            product.Id,
            product.Slug,
            locale,
            canonicalUrl,
            seoTitle,
            seoDescription,
            "index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1",
            SeoMetadataBuilder.BuildAlternates(baseUrl, languages.SupportedLanguages, path),
            breadcrumbs,
            SeoMetadataBuilder.BuildBreadcrumbJsonLd(breadcrumbs),
            SeoMetadataBuilder.BuildTouristTripJsonLd(
                seoTitle,
                seoDescription,
                canonicalUrl,
                baseUrl)));
    }

    private string Resolve(IReadOnlyDictionary<string, string> values, string locale)
        => values.TryGetValue(locale, out var value)
            ? value
            : values.TryGetValue(languages.DefaultLanguage, out var fallback)
                ? fallback
                : values.Values.FirstOrDefault() ?? string.Empty;

    private string? ResolveOptional(
        IReadOnlyDictionary<string, string>? values,
        string locale)
        => values is null
            ? null
            : values.TryGetValue(locale, out var value)
                ? value
                : values.TryGetValue(languages.DefaultLanguage, out var fallback)
                    ? fallback
                    : values.Values.FirstOrDefault();
}

internal sealed class GetLandingSeoQueryHandler(
    ICatalogReadService catalog,
    ILanguageCatalog languages,
    IOptions<SeoOptions> options)
    : IQueryHandler<GetLandingSeoQuery, LandingSeoDto>
{
    public async Task<Result<LandingSeoDto>> Handle(
        GetLandingSeoQuery request,
        CancellationToken cancellationToken)
    {
        var destination = await catalog.GetDestinationBySlugAsync(
            request.DestinationSlug,
            cancellationToken);

        if (destination is null)
        {
            return Result<LandingSeoDto>.Failure(
                Error.NotFound("HANI-MARKET-1304", "Destination was not found."));
        }

        var locale = languages.Normalize(request.Locale);
        var destinationName = destination.Names.TryGetValue(locale, out var localized)
            ? localized
            : destination.Names.TryGetValue(languages.DefaultLanguage, out var fallback)
                ? fallback
                : destination.Names.Values.FirstOrDefault() ?? destination.Slug;

        var count = await catalog.CountPublishedAsync(
            new CatalogProductFilter(DestinationSlug: destination.Slug),
            cancellationToken);

        var baseUrl = options.Value.PublicBaseUrl;
        var path = $"tours/{destination.Slug}";
        var canonicalUrl = SeoMetadataBuilder.BuildUrl(baseUrl, locale, path);
        var title = $"{destinationName} tours";
        var description = $"Explore {count} curated tours to {destinationName} with Hani.";

        var breadcrumbs = new List<BreadcrumbItemDto>
        {
            new("Home", SeoMetadataBuilder.BuildUrl(baseUrl, locale, string.Empty)),
            new("Tours", SeoMetadataBuilder.BuildUrl(baseUrl, locale, "tours")),
            new(destinationName, canonicalUrl)
        };

        return Result<LandingSeoDto>.Success(new LandingSeoDto(
            destination.Slug,
            locale,
            canonicalUrl,
            title,
            description,
            count,
            "index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1",
            SeoMetadataBuilder.BuildAlternates(baseUrl, languages.SupportedLanguages, path),
            breadcrumbs,
            SeoMetadataBuilder.BuildBreadcrumbJsonLd(breadcrumbs),
            SeoMetadataBuilder.BuildCollectionJsonLd(
                title,
                description,
                canonicalUrl,
                count,
                baseUrl)));
    }
}

internal sealed class GetSitemapQueryHandler(
    ICatalogReadService catalog,
    ILanguageCatalog languages,
    IOptions<SeoOptions> options)
    : IQueryHandler<GetSitemapQuery, string>
{
    public async Task<Result<string>> Handle(
        GetSitemapQuery request,
        CancellationToken cancellationToken)
    {
        var products = await catalog.SearchPublishedAsync(
            new CatalogProductFilter(),
            0,
            int.MaxValue,
            cancellationToken);

        var destinationIds = products
            .SelectMany(product => product.DestinationIds)
            .Distinct()
            .ToArray();

        var destinations = await catalog.GetDestinationsAsync(
            destinationIds,
            cancellationToken);

        var sitemap = SeoMetadataBuilder.BuildSitemap(
            options.Value.PublicBaseUrl,
            languages.DefaultLanguage,
            languages.SupportedLanguages,
            products,
            destinations);

        return Result<string>.Success(sitemap);
    }
}

internal sealed class GetRobotsQueryHandler(IOptions<SeoOptions> options)
    : IQueryHandler<GetRobotsQuery, string>
{
    public Task<Result<string>> Handle(
        GetRobotsQuery request,
        CancellationToken cancellationToken)
        => Task.FromResult(Result<string>.Success(
            SeoMetadataBuilder.BuildRobots(options.Value.PublicBaseUrl)));
}
