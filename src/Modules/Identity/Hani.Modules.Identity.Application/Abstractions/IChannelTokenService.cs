namespace Hani.Modules.Identity.Application.Abstractions;

/// <summary>
/// Issues short-lived OAuth access tokens for Channel API clients.
/// </summary>
public interface IChannelTokenService
{
    /// <summary>
    /// Creates a JWT with agency, client, and scope claims.
    /// </summary>
    ChannelAccessToken CreateAccessToken(
        Guid agencyId,
        Guid apiClientId,
        IReadOnlyList<string> scopes,
        DateTimeOffset now);
}

/// <summary>
/// Channel access token response.
/// </summary>
public sealed record ChannelAccessToken(
    string AccessToken,
    DateTimeOffset ExpiresAt,
    IReadOnlyList<string> Scopes);
