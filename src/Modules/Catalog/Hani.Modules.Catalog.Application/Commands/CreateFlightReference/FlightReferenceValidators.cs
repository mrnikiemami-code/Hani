using FluentValidation;

namespace Hani.Modules.Catalog.Application.Commands.CreateFlightReference;

/// <summary>
/// Validation rules for airline creation.
/// </summary>
public sealed class CreateAirlineCommandValidator : AbstractValidator<CreateAirlineCommand>
{
    /// <summary>Creates validation rules.</summary>
    public CreateAirlineCommandValidator()
    {
        RuleFor(command => command.Iata).NotEmpty().Length(2)
            .WithErrorCode("HANI-CATALOG-2210");
        RuleFor(command => command.Name).NotEmpty().MaximumLength(120)
            .WithErrorCode("HANI-CATALOG-2211");
    }
}

/// <summary>
/// Validation rules for airport creation.
/// </summary>
public sealed class CreateAirportCommandValidator : AbstractValidator<CreateAirportCommand>
{
    /// <summary>Creates validation rules.</summary>
    public CreateAirportCommandValidator()
    {
        RuleFor(command => command.Iata).NotEmpty().Length(3)
            .WithErrorCode("HANI-CATALOG-2212");
        RuleFor(command => command.Name).NotEmpty().MaximumLength(200)
            .WithErrorCode("HANI-CATALOG-2213");
        RuleFor(command => command.City).NotEmpty().MaximumLength(120)
            .WithErrorCode("HANI-CATALOG-2214");
        RuleFor(command => command.CountryCode).NotEmpty().Length(2, 3)
            .WithErrorCode("HANI-CATALOG-2215");
    }
}

/// <summary>
/// Validation rules for flight reference queries.
/// </summary>
public sealed class ListFlightReferencesQueryValidator
    : AbstractValidator<ListFlightReferencesQuery>
{
    /// <summary>The query has no user input.</summary>
    public ListFlightReferencesQueryValidator()
    {
    }
}
