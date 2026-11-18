using Hani.BuildingBlocks.Application;

namespace Hani.Modules.Content.Application.Queries.AdminAds;

/// <summary>
/// Admin ad-slot read query.
/// </summary>
public sealed record ListAdminAdSlotsQuery : IQuery<IReadOnlyList<AdminAdSlotDto>>;

/// <summary>Admin ad slot read model.</summary>
public sealed record AdminAdSlotDto(
    Guid Id,
    string Code,
    string Name,
    bool IsActive,
    DateTimeOffset CreatedAt,
    IReadOnlyList<AdminAdCreativeDto> Creatives);

/// <summary>Admin ad creative read model with delivery counters.</summary>
public sealed record AdminAdCreativeDto(
    Guid Id,
    string Title,
    string ImageUrl,
    string TargetUrl,
    DateTimeOffset? StartsAt,
    DateTimeOffset? EndsAt,
    bool IsActive,
    int Impressions,
    int Clicks);

/// <summary>Application port for the admin advertising read side.</summary>
public interface IAdminAdsReadModel
{
    /// <summary>Returns every ad slot with its creatives and counters.</summary>
    Task<IReadOnlyList<AdminAdSlotDto>> ListAsync(CancellationToken cancellationToken);
}
