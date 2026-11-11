using Hani.BuildingBlocks.Application;

namespace Hani.Modules.Payments.Application.Queries.GetPaymentIntent;

/// <summary>
/// Query that reads a payment intent by id.
/// </summary>
public sealed record GetPaymentIntentQuery(Guid PaymentIntentId)
    : IQuery<Commands.CreatePaymentIntent.PaymentIntentDto>;
