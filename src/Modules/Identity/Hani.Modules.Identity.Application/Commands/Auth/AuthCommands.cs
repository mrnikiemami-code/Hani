using Hani.BuildingBlocks.Application;

namespace Hani.Modules.Identity.Application.Commands.Auth;

/// <summary>
/// Command that requests a login OTP for a mobile number.
/// </summary>
public sealed record RequestOtpCommand(string Mobile) : ICommand<RequestOtpResult>;

/// <summary>
/// Result of an OTP request.
/// </summary>
public sealed record RequestOtpResult(
    DateTimeOffset ExpiresAt,
    int RetryAfterSeconds,
    string? DevCode);

/// <summary>
/// Command that verifies an OTP and issues access/refresh tokens.
/// </summary>
public sealed record VerifyOtpCommand(
    string Mobile,
    string Code,
    string? FirstName = null,
    string? LastName = null) : ICommand<AuthResultDto>;

/// <summary>
/// Command that rotates a refresh token.
/// </summary>
public sealed record RefreshTokenCommand(string RefreshToken) : ICommand<AuthResultDto>;

/// <summary>
/// Command that revokes a refresh token for the current user.
/// </summary>
public sealed record LogoutCommand(Guid UserId, string RefreshToken) : ICommand<bool>;

/// <summary>
/// Command that updates the authenticated user profile.
/// </summary>
public sealed record UpdateProfileCommand(
    Guid UserId,
    string FirstName,
    string LastName,
    string? Email,
    string? Bio,
    string? AvatarUrl) : ICommand<UserDto>;

/// <summary>
/// Command that changes the authenticated user's public username.
/// </summary>
public sealed record ChangeUsernameCommand(Guid UserId, string Username) : ICommand<UserDto>;

/// <summary>
/// Query that returns the authenticated user profile.
/// </summary>
public sealed record GetMeQuery(Guid UserId) : IQuery<UserDto>;

/// <summary>
/// Query that returns a public author profile.
/// </summary>
public sealed record GetAuthorQuery(string Username) : IQuery<AuthorDto>;

/// <summary>
/// Authenticated user read model.
/// </summary>
public sealed record UserDto(
    Guid UserId,
    string Mobile,
    string? Email,
    string FirstName,
    string LastName,
    string Username,
    string? Bio,
    string? AvatarUrl,
    string Role,
    string Status,
    DateTimeOffset CreatedAt,
    DateTimeOffset? LastLoginAt);

/// <summary>
/// Public author profile read model.
/// </summary>
public sealed record AuthorDto(
    Guid UserId,
    string Username,
    string DisplayName,
    string? Bio,
    string? AvatarUrl,
    DateTimeOffset MemberSince);

/// <summary>
/// Access and refresh tokens returned after authentication.
/// </summary>
public sealed record AuthResultDto(
    string AccessToken,
    string RefreshToken,
    DateTimeOffset AccessTokenExpiresAt,
    UserDto User);
