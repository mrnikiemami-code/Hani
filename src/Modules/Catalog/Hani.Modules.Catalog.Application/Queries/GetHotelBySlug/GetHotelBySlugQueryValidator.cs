using FluentValidation;

namespace Hani.Modules.Catalog.Application.Queries.GetHotelBySlug;

/// <summary>
/// Validation rules for hotel queries.
/// </summary>
public sealed class GetHotelBySlugQueryValidator : AbstractValidator<GetHotelBySlugQuery>
{
    /// <summary>
    /// Creates validation rules.
    /// </summary>
    public GetHotelBySlugQueryValidator()
    {
        RuleFor(query => query.Slug).NotEmpty().MaximumLength(120)
            .WithErrorCode("HANI-CATALOG-1421");
    }
}
