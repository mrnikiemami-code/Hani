using Hani.BuildingBlocks.AspNetCore;
using Hani.Contracts.Identity;
using Hani.Modules.Admin.Application;
using Hani.Modules.Identity.Application.Commands.CreateApiClient;
using Hani.Modules.Identity.Domain.Agencies;

namespace Hani.Api;

/// <summary>Admin Channel API client, plan, and white-label endpoints.</summary>
public static class AdminChannelEndpoints
{
    /// <summary>Maps channel administration endpoints.</summary>
    public static IEndpointRouteBuilder MapAdminChannelEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/internal/v1/admin/channel")
            .WithTags("Internal.Admin.Channel")
            .RequireAuthorization("Admin");

        group.MapGet("/clients", ListClientsAsync)
            .WithName("Internal.ListAdminChannelClients")
            .Produces<IReadOnlyList<AdminApiClientDto>>();

        group.MapPost("/clients", CreateClientAsync)
            .WithName("Internal.CreateAdminChannelClient")
            .Produces<CreateApiClientResult>(StatusCodes.Status201Created);

        group.MapPost("/clients/{id:guid}/revoke", RevokeClientAsync)
            .WithName("Internal.RevokeAdminChannelClient")
            .Produces<bool>();

        group.MapGet("/agencies", ListAgenciesAsync)
            .WithName("Internal.ListAdminChannelAgencies")
            .Produces<IReadOnlyList<AdminChannelAgencyDto>>();

        group.MapPost("/agencies/{agencyId:guid}/settings", ConfigureSettingsAsync)
            .WithName("Internal.ConfigureAdminChannelSettings")
            .Produces<ChannelSettingsSnapshot>();

        group.MapPost("/agencies/{agencyId:guid}/webhook", ConfigureWebhookAsync)
            .WithName("Internal.ConfigureAdminChannelWebhook")
            .Produces<bool>();

        return app;
    }

    private static async Task<IResult> ListClientsAsync(
        IAdminChannelService channel,
        CancellationToken cancellationToken)
        => Results.Ok(await channel.ListClientsAsync(cancellationToken));

    private static async Task<IResult> CreateClientAsync(
        AdminCreateApiClientRequest request,
        HttpContext context,
        IAdminChannelService channel,
        IAdminAuditWriter audit,
        CancellationToken cancellationToken)
    {
        var result = await channel.CreateClientAsync(
            new AdminCreateApiClientInput(request.AgencyId, request.Name, request.Scopes),
            cancellationToken);
        if (!result.IsSuccess)
        {
            return context.ToProblem(result.Error!);
        }

        await audit.RecordAsync(
            context,
            "channel.api_client.created",
            "ApiClient",
            result.Value!.ApiClientId.ToString(),
            "Channel API client created from the admin panel",
            agencyId: request.AgencyId,
            after: new { result.Value.ClientId, result.Value.Scopes },
            cancellationToken: cancellationToken);
        return Results.Created(
            $"/internal/v1/admin/channel/clients/{result.Value.ApiClientId}",
            result.Value);
    }

    private static async Task<IResult> RevokeClientAsync(
        Guid id,
        HttpContext context,
        IAdminChannelService channel,
        IAdminAuditWriter audit,
        CancellationToken cancellationToken)
    {
        var result = await channel.RevokeClientAsync(id, cancellationToken);
        if (!result.IsSuccess)
        {
            return context.ToProblem(result.Error!);
        }

        await audit.RecordAsync(
            context,
            "channel.api_client.revoked",
            "ApiClient",
            id.ToString(),
            "Channel API client revoked from the admin panel",
            after: new { status = "Revoked" },
            cancellationToken: cancellationToken);
        return Results.Ok(result.Value);
    }

    private static async Task<IResult> ListAgenciesAsync(
        IAdminChannelService channel,
        CancellationToken cancellationToken)
        => Results.Ok(await channel.ListAgenciesAsync(cancellationToken));

    private static async Task<IResult> ConfigureSettingsAsync(
        Guid agencyId,
        AdminChannelSettingsRequest request,
        HttpContext context,
        IAdminChannelService channel,
        IAdminAuditWriter audit,
        CancellationToken cancellationToken)
    {
        if (!Enum.TryParse<ChannelPlan>(request.Plan, true, out var plan))
        {
            return context.ToProblem(new Hani.BuildingBlocks.Application.Error(
                "HANI-CHANNEL-4001",
                "Invalid channel plan.",
                Hani.BuildingBlocks.Application.ErrorType.Validation));
        }

        var result = await channel.ConfigureSettingsAsync(
            agencyId,
            new AdminChannelSettingsInput(
                plan,
                request.WhiteLabelEnabled,
                request.CustomDomain,
                request.AttributionRequired,
                request.CanonicalMode),
            cancellationToken);
        if (!result.IsSuccess)
        {
            return context.ToProblem(result.Error!);
        }

        await audit.RecordAsync(
            context,
            "channel.settings.updated",
            "Agency",
            agencyId.ToString(),
            "Channel plan and white-label settings updated",
            agencyId: agencyId,
            after: result.Value,
            cancellationToken: cancellationToken);
        return Results.Ok(result.Value);
    }

    private static async Task<IResult> ConfigureWebhookAsync(
        Guid agencyId,
        AdminChannelWebhookRequest request,
        HttpContext context,
        IAdminChannelService channel,
        IAdminAuditWriter audit,
        CancellationToken cancellationToken)
    {
        var result = await channel.ConfigureWebhookAsync(
            agencyId,
            request.Url,
            request.Secret,
            cancellationToken);
        if (!result.IsSuccess)
        {
            return context.ToProblem(result.Error!);
        }

        await audit.RecordAsync(
            context,
            "channel.webhook.updated",
            "Agency",
            agencyId.ToString(),
            "Channel webhook updated from the admin panel",
            agencyId: agencyId,
            after: new { request.Url },
            cancellationToken: cancellationToken);
        return Results.Ok(result.Value);
    }
}

/// <summary>Create channel API client request.</summary>
public sealed record AdminCreateApiClientRequest(
    Guid AgencyId,
    string Name,
    IReadOnlyList<string> Scopes);

/// <summary>Channel settings request.</summary>
public sealed record AdminChannelSettingsRequest(
    string Plan,
    bool WhiteLabelEnabled,
    string? CustomDomain,
    bool AttributionRequired,
    string CanonicalMode);

/// <summary>Channel webhook request.</summary>
public sealed record AdminChannelWebhookRequest(string? Url, string? Secret);
