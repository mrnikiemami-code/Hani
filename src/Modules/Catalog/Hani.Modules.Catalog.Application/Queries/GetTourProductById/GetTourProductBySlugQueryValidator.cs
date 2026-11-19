using FluentValidation;

namespace Hani.Modules.Catalog.Application.Queries.GetTourProductById;

/// <summary>
/// Validation rules for reading a tour product by slug.
/// </summary>
public sealed class GetTourProductBySlugQueryValidator
    : AbstractValidator<GetTourProductBySlugQuery>
{
    public GetTourProductBySlugQueryValidator()
    {
        RuleFor(query => query.Slug)
            .NotEmpty()
            .MaximumLength(200)
            .WithErrorCode("HANI-CATALOG-1014");
    }
}
