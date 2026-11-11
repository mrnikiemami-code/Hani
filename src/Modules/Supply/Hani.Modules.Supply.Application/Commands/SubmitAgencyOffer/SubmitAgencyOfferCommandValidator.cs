using FluentValidation;

namespace Hani.Modules.Supply.Application.Commands.SubmitAgencyOffer;

public sealed class SubmitAgencyOfferCommandValidator : AbstractValidator<SubmitAgencyOfferCommand>
{
    public SubmitAgencyOfferCommandValidator()
    {
        RuleFor(command => command.AgencyId).NotEmpty().WithErrorCode("HANI-SUPPLY-1303");
        RuleFor(command => command.OfferId).NotEmpty().WithErrorCode("HANI-SUPPLY-1304");
    }
}
