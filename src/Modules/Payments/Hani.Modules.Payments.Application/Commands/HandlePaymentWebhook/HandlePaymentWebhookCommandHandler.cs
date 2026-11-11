using Hani.BuildingBlocks.Application;
using Hani.BuildingBlocks.Domain;
using Hani.Contracts.Booking;
using Hani.Contracts.Settlement;
using Hani.Modules.Payments.Application.Abstractions;
using Hani.Modules.Payments.Domain.PaymentIntents;
using Hani.Modules.Payments.Domain.PaymentWebhooks;

namespace Hani.Modules.Payments.Application.Commands.HandlePaymentWebhook;

internal sealed class HandlePaymentWebhookCommandHandler(
    IPaymentGateway gateway,
    IPaymentIntentRepository intents,
    IPaymentWebhookEventRepository webhooks,
    IOrderPaymentWriteService orders,
    ICommissionAccrualService commissions,
    IIdGenerator ids)
    : ICommandHandler<HandlePaymentWebhookCommand, PaymentWebhookResultDto>
{
    public async Task<Result<PaymentWebhookResultDto>> Handle(
        HandlePaymentWebhookCommand request,
        CancellationToken cancellationToken)
    {
        PaymentWebhookMessage message;

        try
        {
            message = gateway.VerifyWebhook(new PaymentWebhookRequest(
                request.Provider,
                request.Payload,
                request.Signature,
                request.Timestamp));
        }
        catch (PaymentGatewayException)
        {
            return Result<PaymentWebhookResultDto>.Failure(
                Error.Unauthorized(
                    "HANI-PAYMENT-1201",
                    "Webhook signature verification failed."));
        }

        var existing = await webhooks.GetAsync(
            message.Provider,
            message.ProviderEventId,
            cancellationToken);

        if (existing is not null)
        {
            return Result<PaymentWebhookResultDto>.Success(
                new PaymentWebhookResultDto(
                    existing.Provider,
                    existing.ProviderEventId,
                    "Duplicate",
                    existing.ProcessedAt));
        }

        var intent = await intents.GetByIdAsync(message.PaymentIntentId, cancellationToken);

        if (intent is null)
        {
            return Result<PaymentWebhookResultDto>.Failure(
                Error.NotFound("HANI-PAYMENT-1202", "Payment intent was not found."));
        }

        if (!string.IsNullOrWhiteSpace(intent.ProviderRef) &&
            !string.Equals(intent.ProviderRef, message.ProviderRef, StringComparison.Ordinal))
        {
            return Result<PaymentWebhookResultDto>.Failure(
                Error.Validation(
                    "HANI-PAYMENT-1203",
                    "Webhook provider reference does not match the payment intent."));
        }

        var webhookEvent = PaymentWebhookEvent.Create(
            ids,
            message.Provider,
            message.ProviderEventId,
            intent.Id,
            message.EventType,
            message.Payload);

        await ApplyAsync(intent, webhookEvent, message, orders, commissions, cancellationToken);
        await webhooks.AddAsync(webhookEvent, cancellationToken);

        return Result<PaymentWebhookResultDto>.Success(Map(webhookEvent));
    }

    private static async Task ApplyAsync(
        PaymentIntent intent,
        PaymentWebhookEvent webhookEvent,
        PaymentWebhookMessage message,
        IOrderPaymentWriteService orders,
        ICommissionAccrualService commissions,
        CancellationToken cancellationToken)
    {
        if (string.Equals(message.EventType, "payment.succeeded", StringComparison.OrdinalIgnoreCase))
        {
            if (intent.Status == PaymentIntentStatus.Pending)
            {
                var paid = await orders.MarkPaidAsync(intent.OrderId, cancellationToken);

                if (!paid)
                {
                    webhookEvent.MarkFailed("Order could not be marked paid.", message.OccurredAt);
                    return;
                }

                await commissions.AccrueAsync(
                    new CommissionAccrualRequest(
                        intent.OrderId,
                        intent.AgencyId,
                        intent.Amount,
                        intent.Currency,
                        "TOUR",
                        message.OccurredAt),
                    cancellationToken);

                intent.MarkSucceeded(message.OccurredAt);
                webhookEvent.MarkProcessed(message.OccurredAt);
                return;
            }

            webhookEvent.MarkIgnored(message.OccurredAt);
            return;
        }

        if (string.Equals(message.EventType, "payment.failed", StringComparison.OrdinalIgnoreCase))
        {
            if (intent.Status is PaymentIntentStatus.Created or PaymentIntentStatus.Pending)
            {
                intent.MarkFailed("Provider reported payment failure.", message.OccurredAt);
                webhookEvent.MarkProcessed(message.OccurredAt);
                return;
            }

            webhookEvent.MarkIgnored(message.OccurredAt);
            return;
        }

        webhookEvent.MarkIgnored(message.OccurredAt);
    }

    private static PaymentWebhookResultDto Map(PaymentWebhookEvent webhookEvent)
        => new(
            webhookEvent.Provider,
            webhookEvent.ProviderEventId,
            webhookEvent.Status.ToString(),
            webhookEvent.ProcessedAt);
}
