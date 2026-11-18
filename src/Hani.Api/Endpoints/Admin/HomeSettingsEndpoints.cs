using System.Text.Json;
using Hani.BuildingBlocks.Application;
using Hani.BuildingBlocks.AspNetCore;
using Hani.Modules.Admin.Application;
using Microsoft.AspNetCore.Mvc;
using IResult = Microsoft.AspNetCore.Http.IResult;

namespace Hani.Api;

/// <summary>Homepage settings endpoints.</summary>
public static class HomeSettingsEndpoints
{
    /// <summary>Maps public and admin homepage-settings endpoints.</summary>
    public static IEndpointRouteBuilder MapHomeSettingsEndpoints(this IEndpointRouteBuilder app)
    {
        app.MapGet("/market/v1/home-settings", GetAsync)
            .WithName("Marketplace.GetHomeSettings")
            .Produces<HomePageSettingsDto>();

        var internalApi = app.MapGroup("/internal/v1/home-settings")
            .WithTags("Internal.HomeSettings")
            .RequireAuthorization("Admin");

        internalApi.MapGet("", GetAsync)
            .WithName("Internal.GetHomeSettings")
            .Produces<HomePageSettingsDto>();

        internalApi.MapPut("", PutAsync)
            .WithName("Internal.UpdateHomeSettings")
            .Produces<HomePageSettingsDto>()
            .ProducesProblem(StatusCodes.Status400BadRequest);

        return app;
    }

    private static async Task<IResult> GetAsync(
        [FromQuery] string? key,
        [FromQuery] string? locale,
        IAdminHomeSettingsService settings,
        CancellationToken cancellationToken)
        => Results.Ok(await settings.GetAsync(key, locale, cancellationToken));

    private static async Task<IResult> PutAsync(
        UpdateHomePageSettingsRequest request,
        HttpContext context,
        IAdminHomeSettingsService settings,
        CancellationToken cancellationToken)
    {
        try
        {
            return Results.Ok(await settings.UpdateAsync(
                request.Key,
                request.Locale,
                request.Settings,
                cancellationToken));
        }
        catch (ArgumentException exception)
        {
            return context.ToProblem(Error.Validation("HANI-HOME-1001", exception.Message));
        }
    }
}

/// <summary>Homepage settings update request.</summary>
public sealed record UpdateHomePageSettingsRequest(
    string? Key,
    string? Locale,
    JsonElement Settings);
