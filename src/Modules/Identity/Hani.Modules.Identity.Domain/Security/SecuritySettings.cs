namespace Hani.Modules.Identity.Domain.Security;

/// <summary>
/// Persisted, admin-editable security settings. The row is keyed by a stable
/// setting name so more security policies can share the same table later.
/// </summary>
public sealed class SecuritySettings
{
    /// <summary>Key for the OTP security policy.</summary>
    public const string OtpKey = "otp";

    private SecuritySettings()
    {
    }

    private SecuritySettings(string key, string settingsJson, DateTimeOffset updatedAt)
    {
        Key = key;
        SettingsJson = settingsJson;
        UpdatedAt = updatedAt;
    }

    /// <summary>Setting key.</summary>
    public string Key { get; private set; } = string.Empty;

    /// <summary>JSON document for the setting group.</summary>
    public string SettingsJson { get; private set; } = "{}";

    /// <summary>Last update time.</summary>
    public DateTimeOffset UpdatedAt { get; private set; }

    /// <summary>Creates a settings row.</summary>
    public static SecuritySettings Create(string key, string settingsJson, DateTimeOffset updatedAt)
        => new(key, settingsJson, updatedAt);

    /// <summary>Replaces the JSON document and updates the timestamp.</summary>
    public void Update(string settingsJson, DateTimeOffset updatedAt)
    {
        SettingsJson = string.IsNullOrWhiteSpace(settingsJson) ? "{}" : settingsJson;
        UpdatedAt = updatedAt;
    }
}
