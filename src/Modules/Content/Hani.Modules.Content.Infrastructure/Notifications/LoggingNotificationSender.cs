using Hani.Modules.Content.Application.Abstractions;
using Hani.Modules.Content.Domain.Growth;
using Microsoft.Extensions.Logging;

namespace Hani.Modules.Content.Infrastructure.Notifications;

internal sealed class LoggingNotificationSender(ILogger<LoggingNotificationSender> logger)
    : INotificationSender
{
    public Task SendAsync(Notification notification, CancellationToken cancellationToken)
    {
        if (logger.IsEnabled(LogLevel.Information))
        {
            logger.LogInformation(
                "Notification {NotificationId} sent via {Channel} template {TemplateKey}",
                notification.Id,
                notification.Channel,
                notification.TemplateKey);
        }

        return Task.CompletedTask;
    }
}
