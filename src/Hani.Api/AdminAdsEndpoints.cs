using Hani.BuildingBlocks.AspNetCore;
using Hani.Modules.Content.Application.Commands.Growth;
using Hani.Modules.Content.Domain.Growth;
using Hani.Modules.Content.Infrastructure.Persistence;
using Hani.Modules.Identity.Infrastructure.Persistence;
using MediatR;
using Microsoft.EntityFrameworkCore;
using IResult = Microsoft.AspNetCore.Http.IResult;

namespace Hani.Api;

/// <summary>
/// Admin advertising slots and creatives. Paid creatives are managed
/// separately from organic campaign ranking.
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
        ContentDbContext content,
        CancellationToken cancellationToken)
    {
        var slots = await content.AdSlots
            .AsNoTracking()
            .Include(item => item.Creatives)
            .OrderBy(item => item.Code)
            .ToArrayAsync(cancellationToken);
        var eventRows = await content.AdEvents
            .AsNoTracking()
            .GroupBy(item => new { item.CreativeId, item.Type })
            .Select(group => new
            {
                group.Key.CreativeId,
                group.Key.Type,
                Count = group.Count()
            })
            .ToArrayAsync(cancellationToken);
        var impressions = eventRows
            .Where(row => row.Type == AdEventType.Impression)
            .ToDictionary(row => row.CreativeId, row => row.Count);
        var clicks = eventRows
            .Where(row => row.Type == AdEventType.Click)
            .ToDictionary(row => row.CreativeId, row => row.Count);

        return Results.Ok(slots.Select(slot => new AdminAdSlotDto(
            slot.Id,
            slot.Code,
            slot.Name,
            slot.IsActive,
            slot.CreatedAt,
            slot.Creatives
                .OrderBy(creative => creative.Title)
                .Select(creative => new AdminAdCreativeDto(
                    creative.Id,
                    creative.Title,
                    creative.ImageUrl,
                    creative.TargetUrl,
                    creative.StartsAt,
                    creative.EndsAt,
                    creative.IsActive,
                    impressions.GetValueOrDefault(creative.Id),
                    clicks.GetValueOrDefault(creative.Id)))
                .ToArray()))
            .ToArray());
    }

    private static async Task<IResult> CreateSlotAsync(
        AdminCreateAdSlotRequest request,
        HttpContext context,
        ISender sender,
        IdentityDbContext identity,
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

        audit.Record(
            context,
            identity,
            "marketing.ad_slot.created",
            "AdSlot",
            result.Value.ToString(),
            "Advertising slot created from the admin panel",
            after: new { request.Code, request.Name });
        await identity.SaveChangesAsync(cancellationToken);
        return Results.Created(
            $"/internal/v1/admin/marketing/ad-slots/{request.Code}",
            result.Value);
    }

    private static async Task<IResult> AddCreativeAsync(
        string code,
        AdminAddAdCreativeRequest request,
        HttpContext context,
        ISender sender,
        IdentityDbContext identity,
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

        audit.Record(
            context,
            identity,
            "marketing.ad_creative.created",
            "AdCreative",
            result.Value.ToString(),
            "Advertising creative added from the admin panel",
            after: new { code, request.Title, request.ImageUrl, request.TargetUrl });
        await identity.SaveChangesAsync(cancellationToken);
        return Results.Created(
            $"/internal/v1/admin/marketing/ad-slots/{code}/creatives",
            result.Value);
    }
}

/// <summary>Admin ad slot row.</summary>
public sealed record AdminAdSlotDto(
    Guid Id,
    string Code,
    string Name,
    bool IsActive,
    DateTimeOffset CreatedAt,
    IReadOnlyList<AdminAdCreativeDto> Creatives);

/// <summary>Admin ad creative row with basic delivery counters.</summary>
public sealed record AdminAdCreativeDto(
    Guid Id,
    string Title,
    string ImageUrl,
    string TargetUrl,
    DateTimeOffset? StartsAt,
    DateTimeOffset? EndsAt,
    bool IsActive,
    int Impressions,
    int Clicks);

/// <summary>Ad slot creation request.</summary>
public sealed record AdminCreateAdSlotRequest(string Code, string Name);

/// <summary>Ad creative creation request.</summary>
public sealed record AdminAddAdCreativeRequest(
    string Title,
    string ImageUrl,
    string TargetUrl,
    DateTimeOffset? StartsAt,
    DateTimeOffset? EndsAt);
