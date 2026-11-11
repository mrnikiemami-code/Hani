using FluentValidation;

namespace Hani.Modules.Identity.Application.Queries.GetAgencyById;

/// <summary>
/// Validation rules for reading an agency.
/// </summary>
public sealed class GetAgencyByIdQueryValidator : AbstractValidator<GetAgencyByIdQuery>
{
    public GetAgencyByIdQueryValidator()
    {
        RuleFor(query => query.AgencyId)
            .NotEmpty()
            .WithErrorCode("HANI-IDENTITY-1011");
    }
}
