using FluentValidation;

namespace Hani.Modules.Supply.Application.Commands.ApproveAgencyOffer;

/// <summary>
/// Validation rules for approving an offer.
/// </summary>
public sealed class ApproveAgencyOfferCommandValidator : AbstractValidator<ApproveAgencyOfferCommand>
{
    public ApproveAgencyOfferCommandValidator()
    {
        RuleFor(command => command.OfferId).NotEmpty().WithErrorCode("HANI-SUPPLY-1307");
    }
}
