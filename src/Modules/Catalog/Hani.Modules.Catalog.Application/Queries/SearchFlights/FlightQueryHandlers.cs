using Hani.BuildingBlocks.Application;
using Hani.Modules.Catalog.Application.Abstractions;
using Hani.Modules.Catalog.Domain.Flights;

namespace Hani.Modules.Catalog.Application.Queries.SearchFlights;

internal sealed class SearchFlightsQueryHandler(IFlightProvider provider)
    : IQueryHandler<SearchFlightsQuery, IReadOnlyList<FlightRouteDto>>
{
    public async Task<Result<IReadOnlyList<FlightRouteDto>>> Handle(
        SearchFlightsQuery request,
        CancellationToken cancellationToken)
    {
        var results = await provider.SearchAsync(
            request.Origin,
            request.Destination,
            request.DepartureDate,
            request.Cabin,
            cancellationToken);

        return Result<IReadOnlyList<FlightRouteDto>>.Success(
            results.Select(route => Map(route, request.DepartureDate, request.Cabin)).ToArray());
    }

    private static FlightRouteDto Map(
        FlightRoute route,
        DateOnly? departureDate,
        string? cabin)
        => new(
            route.Id,
            route.Slug,
            route.OriginCode,
            route.DestinationCode,
            route.OriginCity,
            route.DestinationCity,
            route.Offers
                .Where(offer => departureDate is null || offer.DepartureDate == departureDate)
                .Where(offer => string.IsNullOrWhiteSpace(cabin) ||
                    string.Equals(offer.Cabin, cabin, StringComparison.OrdinalIgnoreCase))
                .OrderBy(offer => offer.Price)
                .Select(offer => new FlightOfferDto(
                    offer.Id,
                    offer.FlightNumber,
                    offer.AirlineCode,
                    offer.AirlineName,
                    offer.DepartureDate,
                    offer.DepartureTime,
                    offer.ArrivalTime,
                    offer.DurationMinutes,
                    offer.Stops,
                    offer.Cabin,
                    offer.BaggageAllowance,
                    offer.Price,
                    offer.Currency,
                    offer.Provider,
                    offer.DeepLink))
                .ToArray());
}

internal sealed class GetFlightRouteQueryHandler(IFlightRouteRepository routes)
    : IQueryHandler<GetFlightRouteQuery, FlightRouteDto>
{
    public async Task<Result<FlightRouteDto>> Handle(
        GetFlightRouteQuery request,
        CancellationToken cancellationToken)
    {
        var route = await routes.GetBySlugAsync(request.Slug, cancellationToken);

        return route is null
            ? Result<FlightRouteDto>.Failure(
                Error.NotFound("HANI-CATALOG-1920", "Flight route was not found."))
            : Result<FlightRouteDto>.Success(new FlightRouteDto(
                route.Id,
                route.Slug,
                route.OriginCode,
                route.DestinationCode,
                route.OriginCity,
                route.DestinationCity,
                route.Offers
                    .OrderBy(offer => offer.Price)
                    .Select(offer => new FlightOfferDto(
                        offer.Id,
                        offer.FlightNumber,
                        offer.AirlineCode,
                        offer.AirlineName,
                        offer.DepartureDate,
                        offer.DepartureTime,
                        offer.ArrivalTime,
                        offer.DurationMinutes,
                        offer.Stops,
                        offer.Cabin,
                        offer.BaggageAllowance,
                        offer.Price,
                        offer.Currency,
                        offer.Provider,
                        offer.DeepLink))
                    .ToArray()));
    }
}
