using FluentValidation;

namespace Hani.Modules.Catalog.Application.Queries.SearchHotels;

/// <summary>
/// Validation rules for hotel search.
/// </summary>
public sealed class SearchHotelsQueryValidator : AbstractValidator<SearchHotelsQuery>
{
    /// <summary>
    /// Creates validation rules.
    /// </summary>
    public SearchHotelsQueryValidator()
    {
        RuleFor(query => query.MinStars).InclusiveBetween(1, 5)
            .When(query => query.MinStars is not null)
            .WithErrorCode("HANI-CATALOG-1610");
        RuleFor(query => query.Page).GreaterThanOrEqualTo(1).WithErrorCode("HANI-CATALOG-1611");
        RuleFor(query => query.PageSize).InclusiveBetween(1, 50).WithErrorCode("HANI-CATALOG-1612");
    }
}

/// <summary>
/// Validation rules for nearby hotel search.
/// </summary>
public sealed class GetNearbyHotelsQueryValidator : AbstractValidator<GetNearbyHotelsQuery>
{
    /// <summary>
    /// Creates validation rules.
    /// </summary>
    public GetNearbyHotelsQueryValidator()
    {
        RuleFor(query => query.Latitude).InclusiveBetween(-90m, 90m)
            .WithErrorCode("HANI-CATALOG-1613");
        RuleFor(query => query.Longitude).InclusiveBetween(-180m, 180m)
            .WithErrorCode("HANI-CATALOG-1614");
        RuleFor(query => query.RadiusKm).InclusiveBetween(1, 100)
            .WithErrorCode("HANI-CATALOG-1615");
        RuleFor(query => query.Limit).InclusiveBetween(1, 100)
            .WithErrorCode("HANI-CATALOG-1616");
    }
}
