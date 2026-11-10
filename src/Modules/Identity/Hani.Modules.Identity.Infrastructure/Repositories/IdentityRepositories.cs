using Hani.Modules.Identity.Application.Abstractions;
using Hani.Modules.Identity.Domain.Agencies;
using Hani.Modules.Identity.Domain.ApiClients;
using Hani.Modules.Identity.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Hani.Modules.Identity.Infrastructure.Repositories;

internal sealed class AgencyRepository(IdentityDbContext dbContext) : IAgencyRepository
{
    public async Task AddAsync(Agency agency, CancellationToken cancellationToken)
    {
        await dbContext.Agencies.AddAsync(agency, cancellationToken);
        await dbContext.SaveChangesAsync(cancellationToken);
    }

    public Task<Agency?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
        => dbContext.Agencies.FirstOrDefaultAsync(agency => agency.Id == id, cancellationToken);

    public Task<bool> SlugExistsAsync(string slug, CancellationToken cancellationToken)
        => dbContext.Agencies.AnyAsync(agency => agency.Slug == slug, cancellationToken);
}

internal sealed class ApiClientRepository(IdentityDbContext dbContext) : IApiClientRepository
{
    public async Task AddAsync(ApiClient apiClient, CancellationToken cancellationToken)
    {
        await dbContext.ApiClients.AddAsync(apiClient, cancellationToken);
        await dbContext.SaveChangesAsync(cancellationToken);
    }
}
