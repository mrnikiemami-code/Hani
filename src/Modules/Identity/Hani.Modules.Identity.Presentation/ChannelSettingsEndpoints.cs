using Hani.BuildingBlocks.AspNetCore;
using Hani.Modules.Identity.Application.Commands.ChannelSettings;
using Hani.Modules.Identity.Domain.Agencies;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using IResult = Microsoft.AspNetCore.Http.IResult;

namespace Hani.Modules.Identity.Presentation;

/// <summary>
/// Internal channel plan and white-label settings endpoints.
/// </summary>
public static class ChannelSettingsEndpoints
{
    /// <summary>Maps channel settings endpoints.</summary>
    public static IEndpointRouteBuilder MapChannelSettingsEndpoints(this IEndpointRouteBuilder app)
    {
        app.MapPost(
                "/internal/v1/agencies/{agencyId:guid}/channel-settings",
                ConfigureAsync)
            .WithTags("Internal.Identity")
            .WithName("Internal.ConfigureChannelSettings");
        app.MapPost(
                "/internal/v1/agencies/{agencyId:guid}/channel-webhook",
                ConfigureWebhookAsync)
            .WithTags("Internal.Identity")
            .WithName("Internal.ConfigureChannelWebhook");
        return app;
    }

    /// <summary>Configures a channel plan and white-label settings.</summary>
    private static async Task<IResult> ConfigureAsync(
        Guid agencyId,
        ConfigureChannelSettingsRequest request,
        HttpContext context,
        ISender sender,
        CancellationToken cancellationToken)
    {
        var result = await sender.Send(
            new ConfigureChannelSettingsCommand(
                agencyId,
                request.Plan,
                request.WhiteLabelEnabled,
                request.CustomDomain,
                request.AttributionRequired,
                request.CanonicalMode),
            cancellationToken);
        return result.IsSuccess ? Results.Ok(result.Value) : context.ToProblem(result.Error!);
    }

    /// <summary>Configures the agency channel webhook.</summary>
    private static async Task<IResult> ConfigureWebhookAsync(
        Guid agencyId,
        ConfigureChannelWebhookRequest request,
        HttpContext context,
        ISender sender,
        CancellationToken cancellationToken)
    {
        var result = await sender.Send(
            new ConfigureChannelWebhookCommand(agencyId, request.Url, request.Secret),
            cancellationToken);
        return result.IsSuccess ? Results.Ok(result.Value) : context.ToProblem(result.Error!);
    }
}

/// <summary>Channel settings request.</summary>
public sealed record ConfigureChannelSettingsRequest(
    ChannelPlan Plan,
    bool WhiteLabelEnabled,
    string? CustomDomain,
    bool AttributionRequired,
    string CanonicalMode);

/// <summary>Channel webhook request.</summary>
public sealed record ConfigureChannelWebhookRequest(string? Url, string? Secret);
