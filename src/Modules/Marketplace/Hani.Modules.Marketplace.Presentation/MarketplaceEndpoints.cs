using Hani.BuildingBlocks.Application;
using Hani.BuildingBlocks.AspNetCore;
using Hani.Modules.Marketplace.Application.Queries.GetProductComparison;
using Hani.Modules.Marketplace.Application.Queries.SearchProducts;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using IResult = Microsoft.AspNetCore.Http.IResult;

namespace Hani.Modules.Marketplace.Presentation;

/// <summary>
/// Public marketplace read endpoints for search and offer comparison.
/// </summary>
public static class MarketplaceEndpoints
{
    /// <summary>
    /// Maps public marketplace endpoints.
    /// </summary>
    public static IEndpointRouteBuilder MapMarketplaceEndpoints(this IEndpointRouteBuilder app)
    {
        var market = app.MapGroup("/market/v1").WithTags("Marketplace");

        market.MapGet("/search", SearchAsync)
            .WithName("Marketplace.SearchProducts")
            .Produces<PagedResult<ProductSearchItemDto>>()
            .ProducesProblem(StatusCodes.Status400BadRequest);

        market.MapGet("/products/{productId:guid}/compare", CompareAsync)
            .WithName("Marketplace.CompareProductOffers")
            .Produces<ProductComparisonDto>()
            .ProducesProblem(StatusCodes.Status404NotFound);

        return app;
    }

    private static async Task<IResult> SearchAsync(
        string? locale,
        string? destinationSlug,
        int page,
        int pageSize,
        HttpContext context,
        ISender sender,
        CancellationToken cancellationToken)
    {
        var result = await sender.Send(
            new SearchProductsQuery(
                locale,
                destinationSlug,
                page == 0 ? 1 : page,
                pageSize == 0 ? 20 : pageSize),
            cancellationToken);

        return result.IsSuccess ? Results.Ok(result.Value) : context.ToProblem(result.Error!);
    }

    private static async Task<IResult> CompareAsync(
        Guid productId,
        string? locale,
        HttpContext context,
        ISender sender,
        CancellationToken cancellationToken)
    {
        var result = await sender.Send(
            new GetProductComparisonQuery(productId, locale),
            cancellationToken);

        return result.IsSuccess ? Results.Ok(result.Value) : context.ToProblem(result.Error!);
    }

}
