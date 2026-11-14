using Hani.BuildingBlocks.Application;
using Hani.BuildingBlocks.Domain;
using Hani.Modules.Booking.Application.Abstractions;
using Hani.Modules.Booking.Domain.RestaurantReservations;

namespace Hani.Modules.Booking.Application.Commands.Requests;

internal sealed class CreateRestaurantReservationCommandHandler(
    IRestaurantReservationRepository reservations,
    IIdGenerator ids)
    : ICommandHandler<CreateRestaurantReservationCommand, RestaurantReservationDto>
{
    public async Task<Result<RestaurantReservationDto>> Handle(
        CreateRestaurantReservationCommand request,
        CancellationToken cancellationToken)
    {
        try
        {
            var reservation = RestaurantReservation.Create(
                ids,
                request.PlaceId,
                request.ReservationDate,
                request.ReservationTime,
                request.PartySize,
                request.ContactName,
                request.ContactEmail,
                request.ContactPhone,
                request.Notes);
            await reservations.AddAsync(reservation, cancellationToken);
            return Result<RestaurantReservationDto>.Success(Map(reservation));
        }
        catch (ArgumentException exception)
        {
            return Result<RestaurantReservationDto>.Failure(
                Error.Validation("HANI-BOOKING-3501", exception.Message));
        }
    }

    private static RestaurantReservationDto Map(RestaurantReservation reservation)
        => new(
            reservation.Id,
            reservation.ReservationNumber,
            reservation.PlaceId,
            reservation.ReservationDate,
            reservation.ReservationTime,
            reservation.PartySize,
            reservation.ContactName,
            reservation.ContactEmail,
            reservation.ContactPhone,
            reservation.Notes,
            reservation.Status.ToString(),
            reservation.CreatedAt,
            reservation.ConfirmedAt,
            reservation.RejectionReason);
}

internal sealed class GetRestaurantReservationQueryHandler(
    IRestaurantReservationRepository reservations)
    : IQueryHandler<GetRestaurantReservationQuery, RestaurantReservationDto>
{
    public async Task<Result<RestaurantReservationDto>> Handle(
        GetRestaurantReservationQuery request,
        CancellationToken cancellationToken)
    {
        var reservation = await reservations.GetByIdAsync(request.ReservationId, cancellationToken);
        return reservation is null
            ? Result<RestaurantReservationDto>.Failure(
                Error.NotFound("HANI-BOOKING-3502", "Restaurant reservation was not found."))
            : Result<RestaurantReservationDto>.Success(Map(reservation));
    }

    private static RestaurantReservationDto Map(RestaurantReservation reservation)
        => new(
            reservation.Id,
            reservation.ReservationNumber,
            reservation.PlaceId,
            reservation.ReservationDate,
            reservation.ReservationTime,
            reservation.PartySize,
            reservation.ContactName,
            reservation.ContactEmail,
            reservation.ContactPhone,
            reservation.Notes,
            reservation.Status.ToString(),
            reservation.CreatedAt,
            reservation.ConfirmedAt,
            reservation.RejectionReason);
}

internal sealed class ListRestaurantReservationsQueryHandler(
    IRestaurantReservationRepository reservations)
    : IQueryHandler<ListRestaurantReservationsQuery, PagedResult<RestaurantReservationDto>>
{
    public async Task<Result<PagedResult<RestaurantReservationDto>>> Handle(
        ListRestaurantReservationsQuery request,
        CancellationToken cancellationToken)
    {
        RestaurantReservationStatus? status = null;

        if (!string.IsNullOrWhiteSpace(request.Status))
        {
            if (!Enum.TryParse<RestaurantReservationStatus>(request.Status, ignoreCase: true, out var parsed))
            {
                return Result<PagedResult<RestaurantReservationDto>>.Failure(
                    Error.Validation("HANI-BOOKING-3503", "Reservation status is invalid."));
            }

            status = parsed;
        }

        var page = Math.Max(1, request.Page);
        var pageSize = Math.Clamp(request.PageSize, 1, 50);
        var items = await reservations.ListAsync(
            status,
            (page - 1) * pageSize,
            pageSize,
            cancellationToken);
        var total = await reservations.CountAsync(status, cancellationToken);

        return Result<PagedResult<RestaurantReservationDto>>.Success(
            new PagedResult<RestaurantReservationDto>(items.Select(Map).ToArray(), page, pageSize, total));
    }

    private static RestaurantReservationDto Map(RestaurantReservation reservation)
        => new(
            reservation.Id,
            reservation.ReservationNumber,
            reservation.PlaceId,
            reservation.ReservationDate,
            reservation.ReservationTime,
            reservation.PartySize,
            reservation.ContactName,
            reservation.ContactEmail,
            reservation.ContactPhone,
            reservation.Notes,
            reservation.Status.ToString(),
            reservation.CreatedAt,
            reservation.ConfirmedAt,
            reservation.RejectionReason);
}

internal sealed class ConfirmRestaurantReservationCommandHandler(
    IRestaurantReservationRepository reservations)
    : ICommandHandler<ConfirmRestaurantReservationCommand, bool>
{
    public async Task<Result<bool>> Handle(
        ConfirmRestaurantReservationCommand request,
        CancellationToken cancellationToken)
    {
        var reservation = await reservations.GetByIdAsync(request.ReservationId, cancellationToken);

        if (reservation is null)
        {
            return Result<bool>.Failure(
                Error.NotFound("HANI-BOOKING-3502", "Restaurant reservation was not found."));
        }

        try
        {
            reservation.Confirm();
            await reservations.SaveChangesAsync(cancellationToken);
            return Result<bool>.Success(true);
        }
        catch (InvalidOperationException exception)
        {
            return Result<bool>.Failure(Error.Conflict("HANI-BOOKING-3504", exception.Message));
        }
    }
}

internal sealed class RejectRestaurantReservationCommandHandler(
    IRestaurantReservationRepository reservations)
    : ICommandHandler<RejectRestaurantReservationCommand, bool>
{
    public async Task<Result<bool>> Handle(
        RejectRestaurantReservationCommand request,
        CancellationToken cancellationToken)
    {
        var reservation = await reservations.GetByIdAsync(request.ReservationId, cancellationToken);

        if (reservation is null)
        {
            return Result<bool>.Failure(
                Error.NotFound("HANI-BOOKING-3502", "Restaurant reservation was not found."));
        }

        try
        {
            reservation.Reject(request.Reason);
            await reservations.SaveChangesAsync(cancellationToken);
            return Result<bool>.Success(true);
        }
        catch (InvalidOperationException exception)
        {
            return Result<bool>.Failure(Error.Conflict("HANI-BOOKING-3504", exception.Message));
        }
        catch (ArgumentException exception)
        {
            return Result<bool>.Failure(Error.Validation("HANI-BOOKING-3505", exception.Message));
        }
    }
}
