using FluentValidation;

namespace Hani.Modules.Catalog.Application.Queries.SearchFlights;

/// <summary>
/// Validation rules for flight search.
/// </summary>
public sealed class SearchFlightsQueryValidator : AbstractValidator<SearchFlightsQuery>
{
    /// <summary>
    /// Creates validation rules.
    /// </summary>
    public SearchFlightsQueryValidator()
    {
        RuleFor(query => query.Origin)
            .Length(3)
            .When(query => !string.IsNullOrWhiteSpace(query.Origin))
            .WithErrorCode("HANI-CATALOG-1930");
        RuleFor(query => query.Destination)
            .Length(3)
            .When(query => !string.IsNullOrWhiteSpace(query.Destination))
            .WithErrorCode("HANI-CATALOG-1931");
        RuleFor(query => query.MaxStops).InclusiveBetween(0, 5)
            .When(query => query.MaxStops is not null)
            .WithErrorCode("HANI-CATALOG-1933");
        RuleFor(query => query.MaxPrice)
            .GreaterThanOrEqualTo(query => query.MinPrice)
            .When(query => query.MaxPrice is not null && query.MinPrice is not null)
            .WithErrorCode("HANI-CATALOG-1934");
    }
}

/// <summary>
/// Validation rules for flight route queries.
/// </summary>
public sealed class GetFlightRouteQueryValidator : AbstractValidator<GetFlightRouteQuery>
{
    /// <summary>
    /// Creates validation rules.
    /// </summary>
    public GetFlightRouteQueryValidator()
    {
        RuleFor(query => query.Slug).NotEmpty().MaximumLength(120)
            .WithErrorCode("HANI-CATALOG-1932");
    }
}
