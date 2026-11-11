namespace Hani.Modules.Supply.Domain.Departures;

public sealed class DepartureConcurrencyException(
    Guid departureId,
    long expectedVersion,
    long actualVersion)
    : Exception(
        $"Departure '{departureId}' version conflict. Expected {expectedVersion}, actual {actualVersion}.")
{
    public Guid DepartureId { get; } = departureId;

    public long ExpectedVersion { get; } = expectedVersion;

    public long ActualVersion { get; } = actualVersion;
}
