using Hani.BuildingBlocks.Application;
using Microsoft.Extensions.Options;

namespace Hani.BuildingBlocks.Infrastructure.Localization;

/// <summary>
/// Configuration-backed language catalog; no code change is needed to add a language.
/// </summary>
public sealed class LanguageCatalog : ILanguageCatalog
{
    private readonly HashSet<string> _languages;

    /// <summary>
    /// Builds the catalog from <see cref="LocalizationOptions"/>.
    /// </summary>
    public LanguageCatalog(IOptions<LocalizationOptions> options)
    {
        var supported = options.Value.SupportedCultures
            .Where(culture => !string.IsNullOrWhiteSpace(culture))
            .Select(culture => culture.Split('-')[0].ToLowerInvariant())
            .Distinct(StringComparer.Ordinal)
            .ToArray();

        if (supported.Length == 0)
        {
            throw new InvalidOperationException(
                "Localization:SupportedCultures must contain at least one culture.");
        }

        SupportedLanguages = supported;
        _languages = new HashSet<string>(SupportedLanguages, StringComparer.Ordinal);
        DefaultLanguage = NormalizeLanguage(options.Value.DefaultCulture, SupportedLanguages);
    }

    /// <inheritdoc />
    public IReadOnlyList<string> SupportedLanguages { get; }

    /// <inheritdoc />
    public string DefaultLanguage { get; }

    /// <inheritdoc />
    public string Normalize(string? language)
    {
        if (string.IsNullOrWhiteSpace(language))
        {
            return DefaultLanguage;
        }

        var normalized = language.Split('-')[0].ToLowerInvariant();
        return _languages.Contains(normalized) ? normalized : DefaultLanguage;
    }

    /// <inheritdoc />
    public bool IsSupported(string? language)
        => string.IsNullOrWhiteSpace(language) || _languages.Contains(language.Split('-')[0].ToLowerInvariant());

    private static string NormalizeLanguage(string culture, IReadOnlyList<string> supported)
    {
        if (string.IsNullOrWhiteSpace(culture))
        {
            return supported[0];
        }

        var language = culture.Split('-')[0].ToLowerInvariant();
        return supported.Contains(language, StringComparer.Ordinal) ? language : supported[0];
    }
}
