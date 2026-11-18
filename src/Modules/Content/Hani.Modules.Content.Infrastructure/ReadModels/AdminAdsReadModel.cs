using Hani.Modules.Content.Application.Queries.AdminAds;
using Hani.Modules.Content.Domain.Growth;
using Hani.Modules.Content.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Hani.Modules.Content.Infrastructure.ReadModels;

/// <summary>
/// EF Core implementation of the admin advertising read side. Query semantics
/// stay in Infrastructure; the HTTP layer only sends an application query.
/// </summary>
internal sealed class AdminAdsReadModel(ContentDbContext content) : IAdminAdsReadModel
{
    public async Task<IReadOnlyList<AdminAdSlotDto>> ListAsync(
        CancellationToken cancellationToken)
    {
        var slots = await content.AdSlots
            .AsNoTracking()
            .Include(item => item.Creatives)
            .OrderBy(item => item.Code)
            .ToArrayAsync(cancellationToken);
        var eventRows = await content.AdEvents
            .AsNoTracking()
            .GroupBy(item => new { item.CreativeId, item.Type })
            .Select(group => new
            {
                group.Key.CreativeId,
                group.Key.Type,
                Count = group.Count()
            })
            .ToArrayAsync(cancellationToken);
        var impressions = eventRows
            .Where(row => row.Type == AdEventType.Impression)
            .ToDictionary(row => row.CreativeId, row => row.Count);
        var clicks = eventRows
            .Where(row => row.Type == AdEventType.Click)
            .ToDictionary(row => row.CreativeId, row => row.Count);

        return slots.Select(slot => new AdminAdSlotDto(
            slot.Id,
            slot.Code,
            slot.Name,
            slot.IsActive,
            slot.CreatedAt,
            slot.Creatives
                .OrderBy(creative => creative.Title)
                .Select(creative => new AdminAdCreativeDto(
                    creative.Id,
                    creative.Title,
                    creative.ImageUrl,
                    creative.TargetUrl,
                    creative.StartsAt,
                    creative.EndsAt,
                    creative.IsActive,
                    impressions.GetValueOrDefault(creative.Id),
                    clicks.GetValueOrDefault(creative.Id)))
                .ToArray()))
            .ToArray();
    }
}
