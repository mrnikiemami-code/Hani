using FluentValidation;

namespace Hani.Modules.Catalog.Application.Queries.GetTourProductById;

public sealed class GetTourProductByIdQueryValidator : AbstractValidator<GetTourProductByIdQuery>
{
    public GetTourProductByIdQueryValidator()
    {
        RuleFor(query => query.TourProductId)
            .NotEmpty()
            .WithErrorCode("HANI-CATALOG-1014");
    }
}
