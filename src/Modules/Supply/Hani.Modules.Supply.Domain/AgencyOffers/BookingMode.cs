namespace Hani.Modules.Supply.Domain.AgencyOffers;

/// <summary>
/// How an offer can be booked.
/// </summary>
public enum BookingMode
{
    Online = 0,
    ReservationRequest = 1
}

/// <summary>
/// How payment is collected for an offer.
/// </summary>
public enum CollectionMode
{
    Online = 0,
    Offline = 1
}
