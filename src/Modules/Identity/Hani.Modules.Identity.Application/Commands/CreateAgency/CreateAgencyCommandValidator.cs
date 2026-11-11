using FluentValidation;

namespace Hani.Modules.Identity.Application.Commands.CreateAgency;

/// <summary>
/// Validation rules for creating an agency.
/// </summary>
public sealed class CreateAgencyCommandValidator : AbstractValidator<CreateAgencyCommand>
{
    public CreateAgencyCommandValidator()
    {
        RuleFor(command => command.Slug)
            .NotEmpty()
            .MaximumLength(80)
            .Matches("^[a-z0-9-]+$")
            .WithErrorCode("HANI-IDENTITY-1002");

        RuleFor(command => command.Name)
            .NotEmpty()
            .MaximumLength(200)
            .WithErrorCode("HANI-IDENTITY-1003");

        RuleFor(command => command.LicenseNo)
            .NotEmpty()
            .MaximumLength(50)
            .WithErrorCode("HANI-IDENTITY-1004");

        RuleFor(command => command.City)
            .NotEmpty()
            .MaximumLength(80)
            .WithErrorCode("HANI-IDENTITY-1005");
    }
}
