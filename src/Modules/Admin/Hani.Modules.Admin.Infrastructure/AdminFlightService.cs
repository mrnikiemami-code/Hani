using Hani.BuildingBlocks.Application;
using Hani.Modules.Admin.Application;
using Hani.Modules.Catalog.Application.Commands.CreateFlightReference;
using Hani.Modules.Catalog.Application.Commands.CreateFlightRoute;
using Hani.Modules.Catalog.Domain.Flights;
using Microsoft.EntityFrameworkCore;

namespace Hani.Modules.Admin.Infrastructure;

internal sealed partial class AdminService : IAdminFlightService
{
    public async Task<AdminFlightPageDto> ListRoutesAsync(
        int page,
        int pageSize,
        string? q,
        CancellationToken cancellationToken)
    {
        var normalizedPage = page <= 0 ? 1 : page;
        var normalizedPageSize = pageSize is <= 0 or > 100 ? 20 : pageSize;
        var query = catalog.FlightRoutes
            .AsNoTracking()
            .Include(item => item.Offers)
            .AsQueryable();
        if (!string.IsNullOrWhiteSpace(q))
        {
            var term = q.Trim();
            query = query.Where(item =>
                item.Slug.Contains(term) ||
                item.OriginCity.Contains(term) ||
                item.DestinationCity.Contains(term) ||
                item.OriginCode.Contains(term) ||
                item.DestinationCode.Contains(term));
        }

        var total = await query.CountAsync(cancellationToken);
        var rows = await query
            .OrderByDescending(item => item.Id)
            .Skip((normalizedPage - 1) * normalizedPageSize)
            .Take(normalizedPageSize)
            .ToArrayAsync(cancellationToken);
        var items = rows.Select(item =>
        {
            var cheapest = item.Offers.OrderBy(offer => offer.Price).FirstOrDefault();
            return new AdminFlightRouteDto(
                item.Id,
                item.Slug,
                item.OriginCode,
                item.DestinationCode,
                item.OriginCity,
                item.DestinationCity,
                item.IsActive,
                item.Offers.Count,
                cheapest?.Price,
                cheapest?.Currency);
        }).ToArray();
        return new AdminFlightPageDto(items, normalizedPage, normalizedPageSize, total);
    }

    public async Task<FlightReferenceDto> ListReferencesAsync(
        CancellationToken cancellationToken)
    {
        var result = await sender.Send(
            new ListFlightReferencesQuery(),
            cancellationToken);
        return result.IsSuccess
            ? result.Value!
            : new FlightReferenceDto([], []);
    }

    public Task<Result<Guid>> CreateRouteAsync(
        AdminFlightRouteInput input,
        CancellationToken cancellationToken)
        => sender.Send(
            new CreateFlightRouteCommand(
                input.Slug,
                input.OriginCode,
                input.DestinationCode,
                input.OriginCity,
                input.DestinationCity,
                input.IsActive,
                input.Offers.Select(offer => new FlightOfferInput(
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
                    offer.DeepLink)).ToArray()),
            cancellationToken);


    public async Task<AdminFlightRouteDetailDto?> GetRouteAsync(
        Guid id,
        CancellationToken cancellationToken)
    {
        var item = await catalog.FlightRoutes
            .AsNoTracking()
            .Include(route => route.Offers)
            .FirstOrDefaultAsync(route => route.Id == id, cancellationToken);
        if (item is null)
        {
            return null;
        }

        return new AdminFlightRouteDetailDto(
            item.Id,
            item.Slug,
            item.OriginCode,
            item.DestinationCode,
            item.OriginCity,
            item.DestinationCity,
            item.IsActive,
            item.Offers
                .OrderBy(offer => offer.Price)
                .Select(offer => new AdminFlightOfferInput(
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

    public async Task<Result<bool>> UpdateRouteAsync(
        Guid id,
        AdminFlightRouteInput input,
        CancellationToken cancellationToken)
    {
        if (input.Offers.Count == 0)
        {
            return Result<bool>.Failure(Error.Validation(
                "HANI-FLIGHT-4001",
                "At least one flight offer is required."));
        }

        var route = await catalog.FlightRoutes
            .Include(item => item.Offers)
            .FirstOrDefaultAsync(item => item.Id == id, cancellationToken);
        if (route is null)
        {
            return Result<bool>.Failure(Error.NotFound(
                "HANI-FLIGHT-4040",
                "Flight route was not found."));
        }

        route.Update(
            ids,
            input.Slug,
            input.OriginCode,
            input.DestinationCode,
            input.OriginCity,
            input.DestinationCity,
            input.IsActive,
            input.Offers.Select(offer => new FlightOfferInput(
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
                offer.DeepLink)).ToArray());

        await catalog.SaveChangesAsync(cancellationToken);
        return Result<bool>.Success(true);
    }

    public Task<Result<Guid>> CreateAirlineAsync(
        string iata,
        string name,
        CancellationToken cancellationToken)
        => sender.Send(new CreateAirlineCommand(iata, name), cancellationToken);

    public Task<Result<Guid>> CreateAirportAsync(
        string iata,
        string name,
        string city,
        string countryCode,
        CancellationToken cancellationToken)
        => sender.Send(
            new CreateAirportCommand(iata, name, city, countryCode),
            cancellationToken);
}
