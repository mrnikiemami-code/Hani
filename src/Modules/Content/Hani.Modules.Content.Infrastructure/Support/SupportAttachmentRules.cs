namespace Hani.Modules.Content.Infrastructure.Support;

/// <summary>Validation and private storage-key rules for support attachments.</summary>
public static class SupportAttachmentRules
{
    public const long MaxBytes = 10 * 1024 * 1024;

    private static readonly Dictionary<string, string> Allowed =
        new Dictionary<string, string>(StringComparer.OrdinalIgnoreCase)
        {
            ["image/jpeg"] = ".jpg",
            ["image/png"] = ".png",
            ["image/webp"] = ".webp",
            ["application/pdf"] = ".pdf",
            ["text/plain"] = ".txt"
        };

    /// <summary>Returns the safe file extension for an allowed MIME type.</summary>
    public static bool TryGetExtension(string contentType, out string extension)
        => Allowed.TryGetValue(contentType.Trim(), out extension!);

    /// <summary>Strips path components and invalid file-name characters.</summary>
    public static string SafeFileName(string fileName)
    {
        var name = Path.GetFileName(fileName);
        if (string.IsNullOrWhiteSpace(name))
        {
            return "attachment";
        }

        var invalid = Path.GetInvalidFileNameChars();
        var cleaned = new string(name
            .Select(character => invalid.Contains(character) ? '_' : character)
            .ToArray());
        return cleaned.Length > 200 ? cleaned[..200] : cleaned;
    }

    /// <summary>Builds an opaque private storage key.</summary>
    public static string StorageKey(Guid ticketId, Guid attachmentId, string extension)
        => $"support/{ticketId:N}/{attachmentId:N}{extension}";
}
