using System.Diagnostics;
using Hani.BuildingBlocks.Domain;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;

namespace Hani.BuildingBlocks.AspNetCore;

/// <summary>
/// Establishes a correlation identifier for every request, echoes it in the response,
/// and adds it to logs and telemetry.
/// </summary>
public sealed class CorrelationIdMiddleware(
    RequestDelegate next,
    IIdGenerator idGenerator,
    ILogger<CorrelationIdMiddleware> logger)
{
    /// <summary>
    /// Response and request header used to propagate the correlation identifier.
    /// </summary>
    public const string HeaderName = "X-Correlation-Id";

    /// <summary>
    /// HttpContext.Items key that stores the resolved correlation identifier.
    /// </summary>
    public const string ItemKey = "Hani.CorrelationId";

    private static readonly string[] AcceptedHeaders =
    [
        HeaderName,
        "X-Request-Id"
    ];

    /// <summary>
    /// Resolves or creates the correlation id and executes the remaining pipeline inside a logging scope.
    /// </summary>
    public async Task InvokeAsync(HttpContext context)
    {
        var correlationId = Resolve(context.Request);

        context.TraceIdentifier = correlationId;
        context.Items[ItemKey] = correlationId;
        context.Response.Headers[HeaderName] = correlationId;

        Activity.Current?.SetTag("correlation.id", correlationId);
        Activity.Current?.SetBaggage("correlation.id", correlationId);

        using (logger.BeginScope(new Dictionary<string, object?> { ["CorrelationId"] = correlationId }))
        {
            await next(context);
        }
    }

    /// <summary>
    /// Returns the correlation id stored on the request, falling back to the ASP.NET trace identifier.
    /// </summary>
    public static string Get(HttpContext context)
        => context.Items.TryGetValue(ItemKey, out var value) && value is string correlationId
            ? correlationId
            : context.TraceIdentifier;

    private string Resolve(HttpRequest request)
    {
        foreach (var header in AcceptedHeaders)
        {
            if (!request.Headers.TryGetValue(header, out var values))
            {
                continue;
            }

            var candidate = values.FirstOrDefault()?.Trim();

            if (IsValid(candidate))
            {
                return candidate!;
            }
        }

        return idGenerator.NewId().ToString("D");
    }

    private static bool IsValid(string? value)
        => !string.IsNullOrWhiteSpace(value) &&
           value.Length <= 128 &&
           value.All(character =>
               char.IsLetterOrDigit(character) ||
               character is '-' or '_' or '.' or ':');
}
