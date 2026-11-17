using Hani.Modules.Content.Application.Abstractions;
using Hani.Modules.Content.Application.Media;
using Hani.Modules.Content.Infrastructure.Notifications;
using Hani.Modules.Content.Infrastructure.Repositories;
using Hani.Modules.Content.Infrastructure.Storage;
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
    public static IServiceCollection AddContentInfrastructure(this IServiceCollection services)
    {
        services.AddScoped<IContentRepository, ContentRepository>();
        services.AddScoped<IMediaAssetRepository, MediaAssetRepository>();
        services.AddSingleton<IContentMediaStorage, LocalContentMediaStorage>();
        services.AddSingleton<IImageProcessor, SkiaMediaProcessor>();
        services.AddScoped<IMediaAssetService, MediaAssetService>();
        services.AddScoped<INotificationSender, HttpNotificationSender>();
        services.AddHostedService<NotificationDispatcher>();
        return services;
    }
}
