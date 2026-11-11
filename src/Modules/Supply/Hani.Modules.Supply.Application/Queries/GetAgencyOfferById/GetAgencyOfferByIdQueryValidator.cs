using FluentValidation;

namespace Hani.Modules.Supply.Application.Queries.GetAgencyOfferById;

public sealed class GetAgencyOfferByIdQueryValidator : AbstractValidator<GetAgencyOfferByIdQuery>
{
    public GetAgencyOfferByIdQueryValidator()
    {
        RuleFor(query => query.OfferId)
            .NotEmpty()
            .WithErrorCode("HANI-SUPPLY-1007");

        RuleFor(query => query.AgencyId)
            .NotEmpty()
            .WithErrorCode("HANI-SUPPLY-1008");
    }
}
