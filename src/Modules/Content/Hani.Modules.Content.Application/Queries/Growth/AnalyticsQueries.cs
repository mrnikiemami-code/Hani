using Hani.BuildingBlocks.Application;

namespace Hani.Modules.Content.Application.Queries.Growth;

/// <summary>Read aggregated analytics counts.</summary>
public sealed record GetAnalyticsSummaryQuery(
    string? EventName = null,
    DateTimeOffset? From = null,
    DateTimeOffset? To = null) : IQuery<AnalyticsSummaryDto>;

/// <summary>Analytics summary read model.</summary>
public sealed record AnalyticsSummaryDto(
    int TotalCount,
    IReadOnlyList<AnalyticsBreakdownDto> Breakdown);

/// <summary>Analytics breakdown read model.</summary>
public sealed record AnalyticsBreakdownDto(string EntityType, int Count);
