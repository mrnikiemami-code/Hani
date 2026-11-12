using Hani.BuildingBlocks.Domain;

namespace Hani.Modules.Supply.Domain.AgencyOffers;

/// <summary>
/// Flight details offered for a tour.
/// </summary>
public sealed class OfferFlightOption : Entity<Guid>
{
    private OfferFlightOption()
    {
    }

    internal OfferFlightOption(
        Guid id,
        Guid agencyOfferId,
        FlightDirection direction,
        string airline,
        string flightNumber,
        string departureAirport,
        string arrivalAirport,
        TimeOnly departureTime,
        TimeOnly arrivalTime,
        int durationMinutes,
        string cabin,
        string baggageAllowance) : base(id)
    {
        AgencyOfferId = agencyOfferId;
        Direction = direction;
        Airline = airline;
        FlightNumber = flightNumber;
        DepartureAirport = departureAirport;
        ArrivalAirport = arrivalAirport;
        DepartureTime = departureTime;
        ArrivalTime = arrivalTime;
        DurationMinutes = durationMinutes;
        Cabin = cabin;
        BaggageAllowance = baggageAllowance;
    }

    /// <summary>
    /// Owning agency offer.
    /// </summary>
    public Guid AgencyOfferId { get; private set; }

    /// <summary>
    /// Outbound or inbound.
    /// </summary>
    public FlightDirection Direction { get; private set; }

    /// <summary>
    /// Airline name.
    /// </summary>
    public string Airline { get; private set; } = string.Empty;

    /// <summary>
    /// Flight number.
    /// </summary>
    public string FlightNumber { get; private set; } = string.Empty;

    /// <summary>
    /// Departure airport code/name.
    /// </summary>
    public string DepartureAirport { get; private set; } = string.Empty;

    /// <summary>
    /// Arrival airport code/name.
    /// </summary>
    public string ArrivalAirport { get; private set; } = string.Empty;

    /// <summary>
    /// Local departure time.
    /// </summary>
    public TimeOnly DepartureTime { get; private set; }

    /// <summary>
    /// Local arrival time.
    /// </summary>
    public TimeOnly ArrivalTime { get; private set; }

    /// <summary>
    /// Flight duration in minutes.
    /// </summary>
    public int DurationMinutes { get; private set; }

    /// <summary>
    /// Cabin class.
    /// </summary>
    public string Cabin { get; private set; } = string.Empty;

    /// <summary>
    /// Baggage allowance summary.
    /// </summary>
    public string BaggageAllowance { get; private set; } = string.Empty;
}
