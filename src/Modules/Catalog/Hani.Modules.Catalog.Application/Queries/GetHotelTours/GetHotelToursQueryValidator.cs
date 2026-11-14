using FluentValidation;

namespace Hani.Modules.Catalog.Application.Queries.GetHotelTours;

/// <summary>
/// Validation rules for hotel tour lookups.
/// </summary>
public sealed class GetHotelToursQueryValidator : AbstractValidator<GetHotelToursQuery>
{
    /// <summary>
    /// Creates validation rules.
    /// </summary>
    public GetHotelToursQueryValidator()
    {
        RuleFor(query => query.Slug).NotEmpty().MaximumLength(120)
            .WithErrorCode("HANI-CATALOG-2110");
    }
}
