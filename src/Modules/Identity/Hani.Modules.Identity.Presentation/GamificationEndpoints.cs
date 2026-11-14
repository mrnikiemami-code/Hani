using Hani.BuildingBlocks.AspNetCore;
using Hani.Modules.Identity.Application.Commands.Gamification;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using IResult = Microsoft.AspNetCore.Http.IResult;

namespace Hani.Modules.Identity.Presentation;

/// <summary>
/// Public and internal gamification endpoints.
/// </summary>
public static class GamificationEndpoints
{
    /// <summary>Maps gamification endpoints.</summary>
    public static IEndpointRouteBuilder MapGamificationEndpoints(this IEndpointRouteBuilder app)
    {
        var market = app.MapGroup("/market/v1/gamification").WithTags("Gamification");
        var internalApi = app.MapGroup("/internal/v1/gamification").WithTags("Internal.Gamification");

        market.MapGet("/users/{userId:guid}", GetUserAsync).WithName("Marketplace.GetUserGamification");
        market.MapGet("/badges", ListBadgesAsync).WithName("Marketplace.ListBadges");
        internalApi.MapPost("/points", AwardPointsAsync).WithName("Internal.AwardPoints");
        internalApi.MapPost("/travel-style", SetTravelStyleAsync).WithName("Internal.SetTravelStyle");
        internalApi.MapPost("/badges", CreateBadgeAsync).WithName("Internal.CreateBadgeDefinition");
        internalApi.MapPost("/award", AwardBadgeAsync).WithName("Internal.AwardBadge");
        return app;
    }

    /// <summary>Returns one user's gamification profile.</summary>
    private static async Task<IResult> GetUserAsync(
        Guid userId,
        HttpContext context,
        ISender sender,
        CancellationToken cancellationToken)
    {
        var result = await sender.Send(new GetUserGamificationQuery(userId), cancellationToken);
        return result.IsSuccess ? Results.Ok(result.Value) : context.ToProblem(result.Error!);
    }

    /// <summary>Lists badge definitions.</summary>
    private static async Task<IResult> ListBadgesAsync(
        HttpContext context,
        ISender sender,
        CancellationToken cancellationToken)
    {
        var result = await sender.Send(new ListBadgeDefinitionsQuery(), cancellationToken);
        return result.IsSuccess ? Results.Ok(result.Value) : context.ToProblem(result.Error!);
    }

    /// <summary>Awards points.</summary>
    private static async Task<IResult> AwardPointsAsync(
        AwardPointsRequest request,
        HttpContext context,
        ISender sender,
        CancellationToken cancellationToken)
    {
        var result = await sender.Send(
            new AwardPointsCommand(request.UserId, request.Points),
            cancellationToken);
        return result.IsSuccess ? Results.Ok(result.Value) : context.ToProblem(result.Error!);
    }

    /// <summary>Sets a travel style.</summary>
    private static async Task<IResult> SetTravelStyleAsync(
        SetTravelStyleRequest request,
        HttpContext context,
        ISender sender,
        CancellationToken cancellationToken)
    {
        var result = await sender.Send(
            new SetTravelStyleCommand(request.UserId, request.TravelStyle),
            cancellationToken);
        return result.IsSuccess ? Results.Ok(result.Value) : context.ToProblem(result.Error!);
    }

    /// <summary>Creates a badge definition.</summary>
    private static async Task<IResult> CreateBadgeAsync(
        CreateBadgeRequest request,
        HttpContext context,
        ISender sender,
        CancellationToken cancellationToken)
    {
        var result = await sender.Send(
            new CreateBadgeDefinitionCommand(
                request.Code,
                request.Name,
                request.Description,
                request.Category,
                request.Threshold),
            cancellationToken);
        return result.IsSuccess
            ? Results.Created("/market/v1/gamification/badges", result.Value)
            : context.ToProblem(result.Error!);
    }

    /// <summary>Awards a badge.</summary>
    private static async Task<IResult> AwardBadgeAsync(
        AwardBadgeRequest request,
        HttpContext context,
        ISender sender,
        CancellationToken cancellationToken)
    {
        var result = await sender.Send(
            new AwardBadgeCommand(request.UserId, request.BadgeCode),
            cancellationToken);
        return result.IsSuccess
            ? Results.Created("/market/v1/gamification/users/" + request.UserId, result.Value)
            : context.ToProblem(result.Error!);
    }
}

/// <summary>Points award request.</summary>
public sealed record AwardPointsRequest(Guid UserId, int Points);

/// <summary>Travel style request.</summary>
public sealed record SetTravelStyleRequest(Guid UserId, string? TravelStyle);

/// <summary>Badge definition request.</summary>
public sealed record CreateBadgeRequest(
    string Code,
    string Name,
    string Description,
    string Category,
    int Threshold);

/// <summary>Badge award request.</summary>
public sealed record AwardBadgeRequest(Guid UserId, string BadgeCode);
