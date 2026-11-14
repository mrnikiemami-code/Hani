using FluentValidation;

namespace Hani.Modules.Catalog.Application.Commands.CreateVisaCountry;

/// <summary>
/// Validation rules for visa country creation.
/// </summary>
public sealed class CreateVisaCountryCommandValidator : AbstractValidator<CreateVisaCountryCommand>
{
    /// <summary>
    /// Creates validation rules.
    /// </summary>
    public CreateVisaCountryCommandValidator()
    {
        RuleFor(command => command.Slug).NotEmpty().MaximumLength(120)
            .WithErrorCode("HANI-CATALOG-1810");
        RuleFor(command => command.CountryCode).NotEmpty().Length(2, 3)
            .WithErrorCode("HANI-CATALOG-1811");
        RuleFor(command => command.Translations).NotEmpty().WithErrorCode("HANI-CATALOG-1812");
        RuleFor(command => command.Types).NotEmpty().WithErrorCode("HANI-CATALOG-1813");
        RuleForEach(command => command.Translations).ChildRules(translation =>
        {
            translation.RuleFor(item => item.Locale).NotEmpty().MaximumLength(10)
                .WithErrorCode("HANI-CATALOG-1814");
            translation.RuleFor(item => item.Name).NotEmpty().MaximumLength(250)
                .WithErrorCode("HANI-CATALOG-1815");
        });
        RuleForEach(command => command.Types).ChildRules(type =>
        {
            type.RuleFor(item => item.Code).NotEmpty().MaximumLength(40)
                .WithErrorCode("HANI-CATALOG-1816");
            type.RuleFor(item => item.PriceAdult).GreaterThan(0)
                .WithErrorCode("HANI-CATALOG-1817");
            type.RuleFor(item => item.Currency).NotEmpty().Length(3)
                .WithErrorCode("HANI-CATALOG-1818");
            type.RuleFor(item => item.ProcessingDaysMax).GreaterThanOrEqualTo(item => item.ProcessingDaysMin)
                .WithErrorCode("HANI-CATALOG-1819");
        });
    }
}
