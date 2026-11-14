using System.Security.Claims;
using System.Text;
using Hani.Modules.Identity.Application;
using Hani.Modules.Identity.Application.Abstractions;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.JsonWebTokens;
using Microsoft.IdentityModel.Tokens;

namespace Hani.Modules.Identity.Infrastructure.Security;

internal sealed class ChannelTokenService(IOptions<JwtOptions> options) : IChannelTokenService
{
    public ChannelAccessToken CreateAccessToken(
        Guid agencyId,
        Guid apiClientId,
        IReadOnlyList<string> scopes,
        DateTimeOffset now)
    {
        var configuration = options.Value;

        if (string.IsNullOrWhiteSpace(configuration.SigningKey) ||
            Encoding.UTF8.GetByteCount(configuration.SigningKey) < 32)
        {
            throw new InvalidOperationException(
                "Jwt:SigningKey must be configured with at least 32 bytes.");
        }

        var expiresAt = now.AddMinutes(configuration.AccessTokenMinutes);
        var claims = new List<Claim>
        {
            new("agency_id", agencyId.ToString()),
            new("api_client_id", apiClientId.ToString()),
            new("client_type", "channel")
        };
        claims.AddRange(scopes.Select(scope => new Claim("scope", scope)));

        var key = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(configuration.SigningKey));
        var descriptor = new SecurityTokenDescriptor
        {
            Issuer = configuration.Issuer,
            Audience = configuration.Audience,
            Subject = new ClaimsIdentity(claims),
            Expires = expiresAt.UtcDateTime,
            SigningCredentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256)
        };

        var token = new JsonWebTokenHandler().CreateToken(descriptor);
        return new ChannelAccessToken(token, expiresAt, scopes);
    }
}
