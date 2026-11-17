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
        var media = app.MapGroup("/internal/v1/media")
            .WithTags("Internal.Media")
            .RequireAuthorization("Admin");

        media.MapGet("", ListAsync)
            .WithName("Internal.ListMedia")
            .Produces<MediaListResponse>();

        media.MapPost("", UploadAsync)
            .WithName("Internal.UploadMedia")
            .DisableAntiforgery()
            .Produces<MediaAssetDto>()
            .ProducesProblem(StatusCodes.Status400BadRequest);

        media.MapPut("/{id:guid}", UpdateAsync)
            .WithName("Internal.UpdateMedia")
            .Produces<MediaAssetDto>()
            .ProducesProblem(StatusCodes.Status400BadRequest);

        media.MapDelete("/{id:guid}", DeleteAsync)
            .WithName("Internal.DeleteMedia")
            .Produces(StatusCodes.Status204NoContent);

        return app;
    }

    private static async Task<IResult> ListAsync(
        [FromQuery] int page,
        [FromQuery] int pageSize,
        [FromQuery] string? q,
        IMediaAssetService service,
        CancellationToken cancellationToken)
    {
        var normalizedPage = page <= 0 ? 1 : page;
        var normalizedPageSize = pageSize is <= 0 or > 100 ? 24 : pageSize;
        var (items, total) = await service.ListAsync(
            normalizedPage,
            normalizedPageSize,
            q,
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
                    credit),
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
            cancellationToken);

        return result is null
            ? context.ToProblem(Error.NotFound("HANI-MEDIA-1005", "Media asset was not found."))
            : Results.Ok(result);
    }

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
    string? Credit);
