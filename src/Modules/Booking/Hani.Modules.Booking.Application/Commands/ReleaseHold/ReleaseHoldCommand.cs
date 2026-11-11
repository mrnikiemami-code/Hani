using Hani.BuildingBlocks.Application;

namespace Hani.Modules.Booking.Application.Commands.ReleaseHold;

/// <summary>
/// Command that releases an active hold and returns its seats.
/// </summary>
public sealed record ReleaseHoldCommand(Guid HoldId) : ICommand<bool>;
