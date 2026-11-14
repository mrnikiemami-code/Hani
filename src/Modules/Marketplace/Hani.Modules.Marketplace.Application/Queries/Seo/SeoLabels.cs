using System.Globalization;
using Hani.BuildingBlocks.Application;

namespace Hani.Modules.Marketplace.Application.Queries.Seo;

internal static class SeoLabels
{
    public static string Resolve(
        SeoOptions options,
        ILanguageCatalog languages,
        string locale,
        string key,
        string fallback)
    {
        if (options.Labels.TryGetValue(locale, out var labels) &&
            labels.TryGetValue(key, out var value) &&
            !string.IsNullOrWhiteSpace(value))
        {
            return value;
        }

        if (options.Labels.TryGetValue(languages.DefaultLanguage, out var defaults) &&
            defaults.TryGetValue(key, out var defaultValue) &&
            !string.IsNullOrWhiteSpace(defaultValue))
        {
            return defaultValue;
        }

        return fallback;
    }

    public static string Format(
        SeoOptions options,
        ILanguageCatalog languages,
        string locale,
        string key,
        string fallbackFormat,
        params object[] args)
        => string.Format(
            CultureInfo.InvariantCulture,
            Resolve(options, languages, locale, key, fallbackFormat),
            args);
}
