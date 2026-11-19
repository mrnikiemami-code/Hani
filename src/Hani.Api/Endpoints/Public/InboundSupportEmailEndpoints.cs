using System.Globalization;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using Hani.BuildingBlocks.Application;
using Hani.BuildingBlocks.AspNetCore;
using Hani.Modules.Content.Application.Support;
using IResult = Microsoft.AspNetCore.Http.IResult;

namespace Hani.Api;

/// <summary>Trusted inbound email-to-ticket webhook.</summary>
public static class InboundSupportEmailEndpoints
{
    private static readonly JsonSerializerOptions Json = new(JsonSerializerDefaults.Web);

    /// <summary>Maps the HMAC-protected inbound email endpoint.</summary>
    public static IEndpointRouteBuilder MapInboundSupportEmailEndpoints(
        this IEndpointRouteBuilder app)
    {
        app.MapPost("/internal/v1/support/inbound-email", ReceiveAsync)
            .WithTags("Internal.Support.Email")
            .WithName("Internal.ReceiveSupportEmail")
            .Produces<InboundSupportEmailResult>();
        return app;
    }

    private static async Task<IResult> ReceiveAsync(
        HttpContext context,
        IConfiguration configuration,
        IInboundSupportEmailService emails,
        CancellationToken cancellationToken)
    {
        if (!configuration.GetValue<bool>("Support:InboundEmail:Enabled"))
        {
            return context.ToProblem(Error.NotFound(
                "HANI-SUPPORT-4400",
                "Inbound support email is disabled."));
        }

        var secret = configuration["Support:InboundEmail:Secret"];
        if (string.IsNullOrWhiteSpace(secret))
        {
            return context.ToProblem(Error.Conflict(
                "HANI-SUPPORT-4401",
                "Inbound support email is not configured."));
        }

        var signature = context.Request.Headers["X-Hani-Signature"].FirstOrDefault();
        var timestamp = context.Request.Headers["X-Hani-Timestamp"].FirstOrDefault();
        if (string.IsNullOrWhiteSpace(signature) ||
            string.IsNullOrWhiteSpace(timestamp) ||
            !DateTimeOffset.TryParse(
                timestamp,
                CultureInfo.InvariantCulture,
                DateTimeStyles.AssumeUniversal,
                out var occurredAt))
        {
            return context.ToProblem(Error.Unauthorized(
                "HANI-SUPPORT-4402",
                "Inbound email signature and timestamp are required."));
        }

        var tolerance = Math.Clamp(
            configuration.GetValue("Support:InboundEmail:ToleranceMinutes", 5),
            1,
            60);
        if (Math.Abs((DateTimeOffset.UtcNow - occurredAt).TotalMinutes) > tolerance)
        {
            return context.ToProblem(Error.Unauthorized(
                "HANI-SUPPORT-4403",
                "Inbound email timestamp is outside the allowed window."));
        }

        context.Request.EnableBuffering();
        using var reader = new StreamReader(
            context.Request.Body,
            Encoding.UTF8,
            leaveOpen: true);
        var payload = await reader.ReadToEndAsync(cancellationToken);
        context.Request.Body.Position = 0;
        if (!VerifySignature(secret, timestamp, payload, signature))
        {
            return context.ToProblem(Error.Unauthorized(
                "HANI-SUPPORT-4404",
                "Inbound email signature is invalid."));
        }

        InboundSupportEmailRequest? request;
        try
        {
            request = JsonSerializer.Deserialize<InboundSupportEmailRequest>(
                payload,
                Json);
        }
        catch (JsonException)
        {
            return context.ToProblem(Error.Validation(
                "HANI-SUPPORT-4405",
                "Inbound email payload is invalid."));
        }

        if (request is null)
        {
            return context.ToProblem(Error.Validation(
                "HANI-SUPPORT-4405",
                "Inbound email payload is invalid."));
        }

        try
        {
            var result = await emails.ReceiveAsync(
                new InboundSupportEmailInput(
                    request.FromEmail,
                    request.FromName,
                    request.Subject,
                    request.Body,
                    request.ProviderMessageId),
                cancellationToken);
            return result.Appended
                ? Results.Ok(result)
                : Results.Created(
                    $"/internal/v1/support/tickets/{result.TicketId}",
                    result);
        }
        catch (ArgumentException exception)
        {
            return context.ToProblem(Error.Validation(
                "HANI-SUPPORT-4406",
                exception.Message));
        }
    }

    private static bool VerifySignature(
        string secret,
        string timestamp,
        string payload,
        string signature)
    {
        var provided = signature.StartsWith("sha256=", StringComparison.OrdinalIgnoreCase)
            ? signature["sha256=".Length..]
            : signature;
        using var hmac = new HMACSHA256(Encoding.UTF8.GetBytes(secret));
        var expected = Convert.ToHexString(
                hmac.ComputeHash(Encoding.UTF8.GetBytes($"{timestamp}.{payload}")))
            .ToLowerInvariant();
        return CryptographicOperations.FixedTimeEquals(
            Encoding.UTF8.GetBytes(expected),
            Encoding.UTF8.GetBytes(provided.ToLowerInvariant()));
    }
}

/// <summary>Inbound email provider payload.</summary>
public sealed record InboundSupportEmailRequest(
    string FromEmail,
    string? FromName,
    string Subject,
    string Body,
    string? ProviderMessageId);
