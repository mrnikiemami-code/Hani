using System.Text.Json;
using Hani.Modules.Identity.Application.Security;
using Hani.Modules.Identity.Domain.Security;
using Hani.Modules.Identity.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Hani.Modules.Identity.Infrastructure.Security;

/// <summary>
/// Persists OTP security policy in the identity schema. Secrets such as the OTP
/// pepper stay in configuration and are never exposed through this service.
/// </summary>
internal sealed class OtpSecuritySettingsService(IdentityDbContext dbContext)
    : IOtpSecuritySettingsService
{
    private static readonly JsonSerializerOptions SerializerOptions =
        new(JsonSerializerDefaults.Web);

    public async Task<OtpSecurityConfig> GetAsync(CancellationToken cancellationToken)
    {
        var row = await dbContext.SecuritySettings
            .AsNoTracking()
            .FirstOrDefaultAsync(
                item => item.Key == SecuritySettings.OtpKey,
                cancellationToken);

        if (row is null || string.IsNullOrWhiteSpace(row.SettingsJson))
        {
            return OtpSecurityConfig.Default;
        }

        try
        {
            return (JsonSerializer.Deserialize<OtpSecurityConfig>(
                row.SettingsJson,
                SerializerOptions) ?? OtpSecurityConfig.Default).Normalize();
        }
        catch (JsonException)
        {
            return OtpSecurityConfig.Default;
        }
    }

    public async Task<OtpSecurityConfig> UpdateAsync(
        OtpSecurityConfig settings,
        CancellationToken cancellationToken)
    {
        var normalized = settings.Normalize();
        var now = DateTimeOffset.UtcNow;
        var row = await dbContext.SecuritySettings
            .FirstOrDefaultAsync(
                item => item.Key == SecuritySettings.OtpKey,
                cancellationToken);

        if (row is null)
        {
            row = SecuritySettings.Create(
                SecuritySettings.OtpKey,
                JsonSerializer.Serialize(normalized, SerializerOptions),
                now);
            await dbContext.SecuritySettings.AddAsync(row, cancellationToken);
        }
        else
        {
            row.Update(
                JsonSerializer.Serialize(normalized, SerializerOptions),
                now);
        }

        await dbContext.SaveChangesAsync(cancellationToken);
        return normalized;
    }
}
