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
