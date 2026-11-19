namespace Hani.Modules.Content.Application.Support;

/// <summary>Private support attachment metadata exposed to clients.</summary>
public sealed record SupportAttachmentDto(
    Guid Id,
    Guid TicketId,
    Guid? MessageId,
    string FileName,
    string ContentType,
    long SizeBytes,
    DateTimeOffset CreatedAt);

/// <summary>Private attachment stream returned by a download handler.</summary>
public sealed record SupportAttachmentDownloadDto(
    string FileName,
    string ContentType,
    Stream Content);

/// <summary>Private storage for support attachments.</summary>
public interface ISupportAttachmentStorage
{
    /// <summary>Saves a file under a private storage key.</summary>
    Task SaveAsync(
        string key,
        Stream content,
        CancellationToken cancellationToken);

    /// <summary>Opens a stored file for an authenticated download.</summary>
    Task<Stream> OpenReadAsync(string key, CancellationToken cancellationToken);

    /// <summary>Deletes a stored file.</summary>
    Task DeleteAsync(string key, CancellationToken cancellationToken);
}
