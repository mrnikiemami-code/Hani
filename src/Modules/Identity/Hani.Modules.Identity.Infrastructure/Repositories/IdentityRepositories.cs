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
        => dbContext.Agencies
            .Include(agency => agency.Documents)
            .FirstOrDefaultAsync(agency => agency.Id == id, cancellationToken);

    public Task<Agency?> GetByOwnerUserIdAsync(Guid userId, CancellationToken cancellationToken)
        => dbContext.Agencies
            .Include(agency => agency.Documents)
            .FirstOrDefaultAsync(
                agency => agency.OwnerUserId == userId,
                cancellationToken);

    public Task<Agency?> GetBySlugAsync(string slug, CancellationToken cancellationToken)
        => dbContext.Agencies
            .AsNoTracking()
            .AsSplitQuery()
            .Include(agency => agency.Documents)
            .FirstOrDefaultAsync(agency => agency.Slug == slug, cancellationToken);

    public async Task<IReadOnlyList<Agency>> ListAsync(
        AgencyStatus? status,
        CancellationToken cancellationToken)
    {
        var query = dbContext.Agencies
            .AsNoTracking()
            .AsSplitQuery()
            .Include(agency => agency.Documents)
            .AsQueryable();

        if (status is not null)
        {
            query = query.Where(agency => agency.Status == status);
        }

        return await query
            .OrderByDescending(agency => agency.CreatedAt)
            .ToArrayAsync(cancellationToken);
    }

    public Task SaveChangesAsync(CancellationToken cancellationToken)
        => dbContext.SaveChangesAsync(cancellationToken);

    public async Task<(IReadOnlyList<Agency> Items, int Total)> SearchPublicAsync(
        string? city,
        string? province,
        string? query,
        int skip,
        int take,
        CancellationToken cancellationToken)
    {
        var source = dbContext.Agencies
            .AsNoTracking()
            .Where(agency => agency.Status == AgencyStatus.Active);

        if (!string.IsNullOrWhiteSpace(city))
        {
            var normalizedCity = city.Trim();
            source = source.Where(agency => agency.City == normalizedCity);
        }

        if (!string.IsNullOrWhiteSpace(province))
        {
            var normalizedProvince = province.Trim();
            source = source.Where(agency => agency.Province == normalizedProvince);
        }

        if (!string.IsNullOrWhiteSpace(query))
        {
            var term = query.Trim();
            source = source.Where(agency =>
                agency.Name.Contains(term) ||
                agency.Slug.Contains(term) ||
                agency.City.Contains(term));
        }

        var total = await source.CountAsync(cancellationToken);
        var items = await source
            .OrderByDescending(agency => agency.CreatedAt)
            .Skip(skip)
            .Take(take)
            .ToArrayAsync(cancellationToken);

        return (items, total);
    }

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
