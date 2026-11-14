using Hani.Modules.Content.Application.Abstractions;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace Hani.Modules.Content.Infrastructure.Notifications;

internal sealed class NotificationDispatcher(
    IServiceScopeFactory scopeFactory,
    ILogger<NotificationDispatcher> logger)
    : BackgroundService
{
    private static readonly TimeSpan PollInterval = TimeSpan.FromSeconds(30);
    private static readonly int MaxAttempts = 5;

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        using var timer = new PeriodicTimer(PollInterval);

        while (!stoppingToken.IsCancellationRequested)
        {
            try
            {
                await DispatchDueAsync(stoppingToken);
                await timer.WaitForNextTickAsync(stoppingToken);
            }
            catch (OperationCanceledException) when (stoppingToken.IsCancellationRequested)
            {
                break;
            }
            catch (Exception exception)
            {
                logger.LogError(exception, "Notification dispatcher tick failed.");
            }
        }
    }

    private async Task DispatchDueAsync(CancellationToken cancellationToken)
    {
        using var scope = scopeFactory.CreateScope();
        var repository = scope.ServiceProvider.GetRequiredService<IContentRepository>();
        var sender = scope.ServiceProvider.GetRequiredService<INotificationSender>();
        var due = await repository.ListDueNotificationsAsync(
            DateTimeOffset.UtcNow,
            20,
            cancellationToken);

        foreach (var notification in due)
        {
            try
            {
                await sender.SendAsync(notification, cancellationToken);
                notification.MarkSent();
            }
            catch (Exception exception)
            {
                var nextAttempt = notification.AttemptCount + 1;

                if (nextAttempt >= MaxAttempts)
                {
                    notification.MarkFailed(exception.Message);
                }
                else
                {
                    notification.MarkRetry(
                        exception.Message,
                        DateTimeOffset.UtcNow.AddMinutes(Math.Pow(2, nextAttempt)));
                }

                logger.LogWarning(
                    exception,
                    "Notification {NotificationId} delivery failed (attempt {Attempt}).",
                    notification.Id,
                    nextAttempt);
            }

            await repository.SaveChangesAsync(cancellationToken);
        }
    }
}
