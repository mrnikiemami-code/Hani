using FluentValidation;

namespace Hani.Modules.Identity.Application.Commands.CreateApiClient;

/// <summary>
/// Validation rules for creating an API client.
/// </summary>
public sealed class CreateApiClientCommandValidator : AbstractValidator<CreateApiClientCommand>
{
    public CreateApiClientCommandValidator()
    {
        RuleFor(command => command.AgencyId)
            .NotEmpty()
            .WithErrorCode("HANI-IDENTITY-1007");

        RuleFor(command => command.Name)
            .NotEmpty()
            .MaximumLength(120)
            .WithErrorCode("HANI-IDENTITY-1008");

        RuleFor(command => command.Scopes)
            .NotEmpty()
            .WithErrorCode("HANI-IDENTITY-1009");
    }
}
