using Hani.Modules.Content.Application.Support;
using Microsoft.Extensions.Options;

namespace Hani.Modules.Content.Infrastructure.Storage;

/// <summary>Private support attachment storage settings.</summary>
public sealed class SupportAttachmentOptions
{
    /// <summary>Private root directory. It must not be served publicly.</summary>
    public string RootPath { get; set; } = "support-attachments";
}

internal sealed class LocalSupportAttachmentStorage(
    IOptions<SupportAttachmentOptions> options) : ISupportAttachmentStorage
{
    public async Task SaveAsync(
        string key,
        Stream content,
        CancellationToken cancellationToken)
    {
        var path = ResolvePath(key);
        Directory.CreateDirectory(Path.GetDirectoryName(path)!);
        await using var target = File.Create(path);
        await content.CopyToAsync(target, cancellationToken);
    }

    public Task<Stream> OpenReadAsync(
        string key,
        CancellationToken cancellationToken)
    {
        var path = ResolvePath(key);
        if (!File.Exists(path))
        {
            throw new FileNotFoundException("Support attachment was not found.", path);
        }

        return Task.FromResult<Stream>(
            new FileStream(path, FileMode.Open, FileAccess.Read, FileShare.Read));
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

    private string ResolvePath(string key)
    {
        var root = Path.GetFullPath(
            string.IsNullOrWhiteSpace(options.Value.RootPath)
                ? Path.Combine(AppContext.BaseDirectory, "support-attachments")
                : options.Value.RootPath);
        var path = Path.GetFullPath(
            Path.Combine(root, key.Replace('/', Path.DirectorySeparatorChar)));
        if (!path.StartsWith(root, StringComparison.OrdinalIgnoreCase))
        {
            throw new InvalidOperationException("Support attachment key escapes the storage root.");
        }

        return path;
    }
}
