using FluentValidation;
using Hani.BuildingBlocks.Application;

namespace Hani.Modules.Marketplace.Application.Queries.GetProductComparison;

/// <summary>
/// Validation rules for product comparison.
/// </summary>
public sealed class GetProductComparisonQueryValidator : AbstractValidator<GetProductComparisonQuery>
{
    /// <summary>
    /// Creates validation rules for product id and locale.
    /// </summary>
    public GetProductComparisonQueryValidator(ILanguageCatalog languages)
    {
        RuleFor(query => query.ProductId)
            .NotEmpty()
            .WithErrorCode("HANI-MARKET-1005");

        RuleFor(query => query.Locale)
            .Must(locale => languages.IsSupported(locale))
            .WithErrorCode("HANI-MARKET-1006");
    }
}
