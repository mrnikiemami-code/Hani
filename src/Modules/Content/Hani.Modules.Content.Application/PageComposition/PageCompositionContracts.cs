using System.Text.Json;

namespace Hani.Modules.Content.Application.PageComposition;

/// <summary>
/// Stable public page keys that can be composed from the admin panel.
/// </summary>
public static class PageCompositionCatalog
{
    /// <summary>Known page keys.</summary>
    public static readonly IReadOnlySet<string> Keys = new HashSet<string>(
        [
            "home",
            "tours",
            "tours.foreign",
            "tours.domestic",
            "visa",
            "hotels",
            "flights",
            "about",
            "contact",
            "header",
            "footer"
        ],
        StringComparer.OrdinalIgnoreCase);

    /// <summary>Returns whether a key is supported.</summary>
    public static bool IsKnown(string key) => Keys.Contains(key.Trim());
}

/// <summary>Page composition row returned to the admin panel.</summary>
public sealed record PageCompositionDto(
    string PageKey,
    string Locale,
    string Status,
    JsonElement Data,
    DateTimeOffset? UpdatedAt,
    DateTimeOffset? PublishedAt);

/// <summary>Page composition list row.</summary>
public sealed record PageCompositionListItemDto(
    string PageKey,
    string Locale,
    bool HasDraft,
    bool HasPublished,
    DateTimeOffset? UpdatedAt,
    DateTimeOffset? PublishedAt);

/// <summary>Persists draft and published page compositions.</summary>
public interface IPageCompositionService
{
    /// <summary>Lists known compositions for one locale.</summary>
    Task<IReadOnlyList<PageCompositionListItemDto>> ListAsync(
        string? locale,
        CancellationToken cancellationToken);

    /// <summary>Reads a draft or published composition.</summary>
    Task<PageCompositionDto?> GetAsync(
        string pageKey,
        string? locale,
        bool published,
        CancellationToken cancellationToken);

    /// <summary>Saves a draft composition.</summary>
    Task<PageCompositionDto> SaveDraftAsync(
        string pageKey,
        string? locale,
        JsonElement data,
        CancellationToken cancellationToken);

    /// <summary>Copies the current draft to the published slot.</summary>
    Task<PageCompositionDto> PublishAsync(
        string pageKey,
        string? locale,
        CancellationToken cancellationToken);
}
