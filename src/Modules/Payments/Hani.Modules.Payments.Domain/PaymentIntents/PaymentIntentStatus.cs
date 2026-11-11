namespace Hani.Modules.Payments.Domain.PaymentIntents;

/// <summary>
/// Lifecycle state of a payment intent.
/// </summary>
public enum PaymentIntentStatus
{
    Created = 0,
    Pending = 1,
    Succeeded = 2,
    Failed = 3,
    Expired = 4
}
