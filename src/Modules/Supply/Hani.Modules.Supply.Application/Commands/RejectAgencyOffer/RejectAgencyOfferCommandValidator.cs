using FluentValidation;

namespace Hani.Modules.Supply.Application.Commands.RejectAgencyOffer;

/// <summary>
/// Validation rules for rejecting an offer.
/// </summary>
public sealed class RejectAgencyOfferCommandValidator : AbstractValidator<RejectAgencyOfferCommand>
{
    public RejectAgencyOfferCommandValidator()
    {
        RuleFor(command => command.OfferId).NotEmpty().WithErrorCode("HANI-SUPPLY-1310");
        RuleFor(command => command.Reason)
            .NotEmpty()
            .MaximumLength(500)
            .WithErrorCode("HANI-SUPPLY-1311");
    }
}
