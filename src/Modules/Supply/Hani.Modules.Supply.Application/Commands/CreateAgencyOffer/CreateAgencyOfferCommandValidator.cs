using FluentValidation;

namespace Hani.Modules.Supply.Application.Commands.CreateAgencyOffer;

public sealed class CreateAgencyOfferCommandValidator : AbstractValidator<CreateAgencyOfferCommand>
{
    public CreateAgencyOfferCommandValidator()
    {
        RuleFor(command => command.AgencyId)
            .NotEmpty()
            .WithErrorCode("HANI-SUPPLY-1001");

        RuleFor(command => command.TourProductId)
            .NotEmpty()
            .WithErrorCode("HANI-SUPPLY-1002");

        RuleFor(command => command.Title)
            .NotEmpty()
            .MaximumLength(200)
            .WithErrorCode("HANI-SUPPLY-1003");

        RuleFor(command => command.BasePrice)
            .GreaterThan(0)
            .WithErrorCode("HANI-SUPPLY-1004");

        RuleFor(command => command.Currency)
            .NotEmpty()
            .Length(3)
            .WithErrorCode("HANI-SUPPLY-1005");
    }
}
