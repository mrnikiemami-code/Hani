using Hani.BuildingBlocks.Application;
using Hani.BuildingBlocks.AspNetCore;
using Hani.Modules.Admin.Application;
using Hani.Modules.Content.Domain.Content;
using Microsoft.AspNetCore.Mvc;
using IResult = Microsoft.AspNetCore.Http.IResult;

namespace Hani.Api;

/// <summary>Content CMS endpoints.</summary>
public static class ContentEntryEndpoints
{
    /// <summary>Maps content CMS endpoints.</summary>
    public static IEndpointRouteBuilder MapContentEntryEndpoints(this IEndpointRouteBuilder app)
    {
        var admin = app.MapGroup("/internal/v1/content-entries")
            .WithTags("Internal.Content")
            .RequireAuthorization("Admin");

        admin.MapGet("", ListAdminAsync);
        admin.MapGet("/{id:guid}", GetAdminAsync);
        admin.MapPost("", CreateAsync);
        admin.MapPut("/{id:guid}", UpdateAsync);
        admin.MapPost("/{id:guid}/publish", PublishAsync);
        admin.MapPost("/{id:guid}/unpublish", UnpublishAsync);
        admin.MapPost("/{id:guid}/revisions/{revisionId:guid}/restore", RestoreRevisionAsync);
        admin.MapPost("/{id:guid}/schedule", ScheduleAsync);
        admin.MapDelete("/{id:guid}", DeleteAsync);

        var market = app.MapGroup("/market/v1/content-entries")
            .WithTags("Marketplace.Content");
        market.MapGet("", ListPublishedAsync);
        market.MapGet("/{slug}", GetPublishedAsync);

        return app;
    }

    private static async Task<IResult> ListAdminAsync(
        [FromQuery] int page,
        [FromQuery] int pageSize,
        [FromQuery] string? q,
        [FromQuery] string? locale,
        [FromQuery] ContentEntryType? type,
        [FromQuery] ContentStatus? status,
        IContentEntryService entries,
        CancellationToken cancellationToken)
        => Results.Ok(await entries.ListAdminAsync(
            page,
            pageSize,
            q,
            locale,
            type,
            status,
            cancellationToken));

    private static async Task<IResult> GetAdminAsync(
        Guid id,
        IContentEntryService entries,
        CancellationToken cancellationToken)
    {
        var entry = await entries.GetAdminAsync(id, cancellationToken);
        return entry is null ? Results.NotFound() : Results.Ok(entry);
    }

    private static async Task<IResult> CreateAsync(
        ContentEntryWriteRequest request,
        HttpContext context,
        IContentEntryService entries,
        CancellationToken cancellationToken)
    {
        try
        {
            return Results.Ok(await entries.CreateAsync(request, cancellationToken));
        }
        catch (ArgumentException exception)
        {
            return context.ToProblem(Error.Validation("HANI-CONTENT-1001", exception.Message));
        }
    }

    private static async Task<IResult> UpdateAsync(
        Guid id,
        ContentEntryWriteRequest request,
        IContentEntryService entries,
        CancellationToken cancellationToken)
    {
        var entry = await entries.UpdateAsync(id, request, cancellationToken);
        return entry is null ? Results.NotFound() : Results.Ok(entry);
    }

    private static async Task<IResult> PublishAsync(
        Guid id,
        IContentEntryService entries,
        CancellationToken cancellationToken)
    {
        var entry = await entries.PublishEntryAsync(id, cancellationToken);
        return entry is null ? Results.NotFound() : Results.Ok(entry);
    }

    private static async Task<IResult> UnpublishAsync(
        Guid id,
        IContentEntryService entries,
        CancellationToken cancellationToken)
    {
        var entry = await entries.UnpublishEntryAsync(id, cancellationToken);
        return entry is null ? Results.NotFound() : Results.Ok(entry);
    }

    private static async Task<IResult> ScheduleAsync(
        Guid id,
        ScheduleContentRequest request,
        HttpContext context,
        IContentEntryService entries,
        CancellationToken cancellationToken)
    {
        try
        {
            var entry = await entries.ScheduleAsync(id, request.ScheduledAt, cancellationToken);
            return entry is null ? Results.NotFound() : Results.Ok(entry);
        }
        catch (ArgumentException exception)
        {
            return context.ToProblem(Error.Validation("HANI-CONTENT-1002", exception.Message));
        }
    }

    private static async Task<IResult> DeleteAsync(
        Guid id,
        IContentEntryService entries,
        CancellationToken cancellationToken)
    {
        await entries.DeleteAsync(id, cancellationToken);
        return Results.NoContent();
    }

    private static async Task<IResult> ListPublishedAsync(
        [FromQuery] string? locale,
        [FromQuery] ContentEntryType? type,
        IContentEntryService entries,
        CancellationToken cancellationToken)
        => Results.Ok(await entries.ListPublishedAsync(locale, type, cancellationToken));

    private static async Task<IResult> RestoreRevisionAsync(
        Guid id,
        Guid revisionId,
        IContentEntryService entries,
        CancellationToken cancellationToken)
    {
        var entry = await entries.RestoreRevisionAsync(id, revisionId, cancellationToken);
        return entry is null ? Results.NotFound() : Results.Ok(entry);
    }

    private static async Task<IResult> GetPublishedAsync(
        string slug,
        [FromQuery] string? locale,
        [FromQuery] ContentEntryType? type,
        IContentEntryService entries,
        CancellationToken cancellationToken)
    {
        var entry = await entries.GetPublishedAsync(slug, locale, type, cancellationToken);
        return entry is null ? Results.NotFound() : Results.Ok(entry);
    }
}
