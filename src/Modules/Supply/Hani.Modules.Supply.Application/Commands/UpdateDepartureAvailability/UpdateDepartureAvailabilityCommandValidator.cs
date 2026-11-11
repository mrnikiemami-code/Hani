using FluentValidation;

namespace Hani.Modules.Supply.Application.Commands.UpdateDepartureAvailability;

public sealed class UpdateDepartureAvailabilityCommandValidator
    : AbstractValidator<UpdateDepartureAvailabilityCommand>
{
    public UpdateDepartureAvailabilityCommandValidator()
    {
        RuleFor(command => command.AgencyId)
            .NotEmpty()
            .WithErrorCode("HANI-SUPPLY-1115");

        RuleFor(command => command.DepartureId)
            .NotEmpty()
            .WithErrorCode("HANI-SUPPLY-1112");

        RuleFor(command => command.SeatsLeft)
            .GreaterThanOrEqualTo(0)
            .WithErrorCode("HANI-SUPPLY-1113");

        RuleFor(command => command.Version)
            .GreaterThanOrEqualTo(1)
            .WithErrorCode("HANI-SUPPLY-1114");
    }
}
