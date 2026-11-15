using FluentValidation;

namespace Hani.Modules.Identity.Application.Commands.Preferences;

/// <summary>
/// Validation rules for preference reads.
/// </summary>
public sealed class GetUserPreferencesQueryValidator : AbstractValidator<GetUserPreferencesQuery>
{
    /// <summary>
    /// Creates validation rules for the user id.
    /// </summary>
    public GetUserPreferencesQueryValidator()
    {
        RuleFor(query => query.UserId)
            .NotEmpty()
            .WithErrorCode("HANI-IDENTITY-1400");
    }
}

/// <summary>
/// Validation rules for preference updates. Unknown layout, locale, currency,
/// or theme values are normalized to safe defaults by the handler.
/// </summary>
public sealed class UpdateUserPreferencesCommandValidator
    : AbstractValidator<UpdateUserPreferencesCommand>
{
    /// <summary>
    /// Creates validation rules for field lengths and the user id.
    /// </summary>
    public UpdateUserPreferencesCommandValidator()
    {
        RuleFor(command => command.UserId)
            .NotEmpty()
            .WithErrorCode("HANI-IDENTITY-1400");

        RuleFor(command => command.HomeExperienceId)
            .MaximumLength(64)
            .WithErrorCode("HANI-IDENTITY-1401");

        RuleFor(command => command.Locale)
            .MaximumLength(16)
            .WithErrorCode("HANI-IDENTITY-1402");

        RuleFor(command => command.Currency)
            .MaximumLength(16)
            .WithErrorCode("HANI-IDENTITY-1403");

        RuleFor(command => command.Theme)
            .MaximumLength(16)
            .WithErrorCode("HANI-IDENTITY-1404");
    }
}
