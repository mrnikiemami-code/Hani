using FluentValidation;

namespace Hani.Modules.Supply.Application.Queries.GetDeparturesByOffer;

public sealed class GetDeparturesByOfferQueryValidator : AbstractValidator<GetDeparturesByOfferQuery>
{
    public GetDeparturesByOfferQueryValidator()
    {
        RuleFor(query => query.AgencyId)
            .NotEmpty()
            .WithErrorCode("HANI-SUPPLY-1120");

        RuleFor(query => query.AgencyOfferId)
            .NotEmpty()
            .WithErrorCode("HANI-SUPPLY-1121");
    }
}
