using Hani.BuildingBlocks.Application;
using Hani.BuildingBlocks.AspNetCore;
using Hani.Modules.Identity.Application.Commands.Engagement;
using Hani.Modules.Identity.Domain.Claims;
using Hani.Modules.Identity.Domain.Media;
using Hani.Modules.Identity.Domain.Reviews;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using IResult = Microsoft.AspNetCore.Http.IResult;

namespace Hani.Modules.Identity.Presentation;

/// <summary>
/// Review, ownership-claim, and media moderation endpoints.
/// </summary>
public static class EngagementEndpoints
{
    /// <summary>
    /// Maps marketplace and internal engagement endpoints.
    /// </summary>
    public static IEndpointRouteBuilder MapEngagementEndpoints(this IEndpointRouteBuilder app)
    {
        var market = app.MapGroup("/market/v1").WithTags("Marketplace.Engagement");
        var internalApi = app.MapGroup("/internal/v1").WithTags("Internal.Engagement");

        market.MapPost("/reviews", CreateReviewAsync)
            .WithName("Marketplace.CreateReview")
            .RequireAuthorization("User")
            .Produces<ReviewDto>()
            .ProducesProblem(StatusCodes.Status400BadRequest);

        market.MapGet("/reviews", GetReviewsAsync)
            .WithName("Marketplace.GetReviews")
            .Produces<PagedResult<ReviewDto>>();

        market.MapPost("/reviews/{reviewId:guid}/helpful", MarkHelpfulAsync)
            .WithName("Marketplace.MarkReviewHelpful")
            .RequireAuthorization("User")
            .Produces<bool>();

        market.MapPost("/reviews/{reviewId:guid}/report", ReportReviewAsync)
            .WithName("Marketplace.ReportReview")
            .RequireAuthorization("User")
            .Produces<bool>();

        market.MapPost("/claims", CreateClaimAsync)
            .WithName("Marketplace.CreateClaim")
            .RequireAuthorization("User")
            .Produces<ClaimDto>()
            .ProducesProblem(StatusCodes.Status400BadRequest);

        market.MapPost("/media", RegisterMediaAsync)
            .WithName("Marketplace.RegisterMedia")
            .RequireAuthorization("User")
            .Produces<MediaDto>()
            .ProducesProblem(StatusCodes.Status400BadRequest);

        internalApi.MapGet("/reviews", GetPendingReviewsAsync)
            .WithName("Internal.GetPendingReviews")
            .Produces<PagedResult<ReviewDto>>();

        internalApi.MapPost("/reviews/{reviewId:guid}/publish", PublishReviewAsync)
            .WithName("Internal.PublishReview")
            .Produces<bool>();

        internalApi.MapPost("/reviews/{reviewId:guid}/reject", RejectReviewAsync)
            .WithName("Internal.RejectReview")
            .Produces<bool>();

        internalApi.MapGet("/claims", GetClaimsAsync)
            .WithName("Internal.GetClaims")
            .Produces<PagedResult<ClaimDto>>();

        internalApi.MapPost("/claims/{claimId:guid}/approve", ApproveClaimAsync)
            .WithName("Internal.ApproveClaim")
            .Produces<bool>();

        internalApi.MapPost("/claims/{claimId:guid}/reject", RejectClaimAsync)
            .WithName("Internal.RejectClaim")
            .Produces<bool>();

        internalApi.MapGet("/media", GetMediaAsync)
            .WithName("Internal.GetMedia")
            .Produces<PagedResult<MediaDto>>();

        internalApi.MapPost("/media/{mediaId:guid}/approve", ApproveMediaAsync)
            .WithName("Internal.ApproveMedia")
            .Produces<bool>();

        internalApi.MapPost("/media/{mediaId:guid}/reject", RejectMediaAsync)
            .WithName("Internal.RejectMedia")
            .Produces<bool>();

        return app;
    }

    /// <summary>
    /// Creates a pending review for the authenticated user.
    /// </summary>
    private static async Task<IResult> CreateReviewAsync(
        CreateReviewRequest request,
        HttpContext context,
        ISender sender,
        CancellationToken cancellationToken)
    {
        if (!context.User.TryGetUserId(out var userId))
        {
            return context.ToProblem(
                Error.Unauthorized("HANI-IDENTITY-1500", "Authenticated user is required."));
        }

        var result = await sender.Send(
            new CreateReviewCommand(
                userId,
                request.TargetType,
                request.TargetId,
                request.Rating,
                request.FoodRating,
                request.CleanlinessRating,
                request.StaffRating,
                request.EntertainmentRating,
                request.LocationRating,
                request.ValueRating,
                request.Title,
                request.Comment,
                request.TravelType,
                request.VisitDate,
                request.Photos
                    .Select(photo => new ReviewPhotoInput(photo.Url, photo.Caption))
                    .ToArray()),
            cancellationToken);

        return result.IsSuccess ? Results.Ok(result.Value) : context.ToProblem(result.Error!);
    }

    /// <summary>
    /// Returns published reviews for a target.
    /// </summary>
    private static async Task<IResult> GetReviewsAsync(
        ReviewTargetType targetType,
        Guid targetId,
        int? minRating,
        string? sort,
        int page,
        int pageSize,
        HttpContext context,
        ISender sender,
        CancellationToken cancellationToken)
    {
        var result = await sender.Send(
            new GetReviewsQuery(
                targetType,
                targetId,
                minRating,
                sort,
                page == 0 ? 1 : page,
                pageSize == 0 ? 20 : pageSize),
            cancellationToken);

        return result.IsSuccess ? Results.Ok(result.Value) : context.ToProblem(result.Error!);
    }

    /// <summary>
    /// Marks a review helpful for the authenticated user.
    /// </summary>
    private static async Task<IResult> MarkHelpfulAsync(
        Guid reviewId,
        HttpContext context,
        ISender sender,
        CancellationToken cancellationToken)
    {
        if (!context.User.TryGetUserId(out var userId))
        {
            return context.ToProblem(
                Error.Unauthorized("HANI-IDENTITY-1500", "Authenticated user is required."));
        }

        var result = await sender.Send(
            new MarkReviewHelpfulCommand(userId, reviewId),
            cancellationToken);
        return result.IsSuccess ? Results.Ok(result.Value) : context.ToProblem(result.Error!);
    }

    /// <summary>
    /// Reports a review for the authenticated user.
    /// </summary>
    private static async Task<IResult> ReportReviewAsync(
        Guid reviewId,
        ReportReviewRequest request,
        HttpContext context,
        ISender sender,
        CancellationToken cancellationToken)
    {
        if (!context.User.TryGetUserId(out var userId))
        {
            return context.ToProblem(
                Error.Unauthorized("HANI-IDENTITY-1500", "Authenticated user is required."));
        }

        var result = await sender.Send(
            new ReportReviewCommand(userId, reviewId, request.Reason),
            cancellationToken);
        return result.IsSuccess ? Results.Ok(result.Value) : context.ToProblem(result.Error!);
    }

    /// <summary>
    /// Creates a pending ownership or correction claim.
    /// </summary>
    private static async Task<IResult> CreateClaimAsync(
        CreateClaimRequest request,
        HttpContext context,
        ISender sender,
        CancellationToken cancellationToken)
    {
        if (!context.User.TryGetUserId(out var userId))
        {
            return context.ToProblem(
                Error.Unauthorized("HANI-IDENTITY-1600", "Authenticated user is required."));
        }

        var result = await sender.Send(
            new CreateClaimCommand(
                userId,
                request.TargetType,
                request.TargetId,
                request.ClaimType,
                request.FullName,
                request.Email,
                request.Phone,
                request.Message,
                request.EvidenceUrl),
            cancellationToken);

        return result.IsSuccess ? Results.Ok(result.Value) : context.ToProblem(result.Error!);
    }

    /// <summary>
    /// Registers a media asset for moderation.
    /// </summary>
    private static async Task<IResult> RegisterMediaAsync(
        RegisterMediaRequest request,
        HttpContext context,
        ISender sender,
        CancellationToken cancellationToken)
    {
        if (!context.User.TryGetUserId(out var userId))
        {
            return context.ToProblem(
                Error.Unauthorized("HANI-IDENTITY-1700", "Authenticated user is required."));
        }

        var result = await sender.Send(
            new RegisterMediaCommand(
                userId,
                request.Url,
                request.ContentType,
                request.SizeBytes,
                request.Kind),
            cancellationToken);

        return result.IsSuccess ? Results.Ok(result.Value) : context.ToProblem(result.Error!);
    }

    /// <summary>
    /// Returns reviews awaiting moderation.
    /// </summary>
    private static async Task<IResult> GetPendingReviewsAsync(
        int page,
        int pageSize,
        HttpContext context,
        ISender sender,
        CancellationToken cancellationToken)
    {
        var result = await sender.Send(
            new GetPendingReviewsQuery(
                page == 0 ? 1 : page,
                pageSize == 0 ? 20 : pageSize),
            cancellationToken);
        return result.IsSuccess ? Results.Ok(result.Value) : context.ToProblem(result.Error!);
    }

    /// <summary>
    /// Publishes a pending review.
    /// </summary>
    private static async Task<IResult> PublishReviewAsync(
        Guid reviewId,
        HttpContext context,
        ISender sender,
        CancellationToken cancellationToken)
    {
        var result = await sender.Send(new PublishReviewCommand(reviewId), cancellationToken);
        return result.IsSuccess ? Results.Ok(result.Value) : context.ToProblem(result.Error!);
    }

    /// <summary>
    /// Rejects a pending review.
    /// </summary>
    private static async Task<IResult> RejectReviewAsync(
        Guid reviewId,
        ModerationRequest request,
        HttpContext context,
        ISender sender,
        CancellationToken cancellationToken)
    {
        var result = await sender.Send(
            new RejectReviewCommand(reviewId, request.Reason),
            cancellationToken);
        return result.IsSuccess ? Results.Ok(result.Value) : context.ToProblem(result.Error!);
    }

    /// <summary>
    /// Returns claims for the admin panel.
    /// </summary>
    private static async Task<IResult> GetClaimsAsync(
        string? status,
        int page,
        int pageSize,
        HttpContext context,
        ISender sender,
        CancellationToken cancellationToken)
    {
        var result = await sender.Send(
            new GetClaimsQuery(
                status,
                page == 0 ? 1 : page,
                pageSize == 0 ? 20 : pageSize),
            cancellationToken);
        return result.IsSuccess ? Results.Ok(result.Value) : context.ToProblem(result.Error!);
    }

    /// <summary>
    /// Approves a pending claim.
    /// </summary>
    private static async Task<IResult> ApproveClaimAsync(
        Guid claimId,
        HttpContext context,
        ISender sender,
        CancellationToken cancellationToken)
    {
        var result = await sender.Send(new ApproveClaimCommand(claimId), cancellationToken);
        return result.IsSuccess ? Results.Ok(result.Value) : context.ToProblem(result.Error!);
    }

    /// <summary>
    /// Rejects a pending claim.
    /// </summary>
    private static async Task<IResult> RejectClaimAsync(
        Guid claimId,
        ModerationRequest request,
        HttpContext context,
        ISender sender,
        CancellationToken cancellationToken)
    {
        var result = await sender.Send(
            new RejectClaimCommand(claimId, request.Reason),
            cancellationToken);
        return result.IsSuccess ? Results.Ok(result.Value) : context.ToProblem(result.Error!);
    }

    /// <summary>
    /// Returns media awaiting moderation.
    /// </summary>
    private static async Task<IResult> GetMediaAsync(
        string? status,
        int page,
        int pageSize,
        HttpContext context,
        ISender sender,
        CancellationToken cancellationToken)
    {
        var result = await sender.Send(
            new GetMediaQuery(
                status,
                page == 0 ? 1 : page,
                pageSize == 0 ? 20 : pageSize),
            cancellationToken);
        return result.IsSuccess ? Results.Ok(result.Value) : context.ToProblem(result.Error!);
    }

    /// <summary>
    /// Approves a pending media asset.
    /// </summary>
    private static async Task<IResult> ApproveMediaAsync(
        Guid mediaId,
        HttpContext context,
        ISender sender,
        CancellationToken cancellationToken)
    {
        var result = await sender.Send(new ApproveMediaCommand(mediaId), cancellationToken);
        return result.IsSuccess ? Results.Ok(result.Value) : context.ToProblem(result.Error!);
    }

    /// <summary>
    /// Rejects a pending media asset.
    /// </summary>
    private static async Task<IResult> RejectMediaAsync(
        Guid mediaId,
        ModerationRequest request,
        HttpContext context,
        ISender sender,
        CancellationToken cancellationToken)
    {
        var result = await sender.Send(
            new RejectMediaCommand(mediaId, request.Reason),
            cancellationToken);
        return result.IsSuccess ? Results.Ok(result.Value) : context.ToProblem(result.Error!);
    }
}

/// <summary>
/// HTTP request to create a review.
/// </summary>
public sealed record CreateReviewRequest(
    ReviewTargetType TargetType,
    Guid TargetId,
    int Rating,
    int? FoodRating,
    int? CleanlinessRating,
    int? StaffRating,
    int? EntertainmentRating,
    int? LocationRating,
    int? ValueRating,
    string? Title,
    string Comment,
    TravelType TravelType,
    DateOnly? VisitDate,
    IReadOnlyList<ReviewPhotoRequest> Photos);

/// <summary>
/// Review photo request.
/// </summary>
public sealed record ReviewPhotoRequest(string Url, string? Caption = null);

/// <summary>
/// Review report request.
/// </summary>
public sealed record ReportReviewRequest(string Reason);

/// <summary>
/// HTTP request to create an ownership/correction claim.
/// </summary>
public sealed record CreateClaimRequest(
    ReviewTargetType TargetType,
    Guid TargetId,
    ClaimType ClaimType,
    string FullName,
    string Email,
    string? Phone,
    string Message,
    string? EvidenceUrl);

/// <summary>
/// HTTP request to register a media asset.
/// </summary>
public sealed record RegisterMediaRequest(
    string Url,
    string ContentType,
    long SizeBytes,
    MediaKind Kind);

/// <summary>
/// HTTP request used for moderation actions.
/// </summary>
public sealed record ModerationRequest(string Reason);
