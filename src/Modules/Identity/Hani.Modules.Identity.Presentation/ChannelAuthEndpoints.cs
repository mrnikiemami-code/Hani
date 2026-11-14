using Hani.BuildingBlocks.AspNetCore;
using Hani.Modules.Identity.Application.Abstractions;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using IResult = Microsoft.AspNetCore.Http.IResult;

namespace Hani.Modules.Identity.Presentation;

/// <summary>
/// OAuth2 client-credentials endpoint for Channel API clients.
/// </summary>
public static class ChannelAuthEndpoints
{
    /// <summary>
    /// Maps the OAuth token endpoint.
    /// </summary>
    public static IEndpointRouteBuilder MapChannelAuthEndpoints(this IEndpointRouteBuilder app)
    {
        app.MapPost("/oauth/token", IssueTokenAsync)
            .WithTags("Channel.Auth")
            .AllowAnonymous()
            .WithName("Channel.IssueToken");
        return app;
    }

    /// <summary>
    /// Issues a channel access token after client credential validation.
    /// </summary>
    private static async Task<IResult> IssueTokenAsync(
        HttpContext context,
        IApiKeyValidator validator,
        IChannelTokenService tokens,
        CancellationToken cancellationToken)
    {
        var form = await context.Request.ReadFormAsync(cancellationToken);
        var grantType = form["grant_type"].ToString();
        var clientId = form["client_id"].ToString();
        var clientSecret = form["client_secret"].ToString();
        var requestedScope = form["scope"].ToString();

        if (!string.Equals(grantType, "client_credentials", StringComparison.Ordinal) ||
            string.IsNullOrWhiteSpace(clientId) ||
            string.IsNullOrWhiteSpace(clientSecret))
        {
            return context.ToProblem(
                Hani.BuildingBlocks.Application.Error.Validation(
                    "HANI-CHANNEL-1001",
                    "grant_type=client_credentials, client_id, and client_secret are required."));
        }

        var client = await validator.ValidateAsync(clientId, clientSecret, cancellationToken);

        if (client is null)
        {
            return context.ToProblem(
                Hani.BuildingBlocks.Application.Error.Unauthorized(
                    "HANI-CHANNEL-1002",
                    "Client credentials are invalid."));
        }

        var channelScopes = client.Scopes
            .Where(scope => scope.StartsWith("channel.", StringComparison.OrdinalIgnoreCase))
            .ToArray();

        if (channelScopes.Length == 0)
        {
            return context.ToProblem(
                Hani.BuildingBlocks.Application.Error.Unauthorized(
                    "HANI-CHANNEL-1003",
                    "Client has no channel scopes."));
        }

        var scopes = string.IsNullOrWhiteSpace(requestedScope)
            ? channelScopes
            : requestedScope
                .Split(' ', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries)
                .Distinct(StringComparer.OrdinalIgnoreCase)
                .ToArray();

        if (scopes.Any(scope => !channelScopes.Contains(scope, StringComparer.OrdinalIgnoreCase)))
        {
            return context.ToProblem(
                Hani.BuildingBlocks.Application.Error.Validation(
                    "HANI-CHANNEL-1004",
                    "Requested scope is not granted to this client."));
        }

        var accessToken = tokens.CreateAccessToken(
            client.AgencyId,
            client.ApiClientId,
            scopes,
            DateTimeOffset.UtcNow);

        return Results.Ok(new
        {
            access_token = accessToken.AccessToken,
            token_type = "Bearer",
            expires_in = Math.Max(
                0,
                (int)(accessToken.ExpiresAt - DateTimeOffset.UtcNow).TotalSeconds),
            scope = string.Join(' ', accessToken.Scopes)
        });
    }
}
