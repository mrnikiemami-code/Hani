using Hani.Modules.Content.Application.Abstractions;
using Hani.Modules.Content.Application.Media;
using Hani.Modules.Content.Application.Queries.AdminAds;
using Hani.Modules.Content.Infrastructure.Notifications;
using Hani.Modules.Content.Infrastructure.ReadModels;
using Hani.Modules.Content.Infrastructure.Repositories;
using Hani.Modules.Content.Infrastructure.Storage;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Hani.Modules.Content.Infrastructure;

/// <summary>
/// Registers Content module infrastructure services.
/// </summary>
public static class DependencyInjection
{
    /// <summary>
    /// Adds content repositories and the notification dispatcher.
    /// </summary>
    public static IServiceCollection AddContentInfrastructure(
        this IServiceCollection services,
        IConfiguration configuration)
    {
        services.AddScoped<IContentRepository, ContentRepository>();
        services.AddScoped<IAdminAdsReadModel, AdminAdsReadModel>();
        services.AddScoped<IMediaAssetRepository, MediaAssetRepository>();
        services.AddSingleton<IContentMediaStorage, LocalContentMediaStorage>();
        services.AddSingleton<IImageProcessor, SkiaMediaProcessor>();
        services.AddScoped<IMediaAssetService, MediaAssetService>();
        services.AddHttpClient("notifications");
        var mode = configuration["Notifications:Mode"] ?? "Log";
        if (string.Equals(mode, "Http", StringComparison.OrdinalIgnoreCase))
        {
            services.AddScoped<INotificationSender, HttpNotificationSender>();
        }
        else
        {
            services.AddScoped<INotificationSender, LoggingNotificationSender>();
        }

        services.AddHostedService<NotificationDispatcher>();
        return services;
    }
}
