using System.Text.Json;
using Hani.BuildingBlocks.Application;
using Hani.BuildingBlocks.AspNetCore;
using Hani.Modules.Content.Application.PageComposition;
using Microsoft.AspNetCore.Mvc;
using IResult = Microsoft.AspNetCore.Http.IResult;

namespace Hani.Api;

/// <summary>Public and admin page-composition endpoints.</summary>
public static class PageCompositionEndpoints
{
    /// <summary>Maps page-composition endpoints.</summary>
    public static IEndpointRouteBuilder MapPageCompositionEndpoints(
        this IEndpointRouteBuilder app)
    {
        app.MapGet("/market/v1/pages/{pageKey}", GetPublishedAsync)
            .WithTags("Marketplace.PageComposition")
            .WithName("Marketplace.GetPageComposition")
            .Produces<PageCompositionDto>()
            .ProducesProblem(StatusCodes.Status404NotFound);

        var admin = app.MapGroup("/internal/v1/page-compositions")
            .WithTags("Internal.PageComposition")
            .RequireAuthorization("Admin");

        admin.MapGet("", ListAsync)
            .WithName("Internal.ListPageCompositions")
            .Produces<IReadOnlyList<PageCompositionListItemDto>>();

        admin.MapGet("/catalog", GetCatalog)
            .WithName("Internal.PageCompositionCatalog")
            .Produces<IReadOnlyList<string>>();

        admin.MapGet("/{pageKey}", GetAdminAsync)
            .WithName("Internal.GetPageComposition")
            .Produces<PageCompositionDto>()
            .ProducesProblem(StatusCodes.Status404NotFound);

        admin.MapPut("/{pageKey}", SaveDraftAsync)
            .WithName("Internal.SavePageCompositionDraft")
            .Produces<PageCompositionDto>()
            .ProducesProblem(StatusCodes.Status400BadRequest);

        admin.MapPost("/{pageKey}/publish", PublishAsync)
            .WithName("Internal.PublishPageComposition")
            .Produces<PageCompositionDto>()
            .ProducesProblem(StatusCodes.Status400BadRequest);

        return app;
    }

    private static async Task<IResult> GetPublishedAsync(
        string pageKey,
        [FromQuery] string? locale,
        HttpContext context,
        IPageCompositionService service,
        CancellationToken cancellationToken)
    {
        var result = await service.GetAsync(
            pageKey,
            locale,
            published: true,
            cancellationToken);
        return result is null ? Results.NotFound() : Results.Ok(result);
    }

    private static async Task<IResult> ListAsync(
        [FromQuery] string? locale,
        IPageCompositionService service,
        CancellationToken cancellationToken)
        => Results.Ok(await service.ListAsync(locale, cancellationToken));

    private static IResult GetCatalog()
        => Results.Ok(PageCompositionCatalog.Keys.OrderBy(key => key).ToArray());

    private static async Task<IResult> GetAdminAsync(
        string pageKey,
        [FromQuery] string? locale,
        [FromQuery] bool published,
        IPageCompositionService service,
        CancellationToken cancellationToken)
    {
        var result = await service.GetAsync(
            pageKey,
            locale,
            published,
            cancellationToken);
        return result is null ? Results.NotFound() : Results.Ok(result);
    }

    private static async Task<IResult> SaveDraftAsync(
        string pageKey,
        [FromQuery] string? locale,
        SavePageCompositionRequest request,
        HttpContext context,
        IPageCompositionService service,
        CancellationToken cancellationToken)
    {
        try
        {
            return Results.Ok(await service.SaveDraftAsync(
                pageKey,
                locale,
                request.Data,
                cancellationToken));
        }
        catch (ArgumentException exception)
        {
            return context.ToProblem(Error.Validation(
                "HANI-PAGE-1001",
                exception.Message));
        }
    }

    private static async Task<IResult> PublishAsync(
        string pageKey,
        [FromQuery] string? locale,
        HttpContext context,
        IPageCompositionService service,
        CancellationToken cancellationToken)
    {
        try
        {
            return Results.Ok(await service.PublishAsync(
                pageKey,
                locale,
                cancellationToken));
        }
        catch (ArgumentException exception)
        {
            return context.ToProblem(Error.Validation(
                "HANI-PAGE-1002",
                exception.Message));
        }
    }
}

/// <summary>Draft page-composition payload.</summary>
public sealed record SavePageCompositionRequest(JsonElement Data);
