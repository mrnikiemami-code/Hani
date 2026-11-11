using System.Security.Cryptography;
using System.Text;
using Hani.Modules.Identity.Application.Abstractions;
using Hani.Modules.Identity.Domain.ApiClients;
using Hani.Modules.Identity.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Hani.Modules.Identity.Infrastructure.Security;

internal sealed class ApiKeyValidator(
    IdentityDbContext dbContext,
    ISecretHasher secretHasher) : IApiKeyValidator
{
    public async Task<ApiKeyValidationResult?> ValidateAsync(
        string clientId,
        string secret,
        CancellationToken cancellationToken = default)
    {
        var client = await dbContext.ApiClients
            .AsNoTracking()
            .FirstOrDefaultAsync(item => item.ClientId == clientId, cancellationToken);

        if (client is null || client.Status != ApiClientStatus.Active)
        {
            return null;
        }

        var hash = Encoding.UTF8.GetBytes(secretHasher.Hash(secret));
        var expected = Encoding.UTF8.GetBytes(client.SecretHash);

        if (hash.Length != expected.Length ||
            !CryptographicOperations.FixedTimeEquals(hash, expected))
        {
            return null;
        }

        var scopes = client.Scopes
            .Split(' ', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries);

        return new ApiKeyValidationResult(client.AgencyId, client.Id, scopes);
    }
}
