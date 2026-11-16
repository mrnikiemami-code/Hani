namespace Hani.BuildingBlocks.Application;

/// <summary>
/// Shared Gregorian date guards; rejects Jalali-shaped years at the API boundary.
/// </summary>
public static class GregorianDateGuards
{
    /// <summary>Minimum year accepted by search and booking date filters.</summary>
    public const int MinYear = 1900;

    /// <summary>Maximum year accepted by search and booking date filters.</summary>
    public const int MaxYear = 2100;

    /// <summary>
    /// Returns true when a nullable date is absent or within the Gregorian
    /// year range accepted by Hani APIs.
    /// </summary>
    public static bool IsAccepted(DateOnly? value) =>
        value is null ||
        value.Value.Year is >= MinYear and <= MaxYear;

    /// <summary>
    /// Returns true when two nullable dates are absent or start is not after
    /// end.
    /// </summary>
    public static bool IsOrdered(DateOnly? start, DateOnly? end) =>
        start is null || end is null || start <= end;
}
