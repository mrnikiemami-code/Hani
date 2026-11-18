using Hani.BuildingBlocks.Application;
using Hani.BuildingBlocks.AspNetCore;
using Hani.Modules.Content.Application.Media;
using Microsoft.AspNetCore.Mvc;
using IResult = Microsoft.AspNetCore.Http.IResult;

namespace Hani.Api;

/// <summary>
/// Admin media library endpoints with WebP conversion.
/// </summary>
public static class MediaEndpoints
{
    /// <summary>Maps the admin-only content media endpoints.</summary>
    public static IEndpointRouteBuilder MapMediaEndpoints(this IEndpointRouteBuilder app)
    {
        var publicMedia = app.MapGroup("/market/v1/media")
            .WithTags("Marketplace.Media");
        publicMedia.MapGet("/{id:guid}", GetPublicAsync)
            .WithName("Marketplace.GetMedia")
            .Produces<MediaAssetDto>();

        var media = app.MapGroup("/internal/v1/content-media")
            .WithTags("Internal.Media")
            .RequireAuthorization("Admin");

        media.MapGet("", ListAsync)
            .WithName("Internal.ListMedia")
            .Produces<MediaListResponse>();

        media.MapGet("/{id:guid}", GetAdminAsync)
            .WithName("Internal.GetMediaAsset")
            .Produces<MediaAssetDto>();

        media.MapPost("", UploadAsync)
            .WithName("Internal.UploadMedia")
            .DisableAntiforgery()
            .Produces<MediaAssetDto>()
            .ProducesProblem(StatusCodes.Status400BadRequest);

        media.MapPut("/{id:guid}", UpdateAsync)
            .WithName("Internal.UpdateMedia")
            .Produces<MediaAssetDto>()
            .ProducesProblem(StatusCodes.Status400BadRequest);

        media.MapPost("/{id:guid}/replace", ReplaceAsync)
            .WithName("Internal.ReplaceMedia")
            .DisableAntiforgery()
            .Produces<MediaAssetDto>()
            .ProducesProblem(StatusCodes.Status400BadRequest);

        media.MapGet("/folders", ListFoldersAsync)
            .WithName("Internal.ListMediaFolders")
            .Produces<IReadOnlyList<MediaFolderDto>>();

        media.MapPost("/folders", CreateFolderAsync)
            .WithName("Internal.CreateMediaFolder")
            .Produces<MediaFolderDto>();

        media.MapPost("/bulk-delete", BulkDeleteAsync)
            .WithName("Internal.BulkDeleteMedia")
            .Produces(StatusCodes.Status204NoContent);

        media.MapGet("/{id:guid}/usage", ListUsageAsync)
            .WithName("Internal.ListMediaUsage");

        media.MapPost("/{id:guid}/usage", AddUsageAsync)
            .WithName("Internal.AddMediaUsage");

        media.MapDelete("/{id:guid}/usage/{usageId:guid}", RemoveUsageAsync)
            .WithName("Internal.RemoveMediaUsage");

        media.MapGet("/{id:guid}/audit", ListAuditAsync)
            .WithName("Internal.ListMediaAudit");

        media.MapPut("/folders/{id:guid}", RenameFolderAsync)
            .WithName("Internal.RenameMediaFolder");

        media.MapDelete("/folders/{id:guid}", DeleteFolderAsync)
            .WithName("Internal.DeleteMediaFolder");

        media.MapDelete("/{id:guid}", DeleteAsync)
            .WithName("Internal.DeleteMedia")
            .Produces(StatusCodes.Status204NoContent);

        return app;
    }

    private static async Task<IResult> GetPublicAsync(
        Guid id,
        IMediaAssetService service,
        CancellationToken cancellationToken)
    {
        var media = await service.GetAsync(id, cancellationToken);
        return media is null ? Results.NotFound() : Results.Ok(media);
    }

    private static async Task<IResult> GetAdminAsync(
        Guid id,
        IMediaAssetService service,
        CancellationToken cancellationToken)
    {
        var media = await service.GetAsync(id, cancellationToken);
        return media is null ? Results.NotFound() : Results.Ok(media);
    }

    private static async Task<IResult> ListAsync(
        [FromQuery] int page,
        [FromQuery] int pageSize,
        [FromQuery] string? q,
        [FromQuery] Guid? folderId,
        IMediaAssetService service,
        CancellationToken cancellationToken)
    {
        var normalizedPage = page <= 0 ? 1 : page;
        var normalizedPageSize = pageSize is <= 0 or > 100 ? 24 : pageSize;
        var (items, total) = await service.ListAsync(
            normalizedPage,
            normalizedPageSize,
            q,
            folderId,
            cancellationToken);

        return Results.Ok(new MediaListResponse(
            items,
            normalizedPage,
            normalizedPageSize,
            total));
    }

    private static async Task<IResult> UploadAsync(
        IFormFile file,
        [FromForm] string altText,
        [FromForm] string? caption,
        [FromForm] string? credit,
        [FromForm] Guid? folderId,
        [FromForm] string? tags,
        [FromForm] int? focalX,
        [FromForm] int? focalY,
        HttpContext context,
        IMediaAssetService service,
        CancellationToken cancellationToken)
    {
        if (file.Length is <= 0 or > 15 * 1024 * 1024)
        {
            return context.ToProblem(
                Error.Validation("HANI-MEDIA-1001", "Media size must be between 1 byte and 15 MB."));
        }

        await using var stream = file.OpenReadStream();
        try
        {
            var result = await service.UploadAsync(
                stream,
                new MediaUploadInput(
                    file.FileName,
                    file.ContentType,
                    file.Length,
                    altText,
                    caption,
                    credit,
                    folderId,
                    ParseTags(tags),
                    focalX,
                    focalY),
                cancellationToken);

            return Results.Ok(result);
        }
        catch (ArgumentException exception)
        {
            return context.ToProblem(
                Error.Validation("HANI-MEDIA-1002", exception.Message));
        }
        catch (InvalidOperationException exception)
        {
            return context.ToProblem(
                Error.Validation("HANI-MEDIA-1003", exception.Message));
        }
    }

    private static async Task<IResult> UpdateAsync(
        Guid id,
        UpdateMediaMetadataRequest request,
        HttpContext context,
        IMediaAssetService service,
        CancellationToken cancellationToken)
    {
        if (string.IsNullOrWhiteSpace(request.AltText))
        {
            return context.ToProblem(
                Error.Validation("HANI-MEDIA-1004", "Alt text is required."));
        }

        var result = await service.UpdateMetadataAsync(
            id,
            request.AltText,
            request.Caption,
            request.Credit,
            request.FolderId,
            ParseTags(request.Tags),
            request.FocalX,
            request.FocalY,
            cancellationToken);

        return result is null
            ? context.ToProblem(Error.NotFound("HANI-MEDIA-1005", "Media asset was not found."))
            : Results.Ok(result);
    }

    private static async Task<IResult> ReplaceAsync(
        Guid id,
        IFormFile file,
        [FromForm] string altText,
        [FromForm] string? caption,
        [FromForm] string? credit,
        [FromForm] Guid? folderId,
        [FromForm] string? tags,
        [FromForm] int? focalX,
        [FromForm] int? focalY,
        HttpContext context,
        IMediaAssetService service,
        CancellationToken cancellationToken)
    {
        if (file.Length is <= 0 or > 15 * 1024 * 1024)
        {
            return context.ToProblem(
                Error.Validation("HANI-MEDIA-1001", "Media size must be between 1 byte and 15 MB."));
        }

        await using var stream = file.OpenReadStream();
        try
        {
            var result = await service.ReplaceAsync(
                id,
                stream,
                new MediaUploadInput(
                    file.FileName,
                    file.ContentType,
                    file.Length,
                    altText,
                    caption,
                    credit,
                    folderId,
                    ParseTags(tags),
                    focalX,
                    focalY),
                cancellationToken);

            return result is null
                ? context.ToProblem(Error.NotFound("HANI-MEDIA-1005", "Media asset was not found."))
                : Results.Ok(result);
        }
        catch (ArgumentException exception)
        {
            return context.ToProblem(Error.Validation("HANI-MEDIA-1002", exception.Message));
        }
        catch (InvalidOperationException exception)
        {
            return context.ToProblem(Error.Validation("HANI-MEDIA-1003", exception.Message));
        }
    }

    private static async Task<IResult> ListFoldersAsync(
        IMediaAssetService service,
        CancellationToken cancellationToken)
        => Results.Ok(await service.ListFoldersAsync(cancellationToken));

    private static async Task<IResult> CreateFolderAsync(
        CreateMediaFolderRequest request,
        HttpContext context,
        IMediaAssetService service,
        CancellationToken cancellationToken)
    {
        try
        {
            return Results.Ok(await service.CreateFolderAsync(
                request.Name,
                request.ParentId,
                cancellationToken));
        }
        catch (ArgumentException exception)
        {
            return context.ToProblem(Error.Validation("HANI-MEDIA-1006", exception.Message));
        }
    }

    private static async Task<IResult> BulkDeleteAsync(
        BulkDeleteMediaRequest request,
        IMediaAssetService service,
        CancellationToken cancellationToken)
    {
        foreach (var id in request.Ids.Distinct())
        {
            await service.DeleteAsync(id, cancellationToken);
        }

        return Results.NoContent();
    }

    private static async Task<IResult> ListUsageAsync(
        Guid id,
        IMediaAssetService service,
        CancellationToken cancellationToken)
        => Results.Ok(await service.ListUsageAsync(id, cancellationToken));

    private static async Task<IResult> AddUsageAsync(
        Guid id,
        AddMediaUsageRequest request,
        HttpContext context,
        IMediaAssetService service,
        CancellationToken cancellationToken)
    {
        var usage = await service.AddUsageAsync(
            id,
            request.EntityType,
            request.EntityId,
            request.Field,
            cancellationToken);
        return usage is null
            ? context.ToProblem(Error.NotFound("HANI-MEDIA-1005", "Media asset was not found."))
            : Results.Ok(usage);
    }

    private static async Task<IResult> RemoveUsageAsync(
        Guid id,
        Guid usageId,
        IMediaAssetService service,
        CancellationToken cancellationToken)
    {
        await service.RemoveUsageAsync(id, usageId, cancellationToken);
        return Results.NoContent();
    }

    private static async Task<IResult> ListAuditAsync(
        Guid id,
        IMediaAssetService service,
        CancellationToken cancellationToken)
        => Results.Ok(await service.ListAuditAsync(id, cancellationToken));

    private static async Task<IResult> RenameFolderAsync(
        Guid id,
        RenameMediaFolderRequest request,
        IMediaAssetService service,
        CancellationToken cancellationToken)
    {
        var folder = await service.RenameFolderAsync(id, request.Name, cancellationToken);
        return folder is null ? Results.NotFound() : Results.Ok(folder);
    }

    private static async Task<IResult> DeleteFolderAsync(
        Guid id,
        IMediaAssetService service,
        CancellationToken cancellationToken)
    {
        await service.DeleteFolderAsync(id, cancellationToken);
        return Results.NoContent();
    }

    private static string[]? ParseTags(string? tags) =>
        string.IsNullOrWhiteSpace(tags)
            ? null
            : tags.Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries);

    private static async Task<IResult> DeleteAsync(
        Guid id,
        HttpContext context,
        IMediaAssetService service,
        CancellationToken cancellationToken)
    {
        var deleted = await service.DeleteAsync(id, cancellationToken);
        return deleted
            ? Results.NoContent()
            : context.ToProblem(Error.NotFound("HANI-MEDIA-1005", "Media asset was not found."));
    }
}

/// <summary>Paged media list response.</summary>
public sealed record MediaListResponse(
    IReadOnlyList<MediaAssetDto> Items,
    int Page,
    int PageSize,
    int Total);

/// <summary>Media metadata update request.</summary>
public sealed record UpdateMediaMetadataRequest(
    string AltText,
    string? Caption,
    string? Credit,
    Guid? FolderId = null,
    string? Tags = null,
    int? FocalX = null,
    int? FocalY = null);

/// <summary>Create media folder request.</summary>
public sealed record CreateMediaFolderRequest(string Name, Guid? ParentId = null);

/// <summary>Rename media folder request.</summary>
public sealed record RenameMediaFolderRequest(string Name);

/// <summary>Bulk delete request.</summary>
public sealed record BulkDeleteMediaRequest(IReadOnlyList<Guid> Ids);

/// <summary>Add media usage request.</summary>
public sealed record AddMediaUsageRequest(
    string EntityType,
    string EntityId,
    string Field);

/// <summary>Media audit entry.</summary>
public sealed record MediaAuditDto(
    Guid Id,
    Guid MediaAssetId,
    string Action,
    string? Detail,
    DateTimeOffset CreatedAt);
