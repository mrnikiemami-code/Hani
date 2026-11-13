using FluentValidation;

namespace Hani.Modules.Identity.Application.Commands.Auth;

/// <summary>
/// Validation rules for OTP requests.
/// </summary>
public sealed class RequestOtpCommandValidator : AbstractValidator<RequestOtpCommand>
{
    /// <summary>
    /// Creates validation rules for the mobile number.
    /// </summary>
    public RequestOtpCommandValidator()
    {
        RuleFor(command => command.Mobile)
            .NotEmpty()
            .WithErrorCode("HANI-IDENTITY-1300");
    }
}

/// <summary>
/// Validation rules for OTP verification.
/// </summary>
public sealed class VerifyOtpCommandValidator : AbstractValidator<VerifyOtpCommand>
{
    /// <summary>
    /// Creates validation rules for mobile and OTP.
    /// </summary>
    public VerifyOtpCommandValidator()
    {
        RuleFor(command => command.Mobile)
            .NotEmpty()
            .WithErrorCode("HANI-IDENTITY-1300");

        RuleFor(command => command.Code)
            .NotEmpty()
            .Length(6)
            .WithErrorCode("HANI-IDENTITY-1301");
    }
}

/// <summary>
/// Validation rules for refresh-token exchange.
/// </summary>
public sealed class RefreshTokenCommandValidator : AbstractValidator<RefreshTokenCommand>
{
    /// <summary>
    /// Creates validation rules for the refresh token.
    /// </summary>
    public RefreshTokenCommandValidator()
    {
        RuleFor(command => command.RefreshToken)
            .NotEmpty()
            .WithErrorCode("HANI-IDENTITY-1302");
    }
}

/// <summary>
/// Validation rules for logout.
/// </summary>
public sealed class LogoutCommandValidator : AbstractValidator<LogoutCommand>
{
    /// <summary>
    /// Creates validation rules for logout.
    /// </summary>
    public LogoutCommandValidator()
    {
        RuleFor(command => command.UserId)
            .NotEmpty()
            .WithErrorCode("HANI-IDENTITY-1303");

        RuleFor(command => command.RefreshToken)
            .NotEmpty()
            .WithErrorCode("HANI-IDENTITY-1302");
    }
}

/// <summary>
/// Validation rules for profile updates.
/// </summary>
public sealed class UpdateProfileCommandValidator : AbstractValidator<UpdateProfileCommand>
{
    /// <summary>
    /// Creates validation rules for profile fields.
    /// </summary>
    public UpdateProfileCommandValidator()
    {
        RuleFor(command => command.UserId)
            .NotEmpty()
            .WithErrorCode("HANI-IDENTITY-1303");

        RuleFor(command => command.FirstName)
            .NotEmpty()
            .MaximumLength(100)
            .WithErrorCode("HANI-IDENTITY-1304");

        RuleFor(command => command.LastName)
            .MaximumLength(100)
            .WithErrorCode("HANI-IDENTITY-1305");

        RuleFor(command => command.Bio)
            .MaximumLength(1000)
            .WithErrorCode("HANI-IDENTITY-1306");
    }
}

/// <summary>
/// Validation rules for username changes.
/// </summary>
public sealed class ChangeUsernameCommandValidator : AbstractValidator<ChangeUsernameCommand>
{
    /// <summary>
    /// Creates validation rules for the username.
    /// </summary>
    public ChangeUsernameCommandValidator()
    {
        RuleFor(command => command.UserId)
            .NotEmpty()
            .WithErrorCode("HANI-IDENTITY-1303");

        RuleFor(command => command.Username)
            .NotEmpty()
            .MinimumLength(3)
            .MaximumLength(32)
            .WithErrorCode("HANI-IDENTITY-1307");
    }
}

/// <summary>
/// Validation rules for the current-user query.
/// </summary>
public sealed class GetMeQueryValidator : AbstractValidator<GetMeQuery>
{
    /// <summary>
    /// Creates validation rules for the user id.
    /// </summary>
    public GetMeQueryValidator()
    {
        RuleFor(query => query.UserId)
            .NotEmpty()
            .WithErrorCode("HANI-IDENTITY-1303");
    }
}

/// <summary>
/// Validation rules for public author queries.
/// </summary>
public sealed class GetAuthorQueryValidator : AbstractValidator<GetAuthorQuery>
{
    /// <summary>
    /// Creates validation rules for the username.
    /// </summary>
    public GetAuthorQueryValidator()
    {
        RuleFor(query => query.Username)
            .NotEmpty()
            .WithErrorCode("HANI-IDENTITY-1307");
    }
}
