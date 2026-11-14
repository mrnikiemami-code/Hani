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
    /// <summary>Hani collects online and acts as Merchant of Record.</summary>
    HaniOnline = 0,

    /// <summary>The agency collects online through its own PSP.</summary>
    AgencyOnline = 1,

    /// <summary>The agency collects offline (cash, transfer, cheque).</summary>
    AgencyOffline = 2
}

/// <summary>
/// Party that is legally the seller for the booking.
/// </summary>
public enum SellerOfRecord
{
    Hani = 0,
    Agency = 1
}

/// <summary>
/// Party that issues the customer invoice.
/// </summary>
public enum InvoiceIssuer
{
    Hani = 0,
    Agency = 1
}
