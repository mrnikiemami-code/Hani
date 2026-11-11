using FluentValidation;

namespace Hani.Modules.Catalog.Application.Commands.CreateTourProduct;

/// <summary>
/// Validation rules for creating a tour product.
/// </summary>
public sealed class CreateTourProductCommandValidator : AbstractValidator<CreateTourProductCommand>
{
    public CreateTourProductCommandValidator()
    {
        RuleFor(command => command.Slug)
            .NotEmpty()
            .MaximumLength(120)
            .WithErrorCode("HANI-CATALOG-1002");

        RuleFor(command => command.DurationDays)
            .GreaterThan(0)
            .WithErrorCode("HANI-CATALOG-1003");

        RuleFor(command => command.TourType)
            .NotEmpty()
            .MaximumLength(60)
            .WithErrorCode("HANI-CATALOG-1004");

        RuleFor(command => command.Translations)
            .NotEmpty()
            .WithErrorCode("HANI-CATALOG-1005");

        RuleForEach(command => command.Translations)
            .ChildRules(translation =>
            {
                translation.RuleFor(item => item.Locale)
                    .NotEmpty()
                    .Must(locale => locale is "fa" or "en" or "ar")
                    .WithErrorCode("HANI-CATALOG-1006");

                translation.RuleFor(item => item.Title)
                    .NotEmpty()
                    .MaximumLength(200)
                    .WithErrorCode("HANI-CATALOG-1007");

                translation.RuleFor(item => item.Summary)
                    .NotEmpty()
                    .MaximumLength(500)
                    .WithErrorCode("HANI-CATALOG-1008");

                translation.RuleFor(item => item.Description)
                    .NotEmpty()
                    .WithErrorCode("HANI-CATALOG-1009");
            });

        RuleFor(command => command.DestinationIds)
            .NotEmpty()
            .WithErrorCode("HANI-CATALOG-1010");
    }
}
