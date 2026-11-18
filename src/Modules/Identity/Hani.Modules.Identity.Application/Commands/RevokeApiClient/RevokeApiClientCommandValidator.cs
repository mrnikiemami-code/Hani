using FluentValidation;

namespace Hani.Modules.Identity.Application.Commands.RevokeApiClient;

/// <summary>Validation rules for API client revocation.</summary>
public sealed class RevokeApiClientCommandValidator : AbstractValidator<RevokeApiClientCommand>
{
    /// <summary>Creates validation rules.</summary>
    public RevokeApiClientCommandValidator()
    {
        RuleFor(command => command.ApiClientId)
            .NotEmpty()
            .WithErrorCode("HANI-IDENTITY-1822");
    }
}
