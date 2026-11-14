namespace Hani.Modules.Identity.Application.Abstractions;

/// <summary>
/// Stores uploaded media bytes and returns a public URL.
/// </summary>
public interface IFileStorage
{
    /// <summary>
    /// Saves one file and returns its public URL.
    /// </summary>
    Task<string> SaveAsync(
        Stream content,
        string contentType,
        string extension,
        CancellationToken cancellationToken);
}
