using System.Text.Json;
using Hani.BuildingBlocks.Application;
using Hani.BuildingBlocks.AspNetCore;
using Hani.Modules.Content.Domain.Settings;
using Hani.Modules.Content.Infrastructure.Persistence;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using IResult = Microsoft.AspNetCore.Http.IResult;

namespace Hani.Api;

/// <summary>
/// Reads and writes homepage composition and image settings.
/// </summary>
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
        ILanguageCatalog languages,
        ContentDbContext db,
        CancellationToken cancellationToken)
    {
        var normalizedKey = NormalizeKey(key);
        var normalizedLocale = languages.Normalize(locale);
        var entity = await db.HomePageSettings
            .AsNoTracking()
            .FirstOrDefaultAsync(
                item => item.Key == normalizedKey && item.Locale == normalizedLocale,
                cancellationToken);

        return Results.Ok(ToDto(entity, normalizedKey, normalizedLocale));
    }

    private static async Task<IResult> PutAsync(
        UpdateHomePageSettingsRequest request,
        HttpContext context,
        ILanguageCatalog languages,
        ContentDbContext db,
        CancellationToken cancellationToken)
    {
        if (request.Settings.ValueKind != JsonValueKind.Object)
        {
            return context.ToProblem(
                Error.Validation("HANI-HOME-1001", "Settings must be a JSON object."));
        }

        var json = request.Settings.GetRawText();
        if (json.Length > 100_000)
        {
            return context.ToProblem(
                Error.Validation("HANI-HOME-1002", "Settings must be at most 100 KB."));
        }

        var key = NormalizeKey(request.Key);
        var locale = languages.Normalize(request.Locale);
        var entity = await db.HomePageSettings
            .FirstOrDefaultAsync(
                item => item.Key == key && item.Locale == locale,
                cancellationToken);

        if (entity is null)
        {
            entity = HomePageSettings.Create(key, locale, json);
            await db.HomePageSettings.AddAsync(entity, cancellationToken);
        }
        else
        {
            entity.Update(json);
        }

        await db.SaveChangesAsync(cancellationToken);
        return Results.Ok(ToDto(entity, key, locale));
    }

    private static HomePageSettingsDto ToDto(
        HomePageSettings? entity,
        string key,
        string locale)
    {
        var settings = entity is null
            ? JsonDocument.Parse("{}").RootElement.Clone()
            : JsonDocument.Parse(entity.SettingsJson).RootElement.Clone();

        return new HomePageSettingsDto(
            key,
            locale,
            settings,
            entity?.UpdatedAt);
    }

    private static string NormalizeKey(string? key) =>
        string.IsNullOrWhiteSpace(key) ? "default" : key.Trim().ToLowerInvariant();


}

/// <summary>Homepage settings response.</summary>
public sealed record HomePageSettingsDto(
    string Key,
    string Locale,
    JsonElement Settings,
    DateTimeOffset? UpdatedAt);

/// <summary>Homepage settings update request.</summary>
public sealed record UpdateHomePageSettingsRequest(
    string? Key,
    string? Locale,
    JsonElement Settings);
