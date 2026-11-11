using System.Security.Claims;
using System.Text.Encodings.Web;
using Hani.Modules.Identity.Application.Abstractions;
using Microsoft.AspNetCore.Authentication;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace Hani.Modules.Identity.Presentation;

/// <summary>
/// ASP.NET Core authentication handler for X-Api-Key/X-Api-Secret.
/// </summary>
public sealed class ApiKeyAuthenticationHandler(
    IOptionsMonitor<AuthenticationSchemeOptions> options,
    ILoggerFactory logger,
    UrlEncoder encoder)
    : AuthenticationHandler<AuthenticationSchemeOptions>(options, logger, encoder)
{
    public const string SchemeName = "ApiKey";

    protected override async Task<AuthenticateResult> HandleAuthenticateAsync()
    {
        if (!Request.Headers.TryGetValue("X-Api-Key", out var clientId) ||
            !Request.Headers.TryGetValue("X-Api-Secret", out var secret) ||
            string.IsNullOrWhiteSpace(clientId) ||
            string.IsNullOrWhiteSpace(secret))
        {
            return AuthenticateResult.NoResult();
        }

        var validator = Context.RequestServices.GetRequiredService<IApiKeyValidator>();

        var result = await validator.ValidateAsync(
            clientId.ToString(),
            secret.ToString(),
            Context.RequestAborted);

        if (result is null)
        {
            return AuthenticateResult.Fail("Invalid API key.");
        }

        var claims = new List<Claim>
        {
            new("agency_id", result.AgencyId.ToString()),
            new("api_client_id", result.ApiClientId.ToString())
        };

        claims.AddRange(result.Scopes.Select(scope => new Claim("scope", scope)));

        var identity = new ClaimsIdentity(claims, SchemeName);
        var principal = new ClaimsPrincipal(identity);
        var ticket = new AuthenticationTicket(principal, SchemeName);

        return AuthenticateResult.Success(ticket);
    }
}
