namespace Hani.BuildingBlocks.Application;

/// <summary>
/// Configuration-driven language settings. Adding a language only requires configuration.
/// </summary>
public sealed class LocalizationOptions
{
    /// <summary>
    /// Default culture used when the request has no supported language.
    /// </summary>
    public string DefaultCulture { get; set; } = "fa-IR";

    /// <summary>
    /// Cultures supported by the API and UI.
    /// </summary>
    public List<string> SupportedCultures { get; set; } = ["fa-IR"];

    /// <summary>
    /// Localized problem titles keyed by language then error type.
    /// </summary>
    public Dictionary<string, Dictionary<string, string>> ProblemTitles { get; set; } = new();
}

/// <summary>
/// Read-only view over configured languages.
/// </summary>
public interface ILanguageCatalog
{
    /// <summary>
    /// Supported two-letter languages (for example: fa, en, ar).
    /// </summary>
    IReadOnlyList<string> SupportedLanguages { get; }

    /// <summary>
    /// Default two-letter language.
    /// </summary>
    string DefaultLanguage { get; }

    /// <summary>
    /// Normalizes an arbitrary culture/input to a supported language.
    /// </summary>
    string Normalize(string? language);

    /// <summary>
    /// True when the input is empty (default) or a supported language.
    /// </summary>
    bool IsSupported(string? language);
}
