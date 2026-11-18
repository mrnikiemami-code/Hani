using Hani.BuildingBlocks.AspNetCore;
using Hani.Modules.Content.Application.Commands.Growth;
using Hani.Modules.Content.Application.Queries.AdminAds;
using MediatR;

namespace Hani.Api;

/// <summary>
/// Admin advertising endpoints. Query logic lives in the Content module.
/// </summary>
public static class AdminAdsEndpoints
{
    /// <summary>Maps admin advertising endpoints.</summary>
    public static IEndpointRouteBuilder MapAdminAdsEndpoints(this IEndpointRouteBuilder app)
    {
        app.MapGet("/internal/v1/admin/marketing/ad-slots", ListAsync)
            .WithTags("Internal.Admin.Ads")
            .WithName("Internal.ListAdminAdSlots")
            .RequireAuthorization("Admin")
            .Produces<IReadOnlyList<AdminAdSlotDto>>();

        app.MapPost("/internal/v1/admin/marketing/ad-slots", CreateSlotAsync)
            .WithTags("Internal.Admin.Ads")
            .WithName("Internal.CreateAdminAdSlot")
            .RequireAuthorization("Admin")
            .Produces<Guid>(StatusCodes.Status201Created);

        app.MapPost("/internal/v1/admin/marketing/ad-slots/{code}/creatives", AddCreativeAsync)
            .WithTags("Internal.Admin.Ads")
            .WithName("Internal.AddAdminAdCreative")
            .RequireAuthorization("Admin")
            .Produces<Guid>(StatusCodes.Status201Created);
        return app;
    }

    private static async Task<IResult> ListAsync(
        HttpContext context,
        ISender sender,
        CancellationToken cancellationToken)
    {
        var result = await sender.Send(new ListAdminAdSlotsQuery(), cancellationToken);
        return result.IsSuccess ? Results.Ok(result.Value) : context.ToProblem(result.Error!);
    }

    private static async Task<IResult> CreateSlotAsync(
        AdminCreateAdSlotRequest request,
        HttpContext context,
        ISender sender,
        AdminAuditWriter audit,
        CancellationToken cancellationToken)
    {
        var result = await sender.Send(
            new CreateAdSlotCommand(request.Code, request.Name),
            cancellationToken);
        if (!result.IsSuccess)
        {
            return context.ToProblem(result.Error!);
        }

        await audit.RecordAsync(
            context,
            "marketing.ad_slot.created",
            "AdSlot",
            result.Value.ToString(),
            "Advertising slot created from the admin panel",
            after: new { request.Code, request.Name },
            cancellationToken: cancellationToken);
        return Results.Created(
            $"/internal/v1/admin/marketing/ad-slots/{request.Code}",
            result.Value);
    }

    private static async Task<IResult> AddCreativeAsync(
        string code,
        AdminAddAdCreativeRequest request,
        HttpContext context,
        ISender sender,
        AdminAuditWriter audit,
        CancellationToken cancellationToken)
    {
        var result = await sender.Send(
            new AddAdCreativeCommand(
                code,
                request.Title,
                request.ImageUrl,
                request.TargetUrl,
                request.StartsAt,
                request.EndsAt),
            cancellationToken);
        if (!result.IsSuccess)
        {
            return context.ToProblem(result.Error!);
        }

        await audit.RecordAsync(
            context,
            "marketing.ad_creative.created",
            "AdCreative",
            result.Value.ToString(),
            "Advertising creative added from the admin panel",
            after: new { code, request.Title, request.ImageUrl, request.TargetUrl },
            cancellationToken: cancellationToken);
        return Results.Created(
            $"/internal/v1/admin/marketing/ad-slots/{code}/creatives",
            result.Value);
    }
}

/// <summary>Ad slot creation request.</summary>
public sealed record AdminCreateAdSlotRequest(string Code, string Name);

/// <summary>Ad creative creation request.</summary>
public sealed record AdminAddAdCreativeRequest(
    string Title,
    string ImageUrl,
    string TargetUrl,
    DateTimeOffset? StartsAt,
    DateTimeOffset? EndsAt);
