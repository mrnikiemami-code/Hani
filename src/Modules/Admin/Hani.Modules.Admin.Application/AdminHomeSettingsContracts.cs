using System.Text.Json;

namespace Hani.Modules.Admin.Application;

/// <summary>Homepage settings response.</summary>
public sealed record HomePageSettingsDto(
    string Key,
    string Locale,
    JsonElement Settings,
    DateTimeOffset? UpdatedAt);

/// <summary>Homepage settings service.</summary>
public interface IAdminHomeSettingsService
{
    /// <summary>Returns homepage settings for a key and locale.</summary>
    Task<HomePageSettingsDto> GetAsync(
        string? key,
        string? locale,
        CancellationToken cancellationToken);

    /// <summary>Updates homepage settings and returns the stored value.</summary>
    Task<HomePageSettingsDto> UpdateAsync(
        string? key,
        string? locale,
        JsonElement settings,
        CancellationToken cancellationToken);
}
