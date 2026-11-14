using Hani.Modules.Content.Domain.Growth;

namespace Hani.Modules.Content.Application.Abstractions;

/// <summary>
/// Provider abstraction for email/SMS notification delivery.
/// </summary>
public interface INotificationSender
{
    /// <summary>
    /// Sends one notification; throw to trigger the configured retry policy.
    /// </summary>
    Task SendAsync(Notification notification, CancellationToken cancellationToken);
}
