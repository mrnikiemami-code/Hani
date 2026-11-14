using Hani.BuildingBlocks.Application;
using Hani.Modules.Content.Application.Abstractions;

namespace Hani.Modules.Content.Application.Queries.Growth;

internal sealed class GetAnalyticsSummaryQueryHandler(IContentRepository repository)
    : IQueryHandler<GetAnalyticsSummaryQuery, AnalyticsSummaryDto>
{
    public async Task<Result<AnalyticsSummaryDto>> Handle(
        GetAnalyticsSummaryQuery request,
        CancellationToken cancellationToken)
    {
        var from = request.From?.ToUniversalTime();
        var to = request.To?.ToUniversalTime();
        var total = await repository.CountAnalyticsAsync(
            request.EventName,
            from,
            to,
            cancellationToken);
        var breakdown = await repository.GroupAnalyticsByEntityTypeAsync(
            request.EventName,
            from,
            to,
            cancellationToken);

        return Result<AnalyticsSummaryDto>.Success(new AnalyticsSummaryDto(
            total,
            breakdown.Select(item => new AnalyticsBreakdownDto(item.EntityType, item.Count)).ToArray()));
    }
}
