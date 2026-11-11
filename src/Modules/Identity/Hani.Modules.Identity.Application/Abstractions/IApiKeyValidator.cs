namespace Hani.Modules.Identity.Application.Abstractions;

/// <summary>
/// Successful API key validation result with agency and scopes.
/// </summary>
public sealed record ApiKeyValidationResult(
    Guid AgencyId,
    Guid ApiClientId,
    IReadOnlyList<string> Scopes);

/// <summary>
/// Validates machine credentials and returns the owning agency.
/// </summary>
public interface IApiKeyValidator
{
    /// <summary>
    /// Returns <c>null</c> when the client is missing, revoked, or the secret is invalid.
    /// </summary>
    Task<ApiKeyValidationResult?> ValidateAsync(
        string clientId,
        string secret,
        CancellationToken cancellationToken = default);
}
