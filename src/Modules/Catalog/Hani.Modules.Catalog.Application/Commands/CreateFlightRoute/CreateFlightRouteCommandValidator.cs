using FluentValidation;

namespace Hani.Modules.Catalog.Application.Commands.CreateFlightRoute;

/// <summary>
/// Validation rules for flight routes.
/// </summary>
public sealed class CreateFlightRouteCommandValidator : AbstractValidator<CreateFlightRouteCommand>
{
    /// <summary>
    /// Creates validation rules.
    /// </summary>
    public CreateFlightRouteCommandValidator()
    {
        RuleFor(command => command.Slug).NotEmpty().MaximumLength(120)
            .WithErrorCode("HANI-CATALOG-1910");
        RuleFor(command => command.OriginCode).NotEmpty().Length(3)
            .WithErrorCode("HANI-CATALOG-1911");
        RuleFor(command => command.DestinationCode).NotEmpty().Length(3)
            .WithErrorCode("HANI-CATALOG-1912");
        RuleFor(command => command.Offers).NotEmpty().WithErrorCode("HANI-CATALOG-1913");
    }
}
