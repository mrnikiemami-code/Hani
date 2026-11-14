using FluentValidation;

namespace Hani.Modules.Marketplace.Application.Queries.GetProductRecommendations;

/// <summary>
/// Validation rules for product recommendations.
/// </summary>
public sealed class GetProductRecommendationsQueryValidator
    : AbstractValidator<GetProductRecommendationsQuery>
{
    /// <summary>
    /// Creates validation rules.
    /// </summary>
    public GetProductRecommendationsQueryValidator()
    {
        RuleFor(query => query.ProductId).NotEmpty().WithErrorCode("HANI-MARKET-1312");
        RuleFor(query => query.Limit).InclusiveBetween(1, 20).WithErrorCode("HANI-MARKET-1313");
    }
}
