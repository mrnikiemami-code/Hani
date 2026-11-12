using Hani.BuildingBlocks.AspNetCore;
using Hani.Modules.Payments.Application.Commands.CreatePaymentIntent;
using Hani.Modules.Payments.Application.Commands.HandlePaymentWebhook;
using Hani.Modules.Payments.Application.Queries.GetPaymentIntent;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using IResult = Microsoft.AspNetCore.Http.IResult;

namespace Hani.Modules.Payments.Presentation;

/// <summary>
/// Marketplace payment checkout endpoints.
/// </summary>
public static class PaymentEndpoints
{
    /// <summary>
    /// Maps payment intent endpoints under the marketplace API.
    /// </summary>
    public static IEndpointRouteBuilder MapPaymentEndpoints(this IEndpointRouteBuilder app)
    {
        var market = app.MapGroup("/market/v1/payments").WithTags("Marketplace.Payments");

        market.MapPost("/intents", CreateIntentAsync)
            .WithName("Marketplace.CreatePaymentIntent")
            .Produces<PaymentIntentDto>(StatusCodes.Status201Created)
            .ProducesProblem(StatusCodes.Status400BadRequest)
            .ProducesProblem(StatusCodes.Status404NotFound)
            .ProducesProblem(StatusCodes.Status409Conflict);

        market.MapGet("/intents/{paymentIntentId:guid}", GetIntentAsync)
            .WithName("Marketplace.GetPaymentIntent")
            .Produces<PaymentIntentDto>()
            .ProducesProblem(StatusCodes.Status404NotFound);

        market.MapPost("/webhook/{provider}", HandleWebhookAsync)
            .WithName("Marketplace.PaymentWebhook")
            .Produces<PaymentWebhookResultDto>()
            .ProducesProblem(StatusCodes.Status401Unauthorized)
            .ProducesProblem(StatusCodes.Status404NotFound);

        return app;
    }

    private static async Task<IResult> CreateIntentAsync(
        CreatePaymentIntentRequest request,
        HttpContext context,
        ISender sender,
        CancellationToken cancellationToken)
    {
        var idempotencyKey = context.Request.Headers["Idempotency-Key"].FirstOrDefault()
            ?? string.Empty;

        var result = await sender.Send(
            new CreatePaymentIntentCommand(
                request.OrderId,
                request.Currency,
                request.PaymentObligationId,
                idempotencyKey),
            cancellationToken);

        return result.IsSuccess
            ? Results.Created(
                $"/market/v1/payments/intents/{result.Value!.PaymentIntentId}",
                result.Value)
            : context.ToProblem(result.Error!);
    }

    private static async Task<IResult> GetIntentAsync(
        Guid paymentIntentId,
        HttpContext context,
        ISender sender,
        CancellationToken cancellationToken)
    {
        var result = await sender.Send(
            new GetPaymentIntentQuery(paymentIntentId),
            cancellationToken);

        return result.IsSuccess ? Results.Ok(result.Value) : context.ToProblem(result.Error!);
    }

    private static async Task<IResult> HandleWebhookAsync(
        string provider,
        HttpContext context,
        ISender sender,
        CancellationToken cancellationToken)
    {
        using var reader = new StreamReader(context.Request.Body);
        var payload = await reader.ReadToEndAsync(cancellationToken);
        var signature = context.Request.Headers["X-Payment-Signature"].FirstOrDefault();
        var timestamp = context.Request.Headers["X-Payment-Timestamp"].FirstOrDefault();

        var result = await sender.Send(
            new HandlePaymentWebhookCommand(provider, payload, signature, timestamp),
            cancellationToken);

        return result.IsSuccess ? Results.Ok(result.Value) : context.ToProblem(result.Error!);
    }
}

/// <summary>
/// HTTP request to create a payment intent for an order.
/// </summary>
public sealed record CreatePaymentIntentRequest(
    Guid OrderId,
    string? Currency = null,
    Guid? PaymentObligationId = null);
