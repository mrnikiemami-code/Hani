using Hani.Modules.Admin.Application;
using Microsoft.Extensions.DependencyInjection;

namespace Hani.Modules.Admin.Infrastructure;

/// <summary>Registers the admin composition services.</summary>
public static class DependencyInjection
{
    /// <summary>Adds admin application interfaces and their implementation.</summary>
    public static IServiceCollection AddAdminInfrastructure(this IServiceCollection services)
    {
        services.AddScoped<AdminService>();
        services.AddScoped<IAdminReportService>(
            provider => provider.GetRequiredService<AdminService>());
        services.AddScoped<IAdminUserService>(
            provider => provider.GetRequiredService<AdminService>());
        services.AddScoped<IHotelFacetService>(
            provider => provider.GetRequiredService<AdminService>());
        services.AddScoped<IAdminMarketingService>(
            provider => provider.GetRequiredService<AdminService>());
        services.AddScoped<IAdminNotificationService>(
            provider => provider.GetRequiredService<AdminService>());
        services.AddScoped<IAdminFinanceService>(
            provider => provider.GetRequiredService<AdminService>());
        services.AddScoped<IAdminBookingService>(
            provider => provider.GetRequiredService<AdminService>());
        services.AddScoped<IAdminHomeSettingsService>(
            provider => provider.GetRequiredService<AdminService>());
        services.AddScoped<IAdminSupportService>(
            provider => provider.GetRequiredService<AdminService>());
        services.AddScoped<IContentEntryService>(
            provider => provider.GetRequiredService<AdminService>());
        services.AddScoped<IAdminCatalogService>(
            provider => provider.GetRequiredService<AdminService>());
        services.AddScoped<IAdminGovernanceService>(
            provider => provider.GetRequiredService<AdminService>());
        services.AddScoped<IAdminAuditWriter, AdminAuditWriter>();
        services.AddScoped<IAdminChannelService>(
            provider => provider.GetRequiredService<AdminService>());
        return services;
    }
}
