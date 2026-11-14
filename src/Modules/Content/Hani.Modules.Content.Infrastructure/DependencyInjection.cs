using Hani.Modules.Content.Application.Abstractions;
using Hani.Modules.Content.Infrastructure.Notifications;
using Hani.Modules.Content.Infrastructure.Repositories;
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
        services.AddScoped<INotificationSender, HttpNotificationSender>();
        services.AddHostedService<NotificationDispatcher>();
        return services;
    }
}
