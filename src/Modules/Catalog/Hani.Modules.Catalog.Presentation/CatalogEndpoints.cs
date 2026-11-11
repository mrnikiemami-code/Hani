using System.Globalization;
using Hani.BuildingBlocks.Application;
using Hani.BuildingBlocks.AspNetCore;
using Hani.Modules.Catalog.Application.Commands.CreateDestination;
using Hani.Modules.Catalog.Application.Commands.CreateTourProduct;
using Hani.Modules.Catalog.Application.Commands.PublishTourProduct;
using Hani.Modules.Catalog.Application.Queries.GetTourProductById;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using IResult = Microsoft.AspNetCore.Http.IResult;

namespace Hani.Modules.Catalog.Presentation;

/// <summary>
/// Minimal API endpoints for the catalog module.
/// </summary>
public static class CatalogEndpoints
{
    public static IEndpointRouteBuilder MapCatalogEndpoints(this IEndpointRouteBuilder app)
    {
        var internalApi = app.MapGroup("/internal/v1/products").WithTags("Internal.Catalog");
        var destinations = app.MapGroup("/internal/v1/destinations").WithTags("Internal.Catalog");
        var market = app.MapGroup("/market/v1/products").WithTags("Marketplace.Catalog");

        destinations.MapPost("/", CreateDestinationAsync)
            .WithName("Internal.CreateDestination")
            .Produces<Guid>(StatusCodes.Status201Created)
            .ProducesProblem(StatusCodes.Status400BadRequest);

        internalApi.MapPost("/", CreateProductAsync)
            .WithName("Internal.CreateTourProduct")
            .Produces<Guid>(StatusCodes.Status201Created)
            .ProducesProblem(StatusCodes.Status400BadRequest);

        internalApi.MapPost("/{productId:guid}/publish", PublishProductAsync)
            .WithName("Internal.PublishTourProduct")
            .Produces(StatusCodes.Status200OK)
            .ProducesProblem(StatusCodes.Status404NotFound);

        market.MapGet("/{productId:guid}", GetProductAsync)
            .WithName("Marketplace.GetTourProduct")
            .Produces<TourProductDto>()
            .ProducesProblem(StatusCodes.Status404NotFound);

        return app;
    }

    private static async Task<IResult> CreateDestinationAsync(
        CreateDestinationRequest request,
        ISender sender,
        CancellationToken cancellationToken)
    {
        var result = await sender.Send(
            new CreateDestinationCommand(
                request.Slug,
                request.Type,
                request.ParentId,
                request.Translations
                    .Select(translation => new DestinationTranslationInput(
                        translation.Locale,
                        translation.Name,
                        translation.Description))
                    .ToArray()),
            cancellationToken);

        return result.IsSuccess
            ? Results.Created($"/internal/v1/destinations/{result.Value}", result.Value)
            : ToProblem(result.Error!);
    }

    private static async Task<IResult> CreateProductAsync(
        CreateTourProductRequest request,
        ISender sender,
        CancellationToken cancellationToken)
    {
        var command = new CreateTourProductCommand(
            request.Slug,
            request.DurationDays,
            request.TourType,
            request.Translations
                .Select(translation => new TourProductTranslationInput(
                    translation.Locale,
                    translation.Title,
                    translation.Summary,
                    translation.Description,
                    translation.SeoTitle,
                    translation.SeoDescription))
                .ToArray(),
            request.DestinationIds);

        var result = await sender.Send(command, cancellationToken);

        return result.IsSuccess
            ? Results.Created($"/market/v1/products/{result.Value}", result.Value)
            : ToProblem(result.Error!);
    }

    private static async Task<IResult> PublishProductAsync(
        Guid productId,
        ISender sender,
        CancellationToken cancellationToken)
    {
        var result = await sender.Send(new PublishTourProductCommand(productId), cancellationToken);
        return result.IsSuccess ? Results.Ok() : ToProblem(result.Error!);
    }

    private static async Task<IResult> GetProductAsync(
        Guid productId,
        ISender sender,
        CancellationToken cancellationToken)
    {
        var result = await sender.Send(new GetTourProductByIdQuery(productId), cancellationToken);
        return result.IsSuccess ? Results.Ok(result.Value) : ToProblem(result.Error!);
    }

    private static IResult ToProblem(Error error)
    {
        var statusCode = error.Type switch
        {
            ErrorType.Validation => StatusCodes.Status400BadRequest,
            ErrorType.NotFound => StatusCodes.Status404NotFound,
            ErrorType.Conflict => StatusCodes.Status409Conflict,
            ErrorType.Unauthorized => StatusCodes.Status401Unauthorized,
            ErrorType.Forbidden => StatusCodes.Status403Forbidden,
            _ => StatusCodes.Status500InternalServerError
        };

        var locale = CultureInfo.CurrentUICulture.Name;

        return Results.Problem(
            title: ProblemDetailsLocalizer.Title(error.Type, locale),
            detail: error.Message,
            statusCode: statusCode,
            extensions: new Dictionary<string, object?>
            {
                ["code"] = error.Code,
                ["locale"] = locale
            });
    }
}

/// <summary>
/// HTTP request contract.
/// </summary>
public sealed record TourProductTranslationRequest(
    string Locale,
    string Title,
    string Summary,
    string Description,
    string? SeoTitle = null,
    string? SeoDescription = null);

/// <summary>
/// HTTP request contract.
/// </summary>
public sealed record DestinationTranslationRequest(
    string Locale,
    string Name,
    string? Description = null);

/// <summary>
/// HTTP request to create a destination.
/// </summary>
public sealed record CreateDestinationRequest(
    string Slug,
    Hani.Modules.Catalog.Domain.Destinations.DestinationType Type,
    Guid? ParentId,
    IReadOnlyList<DestinationTranslationRequest> Translations);

/// <summary>
/// HTTP request to create a shared tour product.
/// </summary>
public sealed record CreateTourProductRequest(
    string Slug,
    int DurationDays,
    string TourType,
    IReadOnlyList<TourProductTranslationRequest> Translations,
    IReadOnlyList<Guid> DestinationIds);
