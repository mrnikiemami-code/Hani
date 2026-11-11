using Hani.BuildingBlocks.Application;
using Hani.BuildingBlocks.Domain;
using Hani.Contracts.Booking;
using Hani.Modules.Payments.Application.Abstractions;
using Hani.Modules.Payments.Domain.PaymentIntents;
using Microsoft.Extensions.Options;

namespace Hani.Modules.Payments.Application.Commands.CreatePaymentIntent;

internal sealed class CreatePaymentIntentCommandHandler(
    IOrderPaymentReadService orders,
    IPaymentIntentRepository intents,
    IPaymentGateway gateway,
    IOptions<PaymentOptions> options,
    IIdGenerator ids)
    : ICommandHandler<CreatePaymentIntentCommand, PaymentIntentDto>
{
    public async Task<Result<PaymentIntentDto>> Handle(
        CreatePaymentIntentCommand request,
        CancellationToken cancellationToken)
    {
        var existing = await intents.GetByOrderIdAsync(request.OrderId, cancellationToken);

        if (existing is not null)
        {
            return Result<PaymentIntentDto>.Success(Map(existing));
        }

        var order = await orders.GetForPaymentAsync(request.OrderId, cancellationToken);

        if (order is null)
        {
            return Result<PaymentIntentDto>.Failure(
                Error.NotFound("HANI-PAYMENT-1001", "Order was not found."));
        }

        if (!string.Equals(order.Status, "PendingPayment", StringComparison.Ordinal))
        {
            return Result<PaymentIntentDto>.Failure(
                Error.Conflict("HANI-PAYMENT-1002", "Order is not awaiting payment."));
        }

        var now = DateTimeOffset.UtcNow;

        if (order.PaymentDueAt <= now)
        {
            return Result<PaymentIntentDto>.Failure(
                Error.Conflict("HANI-PAYMENT-1003", "Order payment window has expired."));
        }

        var configuration = options.Value;

        PaymentIntent intent;

        try
        {
            intent = PaymentIntent.Create(
                ids,
                order.OrderId,
                order.AgencyId,
                order.Amount,
                order.Currency,
                configuration.PspAccountRef,
                configuration.MerchantScope,
                configuration.FundsHeldBy,
                order.PaymentDueAt,
                now);
        }
        catch (ArgumentException exception)
        {
            return Result<PaymentIntentDto>.Failure(
                Error.Validation("HANI-PAYMENT-1005", exception.Message));
        }

        await intents.AddAsync(intent, cancellationToken);

        try
        {
            var response = await gateway.InitiateAsync(
                new PaymentGatewayRequest(
                    intent.Id,
                    intent.OrderId,
                    intent.Amount,
                    intent.Currency,
                    configuration.ReturnUrlBase),
                cancellationToken);

            intent.MarkPending(response.Provider, response.ProviderRef, response.RedirectUrl, now);
            await intents.SaveChangesAsync(cancellationToken);
        }
        catch (PaymentGatewayException exception)
        {
            intent.MarkFailed(exception.Message, now);
            await intents.SaveChangesAsync(cancellationToken);

            return Result<PaymentIntentDto>.Failure(
                new Error(
                    "HANI-PAYMENT-1006",
                    "Payment gateway initiation failed.",
                    ErrorType.Failure));
        }

        return Result<PaymentIntentDto>.Success(Map(intent));
    }

    private static PaymentIntentDto Map(PaymentIntent intent)
        => new(
            intent.Id,
            intent.OrderId,
            intent.AgencyId,
            intent.Amount,
            intent.Currency,
            intent.Status.ToString(),
            intent.Provider,
            intent.ProviderRef,
            intent.RedirectUrl,
            intent.PspAccountRef,
            intent.MerchantScope,
            intent.FundsHeldBy,
            intent.FailureReason,
            intent.CreatedAt,
            intent.ExpiresAt);
}
