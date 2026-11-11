using Hani.BuildingBlocks.Application;

namespace Hani.Modules.Payments.Application.Commands.HandlePaymentWebhook;

/// <summary>
/// Command that verifies and processes a provider webhook.
/// </summary>
public sealed record HandlePaymentWebhookCommand(
    string Provider,
    string Payload,
    string? Signature,
    string? Timestamp) : ICommand<PaymentWebhookResultDto>;

/// <summary>
/// Result of processing a provider webhook.
/// </summary>
public sealed record PaymentWebhookResultDto(
    string Provider,
    string ProviderEventId,
    string Status,
    DateTimeOffset? ProcessedAt);
