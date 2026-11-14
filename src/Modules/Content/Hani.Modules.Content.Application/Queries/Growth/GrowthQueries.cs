using Hani.BuildingBlocks.Application;

namespace Hani.Modules.Content.Application.Queries.Growth;

/// <summary>Read active creatives for an ad slot.</summary>
public sealed record GetAdSlotQuery(string Code) : IQuery<AdSlotDto>;

/// <summary>List active campaigns.</summary>
public sealed record ListCampaignsQuery(int Page = 1, int PageSize = 20)
    : IQuery<PagedResult<CampaignSummaryDto>>;

/// <summary>Read one campaign.</summary>
public sealed record GetCampaignQuery(string Slug, string? Locale = null) : IQuery<CampaignDetailDto>;

/// <summary>Ad slot read model.</summary>
public sealed record AdSlotDto(string Code, string Name, IReadOnlyList<AdCreativeDto> Creatives);

/// <summary>Ad creative read model.</summary>
public sealed record AdCreativeDto(
    Guid CreativeId,
    string Title,
    string ImageUrl,
    string TargetUrl,
    DateTimeOffset? StartsAt,
    DateTimeOffset? EndsAt);

/// <summary>Campaign summary read model.</summary>
public sealed record CampaignSummaryDto(
    Guid CampaignId,
    string Slug,
    string Title,
    string Description,
    DateTimeOffset StartsAt,
    DateTimeOffset EndsAt,
    decimal? Price,
    string? Currency,
    decimal? DiscountPercent);

/// <summary>Campaign detail read model.</summary>
public sealed record CampaignDetailDto(
    Guid CampaignId,
    string Slug,
    string Locale,
    string Title,
    string Description,
    DateTimeOffset StartsAt,
    DateTimeOffset EndsAt,
    decimal? Price,
    string? Currency,
    decimal? DiscountPercent,
    Guid? DestinationId,
    IReadOnlyList<CampaignFaqDto> Faqs);

/// <summary>Campaign FAQ read model.</summary>
public sealed record CampaignFaqDto(string Question, string Answer);
