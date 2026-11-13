using FluentValidation;
using Hani.BuildingBlocks.Application;

namespace Hani.Modules.Marketplace.Application.Queries.SearchProducts;

/// <summary>
/// Validation rules for marketplace product search.
/// </summary>
public sealed class SearchProductsQueryValidator : AbstractValidator<SearchProductsQuery>
{
    /// <summary>
    /// Creates validation rules for locale and paging.
    /// </summary>
    public SearchProductsQueryValidator(ILanguageCatalog languages)
    {
        RuleFor(query => query.Locale)
            .Must(locale => languages.IsSupported(locale))
            .WithErrorCode("HANI-MARKET-1001");

        RuleFor(query => query.Page)
            .GreaterThanOrEqualTo(1)
            .WithErrorCode("HANI-MARKET-1002");

        RuleFor(query => query.PageSize)
            .InclusiveBetween(1, 50)
            .WithErrorCode("HANI-MARKET-1003");

        RuleFor(query => query.Currency)
            .Length(3)
            .When(query => !string.IsNullOrWhiteSpace(query.Currency))
            .WithErrorCode("HANI-MARKET-1004");

        RuleFor(query => query.MinDuration)
            .GreaterThanOrEqualTo(0)
            .When(query => query.MinDuration is not null)
            .WithErrorCode("HANI-MARKET-1005");

        RuleFor(query => query.MaxDuration)
            .GreaterThanOrEqualTo(0)
            .When(query => query.MaxDuration is not null)
            .WithErrorCode("HANI-MARKET-1006");

        RuleFor(query => query)
            .Must(query =>
                query.MinDuration is null ||
                query.MaxDuration is null ||
                query.MinDuration <= query.MaxDuration)
            .WithErrorCode("HANI-MARKET-1007");

        RuleFor(query => query)
            .Must(query =>
                query.MinPrice is null ||
                query.MaxPrice is null ||
                query.MinPrice <= query.MaxPrice)
            .WithErrorCode("HANI-MARKET-1008");

        RuleFor(query => query.Sort)
            .Must(sort => string.IsNullOrWhiteSpace(sort) ||
                sort.Trim().ToLowerInvariant() is
                    "price_asc" or "price_desc" or "duration_asc" or "duration_desc" or
                    "newest" or "title")
            .WithErrorCode("HANI-MARKET-1009");

        RuleFor(query => query.Adults)
            .GreaterThanOrEqualTo(1)
            .When(query => query.Adults is not null)
            .WithErrorCode("HANI-MARKET-1010");

        RuleFor(query => query.Children)
            .GreaterThanOrEqualTo(0)
            .When(query => query.Children is not null)
            .WithErrorCode("HANI-MARKET-1011");

        RuleFor(query => query.Infants)
            .GreaterThanOrEqualTo(0)
            .When(query => query.Infants is not null)
            .WithErrorCode("HANI-MARKET-1012");
    }
}
