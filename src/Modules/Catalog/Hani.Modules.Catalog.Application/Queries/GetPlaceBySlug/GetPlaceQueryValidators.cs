using FluentValidation;

namespace Hani.Modules.Catalog.Application.Queries.GetPlaceBySlug;

/// <summary>
/// Validation rules for place queries.
/// </summary>
public sealed class GetPlaceBySlugQueryValidator : AbstractValidator<GetPlaceBySlugQuery>
{
    /// <summary>
    /// Creates validation rules.
    /// </summary>
    public GetPlaceBySlugQueryValidator()
    {
        RuleFor(query => query.Slug).NotEmpty().MaximumLength(120)
            .WithErrorCode("HANI-CATALOG-1530");
    }
}

/// <summary>
/// Validation rules for nearby place queries.
/// </summary>
public sealed class GetNearbyPlacesQueryValidator : AbstractValidator<GetNearbyPlacesQuery>
{
    /// <summary>
    /// Creates validation rules.
    /// </summary>
    public GetNearbyPlacesQueryValidator()
    {
        RuleFor(query => query.Latitude).InclusiveBetween(-90m, 90m)
            .WithErrorCode("HANI-CATALOG-1531");
        RuleFor(query => query.Longitude).InclusiveBetween(-180m, 180m)
            .WithErrorCode("HANI-CATALOG-1532");
        RuleFor(query => query.RadiusKm).InclusiveBetween(1, 100)
            .WithErrorCode("HANI-CATALOG-1533");
        RuleFor(query => query.Limit).InclusiveBetween(1, 100)
            .WithErrorCode("HANI-CATALOG-1534");
    }
}
