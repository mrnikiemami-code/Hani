using System.Security.Cryptography;
using System.Text;
using Hani.Modules.Identity.Application.Abstractions;

namespace Hani.Modules.Identity.Infrastructure.Security;

internal sealed class SecretGenerator : ISecretGenerator
{
    public string GenerateClientId(Guid agencyId)
        => $"ag_{agencyId:N}_{Convert.ToHexString(RandomNumberGenerator.GetBytes(4)).ToLowerInvariant()}";

    public string GenerateSecret()
    {
        var bytes = RandomNumberGenerator.GetBytes(32);
        return Convert.ToBase64String(bytes)
            .Replace('+', '-')
            .Replace('/', '_')
            .TrimEnd('=');
    }
}

internal sealed class SecretHasher : ISecretHasher
{
    public string Hash(string secret)
        => Convert.ToHexString(SHA256.HashData(Encoding.UTF8.GetBytes(secret)));
}
