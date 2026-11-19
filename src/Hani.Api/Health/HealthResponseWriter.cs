using System.Text.Json;
using Microsoft.Extensions.Diagnostics.HealthChecks;

namespace Hani.Api;

/// <summary>Writes a stable JSON health payload without leaking exception details.</summary>
internal static class HealthResponseWriter
{
    private static readonly JsonSerializerOptions Json = new(JsonSerializerDefaults.Web);

    /// <summary>Serializes the aggregate health report.</summary>
    public static Task WriteAsync(HttpContext context, HealthReport report)
    {
        context.Response.ContentType = "application/json; charset=utf-8";
        var payload = new
        {
            status = report.Status.ToString(),
            totalDurationMs = Math.Round(report.TotalDuration.TotalMilliseconds, 1),
            checks = report.Entries
                .OrderBy(item => item.Key)
                .Select(item => new
                {
                    name = item.Key,
                    status = item.Value.Status.ToString(),
                    durationMs = Math.Round(item.Value.Duration.TotalMilliseconds, 1),
                    tags = item.Value.Tags.OrderBy(tag => tag).ToArray()
                })
                .ToArray()
        };
        return context.Response.WriteAsync(JsonSerializer.Serialize(payload, Json));
    }
}
