using Hani.BuildingBlocks.Application;

namespace Hani.Modules.Admin.Application;

/// <summary>Admin tour row.</summary>
public sealed record AdminTourDto(
    Guid Id,
    string Slug,
    string Title,
    int DurationDays,
    string TourType,
    string Status,
    string Scope,
    string Category,
    int DestinationCount,
    DateTimeOffset CreatedAt);

/// <summary>Paged admin tours.</summary>
public sealed record AdminTourPageDto(
    IReadOnlyList<AdminTourDto> Items,
    int Page,
    int PageSize,
    int Total);

/// <summary>Localized tour creation input.</summary>
public sealed record AdminTourTranslationInput(
    string Locale,
    string Title,
    string Summary,
    string Description);

/// <summary>Tour creation input.</summary>
public sealed record AdminTourCreateInput(
    string Slug,
    int DurationDays,
    string TourType,
    string Scope,
    string Category,
    string TravelType,
    string? CoverImageUrl,
    IReadOnlyList<Guid> DestinationIds,
    IReadOnlyList<AdminTourTranslationInput> Translations);


/// <summary>Localized tour translation read model.</summary>
public sealed record AdminTourTranslationDto(
    string Locale,
    string Title,
    string Summary,
    string Description);

/// <summary>Admin tour detail for editing.</summary>
public sealed record AdminTourDetailDto(
    Guid Id,
    string Slug,
    int DurationDays,
    string TourType,
    string Scope,
    string Category,
    string TravelType,
    string? CoverImageUrl,
    string Status,
    IReadOnlyList<AdminTourTranslationDto> Translations);

/// <summary>Admin tour edit input.</summary>
public sealed record AdminTourUpdateInput(
    int DurationDays,
    string TourType,
    string Scope,
    string Category,
    string TravelType,
    string? CoverImageUrl,
    IReadOnlyList<AdminTourTranslationInput> Translations);

/// <summary>Admin tour service.</summary>
public interface IAdminTourService
{
    Task<AdminTourPageDto> ListToursAsync(
        int page,
        int pageSize,
        string? q,
        string? status,
        CancellationToken cancellationToken);
    Task<Result<Guid>> CreateAsync(
        AdminTourCreateInput input,
        CancellationToken cancellationToken);
    Task<AdminTourDetailDto?> GetTourAsync(Guid id, CancellationToken cancellationToken);
    Task<Result<bool>> UpdateTourAsync(
        Guid id,
        AdminTourUpdateInput input,
        CancellationToken cancellationToken);
    Task<Result<bool>> PublishTourAsync(Guid id, CancellationToken cancellationToken);
}
