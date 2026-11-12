using Hani.BuildingBlocks.Application;

namespace Hani.Modules.Payments.Application.Commands.CreatePaymentIntent;

/// <summary>
/// Command that creates a payment intent for a pending order.
/// </summary>
public sealed record CreatePaymentIntentCommand(
    Guid OrderId,
    string? Currency = null,
    Guid? PaymentObligationId = null,
    string IdempotencyKey = "") : ICommand<PaymentIntentDto>, IIdempotentCommand
{
    string IIdempotentCommand.IdempotencyKey => IdempotencyKey;
}

/// <summary>
/// Payment intent read model returned to checkout clients.
/// </summary>
public sealed record PaymentIntentDto(
    Guid PaymentIntentId,
    Guid OrderId,
    Guid AgencyId,
    decimal Amount,
    string Currency,
    Guid? PaymentObligationId,
    string Status,
    string Provider,
    string? ProviderRef,
    string? RedirectUrl,
    string PspAccountRef,
    string MerchantScope,
    string FundsHeldBy,
    string? FailureReason,
    DateTimeOffset CreatedAt,
    DateTimeOffset ExpiresAt);
