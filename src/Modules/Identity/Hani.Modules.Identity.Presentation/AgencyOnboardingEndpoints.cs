using Hani.BuildingBlocks.Application;
using Hani.BuildingBlocks.AspNetCore;
using Hani.Modules.Identity.Application.Commands.AgencyOnboarding;
using Hani.Modules.Identity.Application.Queries.GetAgencyById;
using Hani.Modules.Identity.Domain.Agencies;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using IResult = Microsoft.AspNetCore.Http.IResult;

namespace Hani.Modules.Identity.Presentation;

/// <summary>
/// Agency onboarding, public profile, and admin review endpoints.
/// </summary>
public static class AgencyOnboardingEndpoints
{
    /// <summary>
    /// Maps agency onboarding and moderation endpoints.
    /// </summary>
    public static IEndpointRouteBuilder MapAgencyOnboardingEndpoints(this IEndpointRouteBuilder app)
    {
        var market = app.MapGroup("/market/v1/agencies").WithTags("Marketplace.Agency");
        var internalApi = app.MapGroup("/internal/v1/agencies").WithTags("Internal.Agency");

        market.MapPost("/onboarding", CreateOnboardingAsync)
            .WithName("Marketplace.CreateAgencyOnboarding")
            .RequireAuthorization("User")
            .Produces<AgencyDto>()
            .ProducesProblem(StatusCodes.Status400BadRequest)
            .ProducesProblem(StatusCodes.Status409Conflict);

        market.MapGet("/me", GetMyAgencyAsync)
            .WithName("Marketplace.GetMyAgency")
            .RequireAuthorization("User")
            .Produces<AgencyDto>()
            .ProducesProblem(StatusCodes.Status404NotFound);

        market.MapGet("/{slug}", GetPublicAgencyAsync)
            .WithName("Marketplace.GetPublicAgency")
            .Produces<PublicAgencyDto>()
            .ProducesProblem(StatusCodes.Status404NotFound);

        internalApi.MapGet("/", ListAgenciesAsync)
            .WithName("Internal.ListAgencies")
            .Produces<IReadOnlyList<AgencyDto>>();

        internalApi.MapPost("/{agencyId:guid}/approve", ApproveAgencyAsync)
            .WithName("Internal.ApproveAgency")
            .Produces<bool>();

        internalApi.MapPost("/{agencyId:guid}/reject", RejectAgencyAsync)
            .WithName("Internal.RejectAgency")
            .Produces<bool>();

        return app;
    }

    /// <summary>
    /// Creates a pending agency onboarding request for the authenticated user.
    /// </summary>
    private static async Task<IResult> CreateOnboardingAsync(
        CreateAgencyOnboardingRequest request,
        HttpContext context,
        ISender sender,
        CancellationToken cancellationToken)
    {
        if (!context.User.TryGetUserId(out var userId))
        {
            return context.ToProblem(
                Error.Unauthorized("HANI-IDENTITY-1400", "Authenticated user is required."));
        }

        var result = await sender.Send(
            new CreateAgencyOnboardingCommand(
                userId,
                request.Slug,
                request.Name,
                request.LicenseNo,
                request.City,
                request.Website,
                request.ContactEmail,
                request.ContactPhone,
                request.About,
                request.Documents
                    .Select(document => new AgencyDocumentInput(document.Type, document.FileUrl))
                    .ToArray(),
                request.LicenseType,
                request.LicenseIssuedAt,
                request.ManagerName,
                request.StaffCount,
                request.Address,
                request.Province,
                request.LicenseFileUrl),
            cancellationToken);

        return result.IsSuccess ? Results.Ok(result.Value) : context.ToProblem(result.Error!);
    }

    /// <summary>
    /// Returns the authenticated user's agency onboarding state.
    /// </summary>
    private static async Task<IResult> GetMyAgencyAsync(
        HttpContext context,
        ISender sender,
        CancellationToken cancellationToken)
    {
        if (!context.User.TryGetUserId(out var userId))
        {
            return context.ToProblem(
                Error.Unauthorized("HANI-IDENTITY-1400", "Authenticated user is required."));
        }

        var result = await sender.Send(new GetMyAgencyQuery(userId), cancellationToken);
        return result.IsSuccess ? Results.Ok(result.Value) : context.ToProblem(result.Error!);
    }

    /// <summary>
    /// Returns a public approved agency profile.
    /// </summary>
    private static async Task<IResult> GetPublicAgencyAsync(
        string slug,
        HttpContext context,
        ISender sender,
        CancellationToken cancellationToken)
    {
        var result = await sender.Send(new GetPublicAgencyQuery(slug), cancellationToken);
        return result.IsSuccess ? Results.Ok(result.Value) : context.ToProblem(result.Error!);
    }

    /// <summary>
    /// Lists agencies for the admin panel.
    /// </summary>
    private static async Task<IResult> ListAgenciesAsync(
        string? status,
        HttpContext context,
        ISender sender,
        CancellationToken cancellationToken)
    {
        var result = await sender.Send(new ListAgenciesQuery(status), cancellationToken);
        return result.IsSuccess ? Results.Ok(result.Value) : context.ToProblem(result.Error!);
    }

    /// <summary>
    /// Approves a pending agency.
    /// </summary>
    private static async Task<IResult> ApproveAgencyAsync(
        Guid agencyId,
        HttpContext context,
        ISender sender,
        CancellationToken cancellationToken)
    {
        var result = await sender.Send(new ApproveAgencyCommand(agencyId), cancellationToken);
        return result.IsSuccess ? Results.Ok(result.Value) : context.ToProblem(result.Error!);
    }

    /// <summary>
    /// Rejects a pending agency.
    /// </summary>
    private static async Task<IResult> RejectAgencyAsync(
        Guid agencyId,
        RejectAgencyRequest request,
        HttpContext context,
        ISender sender,
        CancellationToken cancellationToken)
    {
        var result = await sender.Send(
            new RejectAgencyCommand(agencyId, request.Reason),
            cancellationToken);
        return result.IsSuccess ? Results.Ok(result.Value) : context.ToProblem(result.Error!);
    }
}

/// <summary>
/// HTTP request for agency onboarding.
/// </summary>
public sealed record CreateAgencyOnboardingRequest(
    string Slug,
    string Name,
    string LicenseNo,
    string City,
    string? Website,
    string? ContactEmail,
    string? ContactPhone,
    string? About,
    IReadOnlyList<AgencyDocumentRequest> Documents,
    string? LicenseType = null,
    DateOnly? LicenseIssuedAt = null,
    string? ManagerName = null,
    int? StaffCount = null,
    string? Address = null,
    string? Province = null,
    string? LicenseFileUrl = null);

/// <summary>
/// Agency document request.
/// </summary>
public sealed record AgencyDocumentRequest(AgencyDocumentType Type, string FileUrl);

/// <summary>
/// HTTP request to reject an agency.
/// </summary>
public sealed record RejectAgencyRequest(string Reason);
