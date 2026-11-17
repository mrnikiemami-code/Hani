using System.Security.Cryptography;
using Hani.Modules.Content.Application.Media;
using SkiaSharp;

namespace Hani.Modules.Content.Infrastructure.Storage;

internal sealed class SkiaMediaProcessor : IImageProcessor
{
    private static readonly int[] ResponsiveWidths = [320, 640, 1280, 1920];
    private const long MaxPixels = 40_000_000;
    private const int WebpQuality = 82;

    public async Task<ProcessedImage> ProcessAsync(
        Stream content,
        CancellationToken cancellationToken)
    {
        await using var buffer = new MemoryStream();
        await content.CopyToAsync(buffer, cancellationToken);
        buffer.Position = 0;

        var hash = Convert.ToHexString(
            await SHA256.HashDataAsync(buffer, cancellationToken))
            .ToLowerInvariant();
        buffer.Position = 0;

        using var source = SKBitmap.Decode(buffer)
            ?? throw new InvalidOperationException("Unsupported or corrupt image.");
        if ((long)source.Width * source.Height > MaxPixels)
        {
            throw new InvalidOperationException("Image pixel count exceeds the allowed limit.");
        }

        var widths = ResponsiveWidths
            .Append(source.Width)
            .Where(width => width <= source.Width)
            .Distinct()
            .OrderBy(width => width)
            .ToArray();
        var canonicalWidth = widths[^1];
        var variants = new List<ProcessedVariant>(widths.Length);

        foreach (var width in widths)
        {
            cancellationToken.ThrowIfCancellationRequested();
            var height = Math.Max(1, (int)Math.Round(source.Height * (width / (double)source.Width)));
            using var resized = width == source.Width
                ? source.Copy()
                : source.Resize(new SKImageInfo(width, height), SKSamplingOptions.Default)
                    ?? throw new InvalidOperationException("Image resize failed.");
            using var image = SKImage.FromBitmap(resized);
            using var data = image.Encode(SKEncodedImageFormat.Webp, WebpQuality);
            if (data is null)
            {
                throw new InvalidOperationException("WebP encoding failed.");
            }

            await using var output = new MemoryStream();
            data.SaveTo(output);
            variants.Add(new ProcessedVariant(
                "webp",
                resized.Width,
                resized.Height,
                output.ToArray(),
                width == canonicalWidth));
        }

        return new ProcessedImage(source.Width, source.Height, hash, variants);
    }
}
