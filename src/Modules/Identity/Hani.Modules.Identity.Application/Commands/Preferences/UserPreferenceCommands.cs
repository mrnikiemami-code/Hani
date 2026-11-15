using Hani.BuildingBlocks.Application;

namespace Hani.Modules.Identity.Application.Commands.Preferences;

/// <summary>
/// Query that returns the authenticated user's preferences, filling server
/// defaults when no row exists.
/// </summary>
public sealed record GetUserPreferencesQuery(Guid UserId) : IQuery<UserPreferencesDto>;

/// <summary>
/// Replaces authenticated user preferences with normalized values.
/// </summary>
public sealed record UpdateUserPreferencesCommand(
    Guid UserId,
    string? HomeExperienceId,
    string? Locale,
    string? Currency,
    string? Theme,
    bool ReducedMotion) : ICommand<UserPreferencesDto>;

/// <summary>
/// Authenticated user preferences read model.
/// </summary>
public sealed record UserPreferencesDto(
    Guid UserId,
    string HomeExperienceId,
    string Locale,
    string Currency,
    string Theme,
    bool ReducedMotion,
    DateTimeOffset? UpdatedAt);
