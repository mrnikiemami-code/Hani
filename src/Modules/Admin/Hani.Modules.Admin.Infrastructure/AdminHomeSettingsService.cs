using System.Text.Json;
using Hani.Modules.Admin.Application;
using Hani.Modules.Content.Domain.Settings;
using Microsoft.EntityFrameworkCore;

namespace Hani.Modules.Admin.Infrastructure;

internal sealed partial class AdminService : IAdminHomeSettingsService
{
    public async Task<HomePageSettingsDto> GetAsync(
        string? key,
        string? locale,
        CancellationToken cancellationToken)
    {
        var normalizedKey = Normalize(key);
        var normalizedLocale = languages.Normalize(locale);
        var entity = await content.HomePageSettings
            .AsNoTracking()
            .FirstOrDefaultAsync(
                item => item.Key == normalizedKey && item.Locale == normalizedLocale,
                cancellationToken);
        return ToDto(entity, normalizedKey, normalizedLocale);
    }

    public async Task<HomePageSettingsDto> UpdateAsync(
        string? key,
        string? locale,
        JsonElement settings,
        CancellationToken cancellationToken)
    {
        if (settings.ValueKind != JsonValueKind.Object)
        {
            throw new ArgumentException("Settings must be a JSON object.");
        }

        var json = settings.GetRawText();
        if (json.Length > 100_000)
        {
            throw new ArgumentException("Settings must be at most 100 KB.");
        }

        var normalizedKey = Normalize(key);
        var normalizedLocale = languages.Normalize(locale);
        var entity = await content.HomePageSettings
            .FirstOrDefaultAsync(
                item => item.Key == normalizedKey && item.Locale == normalizedLocale,
                cancellationToken);
        if (entity is null)
        {
            entity = HomePageSettings.Create(normalizedKey, normalizedLocale, json);
            await content.HomePageSettings.AddAsync(entity, cancellationToken);
        }
        else
        {
            entity.Update(json);
        }

        await content.SaveChangesAsync(cancellationToken);
        return ToDto(entity, normalizedKey, normalizedLocale);
    }

    private static HomePageSettingsDto ToDto(
        HomePageSettings? entity,
        string key,
        string locale)
    {
        var settings = entity is null
            ? JsonDocument.Parse("{}").RootElement.Clone()
            : JsonDocument.Parse(entity.SettingsJson).RootElement.Clone();
        return new HomePageSettingsDto(key, locale, settings, entity?.UpdatedAt);
    }

    private static string Normalize(string? key) =>
        string.IsNullOrWhiteSpace(key) ? "default" : key.Trim().ToLowerInvariant();
}
