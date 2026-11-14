using Hani.BuildingBlocks.Application;
using Hani.Contracts.Supply;
using Hani.Modules.Catalog.Application.Abstractions;

namespace Hani.Modules.Catalog.Application.Queries.GetHotelTours;

internal sealed class GetHotelToursQueryHandler(
    IHotelRepository hotels,
    IHotelOfferReadService offers)
    : IQueryHandler<GetHotelToursQuery, IReadOnlyList<HotelTourOfferDto>>
{
    public async Task<Result<IReadOnlyList<HotelTourOfferDto>>> Handle(
        GetHotelToursQuery request,
        CancellationToken cancellationToken)
    {
        var hotel = await hotels.GetBySlugAsync(request.Slug, cancellationToken);

        if (hotel is null)
        {
            return Result<IReadOnlyList<HotelTourOfferDto>>.Failure(
                Error.NotFound("HANI-CATALOG-2101", "Hotel was not found."));
        }

        var linked = await offers.GetApprovedOffersByHotelAsync(hotel.Id, cancellationToken);

        return Result<IReadOnlyList<HotelTourOfferDto>>.Success(
            linked.Select(offer => new HotelTourOfferDto(
                offer.OfferId,
                offer.AgencyId,
                offer.TourProductId,
                offer.Title,
                offer.BasePrice,
                offer.Currency,
                offer.BookingMode,
                offer.CollectionMode,
                offer.SellerOfRecord,
                offer.InvoiceIssuer,
                offer.Departures.Select(departure => new HotelTourDepartureDto(
                    departure.Id,
                    departure.StartDate,
                    departure.EndDate,
                    departure.SeatsLeft,
                    departure.Prices.Select(price => new HotelTourPriceDto(
                        price.RoomType,
                        price.Amount,
                        price.Currency)).ToArray())).ToArray()))
                .ToArray());
    }
}
