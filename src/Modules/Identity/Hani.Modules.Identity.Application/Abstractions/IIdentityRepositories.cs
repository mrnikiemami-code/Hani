using Hani.Modules.Identity.Domain.Agencies;
using Hani.Modules.Identity.Domain.ApiClients;

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
