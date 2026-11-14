using FluentValidation;

namespace Hani.Modules.Catalog.Application.Queries.GetGeoNearby;

/// <summary>
/// Validation rules for unified geo nearby search.
/// </summary>
public sealed class GetGeoNearbyQueryValidator : AbstractValidator<GetGeoNearbyQuery>
{
    /// <summary>
    /// Creates validation rules.
    /// </summary>
    public GetGeoNearbyQueryValidator()
    {
        RuleFor(query => query.Latitude).InclusiveBetween(-90m, 90m)
            .WithErrorCode("HANI-CATALOG-2010");
        RuleFor(query => query.Longitude).InclusiveBetween(-180m, 180m)
            .WithErrorCode("HANI-CATALOG-2011");
        RuleFor(query => query.RadiusKm).InclusiveBetween(1, 100)
            .WithErrorCode("HANI-CATALOG-2012");
        RuleFor(query => query.Limit).InclusiveBetween(1, 100)
            .WithErrorCode("HANI-CATALOG-2013");
    }
}
