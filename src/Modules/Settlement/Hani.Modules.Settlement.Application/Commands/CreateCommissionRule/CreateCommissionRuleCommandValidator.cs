using FluentValidation;
using Hani.Modules.Settlement.Domain.Commissions;

namespace Hani.Modules.Settlement.Application.Commands.CreateCommissionRule;

/// <summary>
/// Validation rules for creating a commission rule.
/// </summary>
public sealed class CreateCommissionRuleCommandValidator
    : AbstractValidator<CreateCommissionRuleCommand>
{
    /// <summary>
    /// Creates validation rules for agency, product, rate, and effective window.
    /// </summary>
    public CreateCommissionRuleCommandValidator()
    {
        RuleFor(command => command.AgencyId)
            .NotEmpty()
            .WithErrorCode("HANI-SETTLEMENT-1203");

        RuleFor(command => command.ProductType)
            .NotEmpty()
            .Must(type => Enum.TryParse<ProductType>(type, ignoreCase: true, out _))
            .WithErrorCode("HANI-SETTLEMENT-1201");

        RuleFor(command => command.Rate)
            .InclusiveBetween(0m, 1m)
            .WithErrorCode("HANI-SETTLEMENT-1204");

        RuleFor(command => command.MinAmount)
            .GreaterThanOrEqualTo(0m)
            .When(command => command.MinAmount is not null)
            .WithErrorCode("HANI-SETTLEMENT-1205");

        RuleFor(command => command.MaxAmount)
            .GreaterThanOrEqualTo(0m)
            .When(command => command.MaxAmount is not null)
            .WithErrorCode("HANI-SETTLEMENT-1206");

        RuleFor(command => command)
            .Must(command =>
                command.MinAmount is null ||
                command.MaxAmount is null ||
                command.MinAmount <= command.MaxAmount)
            .WithErrorCode("HANI-SETTLEMENT-1207");

        RuleFor(command => command.EffectiveFrom)
            .NotEmpty()
            .WithErrorCode("HANI-SETTLEMENT-1208");

        RuleFor(command => command.EffectiveTo)
            .GreaterThan(command => command.EffectiveFrom)
            .When(command => command.EffectiveTo is not null)
            .WithErrorCode("HANI-SETTLEMENT-1209");
    }
}
