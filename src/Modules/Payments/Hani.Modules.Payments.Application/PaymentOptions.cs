namespace Hani.Modules.Payments.Application;

/// <summary>
/// Payment gateway and merchant-of-record configuration.
/// </summary>
public sealed class PaymentOptions
{
    /// <summary>
    /// Provider adapter name.
    /// </summary>
    public string Provider { get; set; } = "Mock";

    /// <summary>
    /// PSP account that receives funds. For Hani checkout this belongs to Hani.
    /// </summary>
    public string PspAccountRef { get; set; } = string.Empty;

    /// <summary>
    /// Merchant scope captured on payment intents.
    /// </summary>
    public string MerchantScope { get; set; } = "Hani";

    /// <summary>
    /// Entity holding funds during the payment lifecycle.
    /// </summary>
    public string FundsHeldBy { get; set; } = "Hani";

    /// <summary>
    /// Base URL the gateway redirects the traveler to after checkout.
    /// </summary>
    public string ReturnUrlBase { get; set; } = string.Empty;

    /// <summary>
    /// HMAC secret used to verify webhook signatures.
    /// </summary>
    public string WebhookSecret { get; set; } = string.Empty;

    /// <summary>Base HTTPS URL for the real provider adapter.</summary>
    public string BaseUrl { get; set; } = string.Empty;

    /// <summary>Provider API key or bearer token.</summary>
    public string ApiKey { get; set; } = string.Empty;

    /// <summary>Relative checkout initiation path.</summary>
    public string InitiatePath { get; set; } = "/payments";

    /// <summary>Relative refund path.</summary>
    public string RefundPath { get; set; } = "/refunds";

    /// <summary>Allowed webhook clock skew in minutes.</summary>
    public int WebhookToleranceMinutes { get; set; } = 5;
}
