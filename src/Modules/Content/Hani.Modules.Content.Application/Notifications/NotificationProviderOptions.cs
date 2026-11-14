namespace Hani.Modules.Content.Application.Notifications;

/// <summary>
/// HTTP provider settings for email and SMS delivery.
/// </summary>
public sealed class NotificationProviderOptions
{
    /// <summary>Optional email provider endpoint.</summary>
    public string? EmailEndpoint { get; set; }

    /// <summary>Optional SMS provider endpoint.</summary>
    public string? SmsEndpoint { get; set; }

    /// <summary>Optional bearer token for provider calls.</summary>
    public string? ApiKey { get; set; }

    /// <summary>Request timeout in seconds.</summary>
    public int TimeoutSeconds { get; set; } = 10;
}
