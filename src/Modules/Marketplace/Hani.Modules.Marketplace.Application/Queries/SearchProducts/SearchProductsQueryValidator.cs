using FluentValidation;

namespace Hani.Modules.Marketplace.Application.Queries.SearchProducts;

/// <summary>
/// Validation rules for marketplace product search.
/// </summary>
public sealed class SearchProductsQueryValidator : AbstractValidator<SearchProductsQuery>
{
    /// <summary>
    /// Creates validation rules for locale and paging.
    /// </summary>
    public SearchProductsQueryValidator()
    {
        RuleFor(query => query.Locale)
            .Must(locale => locale is "fa" or "en" or "ar")
            .WithErrorCode("HANI-MARKET-1001");

        RuleFor(query => query.Page)
            .GreaterThanOrEqualTo(1)
            .WithErrorCode("HANI-MARKET-1002");

        RuleFor(query => query.PageSize)
            .InclusiveBetween(1, 50)
            .WithErrorCode("HANI-MARKET-1003");
    }
}
