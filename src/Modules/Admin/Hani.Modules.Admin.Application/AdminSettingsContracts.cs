using System.Text.Json;

namespace Hani.Modules.Admin.Application;

/// <summary>Platform settings response.</summary>
public sealed record AdminPlatformSettingsDto(
    JsonElement Settings,
    DateTimeOffset? UpdatedAt);

/// <summary>Platform settings service.</summary>
public interface IAdminPlatformSettingsService
{
    Task<AdminPlatformSettingsDto> GetAsync(CancellationToken cancellationToken);
    Task<AdminPlatformSettingsDto> UpdateAsync(
        JsonElement settings,
        Guid? updatedBy,
        CancellationToken cancellationToken);
}
