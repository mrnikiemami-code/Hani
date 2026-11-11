using FluentValidation;

namespace Hani.Modules.Supply.Application.Commands.ArchiveAgencyOffer;

/// <summary>
/// Validation rules for archiving an offer.
/// </summary>
public sealed class ArchiveAgencyOfferCommandValidator : AbstractValidator<ArchiveAgencyOfferCommand>
{
    public ArchiveAgencyOfferCommandValidator()
    {
        RuleFor(command => command.AgencyId).NotEmpty().WithErrorCode("HANI-SUPPLY-1313");
        RuleFor(command => command.OfferId).NotEmpty().WithErrorCode("HANI-SUPPLY-1314");
    }
}
