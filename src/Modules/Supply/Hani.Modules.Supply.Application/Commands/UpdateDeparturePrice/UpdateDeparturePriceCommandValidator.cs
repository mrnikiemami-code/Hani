using FluentValidation;

namespace Hani.Modules.Supply.Application.Commands.UpdateDeparturePrice;

public sealed class UpdateDeparturePriceCommandValidator : AbstractValidator<UpdateDeparturePriceCommand>
{
    public UpdateDeparturePriceCommandValidator()
    {
        RuleFor(command => command.DepartureId)
            .NotEmpty()
            .WithErrorCode("HANI-SUPPLY-1117");

        RuleFor(command => command.Amount)
            .GreaterThan(0)
            .WithErrorCode("HANI-SUPPLY-1118");

        RuleFor(command => command.Currency)
            .NotEmpty()
            .Length(3)
            .WithErrorCode("HANI-SUPPLY-1119");

        RuleFor(command => command.Version)
            .GreaterThanOrEqualTo(1)
            .WithErrorCode("HANI-SUPPLY-1120");
    }
}
