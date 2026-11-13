using Hani.BuildingBlocks.AspNetCore;
using Hani.Modules.Identity.Application.Commands.CreateAgency;
using Hani.Modules.Identity.Application.Commands.CreateApiClient;
using Hani.Modules.Identity.Application.Queries.GetAgencyById;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using IResult = Microsoft.AspNetCore.Http.IResult;

namespace Hani.Modules.Identity.Presentation;

/// <summary>
/// Minimal API endpoints for the identity module.
/// </summary>
public static class IdentityEndpoints
{
    public static IEndpointRouteBuilder MapIdentityEndpoints(this IEndpointRouteBuilder app)
    {
        var agencies = app.MapGroup("/internal/v1/agencies").WithTags("Internal.Identity");

        agencies.MapPost("/", CreateAgencyAsync)
            .WithName("Internal.CreateAgency")
            .Produces<Guid>(StatusCodes.Status201Created)
            .ProducesProblem(StatusCodes.Status409Conflict);

        agencies.MapGet("/{agencyId:guid}", GetAgencyAsync)
            .WithName("Internal.GetAgency")
            .Produces<AgencyDto>()
            .ProducesProblem(StatusCodes.Status404NotFound);

        agencies.MapPost("/{agencyId:guid}/api-clients", CreateApiClientAsync)
            .WithName("Internal.CreateApiClient")
            .Produces<CreateApiClientResult>(StatusCodes.Status201Created)
            .ProducesProblem(StatusCodes.Status404NotFound);

        return app;
    }

    /// <summary>
    /// Creates an agency through the internal API. Returns 201 or 400.
    /// </summary>
    private static async Task<IResult> CreateAgencyAsync(
        CreateAgencyRequest request,
        HttpContext context,
        ISender sender,
        CancellationToken cancellationToken)
    {
        var result = await sender.Send(
            new CreateAgencyCommand(
                request.Slug,
                request.Name,
                request.LicenseNo,
                request.City,
                request.SubscriptionValidUntil),
            cancellationToken);

        return result.IsSuccess
            ? Results.Created($"/internal/v1/agencies/{result.Value}", result.Value)
            : context.ToProblem(result.Error!);
    }

    /// <summary>
    /// Returns one agency by id, or 404.
    /// </summary>
    private static async Task<IResult> GetAgencyAsync(
        Guid agencyId,
        HttpContext context,
        ISender sender,
        CancellationToken cancellationToken)
    {
        var result = await sender.Send(new GetAgencyByIdQuery(agencyId), cancellationToken);
        return result.IsSuccess ? Results.Ok(result.Value) : context.ToProblem(result.Error!);
    }

    /// <summary>
    /// Creates an API client for an agency. Returns 201 or 404.
    /// </summary>
    private static async Task<IResult> CreateApiClientAsync(
        Guid agencyId,
        CreateApiClientRequest request,
        HttpContext context,
        ISender sender,
        CancellationToken cancellationToken)
    {
        var result = await sender.Send(
            new CreateApiClientCommand(agencyId, request.Name, request.Scopes),
            cancellationToken);

        return result.IsSuccess
            ? Results.Created($"/internal/v1/agencies/{agencyId}/api-clients/{result.Value!.ApiClientId}", result.Value)
            : context.ToProblem(result.Error!);
    }

}

/// <summary>
/// HTTP request to create an agency.
/// </summary>
public sealed record CreateAgencyRequest(
    string Slug,
    string Name,
    string LicenseNo,
    string City,
    DateOnly? SubscriptionValidUntil = null);

/// <summary>
/// HTTP request to create an API client.
/// </summary>
public sealed record CreateApiClientRequest(
    string Name,
    IReadOnlyList<string> Scopes);
