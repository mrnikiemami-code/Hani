using FluentValidation;
using Hani.BuildingBlocks.Application;

namespace Hani.Modules.Catalog.Application.Commands.CreateDestination;

/// <summary>
/// Validation rules for creating a destination.
/// </summary>
public sealed class CreateDestinationCommandValidator : AbstractValidator<CreateDestinationCommand>
{
    public CreateDestinationCommandValidator(ILanguageCatalog languages)
    {
        RuleFor(command => command.Slug)
            .NotEmpty()
            .MaximumLength(120)
            .WithErrorCode("HANI-CATALOG-1015");

        RuleFor(command => command.Translations)
            .NotEmpty()
            .WithErrorCode("HANI-CATALOG-1016");

        RuleForEach(command => command.Translations).ChildRules(translation =>
        {
            translation.RuleFor(item => item.Locale)
                .NotEmpty()
                .Must(locale => languages.IsSupported(locale))
                .WithErrorCode("HANI-CATALOG-1017");

            translation.RuleFor(item => item.Name)
                .NotEmpty()
                .MaximumLength(150)
                .WithErrorCode("HANI-CATALOG-1018");
        });
    }
}
