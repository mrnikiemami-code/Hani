using Hani.Modules.Content.Application.Support;
using Hani.Modules.Content.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace Hani.Modules.Content.Infrastructure.Storage;

internal sealed class SupportAttachmentRetentionService(
    IServiceScopeFactory scopeFactory,
    IOptions<SupportAttachmentOptions> options,
    ILogger<SupportAttachmentRetentionService> logger) : BackgroundService
{
    private static readonly TimeSpan PollInterval = TimeSpan.FromMinutes(30);

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        using var timer = new PeriodicTimer(PollInterval);
        while (!stoppingToken.IsCancellationRequested)
        {
            try
            {
                await PurgePendingAsync(stoppingToken);
                await timer.WaitForNextTickAsync(stoppingToken);
            }
            catch (OperationCanceledException) when (stoppingToken.IsCancellationRequested)
            {
                break;
            }
            catch (Exception exception)
            {
                logger.LogError(exception, "Support attachment retention tick failed.");
            }
        }
    }

    private async Task PurgePendingAsync(CancellationToken cancellationToken)
    {
        using var scope = scopeFactory.CreateScope();
        var dbContext = scope.ServiceProvider.GetRequiredService<ContentDbContext>();
        var storage = scope.ServiceProvider.GetRequiredService<ISupportAttachmentStorage>();
        var cutoff = DateTimeOffset.UtcNow.AddHours(
            -Math.Clamp(options.Value.PendingRetentionHours, 1, 720));
        var pending = await dbContext.SupportAttachments
            .Where(item => item.MessageId == null && item.CreatedAt < cutoff)
            .OrderBy(item => item.CreatedAt)
            .Take(200)
            .ToArrayAsync(cancellationToken);
        foreach (var attachment in pending)
        {
            await storage.DeleteAsync(attachment.StorageKey, cancellationToken);
            if (attachment.ThumbnailStorageKey is { } thumbnail)
            {
                await storage.DeleteAsync(thumbnail, cancellationToken);
            }

            dbContext.SupportAttachments.Remove(attachment);
        }

        if (pending.Length > 0)
        {
            await dbContext.SaveChangesAsync(cancellationToken);
            if (logger.IsEnabled(LogLevel.Information))
            {
                logger.LogInformation(
                    "Purged {Count} expired pending support attachments.",
                    pending.Length);
            }
        }
    }
}
