using FluentValidation;

namespace Hani.Modules.Catalog.Application.Commands.CreateHotel;

/// <summary>
/// Validation rules for hotel creation.
/// </summary>
public sealed class CreateHotelCommandValidator : AbstractValidator<CreateHotelCommand>
{
    /// <summary>
    /// Creates validation rules.
    /// </summary>
    public CreateHotelCommandValidator()
    {
        RuleFor(command => command.Slug).NotEmpty().MaximumLength(120)
            .WithErrorCode("HANI-CATALOG-1410");
        RuleFor(command => command.DestinationId).NotEmpty().WithErrorCode("HANI-CATALOG-1411");
        RuleFor(command => command.Stars).InclusiveBetween(1, 5).WithErrorCode("HANI-CATALOG-1412");
        RuleFor(command => command.Translations).NotEmpty().WithErrorCode("HANI-CATALOG-1413");
        RuleForEach(command => command.Translations)
            .ChildRules(translation =>
            {
                translation.RuleFor(item => item.Locale).NotEmpty().MaximumLength(10)
                    .WithErrorCode("HANI-CATALOG-1414");
                translation.RuleFor(item => item.Name).NotEmpty().MaximumLength(250)
                    .WithErrorCode("HANI-CATALOG-1415");
            });
    }
}
