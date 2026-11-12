using FluentValidation;
using Hani.BuildingBlocks.Application;

namespace Hani.Modules.Catalog.Application.Commands.CreateTourProduct;

/// <summary>
/// Validation rules for creating a tour product.
/// </summary>
public sealed class CreateTourProductCommandValidator : AbstractValidator<CreateTourProductCommand>
{
    public CreateTourProductCommandValidator(ILanguageCatalog languages)
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
                    .Must(locale => languages.IsSupported(locale))
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

        When(command => command.Content is not null, () =>
        {
            RuleFor(command => command.Content!.ItineraryDays)
                .Must(days => days.Select(day => day.DayNumber).Distinct().Count() == days.Count)
                .WithErrorCode("HANI-CATALOG-1015");

            RuleForEach(command => command.Content!.ItineraryDays)
                .ChildRules(day =>
                {
                    day.RuleFor(item => item.DayNumber)
                        .GreaterThan(0)
                        .WithErrorCode("HANI-CATALOG-1016");

                    day.RuleFor(item => item.Translations)
                        .NotEmpty()
                        .WithErrorCode("HANI-CATALOG-1017");

                    day.RuleForEach(item => item.Translations)
                        .ChildRules(translation =>
                        {
                            translation.RuleFor(item => item.Locale)
                                .NotEmpty()
                                .Must(locale => languages.IsSupported(locale))
                                .WithErrorCode("HANI-CATALOG-1018");

                            translation.RuleFor(item => item.Title)
                                .NotEmpty()
                                .MaximumLength(200)
                                .WithErrorCode("HANI-CATALOG-1019");

                            translation.RuleFor(item => item.Description)
                                .NotEmpty()
                                .WithErrorCode("HANI-CATALOG-1020");
                        });
                });
        });
    }
}
