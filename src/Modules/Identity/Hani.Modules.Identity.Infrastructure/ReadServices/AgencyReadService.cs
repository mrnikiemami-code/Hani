using Hani.Contracts.Identity;
using Hani.Modules.Identity.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Hani.Modules.Identity.Infrastructure.ReadServices;

internal sealed class AgencyReadService(IdentityDbContext dbContext) : IAgencyReadService
{
    public async Task<IReadOnlyDictionary<Guid, string>> GetNamesAsync(
        IReadOnlyCollection<Guid> ids,
        CancellationToken cancellationToken)
    {
        if (ids.Count == 0)
        {
            return new Dictionary<Guid, string>();
        }

        return await dbContext.Agencies
            .AsNoTracking()
            .Where(agency => ids.Contains(agency.Id))
            .ToDictionaryAsync(
                agency => agency.Id,
                agency => agency.Name,
                cancellationToken);
    }

    public async Task<IReadOnlyList<Guid>> GetActiveAgencyIdsAsync(
        CancellationToken cancellationToken)
        => await dbContext.Agencies
            .AsNoTracking()
            .Where(agency => agency.Status == Hani.Modules.Identity.Domain.Agencies.AgencyStatus.Active)
            .OrderBy(agency => agency.Id)
            .Select(agency => agency.Id)
            .ToArrayAsync(cancellationToken);
}
