using FluentValidation;

namespace Hani.Modules.Catalog.Application.Commands.PublishTourProduct;

/// <summary>
/// Validation rules for publishing a tour product.
/// </summary>
public sealed class PublishTourProductCommandValidator : AbstractValidator<PublishTourProductCommand>
{
    public PublishTourProductCommandValidator()
    {
        RuleFor(command => command.TourProductId)
            .NotEmpty()
            .WithErrorCode("HANI-CATALOG-1012");
    }
}
