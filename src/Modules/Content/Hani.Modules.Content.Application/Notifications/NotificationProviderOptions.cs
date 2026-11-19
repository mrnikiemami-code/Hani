namespace Hani.Modules.Content.Application.Notifications;

/// <summary>
/// HTTP provider settings for email and SMS delivery.
/// </summary>
public sealed class NotificationProviderOptions
{
    /// <summary>Delivery mode: <c>Log</c> or <c>Http</c>.</summary>
    public string Mode { get; set; } = "Log";

    /// <summary>Allows explicit log-only delivery in a production host.</summary>
    public bool AllowLogInProduction { get; set; }

    /// <summary>Optional email provider endpoint.</summary>
    public string? EmailEndpoint { get; set; }

    /// <summary>Optional SMS provider endpoint.</summary>
    public string? SmsEndpoint { get; set; }

    /// <summary>Optional bearer token for provider calls.</summary>
    public string? ApiKey { get; set; }

    /// <summary>Request timeout in seconds.</summary>
    public int TimeoutSeconds { get; set; } = 10;
}
