using System.Buffers.Binary;
using System.Net.Sockets;
using System.Text;
using Hani.Modules.Content.Application.Support;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace Hani.Modules.Content.Infrastructure.Storage;

internal sealed class NullSupportAttachmentScanner : ISupportAttachmentScanner
{
    public Task<SupportAttachmentScanResult> ScanAsync(
        Stream content,
        CancellationToken cancellationToken)
        => Task.FromResult(new SupportAttachmentScanResult(
            ScannerAvailable: false,
            IsClean: true,
            ThreatName: null));
}

internal sealed class ClamAvSupportAttachmentScanner(
    IOptions<SupportAttachmentOptions> options,
    ILogger<ClamAvSupportAttachmentScanner> logger) : ISupportAttachmentScanner
{
    public async Task<SupportAttachmentScanResult> ScanAsync(
        Stream content,
        CancellationToken cancellationToken)
    {
        var settings = options.Value;
        using var timeout = new CancellationTokenSource(
            TimeSpan.FromSeconds(Math.Clamp(settings.ClamAvTimeoutSeconds, 1, 120)));
        using var linked = CancellationTokenSource.CreateLinkedTokenSource(
            cancellationToken,
            timeout.Token);
        try
        {
            using var client = new TcpClient();
            await client.ConnectAsync(
                settings.ClamAvHost,
                settings.ClamAvPort,
                linked.Token);
            await using var network = client.GetStream();
            await network.WriteAsync("zINSTREAM\0"u8.ToArray(), linked.Token);

            var buffer = new byte[8192];
            int read;
            while ((read = await content.ReadAsync(buffer, linked.Token)) > 0)
            {
                var length = new byte[4];
                BinaryPrimitives.WriteInt32BigEndian(length, read);
                await network.WriteAsync(length, linked.Token);
                await network.WriteAsync(buffer.AsMemory(0, read), linked.Token);
            }

            await network.WriteAsync(new byte[4], linked.Token);
            await network.FlushAsync(linked.Token);

            var response = new StringBuilder();
            var one = new byte[1];
            while (await network.ReadAsync(one, linked.Token) > 0)
            {
                if (one[0] == 0)
                {
                    break;
                }

                response.Append((char)one[0]);
            }

            var text = response.ToString().Trim();
            if (text.Contains("FOUND", StringComparison.OrdinalIgnoreCase))
            {
                logger.LogWarning("Support attachment rejected by ClamAV: {Result}", text);
                return new SupportAttachmentScanResult(
                    ScannerAvailable: true,
                    IsClean: false,
                    ThreatName: text);
            }

            if (text.Contains("OK", StringComparison.OrdinalIgnoreCase))
            {
                return new SupportAttachmentScanResult(
                    ScannerAvailable: true,
                    IsClean: true,
                    ThreatName: null);
            }

            throw new InvalidOperationException("ClamAV returned an unexpected response.");
        }
        catch (Exception exception) when (
            exception is SocketException or IOException or OperationCanceledException)
        {
            logger.LogError(exception, "Support attachment scanner is unavailable.");
            throw new InvalidOperationException(
                "The attachment security scanner is unavailable.",
                exception);
        }
    }
}
