using Hani.BuildingBlocks.Application;

namespace Hani.Modules.Content.Application.Queries.AdminAds;

internal sealed class ListAdminAdSlotsQueryHandler(IAdminAdsReadModel readModel)
    : IQueryHandler<ListAdminAdSlotsQuery, IReadOnlyList<AdminAdSlotDto>>
{
    public async Task<Result<IReadOnlyList<AdminAdSlotDto>>> Handle(
        ListAdminAdSlotsQuery request,
        CancellationToken cancellationToken)
    {
        var slots = await readModel.ListAsync(cancellationToken);
        return Result<IReadOnlyList<AdminAdSlotDto>>.Success(slots);
    }
}
