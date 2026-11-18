using Hani.Modules.Admin.Application;
using Hani.Modules.Content.Domain.Growth;
using Microsoft.EntityFrameworkCore;

namespace Hani.Modules.Admin.Infrastructure;

internal sealed partial class AdminService : IAdminMarketingService
{
    public async Task<AdminCampaignPageDto> ListCampaignsAsync(
        int page,
        int pageSize,
        string? q,
        string? status,
        CancellationToken cancellationToken)
    {
        var normalizedPage = page <= 0 ? 1 : page;
        var normalizedPageSize = pageSize is <= 0 or > 100 ? 20 : pageSize;
        var query = content.Campaigns.AsNoTracking();
        if (!string.IsNullOrWhiteSpace(q))
        {
            var term = q.Trim();
            query = query.Where(item =>
                item.Slug.Contains(term) ||
                item.Translations.Any(translation => translation.Title.Contains(term)));
        }

        if (!string.IsNullOrWhiteSpace(status) &&
            Enum.TryParse<CampaignStatus>(status, true, out var parsed))
        {
            query = query.Where(item => item.Status == parsed);
        }

        var total = await query.CountAsync(cancellationToken);
        var items = await query
            .OrderByDescending(item => item.CreatedAt)
            .Skip((normalizedPage - 1) * normalizedPageSize)
            .Take(normalizedPageSize)
            .Select(item => new AdminCampaignDto(
                item.Id,
                item.Slug,
                item.Translations
                    .Where(translation => translation.Locale == languages.DefaultLanguage)
                    .Select(translation => translation.Title)
                    .FirstOrDefault() ??
                    item.Translations.Select(translation => translation.Title).FirstOrDefault() ??
                    item.Slug,
                item.Status.ToString(),
                item.StartsAt,
                item.EndsAt,
                item.Price,
                item.Currency,
                item.DiscountPercent,
                content.CampaignRegistrations.Count(registration =>
                    registration.CampaignId == item.Id),
                item.CreatedAt))
            .ToArrayAsync(cancellationToken);

        return new AdminCampaignPageDto(
            items,
            normalizedPage,
            normalizedPageSize,
            total);
    }
}
