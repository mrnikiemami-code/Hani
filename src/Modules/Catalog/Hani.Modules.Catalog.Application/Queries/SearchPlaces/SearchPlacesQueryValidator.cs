using FluentValidation;

namespace Hani.Modules.Catalog.Application.Queries.SearchPlaces;

/// <summary>
/// Validation rules for place search.
/// </summary>
public sealed class SearchPlacesQueryValidator : AbstractValidator<SearchPlacesQuery>
{
    /// <summary>
    /// Creates validation rules.
    /// </summary>
    public SearchPlacesQueryValidator()
    {
        RuleFor(query => query.Page).GreaterThanOrEqualTo(1).WithErrorCode("HANI-CATALOG-1701");
        RuleFor(query => query.PageSize).InclusiveBetween(1, 50).WithErrorCode("HANI-CATALOG-1702");
    }
}
