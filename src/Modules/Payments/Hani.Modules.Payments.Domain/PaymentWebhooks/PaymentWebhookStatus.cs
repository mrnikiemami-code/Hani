namespace Hani.Modules.Payments.Domain.PaymentWebhooks;

/// <summary>
/// Processing state of a provider webhook event.
/// </summary>
public enum PaymentWebhookStatus
{
    Received = 0,
    Processed = 1,
    Ignored = 2,
    Failed = 3
}
