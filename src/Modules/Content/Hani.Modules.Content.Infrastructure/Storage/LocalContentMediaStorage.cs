using Hani.Modules.Content.Application.Media;
using Microsoft.Extensions.Options;

namespace Hani.Modules.Content.Infrastructure.Storage;

/// <summary>
/// Local/cloud storage settings for the content media library.
/// </summary>
public sealed class ContentMediaStorageOptions
{
    /// <summary>Storage provider name: Local is implemented in phase 1.</summary>
    public string Provider { get; set; } = "Local";

    /// <summary>Root directory when using local storage.</summary>
    public string RootPath { get; set; } = "wwwroot/media";

    /// <summary>Public URL prefix.</summary>
    public string PublicBaseUrl { get; set; } = "http://localhost:5099/media";

    /// <summary>Optional CDN prefix; when set it replaces PublicBaseUrl.</summary>
    public string? CdnBaseUrl { get; set; }
}

internal sealed class LocalContentMediaStorage(
    IOptions<ContentMediaStorageOptions> options) : IContentMediaStorage
{
    public async Task SaveAsync(
        string key,
        Stream content,
        string contentType,
        CancellationToken cancellationToken)
    {
        var path = ResolvePath(key);
        Directory.CreateDirectory(Path.GetDirectoryName(path)!);

        await using var target = File.Create(path);
        await content.CopyToAsync(target, cancellationToken);
    }

    public Task DeleteAsync(string key, CancellationToken cancellationToken)
    {
        var path = ResolvePath(key);
        if (File.Exists(path))
        {
            File.Delete(path);
        }

        return Task.CompletedTask;
    }

    public string PublicUrl(string key)
    {
        var baseUrl = (
            string.IsNullOrWhiteSpace(options.Value.CdnBaseUrl)
                ? options.Value.PublicBaseUrl
                : options.Value.CdnBaseUrl).TrimEnd('/');
        return $"{baseUrl}/{key.Replace('\\', '/').TrimStart('/')}";
    }

    private string ResolvePath(string key)
    {
        var root = Path.GetFullPath(
            string.IsNullOrWhiteSpace(options.Value.RootPath)
                ? Path.Combine(AppContext.BaseDirectory, "wwwroot", "media")
                : options.Value.RootPath);
        var path = Path.GetFullPath(
            Path.Combine(root, key.Replace('/', Path.DirectorySeparatorChar)));

        if (!path.StartsWith(root, StringComparison.OrdinalIgnoreCase))
        {
            throw new InvalidOperationException("Media key escapes the storage root.");
        }

        return path;
    }
}
