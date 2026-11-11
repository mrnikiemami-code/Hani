using FluentValidation;

namespace Hani.Modules.Supply.Application.Commands.UpsertAgencyOffer;

public sealed class UpsertAgencyOfferCommandValidator : AbstractValidator<UpsertAgencyOfferCommand>
{
    public UpsertAgencyOfferCommandValidator()
    {
        RuleFor(command => command.AgencyId)
            .NotEmpty()
            .WithErrorCode("HANI-SUPPLY-1203");

        RuleFor(command => command.ExternalId)
            .NotEmpty()
            .MaximumLength(100)
            .WithErrorCode("HANI-SUPPLY-1204");

        RuleFor(command => command.TourProductId)
            .NotEmpty()
            .WithErrorCode("HANI-SUPPLY-1205");

        RuleFor(command => command.Title)
            .NotEmpty()
            .MaximumLength(200)
            .WithErrorCode("HANI-SUPPLY-1206");

        RuleFor(command => command.BasePrice)
            .GreaterThan(0)
            .WithErrorCode("HANI-SUPPLY-1207");

        RuleFor(command => command.Currency)
            .NotEmpty()
            .Length(3)
            .WithErrorCode("HANI-SUPPLY-1208");
    }
}
