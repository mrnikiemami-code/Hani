using Hani.BuildingBlocks.Application;
using Hani.Modules.Admin.Application;
using Hani.Modules.Supply.Application.Commands.ApproveAgencyOffer;
using Hani.Modules.Supply.Application.Commands.RejectAgencyOffer;
using Hani.Modules.Supply.Domain.AgencyOffers;
using Microsoft.EntityFrameworkCore;

namespace Hani.Modules.Admin.Infrastructure;

internal sealed partial class AdminService : IAdminSupplierService
{
    public async Task<AdminSupplierOfferPageDto> ListOffersAsync(
        int page,
        int pageSize,
        string? q,
        string? status,
        CancellationToken cancellationToken)
    {
        var normalizedPage = page <= 0 ? 1 : page;
        var normalizedPageSize = pageSize is <= 0 or > 100 ? 20 : pageSize;
        var query = supply.AgencyOffers.AsNoTracking();
        if (!string.IsNullOrWhiteSpace(q))
        {
            var term = q.Trim();
            query = query.Where(item =>
                item.ExternalId.Contains(term) ||
                item.Title.Contains(term));
        }

        if (!string.IsNullOrWhiteSpace(status) &&
            Enum.TryParse<AgencyOfferStatus>(status, true, out var parsedStatus))
        {
            query = query.Where(item => item.Status == parsedStatus);
        }

        var total = await query.CountAsync(cancellationToken);
        var rows = await query
            .OrderByDescending(item => item.UpdatedAt)
            .Skip((normalizedPage - 1) * normalizedPageSize)
            .Take(normalizedPageSize)
            .ToArrayAsync(cancellationToken);
        var agencyIds = rows.Select(item => item.AgencyId).Distinct().ToArray();
        var agencyNames = await identity.Agencies
            .AsNoTracking()
            .Where(item => agencyIds.Contains(item.Id))
            .Select(item => new { item.Id, item.Name })
            .ToDictionaryAsync(item => item.Id, item => item.Name, cancellationToken);

        var items = rows.Select(item => new AdminSupplierOfferDto(
            item.Id,
            item.AgencyId,
            agencyNames.GetValueOrDefault(item.AgencyId, item.AgencyId.ToString()),
            item.ExternalId,
            item.Title,
            item.Status.ToString(),
            item.BookingMode.ToString(),
            item.CollectionMode.ToString(),
            item.BasePrice.Amount,
            item.BasePrice.Currency,
            item.CreatedAt,
            item.UpdatedAt)).ToArray();

        return new AdminSupplierOfferPageDto(items, normalizedPage, normalizedPageSize, total);
    }

    public Task<Result<bool>> ApproveAsync(Guid offerId, CancellationToken cancellationToken)
        => sender.Send(new ApproveAgencyOfferCommand(offerId), cancellationToken);

    public Task<Result<bool>> RejectAsync(
        Guid offerId,
        string reason,
        CancellationToken cancellationToken)
        => sender.Send(new RejectAgencyOfferCommand(offerId, reason), cancellationToken);
}
