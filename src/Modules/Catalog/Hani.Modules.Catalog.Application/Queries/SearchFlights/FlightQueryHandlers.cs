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
            results.Select(route => Map(route, request)).ToArray());
    }

    private static FlightRouteDto Map(FlightRoute route, SearchFlightsQuery request)
        => new(
            route.Id,
            route.Slug,
            route.OriginCode,
            route.DestinationCode,
            route.OriginCity,
            route.DestinationCity,
            route.Offers
                .Where(offer => request.DepartureDate is null ||
                    offer.DepartureDate == request.DepartureDate)
                .Where(offer => string.IsNullOrWhiteSpace(request.Cabin) ||
                    string.Equals(offer.Cabin, request.Cabin, StringComparison.OrdinalIgnoreCase))
                .Where(offer => string.IsNullOrWhiteSpace(request.Airline) ||
                    string.Equals(offer.AirlineCode, request.Airline, StringComparison.OrdinalIgnoreCase) ||
                    offer.AirlineName.Contains(request.Airline, StringComparison.OrdinalIgnoreCase))
                .Where(offer => request.MaxStops is null || offer.Stops <= request.MaxStops)
                .Where(offer => request.MinPrice is null || offer.Price >= request.MinPrice)
                .Where(offer => request.MaxPrice is null || offer.Price <= request.MaxPrice)
                .Where(offer => request.DepartureAfter is null ||
                    offer.DepartureTime >= request.DepartureAfter)
                .Where(offer => request.DepartureBefore is null ||
                    offer.DepartureTime <= request.DepartureBefore)
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
