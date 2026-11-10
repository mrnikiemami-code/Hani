using FluentValidation;

namespace Hani.Modules.Catalog.Application.Commands.PublishTourProduct;

public sealed class PublishTourProductCommandValidator : AbstractValidator<PublishTourProductCommand>
{
    public PublishTourProductCommandValidator()
    {
        RuleFor(command => command.TourProductId)
            .NotEmpty()
            .WithErrorCode("HANI-CATALOG-1012");
    }
}
