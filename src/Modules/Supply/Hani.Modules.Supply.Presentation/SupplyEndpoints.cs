using Hani.BuildingBlocks.Application;
using Hani.Modules.Supply.Application.Commands.CreateAgencyOffer;
using Hani.Modules.Supply.Application.Queries.GetAgencyOfferById;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using IResult = Microsoft.AspNetCore.Http.IResult;

namespace Hani.Modules.Supply.Presentation;

public static class SupplyEndpoints
{
    public static IEndpointRouteBuilder MapSupplyEndpoints(this IEndpointRouteBuilder app)
    {
        var supplier = app.MapGroup("/supplier/v1").WithTags("Supplier");

        supplier.MapPost("/offers", CreateOfferAsync)
            .WithName("Supplier.CreateAgencyOffer")
            .Produces<Guid>(StatusCodes.Status201Created)
            .ProducesProblem(StatusCodes.Status400BadRequest);

        supplier.MapGet("/offers/{offerId:guid}", GetOfferAsync)
            .WithName("Supplier.GetAgencyOffer")
            .Produces<AgencyOfferDto>()
            .ProducesProblem(StatusCodes.Status404NotFound);

        app.MapDepartureEndpoints();

        return app;
    }

    private static async Task<IResult> CreateOfferAsync(
        CreateAgencyOfferRequest request,
        ISender sender,
        CancellationToken cancellationToken)
    {
        var result = await sender.Send(
            new CreateAgencyOfferCommand(
                request.AgencyId,
                request.TourProductId,
                request.Title,
                request.BasePrice,
                request.Currency),
            cancellationToken);

        return result.IsSuccess
            ? Results.Created($"/supplier/v1/offers/{result.Value}", result.Value)
            : ToProblem(result.Error!);
    }

    private static async Task<IResult> GetOfferAsync(
        Guid offerId,
        ISender sender,
        CancellationToken cancellationToken)
    {
        var result = await sender.Send(new GetAgencyOfferByIdQuery(offerId), cancellationToken);

        return result.IsSuccess
            ? Results.Ok(result.Value)
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

        return Results.Problem(
            title: error.Message,
            statusCode: statusCode,
            extensions: new Dictionary<string, object?>
            {
                ["code"] = error.Code
            });
    }
}

public sealed record CreateAgencyOfferRequest(
    Guid AgencyId,
    Guid TourProductId,
    string Title,
    decimal BasePrice,
    string Currency);
