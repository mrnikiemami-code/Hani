using FluentValidation;

namespace Hani.Modules.Catalog.Application.Commands.CreateDestination;

public sealed class CreateDestinationCommandValidator : AbstractValidator<CreateDestinationCommand>
{
    public CreateDestinationCommandValidator()
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
                .Must(locale => locale is "fa" or "en" or "ar")
                .WithErrorCode("HANI-CATALOG-1017");

            translation.RuleFor(item => item.Name)
                .NotEmpty()
                .MaximumLength(150)
                .WithErrorCode("HANI-CATALOG-1018");
        });
    }
}
