namespace Hani.Modules.Supply.Application.Queries.GetAgencyOfferById;

/// <summary>
/// Accommodation option read model.
/// </summary>
public sealed record AccommodationOptionDto(
    Guid OptionId,
    string HotelName,
    int HotelStars,
    string RoomType,
    string MealPlan,
    decimal Amount,
    string Currency,
    string? Description);

/// <summary>
/// Flight option read model.
/// </summary>
public sealed record FlightOptionDto(
    Guid OptionId,
    string Direction,
    string Airline,
    string FlightNumber,
    string DepartureAirport,
    string ArrivalAirport,
    TimeOnly DepartureTime,
    TimeOnly ArrivalTime,
    int DurationMinutes,
    string Cabin,
    string BaggageAllowance);

/// <summary>
/// Agency offer read model returned to suppliers.
/// </summary>
public sealed record AgencyOfferDto(
    Guid Id,
    Guid AgencyId,
    string ExternalId,
    Guid TourProductId,
    string Title,
    decimal BasePrice,
    string Currency,
    string Status,
    string? RejectionReason,
    DateTimeOffset UpdatedAt,
    IReadOnlyList<AccommodationOptionDto> AccommodationOptions,
    IReadOnlyList<FlightOptionDto> FlightOptions);
