using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using Hani.Modules.Identity.Application;
using Hani.Modules.Identity.Application.Abstractions;
using Hani.Modules.Identity.Domain.Users;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.JsonWebTokens;
using Microsoft.IdentityModel.Tokens;

namespace Hani.Modules.Identity.Infrastructure.Security;

/// <summary>
/// Issues signed JWT access tokens and opaque refresh tokens.
/// </summary>
internal sealed class JwtTokenService(IOptions<JwtOptions> options) : IJwtTokenService
{
    public JwtAccessToken CreateAccessToken(User user, DateTimeOffset now)
    {
        var configuration = options.Value;

        if (string.IsNullOrWhiteSpace(configuration.SigningKey) ||
            Encoding.UTF8.GetByteCount(configuration.SigningKey) < 32)
        {
            throw new InvalidOperationException(
                "Jwt:SigningKey must be configured with at least 32 bytes.");
        }

        var expiresAt = now.AddMinutes(configuration.AccessTokenMinutes);
        var claims = new[]
        {
            new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
            new Claim(JwtRegisteredClaimNames.UniqueName, user.Username),
            new Claim(ClaimTypes.Name, user.DisplayName),
            new Claim(ClaimTypes.Role, user.Role.ToString()),
            new Claim("user_id", user.Id.ToString())
        };

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
        return new JwtAccessToken(token, expiresAt);
    }

    public string CreateRefreshToken()
        => Base64UrlEncoder.Encode(RandomNumberGenerator.GetBytes(64));
}
