using System.Globalization;
using Hani.BuildingBlocks.Application;
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

    private static async Task<IResult> CreateAgencyAsync(
        CreateAgencyRequest request,
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
            : ToProblem(result.Error!);
    }

    private static async Task<IResult> GetAgencyAsync(
        Guid agencyId,
        ISender sender,
        CancellationToken cancellationToken)
    {
        var result = await sender.Send(new GetAgencyByIdQuery(agencyId), cancellationToken);
        return result.IsSuccess ? Results.Ok(result.Value) : ToProblem(result.Error!);
    }

    private static async Task<IResult> CreateApiClientAsync(
        Guid agencyId,
        CreateApiClientRequest request,
        ISender sender,
        CancellationToken cancellationToken)
    {
        var result = await sender.Send(
            new CreateApiClientCommand(agencyId, request.Name, request.Scopes),
            cancellationToken);

        return result.IsSuccess
            ? Results.Created($"/internal/v1/agencies/{agencyId}/api-clients/{result.Value!.ApiClientId}", result.Value)
            : ToProblem(result.Error!);
    }

    private static IResult ToProblem(Error error)
    {
        var statusCode = error.Type switch
        {
            ErrorType.Validation => StatusCodes.Status400BadRequest,
            ErrorType.NotFound => StatusCodes.Status404NotFound,
            ErrorType.Conflict => StatusCodes.Status409Conflict,
            ErrorType.Unauthorized => StatusCodes.Status401Unauthorized,
            ErrorType.Forbidden => StatusCodes.Status403Forbidden,
            _ => StatusCodes.Status500InternalServerError
        };

        var locale = CultureInfo.CurrentUICulture.Name;

        return Results.Problem(
            title: ProblemDetailsLocalizer.Title(error.Type, locale),
            detail: error.Message,
            statusCode: statusCode,
            extensions: new Dictionary<string, object?>
            {
                ["code"] = error.Code,
                ["locale"] = locale
            });
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
