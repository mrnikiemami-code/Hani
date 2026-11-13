using FluentValidation;

namespace Hani.Modules.Marketplace.Application.Queries.Seo;

/// <summary>
/// Validation rules for product SEO requests.
/// </summary>
public sealed class GetProductSeoQueryValidator : AbstractValidator<GetProductSeoQuery>
{
    /// <summary>
    /// Creates validation rules for the product id.
    /// </summary>
    public GetProductSeoQueryValidator()
    {
        RuleFor(query => query.ProductId)
            .NotEmpty()
            .WithErrorCode("HANI-MARKET-1301");
    }
}

/// <summary>
/// Validation rules for destination landing SEO requests.
/// </summary>
public sealed class GetLandingSeoQueryValidator : AbstractValidator<GetLandingSeoQuery>
{
    /// <summary>
    /// Creates validation rules for the destination slug.
    /// </summary>
    public GetLandingSeoQueryValidator()
    {
        RuleFor(query => query.DestinationSlug)
            .NotEmpty()
            .WithErrorCode("HANI-MARKET-1302");
    }
}

/// <summary>
/// Validation rules for the sitemap query.
/// </summary>
public sealed class GetSitemapQueryValidator : AbstractValidator<GetSitemapQuery>
{
    /// <summary>
    /// The sitemap query has no user input.
    /// </summary>
    public GetSitemapQueryValidator()
    {
    }
}

/// <summary>
/// Validation rules for the robots query.
/// </summary>
public sealed class GetRobotsQueryValidator : AbstractValidator<GetRobotsQuery>
{
    /// <summary>
    /// The robots query has no user input.
    /// </summary>
    public GetRobotsQueryValidator()
    {
    }
}
