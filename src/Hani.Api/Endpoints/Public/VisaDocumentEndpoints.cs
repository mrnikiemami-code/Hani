using Hani.BuildingBlocks.Application;
using Hani.BuildingBlocks.AspNetCore;
using Hani.Modules.Identity.Application.Abstractions;
using IResult = Microsoft.AspNetCore.Http.IResult;

namespace Hani.Api;

/// <summary>
/// Public upload endpoint for visa application documents.
/// </summary>
public static class VisaDocumentEndpoints
{
    private const long MaxFileSize = 10 * 1024 * 1024;

    /// <summary>Maps visa document upload endpoints.</summary>
    public static IEndpointRouteBuilder MapVisaDocumentEndpoints(
        this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/market/v1/visa-applications")
            .WithTags("Marketplace.VisaDocuments");

        group.MapPost("/documents", UploadDocumentAsync)
            .WithName("Marketplace.UploadVisaDocument")
            .DisableAntiforgery()
            .RequireRateLimiting("support-attachments")
            .Produces<VisaDocumentUploadResult>();

        return app;
    }

    private static async Task<IResult> UploadDocumentAsync(
        IFormFile file,
        HttpContext context,
        IFileStorage storage,
        CancellationToken cancellationToken)
    {
        if (file.Length is <= 0 or > MaxFileSize)
        {
            return context.ToProblem(Error.Validation(
                "HANI-VISA-4101",
                "Visa document size must be between 1 byte and 10 MB."));
        }

        var contentType = file.ContentType.Trim().ToLowerInvariant();
        var extension = contentType switch
        {
            "application/pdf" => ".pdf",
            "image/jpeg" => ".jpg",
            "image/png" => ".png",
            _ => null
        };

        if (extension is null)
        {
            return context.ToProblem(Error.Validation(
                "HANI-VISA-4102",
                "Only PDF, JPEG, and PNG visa documents are allowed."));
        }

        await using var stream = file.OpenReadStream();
        var url = await storage.SaveAsync(
            stream,
            contentType,
            extension,
            cancellationToken);

        return Results.Ok(new VisaDocumentUploadResult(url, file.FileName));
    }
}

/// <summary>Uploaded visa document URL.</summary>
public sealed record VisaDocumentUploadResult(string Url, string FileName);
