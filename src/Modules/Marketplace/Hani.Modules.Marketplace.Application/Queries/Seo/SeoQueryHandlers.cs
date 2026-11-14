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
            new(SeoLabels.Resolve(options.Value, languages, locale, "Home", "Home"),
                SeoMetadataBuilder.BuildUrl(baseUrl, locale, string.Empty)),
            new(SeoLabels.Resolve(options.Value, languages, locale, "Tours", "Tours"),
                SeoMetadataBuilder.BuildUrl(baseUrl, locale, "tours"))
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
        var title = SeoLabels.Format(
            options.Value,
            languages,
            locale,
            "ToursTitle",
            "{0} tours",
            destinationName);
        var description = SeoLabels.Format(
            options.Value,
            languages,
            locale,
            "ToursDescription",
            "Explore {1} curated tours to {0} with Hani.",
            destinationName,
            count);

        var breadcrumbs = new List<BreadcrumbItemDto>
        {
            new(SeoLabels.Resolve(options.Value, languages, locale, "Home", "Home"),
                SeoMetadataBuilder.BuildUrl(baseUrl, locale, string.Empty)),
            new(SeoLabels.Resolve(options.Value, languages, locale, "Tours", "Tours"),
                SeoMetadataBuilder.BuildUrl(baseUrl, locale, "tours")),
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

internal sealed class GetVerticalSeoQueryHandler(
    ICatalogReadService catalog,
    ILanguageCatalog languages,
    IOptions<SeoOptions> options)
    : IQueryHandler<GetVerticalSeoQuery, VerticalSeoDto>
{
    public async Task<Result<VerticalSeoDto>> Handle(
        GetVerticalSeoQuery request,
        CancellationToken cancellationToken)
    {
        var vertical = await catalog.GetVerticalBySlugAsync(
            request.Type,
            request.Slug,
            cancellationToken);

        if (vertical is null)
        {
            return Result<VerticalSeoDto>.Failure(
                Error.NotFound("HANI-MARKET-1305", "Vertical page was not found."));
        }

        var locale = languages.Normalize(request.Locale);
        var name = Resolve(vertical.Names, locale, languages, vertical.Slug);
        var description = Resolve(vertical.Descriptions, locale, languages, name);
        var baseUrl = options.Value.PublicBaseUrl;
        var path = GetPath(vertical.Type, vertical.Slug);
        var canonicalUrl = SeoMetadataBuilder.BuildUrl(baseUrl, locale, path);
        var listLabel = SeoLabels.Resolve(
            options.Value,
            languages,
            locale,
            GetLabelKey(vertical.Type),
            "Explore");

        var breadcrumbs = new List<BreadcrumbItemDto>
        {
            new(SeoLabels.Resolve(options.Value, languages, locale, "Home", "Home"),
                SeoMetadataBuilder.BuildUrl(baseUrl, locale, string.Empty)),
            new(listLabel, SeoMetadataBuilder.BuildUrl(baseUrl, locale, GetListPath(vertical.Type))),
            new(name, canonicalUrl)
        };

        return Result<VerticalSeoDto>.Success(new VerticalSeoDto(
            vertical.Type,
            vertical.Slug,
            locale,
            canonicalUrl,
            name,
            description,
            "index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1",
            SeoMetadataBuilder.BuildAlternates(baseUrl, languages.SupportedLanguages, path),
            breadcrumbs,
            SeoMetadataBuilder.BuildBreadcrumbJsonLd(breadcrumbs),
            SeoMetadataBuilder.BuildVerticalJsonLd(
                vertical.Type,
                name,
                description,
                canonicalUrl,
                baseUrl,
                vertical.AverageRating,
                vertical.ReviewCount,
                vertical.Faqs)));
    }

    private static string GetPath(string type, string slug)
        => type.ToLowerInvariant() switch
        {
            "hotel" => $"hotels/{slug}",
            "restaurant" => $"restaurants/{slug}",
            "attraction" => $"attractions/{slug}",
            "visa" => $"visas/{slug}",
            "flight" => $"flights/routes/{slug}",
            _ => slug
        };

    private static string GetListPath(string type)
        => type.ToLowerInvariant() switch
        {
            "hotel" => "hotels",
            "restaurant" => "restaurants",
            "attraction" => "attractions",
            "visa" => "visas",
            "flight" => "flights",
            _ => string.Empty
        };

    private static string GetLabelKey(string type)
        => type.ToLowerInvariant() switch
        {
            "hotel" => "Hotels",
            "restaurant" => "Restaurants",
            "attraction" => "Attractions",
            "visa" => "Visa",
            "flight" => "Flights",
            _ => "Explore"
        };

    private static string Resolve(
        IReadOnlyDictionary<string, string> values,
        string locale,
        ILanguageCatalog languages,
        string fallback)
        => values.TryGetValue(locale, out var value)
            ? value
            : values.TryGetValue(languages.DefaultLanguage, out var defaultValue)
                ? defaultValue
                : values.Values.FirstOrDefault() ?? fallback;
}

internal sealed class GetVerticalLandingSeoQueryHandler(
    ICatalogReadService catalog,
    ILanguageCatalog languages,
    IOptions<SeoOptions> options)
    : IQueryHandler<GetVerticalLandingSeoQuery, VerticalLandingSeoDto>
{
    public async Task<Result<VerticalLandingSeoDto>> Handle(
        GetVerticalLandingSeoQuery request,
        CancellationToken cancellationToken)
    {
        var locale = languages.Normalize(request.Locale);
        var type = request.Type.Trim().ToLowerInvariant();
        var listPath = GetListPath(type);
        var label = SeoLabels.Resolve(
            options.Value,
            languages,
            locale,
            GetLabelKey(type),
            "Explore");
        var name = label;

        if (!string.IsNullOrWhiteSpace(request.DestinationSlug))
        {
            var destination = await catalog.GetDestinationBySlugAsync(
                request.DestinationSlug,
                cancellationToken);

            if (destination is null)
            {
                return Result<VerticalLandingSeoDto>.Failure(
                    Error.NotFound("HANI-MARKET-1308", "Destination was not found."));
            }

            name = Resolve(destination.Names, locale, languages, destination.Slug);
        }

        var count = await catalog.CountVerticalsAsync(
            type,
            request.DestinationSlug,
            cancellationToken);
        var baseUrl = options.Value.PublicBaseUrl;
        var path = string.IsNullOrWhiteSpace(request.DestinationSlug)
            ? listPath
            : $"{listPath}/{request.DestinationSlug.Trim()}";
        var canonicalUrl = SeoMetadataBuilder.BuildUrl(baseUrl, locale, path);
        var title = string.IsNullOrWhiteSpace(request.DestinationSlug)
            ? label
            : SeoLabels.Format(
                options.Value,
                languages,
                locale,
                "VerticalTitle",
                "{0} {1}",
                name,
                label);
        var description = SeoLabels.Format(
            options.Value,
            languages,
            locale,
            "VerticalDescription",
            "Browse {1} {0} on Hani.",
            name,
            count);

        var breadcrumbs = new List<BreadcrumbItemDto>
        {
            new(SeoLabels.Resolve(options.Value, languages, locale, "Home", "Home"),
                SeoMetadataBuilder.BuildUrl(baseUrl, locale, string.Empty))
        };

        if (!string.IsNullOrWhiteSpace(request.DestinationSlug))
        {
            breadcrumbs.Add(new BreadcrumbItemDto(
                label,
                SeoMetadataBuilder.BuildUrl(baseUrl, locale, listPath)));
        }

        breadcrumbs.Add(new BreadcrumbItemDto(name, canonicalUrl));

        return Result<VerticalLandingSeoDto>.Success(new VerticalLandingSeoDto(
            type,
            request.DestinationSlug,
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

    private static string Resolve(
        IReadOnlyDictionary<string, string> values,
        string locale,
        ILanguageCatalog languages,
        string fallback)
        => values.TryGetValue(locale, out var value)
            ? value
            : values.TryGetValue(languages.DefaultLanguage, out var defaultValue)
                ? defaultValue
                : values.Values.FirstOrDefault() ?? fallback;

    private static string GetListPath(string type)
        => type switch
        {
            "hotel" => "hotels",
            "restaurant" => "restaurants",
            "attraction" => "attractions",
            "visa" => "visas",
            "flight" => "flights",
            _ => type
        };

    private static string GetLabelKey(string type)
        => type switch
        {
            "hotel" => "Hotels",
            "restaurant" => "Restaurants",
            "attraction" => "Attractions",
            "visa" => "Visa",
            "flight" => "Flights",
            _ => "Explore"
        };
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
        var verticals = await catalog.GetVerticalSitemapEntriesAsync(cancellationToken);

        var sitemap = SeoMetadataBuilder.BuildSitemap(
            options.Value.PublicBaseUrl,
            languages.DefaultLanguage,
            languages.SupportedLanguages,
            products,
            destinations,
            verticals);

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
