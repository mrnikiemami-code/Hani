namespace Hani.Modules.Admin.Application;

/// <summary>Admin campaign row.</summary>
public sealed record AdminCampaignDto(
    Guid Id,
    string Slug,
    string Title,
    string Status,
    DateTimeOffset StartsAt,
    DateTimeOffset EndsAt,
    decimal? Price,
    string? Currency,
    decimal? DiscountPercent,
    int Registrations,
    DateTimeOffset CreatedAt);

/// <summary>Paged admin campaign response.</summary>
public sealed record AdminCampaignPageDto(
    IReadOnlyList<AdminCampaignDto> Items,
    int Page,
    int PageSize,
    int Total);

/// <summary>Created campaign identity.</summary>
public sealed record AdminCampaignCreatedDto(Guid Id, string Slug);

/// <summary>Admin marketing query service.</summary>
public interface IAdminMarketingService
{
    /// <summary>Lists campaigns for the admin panel.</summary>
    Task<AdminCampaignPageDto> ListCampaignsAsync(
        int page,
        int pageSize,
        string? q,
        string? status,
        CancellationToken cancellationToken);
}
