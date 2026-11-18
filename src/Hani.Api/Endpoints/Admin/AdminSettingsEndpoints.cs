using System.Text.Json;
using Hani.BuildingBlocks.Application;
using Hani.BuildingBlocks.AspNetCore;
using Hani.Modules.Admin.Application;
using IResult = Microsoft.AspNetCore.Http.IResult;

namespace Hani.Api;

/// <summary>Admin platform base-settings endpoint.</summary>
public static class AdminSettingsEndpoints
{
    /// <summary>Maps platform settings endpoints.</summary>
    public static IEndpointRouteBuilder MapAdminSettingsEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/internal/v1/admin/platform-settings")
            .WithTags("Internal.Admin.Settings")
            .RequireAuthorization("Admin");

        group.MapGet("", GetAsync)
            .WithName("Internal.GetAdminPlatformSettings")
            .Produces<AdminPlatformSettingsDto>();

        group.MapPut("", UpdateAsync)
            .WithName("Internal.UpdateAdminPlatformSettings")
            .Produces<AdminPlatformSettingsDto>();

        return app;
    }

    private static async Task<IResult> GetAsync(
        IAdminPlatformSettingsService settings,
        CancellationToken cancellationToken)
        => Results.Ok(await settings.GetAsync(cancellationToken));

    private static async Task<IResult> UpdateAsync(
        AdminPlatformSettingsWriteRequest request,
        HttpContext context,
        IAdminPlatformSettingsService settings,
        IAdminAuditWriter audit,
        CancellationToken cancellationToken)
    {
        if (!AdminActorContextFactory.TryCreate(context, out var actor))
        {
            return context.ToProblem(Error.Unauthorized(
                "HANI-SETTINGS-4001",
                "An authenticated administrator is required."));
        }

        try
        {
            var result = await settings.UpdateAsync(
                request.Settings,
                actor.UserId,
                cancellationToken);
            await audit.RecordAsync(
                actor,
                "settings.platform.updated",
                "PlatformSettings",
                "platform",
                "Platform base settings updated from the admin panel",
                cancellationToken: cancellationToken);
            return Results.Ok(result);
        }
        catch (ArgumentException exception)
        {
            return context.ToProblem(Error.Validation(
                "HANI-SETTINGS-4002",
                exception.Message));
        }
    }
}

/// <summary>Platform settings update request.</summary>
public sealed record AdminPlatformSettingsWriteRequest(JsonElement Settings);
