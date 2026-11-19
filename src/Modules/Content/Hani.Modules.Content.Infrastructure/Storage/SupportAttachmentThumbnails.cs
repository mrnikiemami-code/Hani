using SkiaSharp;

namespace Hani.Modules.Content.Infrastructure.Storage;

/// <summary>Generates private WebP thumbnails for image attachments.</summary>
public static class SupportAttachmentThumbnails
{
    /// <summary>Resizes an image to at most 320px and returns WebP bytes.</summary>
    public static async Task<byte[]?> CreateAsync(
        Stream content,
        CancellationToken cancellationToken)
    {
        using var bitmap = SKBitmap.Decode(content);
        if (bitmap is null || bitmap.Width <= 0 || bitmap.Height <= 0)
        {
            return null;
        }

        var scale = Math.Min(1d, 320d / Math.Max(bitmap.Width, bitmap.Height));
        var width = Math.Max(1, (int)Math.Round(bitmap.Width * scale));
        var height = Math.Max(1, (int)Math.Round(bitmap.Height * scale));
        using var resized = bitmap.Resize(
            new SKImageInfo(width, height, SKColorType.Rgba8888, SKAlphaType.Premul),
            new SKSamplingOptions(SKFilterMode.Linear, SKMipmapMode.Linear));
        if (resized is null)
        {
            return null;
        }

        using var image = SKImage.FromBitmap(resized);
        using var data = image.Encode(SKEncodedImageFormat.Webp, 72);
        return data?.ToArray();
    }
}
