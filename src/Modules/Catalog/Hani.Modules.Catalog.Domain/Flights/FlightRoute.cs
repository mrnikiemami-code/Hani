using Hani.BuildingBlocks.Domain;

namespace Hani.Modules.Catalog.Domain.Flights;

/// <summary>
/// Flight route with provider offers for metasearch.
/// </summary>
public sealed class FlightRoute : AggregateRoot<Guid>
{
    private readonly List<FlightOffer> _offers = [];

    private FlightRoute()
    {
    }

    private FlightRoute(
        Guid id,
        string slug,
        string originCode,
        string destinationCode,
        string originCity,
        string destinationCity,
        bool isActive,
        Guid? originAirportId,
        Guid? destinationAirportId) : base(id)
    {
        Slug = slug;
        OriginCode = originCode;
        DestinationCode = destinationCode;
        OriginCity = originCity;
        DestinationCity = destinationCity;
        IsActive = isActive;
        OriginAirportId = originAirportId;
        DestinationAirportId = destinationAirportId;
        CreatedAt = DateTimeOffset.UtcNow;
    }

    /// <summary>Unique route slug such as thr-mhd.</summary>
    public string Slug { get; private set; } = string.Empty;

    /// <summary>Origin IATA code.</summary>
    public string OriginCode { get; private set; } = string.Empty;

    /// <summary>Destination IATA code.</summary>
    public string DestinationCode { get; private set; } = string.Empty;

    /// <summary>Origin city display name.</summary>
    public string OriginCity { get; private set; } = string.Empty;

    /// <summary>Destination city display name.</summary>
    public string DestinationCity { get; private set; } = string.Empty;

    /// <summary>Whether the route is publicly visible.</summary>
    public bool IsActive { get; private set; }

    /// <summary>Optional canonical origin airport.</summary>
    public Guid? OriginAirportId { get; private set; }

    /// <summary>Optional canonical destination airport.</summary>
    public Guid? DestinationAirportId { get; private set; }

    /// <summary>Creation time.</summary>
    public DateTimeOffset CreatedAt { get; private set; }

    /// <summary>Provider offers for this route.</summary>
    public IReadOnlyCollection<FlightOffer> Offers => _offers;

    /// <summary>
    /// Creates a route and its offers.
    /// </summary>
    public static FlightRoute Create(
        IIdGenerator ids,
        string slug,
        string originCode,
        string destinationCode,
        string originCity,
        string destinationCity,
        bool isActive,
        IReadOnlyList<FlightOfferInput> offers,
        Guid? originAirportId = null,
        Guid? destinationAirportId = null)
    {
        if (string.IsNullOrWhiteSpace(slug) ||
            string.IsNullOrWhiteSpace(originCode) ||
            string.IsNullOrWhiteSpace(destinationCode))
        {
            throw new ArgumentException("Slug and airport codes are required.");
        }

        if (originCode.Length != 3 || destinationCode.Length != 3)
        {
            throw new ArgumentException("Airport codes must be three letters.");
        }

        if (offers.Count == 0)
        {
            throw new ArgumentException("At least one flight offer is required.", nameof(offers));
        }

        var id = ids.NewId();
        var route = new FlightRoute(
            id,
            slug.Trim().ToLowerInvariant(),
            originCode.Trim().ToUpperInvariant(),
            destinationCode.Trim().ToUpperInvariant(),
            originCity.Trim(),
            destinationCity.Trim(),
            isActive,
            originAirportId,
            destinationAirportId);

        foreach (var offer in offers)
        {
            route._offers.Add(new FlightOffer(
                ids.NewId(),
                id,
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
                offer.DeepLink,
                offer.AirlineId));
        }

        return route;
    }
}

/// <summary>
/// One provider flight offer. This is metasearch data; Hani does not issue the ticket.
/// </summary>
public sealed class FlightOffer : Entity<Guid>
{
    private FlightOffer()
    {
    }

    internal FlightOffer(
        Guid id,
        Guid routeId,
        string flightNumber,
        string airlineCode,
        string airlineName,
        DateOnly departureDate,
        TimeOnly departureTime,
        TimeOnly arrivalTime,
        int durationMinutes,
        int stops,
        string cabin,
        string baggageAllowance,
        decimal price,
        string currency,
        string provider,
        string deepLink,
        Guid? airlineId) : base(id)
    {
        RouteId = routeId;
        FlightNumber = flightNumber.Trim().ToUpperInvariant();
        AirlineCode = airlineCode.Trim().ToUpperInvariant();
        AirlineName = airlineName.Trim();
        DepartureDate = departureDate;
        DepartureTime = departureTime;
        ArrivalTime = arrivalTime;
        DurationMinutes = durationMinutes;
        Stops = stops;
        Cabin = cabin.Trim();
        BaggageAllowance = baggageAllowance.Trim();
        Price = price;
        Currency = currency.Trim().ToUpperInvariant();
        Provider = provider.Trim();
        DeepLink = deepLink.Trim();
        AirlineId = airlineId;
    }

    /// <summary>Parent route.</summary>
    public Guid RouteId { get; private set; }

    /// <summary>Flight number.</summary>
    public string FlightNumber { get; private set; } = string.Empty;

    /// <summary>Airline IATA code.</summary>
    public string AirlineCode { get; private set; } = string.Empty;

    /// <summary>Airline display name.</summary>
    public string AirlineName { get; private set; } = string.Empty;

    /// <summary>Departure date.</summary>
    public DateOnly DepartureDate { get; private set; }

    /// <summary>Local departure time.</summary>
    public TimeOnly DepartureTime { get; private set; }

    /// <summary>Local arrival time.</summary>
    public TimeOnly ArrivalTime { get; private set; }

    /// <summary>Duration in minutes.</summary>
    public int DurationMinutes { get; private set; }

    /// <summary>Number of stops.</summary>
    public int Stops { get; private set; }

    /// <summary>Cabin class.</summary>
    public string Cabin { get; private set; } = string.Empty;

    /// <summary>Baggage allowance text.</summary>
    public string BaggageAllowance { get; private set; } = string.Empty;

    /// <summary>Ticket price shown by the provider.</summary>
    public decimal Price { get; private set; }

    /// <summary>Price currency.</summary>
    public string Currency { get; private set; } = string.Empty;

    /// <summary>Provider or seller name.</summary>
    public string Provider { get; private set; } = string.Empty;

    /// <summary>Provider deep link.</summary>
    public string DeepLink { get; private set; } = string.Empty;

    /// <summary>Optional canonical airline id.</summary>
    public Guid? AirlineId { get; private set; }
}

/// <summary>Flight offer input.</summary>
public sealed record FlightOfferInput(
    string FlightNumber,
    string AirlineCode,
    string AirlineName,
    DateOnly DepartureDate,
    TimeOnly DepartureTime,
    TimeOnly ArrivalTime,
    int DurationMinutes,
    int Stops,
    string Cabin,
    string BaggageAllowance,
    decimal Price,
    string Currency,
    string Provider,
    string DeepLink,
    Guid? AirlineId = null);
