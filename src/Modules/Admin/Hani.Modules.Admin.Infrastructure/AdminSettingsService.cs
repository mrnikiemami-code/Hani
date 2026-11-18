using System.Text.Json;
using Hani.Modules.Admin.Application;
using Hani.Modules.Identity.Domain.Settings;
using Microsoft.EntityFrameworkCore;

namespace Hani.Modules.Admin.Infrastructure;

internal sealed partial class AdminService : IAdminPlatformSettingsService
{
    private const string PlatformSettingsKey = "platform";

    public async Task<AdminPlatformSettingsDto> GetAsync(
        CancellationToken cancellationToken)
    {
        var entity = await identity.PlatformSettings
            .AsNoTracking()
            .FirstOrDefaultAsync(
                item => item.Key == PlatformSettingsKey,
                cancellationToken);
        var settings = entity is null
            ? JsonDocument.Parse("{}").RootElement.Clone()
            : JsonDocument.Parse(entity.Json).RootElement.Clone();
        return new AdminPlatformSettingsDto(settings, entity?.UpdatedAt);
    }

    public async Task<AdminPlatformSettingsDto> UpdateAsync(
        JsonElement settings,
        Guid? updatedBy,
        CancellationToken cancellationToken)
    {
        if (settings.ValueKind != JsonValueKind.Object)
        {
            throw new ArgumentException("Platform settings must be a JSON object.");
        }

        var json = settings.GetRawText();
        if (json.Length > 100_000)
        {
            throw new ArgumentException("Platform settings must be at most 100 KB.");
        }

        var entity = await identity.PlatformSettings
            .FirstOrDefaultAsync(
                item => item.Key == PlatformSettingsKey,
                cancellationToken);
        if (entity is null)
        {
            entity = PlatformSettings.Create(ids, PlatformSettingsKey, json, updatedBy);
            await identity.PlatformSettings.AddAsync(entity, cancellationToken);
        }
        else
        {
            entity.Update(json, updatedBy);
        }

        await identity.SaveChangesAsync(cancellationToken);
        return new AdminPlatformSettingsDto(
            JsonDocument.Parse(entity.Json).RootElement.Clone(),
            entity.UpdatedAt);
    }
}
