using Hani.BuildingBlocks.Application;

namespace Hani.BuildingBlocks.AspNetCore;

/// <summary>
/// Localizes RFC 7807 problem titles using configuration-driven translations.
/// </summary>
public static class ProblemDetailsLocalizer
{
    private static LocalizationOptions _options = new();

    /// <summary>
    /// Applies localization configuration at startup.
    /// </summary>
    public static void Configure(LocalizationOptions options) => _options = options;

    /// <summary>
    /// Returns the localized title for an error type.
    /// </summary>
    public static string Title(ErrorType errorType, string? culture)
    {
        var language = Normalize(culture);
        var key = errorType.ToString();

        if (TryGet(language, key, out var title) ||
            TryGet(Normalize(_options.DefaultCulture), key, out title) ||
            TryGetFirst(key, out title))
        {
            return title;
        }

        return errorType.ToString();
    }

    private static bool TryGet(string language, string key, out string title)
    {
        if (_options.ProblemTitles.TryGetValue(language, out var titles) &&
            titles.TryGetValue(key, out var value) &&
            !string.IsNullOrWhiteSpace(value))
        {
            title = value;
            return true;
        }

        title = string.Empty;
        return false;
    }

    private static bool TryGetFirst(string key, out string title)
    {
        foreach (var titles in _options.ProblemTitles.Values)
        {
            if (titles.TryGetValue(key, out var value) && !string.IsNullOrWhiteSpace(value))
            {
                title = value;
                return true;
            }
        }

        title = string.Empty;
        return false;
    }

    private static string Normalize(string? culture)
    {
        var supported = _options.SupportedCultures
            .Where(item => !string.IsNullOrWhiteSpace(item))
            .Select(item => item.Split('-')[0].ToLowerInvariant())
            .ToHashSet(StringComparer.Ordinal);

        if (supported.Count == 0)
        {
            return string.Empty;
        }

        var defaultLanguage = _options.DefaultCulture.Split('-')[0].ToLowerInvariant();
        if (string.IsNullOrWhiteSpace(defaultLanguage) || !supported.Contains(defaultLanguage))
        {
            defaultLanguage = supported.First();
        }

        if (string.IsNullOrWhiteSpace(culture))
        {
            return defaultLanguage;
        }

        var language = culture.Split('-')[0].ToLowerInvariant();
        return supported.Contains(language) ? language : defaultLanguage;
    }
}
