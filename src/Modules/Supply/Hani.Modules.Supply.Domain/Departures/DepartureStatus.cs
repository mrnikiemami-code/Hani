namespace Hani.Modules.Supply.Domain.Departures;

/// <summary>
/// Availability state of a departure.
/// </summary>
public enum DepartureStatus
{
    Open = 0,
    SoldOut = 1,
    Closed = 2,
    Cancelled = 3
}
