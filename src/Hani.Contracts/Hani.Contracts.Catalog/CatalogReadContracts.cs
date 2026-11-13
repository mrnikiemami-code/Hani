namespace Hani.Contracts.Catalog;

/// <summary>
/// Filter used by marketplace faceted search.
/// </summary>
public sealed record CatalogProductFilter(
    string? DestinationSlug = null,
    string? OriginSlug = null,
    int? MinDuration = null,
    int? MaxDuration = null,
    string? TourType = null,
    string? Difficulty = null,
    string? VehicleType = null,
    string? AccommodationType = null,
    string? SearchTerm = null);

/// <summary>
/// Minimal published product projection used by marketplace reads.
/// </summary>
public sealed record CatalogProductSummary(
    Guid Id,
    string Slug,
    int DurationDays,
    string TourType,
    IReadOnlyDictionary<string, string> Titles,
    IReadOnlyList<Guid> DestinationIds,
    DateTimeOffset UpdatedAt,
    Guid? OriginDestinationId = null,
    string Difficulty = "",
    string VehicleType = "",
    string LocalVehicleType = "",
    string AccommodationType = "");

/// <summary>
/// Published product details with localized marketing content.
/// </summary>
public sealed record CatalogProductDetails(
    Guid Id,
    string Slug,
    int DurationDays,
    string TourType,
    IReadOnlyDictionary<string, string> Titles,
    IReadOnlyDictionary<string, string> Summaries,
    IReadOnlyDictionary<string, string> Descriptions,
    IReadOnlyList<Guid> DestinationIds,
    Guid? OriginDestinationId = null,
    string Difficulty = "",
    string VehicleType = "",
    string LocalVehicleType = "",
    string AccommodationType = "",
    IReadOnlyDictionary<string, string>? SeoTitles = null,
    IReadOnlyDictionary<string, string>? SeoDescriptions = null);

/// <summary>
/// Destination projection used by SEO breadcrumbs and landing pages.
/// </summary>
public sealed record CatalogDestinationSnapshot(
    Guid Id,
    string Slug,
    string Type,
    Guid? ParentId,
    IReadOnlyDictionary<string, string> Names);

/// <summary>
/// Read-side contract exposed by the Catalog module.
/// </summary>
public interface ICatalogReadService
{
    /// <summary>
    /// Returns published products matching the supplied structural filters.
    /// </summary>
    Task<IReadOnlyList<CatalogProductSummary>> SearchPublishedAsync(
        CatalogProductFilter filter,
        int skip,
        int take,
        CancellationToken cancellationToken);

    /// <summary>
    /// Counts published products using the same filter as <see cref="SearchPublishedAsync"/>.
    /// </summary>
    Task<int> CountPublishedAsync(
        CatalogProductFilter filter,
        CancellationToken cancellationToken);

    /// <summary>
    /// Returns one published product with all translations, or <c>null</c>.
    /// </summary>
    Task<CatalogProductDetails?> GetPublishedByIdAsync(
        Guid id,
        CancellationToken cancellationToken);

    /// <summary>
    /// Returns destination projections for the requested ids.
    /// </summary>
    Task<IReadOnlyList<CatalogDestinationSnapshot>> GetDestinationsAsync(
        IReadOnlyCollection<Guid> ids,
        CancellationToken cancellationToken);

    /// <summary>
    /// Returns one destination by slug, or <c>null</c>.
    /// </summary>
    Task<CatalogDestinationSnapshot?> GetDestinationBySlugAsync(
        string slug,
        CancellationToken cancellationToken);
}
