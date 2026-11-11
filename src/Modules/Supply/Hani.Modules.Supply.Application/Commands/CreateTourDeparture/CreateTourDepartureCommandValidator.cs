using FluentValidation;

namespace Hani.Modules.Supply.Application.Commands.CreateTourDeparture;

public sealed class CreateTourDepartureCommandValidator : AbstractValidator<CreateTourDepartureCommand>
{
    public CreateTourDepartureCommandValidator()
    {
        RuleFor(command => command.AgencyId)
            .NotEmpty()
            .WithErrorCode("HANI-SUPPLY-1100");

        RuleFor(command => command.AgencyOfferId)
            .NotEmpty()
            .WithErrorCode("HANI-SUPPLY-1102");

        RuleFor(command => command.EndDate)
            .GreaterThan(command => command.StartDate)
            .WithErrorCode("HANI-SUPPLY-1103");

        RuleFor(command => command.Capacity)
            .GreaterThan(0)
            .WithErrorCode("HANI-SUPPLY-1104");

        RuleFor(command => command.Prices)
            .NotEmpty()
            .WithErrorCode("HANI-SUPPLY-1105");

        RuleFor(command => command.Prices)
            .Must(prices => prices.Select(price => price.RoomType).Distinct().Count() == prices.Count)
            .WithErrorCode("HANI-SUPPLY-1106");

        RuleForEach(command => command.Prices).ChildRules(price =>
        {
            price.RuleFor(item => item.Amount)
                .GreaterThan(0)
                .WithErrorCode("HANI-SUPPLY-1107");

            price.RuleFor(item => item.Currency)
                .NotEmpty()
                .Length(3)
                .WithErrorCode("HANI-SUPPLY-1108");
        });
    }
}
