using FluentValidation;

namespace Hani.Modules.Catalog.Application.Queries.GetVisaCountry;

/// <summary>
/// Validation rules for visa queries.
/// </summary>
public sealed class GetVisaCountryQueryValidator : AbstractValidator<GetVisaCountryQuery>
{
    /// <summary>
    /// Creates validation rules.
    /// </summary>
    public GetVisaCountryQueryValidator()
    {
        RuleFor(query => query.Slug).NotEmpty().MaximumLength(120)
            .WithErrorCode("HANI-CATALOG-1830");
    }
}

/// <summary>
/// Validation rules for visa country lists.
/// </summary>
public sealed class ListVisaCountriesQueryValidator : AbstractValidator<ListVisaCountriesQuery>
{
    /// <summary>
    /// Creates validation rules.
    /// </summary>
    public ListVisaCountriesQueryValidator()
    {
        RuleFor(query => query.Locale).MaximumLength(10)
            .When(query => query.Locale is not null)
            .WithErrorCode("HANI-CATALOG-1831");
    }
}
