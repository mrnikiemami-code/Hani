namespace Hani.Modules.Identity.Application.Commands.Preferences;

/// <summary>
/// Server-owned list of home experiences. It mirrors the frontend registry so
/// an authenticated preference can never point at a layout the server does not
/// know about.
/// </summary>
public static class HomeExperienceCatalog
{
    /// <summary>
    /// Layout used when no valid preference exists.
    /// </summary>
    public const string DefaultId = "all-services-classic";

    /// <summary>
    /// Default display currency used when the user did not choose one.
    /// </summary>
    public const string DefaultCurrency = "IRR";

    private static readonly HashSet<string> Ids = new(StringComparer.Ordinal)
    {
        "all-services-classic",
        "all-services-modern",
        "tour-classic",
        "hotel",
        "car",
        "flight",
        "cruise",
        "tour-editorial",
        "bus",
        "guide",
        "activity",
        "visa"
    };

    /// <summary>
    /// Returns <c>true</c> when the id is a known layout.
    /// </summary>
    public static bool IsKnown(string? id)
        => !string.IsNullOrWhiteSpace(id) && Ids.Contains(id);

    /// <summary>
    /// Returns a known id or <c>null</c> when the input is invalid.
    /// </summary>
    public static string? Normalize(string? id)
        => IsKnown(id) ? id : null;
}
