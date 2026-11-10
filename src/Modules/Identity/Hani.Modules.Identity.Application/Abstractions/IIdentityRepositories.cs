using Hani.Modules.Identity.Domain.Agencies;
using Hani.Modules.Identity.Domain.ApiClients;

namespace Hani.Modules.Identity.Application.Abstractions;

public interface IAgencyRepository
{
    Task AddAsync(Agency agency, CancellationToken cancellationToken);

    Task<Agency?> GetByIdAsync(Guid id, CancellationToken cancellationToken);

    Task<bool> SlugExistsAsync(string slug, CancellationToken cancellationToken);
}

public interface IApiClientRepository
{
    Task AddAsync(ApiClient apiClient, CancellationToken cancellationToken);
}

public interface ISecretGenerator
{
    string GenerateClientId(Guid agencyId);

    string GenerateSecret();
}

public interface ISecretHasher
{
    string Hash(string secret);
}
