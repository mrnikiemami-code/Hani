namespace Hani.Modules.Content.Domain.Settings;

/// <summary>
/// Persisted homepage composition and image settings for one key/locale pair.
/// </summary>
public sealed class HomePageSettings
{
    private HomePageSettings()
    {
    }

    private HomePageSettings(string key, string locale, string settingsJson)
    {
        Key = key;
        Locale = locale;
        SettingsJson = settingsJson;
        UpdatedAt = DateTimeOffset.UtcNow;
    }

    /// <summary>Stable setting key, for example "default".</summary>
    public string Key { get; private set; } = string.Empty;

    /// <summary>Locale code such as fa, en, ar.</summary>
    public string Locale { get; private set; } = string.Empty;

    /// <summary>Serialized homepage sections and image overrides.</summary>
    public string SettingsJson { get; private set; } = "{}";

    /// <summary>Last update time in UTC.</summary>
    public DateTimeOffset UpdatedAt { get; private set; }

    /// <summary>Creates a settings row.</summary>
    public static HomePageSettings Create(string key, string locale, string settingsJson) =>
        new(
            NormalizeKey(key),
            NormalizeLocale(locale),
            string.IsNullOrWhiteSpace(settingsJson) ? "{}" : settingsJson);

    /// <summary>Replaces the settings document and updates the timestamp.</summary>
    public void Update(string settingsJson)
    {
        SettingsJson = string.IsNullOrWhiteSpace(settingsJson) ? "{}" : settingsJson;
        UpdatedAt = DateTimeOffset.UtcNow;
    }

    private static string NormalizeKey(string key) =>
        string.IsNullOrWhiteSpace(key) ? "default" : key.Trim().ToLowerInvariant();

    private static string NormalizeLocale(string locale)
    {
        if (string.IsNullOrWhiteSpace(locale))
        {
            throw new ArgumentException("Locale is required.", nameof(locale));
        }

        return locale.Trim().ToLowerInvariant();
    }
}
