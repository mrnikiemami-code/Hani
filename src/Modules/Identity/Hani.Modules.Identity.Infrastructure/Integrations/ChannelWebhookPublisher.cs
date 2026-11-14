using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using Hani.Contracts.Identity;
using Hani.Modules.Identity.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace Hani.Modules.Identity.Infrastructure.Integrations;

internal sealed class ChannelWebhookPublisher(
    HttpClient httpClient,
    IdentityDbContext dbContext,
    ILogger<ChannelWebhookPublisher> logger) : IChannelWebhookPublisher
{
    private static readonly JsonSerializerOptions JsonOptions = new(JsonSerializerDefaults.Web);

    public async Task PublishAsync(
        Guid agencyId,
        string eventType,
        object payload,
        CancellationToken cancellationToken)
    {
        var agency = await dbContext.Agencies
            .AsNoTracking()
            .FirstOrDefaultAsync(item => item.Id == agencyId, cancellationToken);

        if (agency is null ||
            string.IsNullOrWhiteSpace(agency.ChannelWebhookUrl) ||
            string.IsNullOrWhiteSpace(agency.ChannelWebhookSecret))
        {
            return;
        }

        var body = JsonSerializer.Serialize(
            new
            {
                eventType,
                occurredAt = DateTimeOffset.UtcNow,
                data = payload
            },
            JsonOptions);
        var signature = Sign(agency.ChannelWebhookSecret, body);

        try
        {
            using var request = new HttpRequestMessage(
                HttpMethod.Post,
                agency.ChannelWebhookUrl)
            {
                Content = new StringContent(body, Encoding.UTF8, "application/json")
            };
            request.Headers.TryAddWithoutValidation("X-Hani-Event", eventType);
            request.Headers.TryAddWithoutValidation("X-Hani-Signature", signature);
            using var response = await httpClient.SendAsync(request, cancellationToken);
            response.EnsureSuccessStatusCode();
        }
        catch (Exception exception) when (exception is HttpRequestException or TaskCanceledException)
        {
            logger.LogWarning(exception, "Channel webhook delivery failed for agency {AgencyId}.", agencyId);
        }
    }

    private static string Sign(string secret, string body)
    {
        using var hmac = new HMACSHA256(Encoding.UTF8.GetBytes(secret));
        return Convert.ToHexString(hmac.ComputeHash(Encoding.UTF8.GetBytes(body))).ToLowerInvariant();
    }
}
