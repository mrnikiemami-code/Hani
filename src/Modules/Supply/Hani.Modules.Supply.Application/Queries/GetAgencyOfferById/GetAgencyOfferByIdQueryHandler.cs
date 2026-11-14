using Hani.BuildingBlocks.Application;
using Hani.Modules.Supply.Application.Abstractions;

namespace Hani.Modules.Supply.Application.Queries.GetAgencyOfferById;

internal sealed class GetAgencyOfferByIdQueryHandler(
    IAgencyOfferRepository repository)
    : IQueryHandler<GetAgencyOfferByIdQuery, AgencyOfferDto>
{
    public async Task<Result<AgencyOfferDto>> Handle(
        GetAgencyOfferByIdQuery request,
        CancellationToken cancellationToken)
    {
        var offer = await repository.GetByIdAsync(
            request.OfferId,
            request.AgencyId,
            cancellationToken);

        if (offer is null)
        {
            return Result<AgencyOfferDto>.Failure(
                Error.NotFound("HANI-SUPPLY-1006", "Agency offer was not found."));
        }

        var dto = new AgencyOfferDto(
            offer.Id,
            offer.AgencyId,
            offer.ExternalId,
            offer.TourProductId,
            offer.Title,
            offer.BasePrice.Amount,
            offer.BasePrice.Currency,
            offer.Status.ToString(),
            offer.RejectionReason,
            offer.UpdatedAt,
            offer.AccommodationOptions
                .Select(option => new AccommodationOptionDto(
                    option.Id,
                    option.HotelName,
                    option.HotelStars,
                    option.RoomType.ToString(),
                    option.MealPlan.ToString(),
                    option.Amount,
                    option.Currency,
                    option.Description))
                .ToArray(),
            offer.FlightOptions
                .Select(option => new FlightOptionDto(
                    option.Id,
                    option.Direction.ToString(),
                    option.Airline,
                    option.FlightNumber,
                    option.DepartureAirport,
                    option.ArrivalAirport,
                    option.DepartureTime,
                    option.ArrivalTime,
                    option.DurationMinutes,
                    option.Cabin,
                    option.BaggageAllowance))
                .ToArray(),
            offer.TaxRules
                .Select(rule => new TaxRuleDto(
                    rule.Currency,
                    rule.VatStatus.ToString(),
                    rule.VatRate,
                    rule.DutyStatus.ToString(),
                    rule.DutyRate,
                    rule.ExemptionReason))
                .ToArray(),
            offer.BookingMode.ToString(),
            offer.CollectionMode.ToString());

        return Result<AgencyOfferDto>.Success(dto);
    }
}
