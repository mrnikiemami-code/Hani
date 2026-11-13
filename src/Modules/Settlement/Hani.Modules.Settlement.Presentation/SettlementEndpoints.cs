using Hani.BuildingBlocks.AspNetCore;
using Hani.Modules.Settlement.Application.Commands.CreateCommissionRule;
using Hani.Modules.Settlement.Application.Queries.GetCommission;
using Hani.Modules.Settlement.Application.Queries.GetLedgerTransaction;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using IResult = Microsoft.AspNetCore.Http.IResult;

namespace Hani.Modules.Settlement.Presentation;

/// <summary>
/// Internal settlement, commission, and ledger endpoints.
/// </summary>
public static class SettlementEndpoints
{
    /// <summary>
    /// Maps settlement endpoints under the internal API.
    /// </summary>
    public static IEndpointRouteBuilder MapSettlementEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/internal/v1/settlements").WithTags("Internal.Settlement");

        group.MapPost("/commission-rules", CreateRuleAsync)
            .WithName("Internal.CreateCommissionRule")
            .Produces<Guid>(StatusCodes.Status201Created)
            .ProducesProblem(StatusCodes.Status400BadRequest);

        group.MapGet("/commissions/{orderId:guid}", GetCommissionAsync)
            .WithName("Internal.GetCommission")
            .Produces<CommissionDto>()
            .ProducesProblem(StatusCodes.Status404NotFound);

        group.MapGet("/ledger/{transactionId:guid}", GetLedgerAsync)
            .WithName("Internal.GetLedgerTransaction")
            .Produces<LedgerTransactionDto>()
            .ProducesProblem(StatusCodes.Status404NotFound);

        return app;
    }

    /// <summary>
    /// Creates an agency commission rule. Returns 201 or 400.
    /// </summary>
    private static async Task<IResult> CreateRuleAsync(
        CreateCommissionRuleRequest request,
        HttpContext context,
        ISender sender,
        CancellationToken cancellationToken)
    {
        var result = await sender.Send(
            new CreateCommissionRuleCommand(
                request.AgencyId,
                request.ProductType,
                request.Rate,
                request.MinAmount,
                request.MaxAmount,
                request.EffectiveFrom,
                request.EffectiveTo),
            cancellationToken);

        return result.IsSuccess
            ? Results.Created($"/internal/v1/settlements/commission-rules/{result.Value}", result.Value)
            : context.ToProblem(result.Error!);
    }

    /// <summary>
    /// Returns the commission accrued for an order and optional currency.
    /// </summary>
    private static async Task<IResult> GetCommissionAsync(
        Guid orderId,
        string? currency,
        HttpContext context,
        ISender sender,
        CancellationToken cancellationToken)
    {
        var result = await sender.Send(
            new GetCommissionQuery(orderId, currency),
            cancellationToken);
        return result.IsSuccess ? Results.Ok(result.Value) : context.ToProblem(result.Error!);
    }

    /// <summary>
    /// Returns a double-entry ledger transaction, or 404.
    /// </summary>
    private static async Task<IResult> GetLedgerAsync(
        Guid transactionId,
        HttpContext context,
        ISender sender,
        CancellationToken cancellationToken)
    {
        var result = await sender.Send(
            new GetLedgerTransactionQuery(transactionId),
            cancellationToken);

        return result.IsSuccess ? Results.Ok(result.Value) : context.ToProblem(result.Error!);
    }
}

/// <summary>
/// HTTP request to create a commission rule.
/// </summary>
public sealed record CreateCommissionRuleRequest(
    Guid AgencyId,
    string ProductType,
    decimal Rate,
    decimal? MinAmount,
    decimal? MaxAmount,
    DateTimeOffset EffectiveFrom,
    DateTimeOffset? EffectiveTo);
