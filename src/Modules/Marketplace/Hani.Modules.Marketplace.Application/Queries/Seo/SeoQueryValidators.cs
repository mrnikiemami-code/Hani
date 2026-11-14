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
/// Validation rules for vertical SEO requests.
/// </summary>
public sealed class GetVerticalSeoQueryValidator : AbstractValidator<GetVerticalSeoQuery>
{
    /// <summary>
    /// Creates validation rules for vertical type and slug.
    /// </summary>
    public GetVerticalSeoQueryValidator()
    {
        RuleFor(query => query.Type)
            .Must(type => type is "hotel" or "restaurant" or "attraction" or "visa" or "flight")
            .WithErrorCode("HANI-MARKET-1306");
        RuleFor(query => query.Slug)
            .NotEmpty()
            .MaximumLength(120)
            .WithErrorCode("HANI-MARKET-1307");
    }
}

/// <summary>
/// Validation rules for vertical landing SEO requests.
/// </summary>
public sealed class GetVerticalLandingSeoQueryValidator
    : AbstractValidator<GetVerticalLandingSeoQuery>
{
    /// <summary>
    /// Creates validation rules for vertical type and destination.
    /// </summary>
    public GetVerticalLandingSeoQueryValidator()
    {
        RuleFor(query => query.Type)
            .Must(type => type is "hotel" or "restaurant" or "attraction" or "visa" or "flight")
            .WithErrorCode("HANI-MARKET-1309");
        RuleFor(query => query.DestinationSlug)
            .MaximumLength(120)
            .When(query => query.DestinationSlug is not null)
            .WithErrorCode("HANI-MARKET-1310");
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
