using Hani.BuildingBlocks.Application;
using Hani.Modules.Payments.Application.Abstractions;
using Hani.Modules.Payments.Application.Commands.CreatePaymentIntent;
using Hani.Modules.Payments.Domain.PaymentIntents;

namespace Hani.Modules.Payments.Application.Queries.GetPaymentIntent;

internal sealed class GetPaymentIntentQueryHandler(IPaymentIntentRepository intents)
    : IQueryHandler<GetPaymentIntentQuery, PaymentIntentDto>
{
    public async Task<Result<PaymentIntentDto>> Handle(
        GetPaymentIntentQuery request,
        CancellationToken cancellationToken)
    {
        var intent = await intents.GetByIdAsync(request.PaymentIntentId, cancellationToken);

        if (intent is null)
        {
            return Result<PaymentIntentDto>.Failure(
                Error.NotFound("HANI-PAYMENT-1101", "Payment intent was not found."));
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
            intent.PaymentObligationId,
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
