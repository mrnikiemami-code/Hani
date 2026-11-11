namespace Hani.Modules.Identity.Application.Abstractions;

public sealed record ApiKeyValidationResult(
    Guid AgencyId,
    Guid ApiClientId,
    IReadOnlyList<string> Scopes);

public interface IApiKeyValidator
{
    Task<ApiKeyValidationResult?> ValidateAsync(
        string clientId,
        string secret,
        CancellationToken cancellationToken = default);
}
