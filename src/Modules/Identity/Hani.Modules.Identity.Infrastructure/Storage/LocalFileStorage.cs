using Hani.BuildingBlocks.Domain;
using Hani.Modules.Identity.Application.Abstractions;
using Microsoft.Extensions.Options;

namespace Hani.Modules.Identity.Infrastructure.Storage;

/// <summary>
/// Local media storage settings.
/// </summary>
public sealed class MediaStorageOptions
{
    /// <summary>Absolute or relative directory for uploaded files.</summary>
    public string RootPath { get; set; } = "wwwroot/media";

    /// <summary>Public URL prefix served by the API.</summary>
    public string PublicBaseUrl { get; set; } = "http://localhost:5099/media";
}

internal sealed class LocalFileStorage(
    IOptions<MediaStorageOptions> options,
    IIdGenerator ids) : IFileStorage
{
    public async Task<string> SaveAsync(
        Stream content,
        string contentType,
        string extension,
        CancellationToken cancellationToken)
    {
        var settings = options.Value;
        var root = string.IsNullOrWhiteSpace(settings.RootPath)
            ? Path.Combine(AppContext.BaseDirectory, "wwwroot", "media")
            : settings.RootPath;
        Directory.CreateDirectory(root);

        var safeExtension = extension.StartsWith('.')
            ? extension.ToLowerInvariant()
            : $".{extension.ToLowerInvariant()}";
        var fileName = $"{ids.NewId():N}{safeExtension}";
        var path = Path.Combine(root, fileName);

        await using var target = File.Create(path);
        await content.CopyToAsync(target, cancellationToken);

        var baseUrl = string.IsNullOrWhiteSpace(settings.PublicBaseUrl)
            ? "http://localhost:5099/media"
            : settings.PublicBaseUrl.TrimEnd('/');
        return $"{baseUrl}/{fileName}";
    }
}
