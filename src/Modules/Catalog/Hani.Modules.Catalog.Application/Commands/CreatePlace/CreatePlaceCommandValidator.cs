using FluentValidation;

namespace Hani.Modules.Catalog.Application.Commands.CreatePlace;

/// <summary>
/// Validation rules for place creation.
/// </summary>
public sealed class CreatePlaceCommandValidator : AbstractValidator<CreatePlaceCommand>
{
    /// <summary>
    /// Creates validation rules.
    /// </summary>
    public CreatePlaceCommandValidator()
    {
        RuleFor(command => command.Slug).NotEmpty().MaximumLength(120)
            .WithErrorCode("HANI-CATALOG-1510");
        RuleFor(command => command.DestinationId).NotEmpty().WithErrorCode("HANI-CATALOG-1511");
        RuleFor(command => command.Category).NotEmpty().MaximumLength(120)
            .WithErrorCode("HANI-CATALOG-1512");
        RuleFor(command => command.Translations).NotEmpty().WithErrorCode("HANI-CATALOG-1513");
        RuleForEach(command => command.Translations).ChildRules(translation =>
        {
            translation.RuleFor(item => item.Locale).NotEmpty().MaximumLength(10)
                .WithErrorCode("HANI-CATALOG-1514");
            translation.RuleFor(item => item.Name).NotEmpty().MaximumLength(250)
                .WithErrorCode("HANI-CATALOG-1515");
        });
        RuleFor(command => command.Latitude).InclusiveBetween(-90m, 90m)
            .When(command => command.Latitude is not null)
            .WithErrorCode("HANI-CATALOG-1516");
        RuleFor(command => command.Longitude).InclusiveBetween(-180m, 180m)
            .When(command => command.Longitude is not null)
            .WithErrorCode("HANI-CATALOG-1517");
    }
}
