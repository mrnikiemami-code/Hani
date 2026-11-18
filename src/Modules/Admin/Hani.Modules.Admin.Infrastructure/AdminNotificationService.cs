using Hani.Modules.Admin.Application;
using Hani.Modules.Content.Domain.Growth;
using Microsoft.EntityFrameworkCore;

namespace Hani.Modules.Admin.Infrastructure;

internal sealed partial class AdminService : IAdminNotificationService
{
    public async Task<AdminNotificationPageDto> ListAsync(
        int page,
        int pageSize,
        string? status,
        string? channel,
        string? q,
        CancellationToken cancellationToken)
    {
        var normalizedPage = page <= 0 ? 1 : page;
        var normalizedPageSize = pageSize is <= 0 or > 100 ? 25 : pageSize;
        var query = content.Notifications.AsNoTracking();
        if (!string.IsNullOrWhiteSpace(status) &&
            Enum.TryParse<NotificationStatus>(status, true, out var parsedStatus))
        {
            query = query.Where(item => item.Status == parsedStatus);
        }

        if (!string.IsNullOrWhiteSpace(channel) &&
            Enum.TryParse<ContactChannel>(channel, true, out var parsedChannel))
        {
            query = query.Where(item => item.Channel == parsedChannel);
        }

        if (!string.IsNullOrWhiteSpace(q))
        {
            var term = q.Trim();
            query = query.Where(item =>
                item.TemplateKey.Contains(term) ||
                item.Payload.Contains(term));
        }

        var total = await query.CountAsync(cancellationToken);
        var items = await query
            .OrderByDescending(item => item.CreatedAt)
            .Skip((normalizedPage - 1) * normalizedPageSize)
            .Take(normalizedPageSize)
            .Select(item => new AdminNotificationDto(
                item.Id,
                item.UserId,
                item.Channel.ToString(),
                item.TemplateKey,
                item.Payload,
                item.Status.ToString(),
                item.CreatedAt,
                item.SentAt,
                item.AttemptCount,
                item.LastError,
                item.NextAttemptAt))
            .ToArrayAsync(cancellationToken);

        return new AdminNotificationPageDto(items, normalizedPage, normalizedPageSize, total);
    }

    public async Task<bool> RetryAsync(Guid id, CancellationToken cancellationToken)
    {
        var notification = await content.Notifications
            .FirstOrDefaultAsync(item => item.Id == id, cancellationToken);
        if (notification is null || notification.Status != NotificationStatus.Failed)
        {
            return false;
        }

        notification.Retry();
        await content.SaveChangesAsync(cancellationToken);
        return true;
    }
}
