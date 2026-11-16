using Hani.Modules.Identity.Domain.Agencies;
using Hani.Modules.Identity.Domain.ApiClients;
using Hani.Modules.Identity.Domain.Users;
using Hani.Modules.Identity.Domain.Wishlists;

namespace Hani.Modules.Identity.Application.Abstractions;

/// <summary>
/// Persistence abstraction for agencies.
/// </summary>
public interface IAgencyRepository
{
    /// <summary>
    /// Adds an agency and saves changes.
    /// </summary>
    Task AddAsync(Agency agency, CancellationToken cancellationToken);

    /// <summary>
    /// Returns an agency by id, or <c>null</c>.
    /// </summary>
    Task<Agency?> GetByIdAsync(Guid id, CancellationToken cancellationToken);

    /// <summary>
    /// Returns the agency owned by a user, or <c>null</c>.
    /// </summary>
    Task<Agency?> GetByOwnerUserIdAsync(Guid userId, CancellationToken cancellationToken);

    /// <summary>
    /// Returns an agency by public slug, or <c>null</c>.
    /// </summary>
    Task<Agency?> GetBySlugAsync(string slug, CancellationToken cancellationToken);

    /// <summary>
    /// Lists agencies, optionally filtered by status.
    /// </summary>
    Task<IReadOnlyList<Agency>> ListAsync(
        AgencyStatus? status,
        CancellationToken cancellationToken);

    /// <summary>
    /// Searches active agencies for the public directory.
    /// </summary>
    Task<(IReadOnlyList<Agency> Items, int Total)> SearchPublicAsync(
        string? city,
        string? province,
        string? query,
        int skip,
        int take,
        CancellationToken cancellationToken);

    /// <summary>
    /// Persists pending changes.
    /// </summary>
    Task SaveChangesAsync(CancellationToken cancellationToken);

    /// <summary>
    /// Checks whether a slug is already used.
    /// </summary>
    Task<bool> SlugExistsAsync(string slug, CancellationToken cancellationToken);
}

/// <summary>
/// Persistence abstraction for API clients.
/// </summary>
public interface IApiClientRepository
{
    /// <summary>
    /// Adds an API client and saves changes.
    /// </summary>
    Task AddAsync(ApiClient apiClient, CancellationToken cancellationToken);
}

/// <summary>
/// Generates client ids and secrets for API clients.
/// </summary>
public interface ISecretGenerator
{
    /// <summary>
    /// Generates a stable-looking client id scoped to the agency.
    /// </summary>
    string GenerateClientId(Guid agencyId);

    /// <summary>
    /// Generates a high-entropy secret that is shown only once.
    /// </summary>
    string GenerateSecret();
}

/// <summary>
/// Hashes API client secrets before persistence.
/// </summary>
public interface ISecretHasher
{
    /// <summary>
    /// Returns a deterministic hash for constant-time comparison.
    /// </summary>
    string Hash(string secret);
}

/// <summary>
/// Persistence abstraction for marketplace users.
/// </summary>
public interface IUserRepository
{
    /// <summary>
    /// Adds a user and saves changes.
    /// </summary>
    Task AddAsync(User user, CancellationToken cancellationToken);

    /// <summary>
    /// Persists pending changes.
    /// </summary>
    Task SaveChangesAsync(CancellationToken cancellationToken);

    /// <summary>
    /// Returns a user by id, or <c>null</c>.
    /// </summary>
    Task<User?> GetByIdAsync(Guid id, CancellationToken cancellationToken);

    /// <summary>
    /// Returns a user by normalized mobile, or <c>null</c>.
    /// </summary>
    Task<User?> GetByMobileAsync(string mobile, CancellationToken cancellationToken);

    /// <summary>
    /// Returns a user by public username, or <c>null</c>.
    /// </summary>
    Task<User?> GetByUsernameAsync(string username, CancellationToken cancellationToken);

    /// <summary>
    /// Returns a user owning an active refresh-token hash, or <c>null</c>.
    /// </summary>
    Task<User?> GetByRefreshTokenHashAsync(string tokenHash, CancellationToken cancellationToken);

    /// <summary>
    /// Checks whether a username is already used.
    /// </summary>
    Task<bool> UsernameExistsAsync(string username, CancellationToken cancellationToken);
}

/// <summary>
/// Persistence abstraction for user wishlists.
/// </summary>
public interface IWishlistRepository
{
    /// <summary>Lists saved items for one user, newest first.</summary>
    Task<IReadOnlyList<WishlistItem>> ListByUserAsync(
        Guid userId,
        CancellationToken cancellationToken);

    /// <summary>Returns whether a product is already saved by the user.</summary>
    Task<bool> ExistsAsync(Guid userId, Guid productId, CancellationToken cancellationToken);

    /// <summary>Adds a saved item.</summary>
    Task AddAsync(WishlistItem item, CancellationToken cancellationToken);

    /// <summary>Removes a saved item if present.</summary>
    Task RemoveAsync(Guid userId, Guid productId, CancellationToken cancellationToken);
}

/// <summary>
/// Persistence abstraction for authenticated user preferences.
/// </summary>
public interface IUserPreferencesRepository
{
    /// <summary>
    /// Returns preferences for one user, or <c>null</c>.
    /// </summary>
    Task<UserPreferences?> GetByUserIdAsync(Guid userId, CancellationToken cancellationToken);

    /// <summary>
    /// Inserts or updates the preference row and saves changes.
    /// </summary>
    Task SaveAsync(UserPreferences preferences, CancellationToken cancellationToken);
}

/// <summary>
/// Generates numeric OTP codes.
/// </summary>
public interface IOtpCodeGenerator
{
    /// <summary>
    /// Generates a cryptographically random OTP.
    /// </summary>
    string Generate();
}

/// <summary>
/// Hashes OTP and refresh tokens before persistence.
/// </summary>
public interface IOtpCodeHasher
{
    /// <summary>
    /// Returns a deterministic hash for constant-time comparison.
    /// </summary>
    string Hash(string value);
}

/// <summary>
/// Delivers OTP codes to users.
/// </summary>
public interface IOtpSender
{
    /// <summary>
    /// Sends the OTP to the user mobile.
    /// </summary>
    Task SendAsync(string mobile, string code, CancellationToken cancellationToken);
}

/// <summary>
/// Access token returned by the identity token service.
/// </summary>
public sealed record JwtAccessToken(string Token, DateTimeOffset ExpiresAt);

/// <summary>
/// Issues JWT access tokens and opaque refresh tokens.
/// </summary>
public interface IJwtTokenService
{
    /// <summary>
    /// Creates a signed JWT for the user.
    /// </summary>
    JwtAccessToken CreateAccessToken(User user, DateTimeOffset now);

    /// <summary>
    /// Creates a high-entropy opaque refresh token.
    /// </summary>
    string CreateRefreshToken();
}

