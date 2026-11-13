using Hani.BuildingBlocks.Application;
using Hani.BuildingBlocks.AspNetCore;
using Hani.Modules.Marketplace.Application.Queries.GetProductComparison;
using Hani.Modules.Marketplace.Application.Queries.SearchProducts;
using Hani.Modules.Marketplace.Application.Queries.Seo;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using System.Text;
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

        market.MapGet("/products/{productId:guid}/seo", GetProductSeoAsync)
            .WithName("Marketplace.GetProductSeo")
            .Produces<ProductSeoDto>()
            .ProducesProblem(StatusCodes.Status404NotFound);

        market.MapGet("/destinations/{slug}/landing", GetLandingSeoAsync)
            .WithName("Marketplace.GetDestinationLanding")
            .Produces<LandingSeoDto>()
            .ProducesProblem(StatusCodes.Status404NotFound);

        market.MapGet("/seo/sitemap.xml", GetSitemapAsync)
            .WithName("Marketplace.GetSitemap")
            .Produces<string>(StatusCodes.Status200OK, "application/xml");

        market.MapGet("/seo/robots.txt", GetRobotsAsync)
            .WithName("Marketplace.GetRobots")
            .Produces<string>(StatusCodes.Status200OK, "text/plain");

        app.MapGet("/sitemap.xml", GetSitemapAsync)
            .WithName("Public.Sitemap")
            .Produces<string>(StatusCodes.Status200OK, "application/xml");

        app.MapGet("/robots.txt", GetRobotsAsync)
            .WithName("Public.Robots")
            .Produces<string>(StatusCodes.Status200OK, "text/plain");

        return app;
    }

    /// <summary>
    /// Searches published products and enriches them with offer price/count.
    /// </summary>
    /// <summary>
    /// Searches published products with faceted filters and sorting.
    /// Returns a paged result with per-currency starting prices.
    /// </summary>
    private static async Task<IResult> SearchAsync(
        [AsParameters] SearchProductsRequest request,
        HttpContext context,
        ISender sender,
        CancellationToken cancellationToken)
    {
        var result = await sender.Send(
            new SearchProductsQuery(
                request.Locale,
                request.DestinationSlug,
                request.OriginSlug,
                request.StartDate,
                request.EndDate,
                request.MinDuration,
                request.MaxDuration,
                request.TourType,
                request.Difficulty,
                request.VehicleType,
                request.AccommodationType,
                request.MinPrice,
                request.MaxPrice,
                request.Currency,
                request.HotelStars,
                request.MealPlan,
                request.Airline,
                request.AgencyId,
                request.Adults,
                request.Children,
                request.Infants,
                request.Hotel,
                request.RoomType,
                request.Cabin,
                request.Q,
                request.OnlineOnly,
                request.Sort,
                request.Page == 0 ? 1 : request.Page,
                request.PageSize == 0 ? 20 : request.PageSize),
            cancellationToken);

        return result.IsSuccess ? Results.Ok(result.Value) : context.ToProblem(result.Error!);
    }

    /// <summary>
    /// Returns approved offers for one product with hotel, flight, tax, and departure details.
    /// </summary>
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

    /// <summary>
    /// Returns canonical, alternate and JSON-LD SEO metadata for one product.
    /// Returns <c>404</c> when the product is not published.
    /// </summary>
    private static async Task<IResult> GetProductSeoAsync(
        Guid productId,
        string? locale,
        HttpContext context,
        ISender sender,
        CancellationToken cancellationToken)
    {
        var result = await sender.Send(
            new GetProductSeoQuery(productId, locale),
            cancellationToken);

        return result.IsSuccess ? Results.Ok(result.Value) : context.ToProblem(result.Error!);
    }

    /// <summary>
    /// Returns landing-page SEO metadata and tour count for one destination.
    /// Returns <c>404</c> when the destination does not exist.
    /// </summary>
    private static async Task<IResult> GetLandingSeoAsync(
        string slug,
        string? locale,
        HttpContext context,
        ISender sender,
        CancellationToken cancellationToken)
    {
        var result = await sender.Send(
            new GetLandingSeoQuery(slug, locale),
            cancellationToken);

        return result.IsSuccess ? Results.Ok(result.Value) : context.ToProblem(result.Error!);
    }

    /// <summary>
    /// Returns the localized XML sitemap for published products and destination landings.
    /// </summary>
    private static async Task<IResult> GetSitemapAsync(
        HttpContext context,
        ISender sender,
        CancellationToken cancellationToken)
    {
        var result = await sender.Send(new GetSitemapQuery(), cancellationToken);

        return result.IsSuccess
            ? Results.Text(result.Value, "application/xml", Encoding.UTF8)
            : context.ToProblem(result.Error!);
    }

    /// <summary>
    /// Returns the crawler policy and sitemap location.
    /// </summary>
    private static async Task<IResult> GetRobotsAsync(
        HttpContext context,
        ISender sender,
        CancellationToken cancellationToken)
    {
        var result = await sender.Send(new GetRobotsQuery(), cancellationToken);

        return result.IsSuccess
            ? Results.Text(result.Value, "text/plain", Encoding.UTF8)
            : context.ToProblem(result.Error!);
    }

}

/// <summary>
/// Query-string request for marketplace faceted search.
/// </summary>
public sealed record SearchProductsRequest(
    string? Locale = null,
    string? DestinationSlug = null,
    string? OriginSlug = null,
    DateOnly? StartDate = null,
    DateOnly? EndDate = null,
    int? MinDuration = null,
    int? MaxDuration = null,
    string? TourType = null,
    string? Difficulty = null,
    string? VehicleType = null,
    string? AccommodationType = null,
    decimal? MinPrice = null,
    decimal? MaxPrice = null,
    string? Currency = null,
    int? HotelStars = null,
    string? MealPlan = null,
    string? Airline = null,
    Guid? AgencyId = null,
    int? Adults = null,
    int? Children = null,
    int? Infants = null,
    string? Hotel = null,
    string? RoomType = null,
    string? Cabin = null,
    string? Q = null,
    bool OnlineOnly = false,
    string? Sort = null,
    int Page = 1,
    int PageSize = 20);
