using Hani.BuildingBlocks.Application;

namespace Hani.Modules.Catalog.Application.Queries.GetHotelTours;

/// <summary>
/// Query that returns approved tour offers linked to a canonical hotel.
/// </summary>
public sealed record GetHotelToursQuery(string Slug) : IQuery<IReadOnlyList<HotelTourOfferDto>>;

/// <summary>
/// Tour offer linked to a hotel.
/// </summary>
public sealed record HotelTourOfferDto(
    Guid OfferId,
    Guid AgencyId,
    Guid TourProductId,
    string Title,
    decimal BasePrice,
    string Currency,
    string BookingMode,
    string CollectionMode,
    string SellerOfRecord,
    string InvoiceIssuer,
    IReadOnlyList<HotelTourDepartureDto> Departures);

/// <summary>
/// Departure summary for a hotel-linked tour.
/// </summary>
public sealed record HotelTourDepartureDto(
    Guid DepartureId,
    DateOnly StartDate,
    DateOnly EndDate,
    int SeatsLeft,
    IReadOnlyList<HotelTourPriceDto> Prices);

/// <summary>
/// Per-occupancy departure price.
/// </summary>
public sealed record HotelTourPriceDto(string RoomType, decimal Amount, string Currency);
