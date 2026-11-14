using System.Net.Http.Headers;
using System.Net.Http.Json;
using Hani.Modules.Content.Application.Abstractions;
using Hani.Modules.Content.Application.Notifications;
using Hani.Modules.Content.Domain.Growth;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace Hani.Modules.Content.Infrastructure.Notifications;

internal sealed class HttpNotificationSender(
    IOptions<NotificationProviderOptions> options,
    ILogger<HttpNotificationSender> logger) : INotificationSender
{
    private static readonly HttpClient Client = new();

    public async Task SendAsync(Notification notification, CancellationToken cancellationToken)
    {
        var settings = options.Value;
        var endpoint = notification.Channel == ContactChannel.Email
            ? settings.EmailEndpoint
            : settings.SmsEndpoint;

        if (string.IsNullOrWhiteSpace(endpoint))
        {
            if (logger.IsEnabled(LogLevel.Information))
            {
                logger.LogInformation(
                    "Notification {NotificationId} logged via {Channel} template {TemplateKey}",
                    notification.Id,
                    notification.Channel,
                    notification.TemplateKey);
            }

            return;
        }

        using var request = new HttpRequestMessage(HttpMethod.Post, endpoint)
        {
            Content = JsonContent.Create(new
            {
                notification.Id,
                notification.UserId,
                Channel = notification.Channel.ToString(),
                notification.TemplateKey,
                notification.Payload
            })
        };

        if (!string.IsNullOrWhiteSpace(settings.ApiKey))
        {
            request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", settings.ApiKey);
        }

        using var timeout = new CancellationTokenSource(
            TimeSpan.FromSeconds(Math.Clamp(settings.TimeoutSeconds, 1, 60)));
        using var linked = CancellationTokenSource.CreateLinkedTokenSource(
            cancellationToken,
            timeout.Token);

        using var response = await Client.SendAsync(request, linked.Token);
        response.EnsureSuccessStatusCode();
    }
}
