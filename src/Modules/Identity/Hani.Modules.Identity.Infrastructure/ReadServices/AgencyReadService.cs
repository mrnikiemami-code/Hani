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
}
