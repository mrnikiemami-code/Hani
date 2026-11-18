using Hani.BuildingBlocks.Domain;

namespace Hani.Modules.Identity.Domain.Settings;

/// <summary>Platform-wide key/value settings editable by Super Admin.</summary>
public sealed class PlatformSettings : AggregateRoot<Guid>
{
    private PlatformSettings()
    {
    }

    private PlatformSettings(
        Guid id,
        string key,
        string json,
        DateTimeOffset updatedAt,
        Guid? updatedBy) : base(id)
    {
        Key = key;
        Json = json;
        UpdatedAt = updatedAt;
        UpdatedBy = updatedBy;
    }

    /// <summary>Stable settings key.</summary>
    public string Key { get; private set; } = string.Empty;

    /// <summary>JSON payload.</summary>
    public string Json { get; private set; } = "{}";

    /// <summary>Last update time.</summary>
    public DateTimeOffset UpdatedAt { get; private set; }

    /// <summary>Last administrator who updated the settings.</summary>
    public Guid? UpdatedBy { get; private set; }

    /// <summary>Creates a settings row.</summary>
    public static PlatformSettings Create(
        IIdGenerator ids,
        string key,
        string json,
        Guid? updatedBy = null,
        DateTimeOffset? now = null)
    {
        if (string.IsNullOrWhiteSpace(key) || string.IsNullOrWhiteSpace(json))
        {
            throw new ArgumentException("Settings key and JSON are required.");
        }

        return new PlatformSettings(
            ids.NewId(),
            key.Trim().ToLowerInvariant(),
            json,
            now ?? DateTimeOffset.UtcNow,
            updatedBy);
    }

    /// <summary>Replaces the JSON payload.</summary>
    public void Update(string json, Guid? updatedBy = null, DateTimeOffset? now = null)
    {
        if (string.IsNullOrWhiteSpace(json))
        {
            throw new ArgumentException("Settings JSON is required.");
        }

        Json = json;
        UpdatedAt = now ?? DateTimeOffset.UtcNow;
        UpdatedBy = updatedBy;
    }
}
