using Hani.BuildingBlocks.Application;
using Hani.BuildingBlocks.AspNetCore;
using Hani.Modules.Admin.Application;
using Hani.Modules.Booking.Application.Commands.CancelOrder;
using Hani.Modules.Booking.Application.Commands.CreateOrder;
using Hani.Modules.Booking.Application.Queries.GetOrder;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using IResult = Microsoft.AspNetCore.Http.IResult;

namespace Hani.Api;

/// <summary>Admin booking endpoints.</summary>
public static class AdminBookingEndpoints
{
    /// <summary>Maps admin booking endpoints.</summary>
    public static IEndpointRouteBuilder MapAdminBookingEndpoints(this IEndpointRouteBuilder app)
    {
        app.MapGet("/internal/v1/admin/bookings", ListAsync)
            .WithTags("Internal.Admin.Booking")
            .WithName("Internal.ListAdminBookings")
            .RequireAuthorization("Admin")
            .Produces<AdminBookingsResponse>();

        app.MapGet("/internal/v1/admin/bookings/orders/{id:guid}", GetOrderAsync)
            .WithTags("Internal.Admin.Booking")
            .WithName("Internal.GetAdminOrder")
            .RequireAuthorization("Admin")
            .Produces<OrderDto>();

        app.MapPost("/internal/v1/admin/bookings/orders/{id:guid}/cancel", CancelOrderAsync)
            .WithTags("Internal.Admin.Booking")
            .WithName("Internal.CancelAdminOrder")
            .RequireAuthorization("Admin")
            .Produces<bool>();

        app.MapPost("/internal/v1/admin/bookings/orders/{id:guid}/contact", UpdateContactAsync)
            .WithTags("Internal.Admin.Booking")
            .WithName("Internal.UpdateAdminOrderContact")
            .RequireAuthorization("Admin")
            .Produces<bool>();

        app.MapGet("/internal/v1/admin/bookings/orders/{id:guid}/payments", ListPaymentsAsync)
            .WithTags("Internal.Admin.Booking")
            .WithName("Internal.ListAdminOrderPayments")
            .RequireAuthorization("Admin")
            .Produces<IReadOnlyList<AdminOrderPaymentDto>>();

        app.MapGet("/internal/v1/admin/bookings/orders/{id:guid}/contract", GetContractAsync)
            .WithTags("Internal.Admin.Booking")
            .WithName("Internal.GetAdminOrderContract")
            .RequireAuthorization("Admin")
            .Produces<AdminContractDto>();

        app.MapGet("/internal/v1/admin/bookings/orders/{id:guid}/voucher", GetVoucherAsync)
            .WithTags("Internal.Admin.Booking")
            .WithName("Internal.GetAdminOrderVoucher")
            .RequireAuthorization("Admin")
            .Produces<AdminVoucherDto>();

        app.MapGet("/internal/v1/admin/bookings/orders/{id:guid}/history", ListHistoryAsync)
            .WithTags("Internal.Admin.Booking")
            .WithName("Internal.ListAdminOrderHistory")
            .RequireAuthorization("Admin")
            .Produces<AdminOrderHistoryDto>();

        app.MapGet("/internal/v1/admin/bookings/orders/{id:guid}/refunds", ListRefundsAsync)
            .WithTags("Internal.Admin.Booking")
            .WithName("Internal.ListAdminOrderRefunds")
            .RequireAuthorization("Admin")
            .Produces<IReadOnlyList<AdminRefundDto>>();

        app.MapPost("/internal/v1/admin/bookings/requests/{id:guid}/confirm", ConfirmRequestAsync)
            .WithTags("Internal.Admin.Booking")
            .WithName("Internal.ConfirmAdminReservationRequest")
            .RequireAuthorization("Admin")
            .Produces<bool>();

        app.MapPost("/internal/v1/admin/bookings/requests/{id:guid}/reject", RejectRequestAsync)
            .WithTags("Internal.Admin.Booking")
            .WithName("Internal.RejectAdminReservationRequest")
            .RequireAuthorization("Admin")
            .Produces<bool>();
        return app;
    }

    private static async Task<IResult> ListAsync(
        [FromQuery] int page,
        [FromQuery] int pageSize,
        [FromQuery] string? q,
        IAdminBookingService bookings,
        CancellationToken cancellationToken)
        => Results.Ok(await bookings.ListAsync(
            page,
            pageSize,
            q,
            cancellationToken));

    private static async Task<IResult> GetOrderAsync(
        Guid id,
        HttpContext context,
        ISender sender,
        CancellationToken cancellationToken)
    {
        var result = await sender.Send(new GetOrderQuery(id), cancellationToken);
        return result.IsSuccess ? Results.Ok(result.Value) : context.ToProblem(result.Error!);
    }

    private static async Task<IResult> CancelOrderAsync(
        Guid id,
        CancelOrderRequest request,
        HttpContext context,
        ISender sender,
        IAdminAuditWriter audit,
        CancellationToken cancellationToken)
    {
        var result = await sender.Send(
            new CancelOrderCommand(id, request.Reason),
            cancellationToken);
        if (!result.IsSuccess)
        {
            return context.ToProblem(result.Error!);
        }

        await audit.RecordAsync(
            context,
            "booking.order.cancelled",
            "Order",
            id.ToString(),
            request.Reason,
            before: new { status = "Active" },
            after: new { status = "Cancelled" },
            cancellationToken: cancellationToken);
        return Results.Ok(result.Value);
    }

    private static async Task<IResult> UpdateContactAsync(
        Guid id,
        UpdateOrderContactRequest request,
        HttpContext context,
        IAdminBookingService bookings,
        IAdminAuditWriter audit,
        CancellationToken cancellationToken)
    {
        var result = await bookings.UpdateContactAsync(
            id,
            request.ContactEmail,
            request.ContactPhone,
            cancellationToken);
        if (!result.IsSuccess)
        {
            return context.ToProblem(result.Error!);
        }

        await audit.RecordAsync(
            context,
            "booking.order.contact_updated",
            "Order",
            id.ToString(),
            "Order contact details updated from the admin panel",
            after: new { request.ContactEmail, request.ContactPhone },
            cancellationToken: cancellationToken);
        return Results.Ok(result.Value);
    }

    private static async Task<IResult> ListPaymentsAsync(
        Guid id,
        IAdminBookingService bookings,
        CancellationToken cancellationToken)
        => Results.Ok(await bookings.ListPaymentsAsync(id, cancellationToken));

    private static async Task<IResult> GetContractAsync(
        Guid id,
        HttpContext context,
        IAdminBookingService bookings,
        CancellationToken cancellationToken)
    {
        var contract = await bookings.GetContractAsync(id, cancellationToken);
        return contract is null
            ? context.ToProblem(Error.NotFound(
                "HANI-ADMIN-BOOKING-4041",
                "Order contract was not found."))
            : Results.Ok(contract);
    }

    private static async Task<IResult> GetVoucherAsync(
        Guid id,
        HttpContext context,
        IAdminBookingService bookings,
        CancellationToken cancellationToken)
    {
        var voucher = await bookings.GetVoucherAsync(id, cancellationToken);
        return voucher is null
            ? context.ToProblem(Error.NotFound(
                "HANI-ADMIN-BOOKING-4042",
                "Order voucher was not found."))
            : Results.Ok(voucher);
    }

    private static async Task<IResult> ListHistoryAsync(
        Guid id,
        [FromQuery] int page,
        [FromQuery] int pageSize,
        IAdminBookingService bookings,
        CancellationToken cancellationToken)
        => Results.Ok(await bookings.ListHistoryAsync(
            id,
            page,
            pageSize,
            cancellationToken));

    private static async Task<IResult> ListRefundsAsync(
        Guid id,
        IAdminBookingService bookings,
        CancellationToken cancellationToken)
        => Results.Ok(await bookings.ListRefundsAsync(id, cancellationToken));

    private static async Task<IResult> ConfirmRequestAsync(
        Guid id,
        ConfirmReservationRequestRequest request,
        HttpContext context,
        IAdminBookingService bookings,
        IAdminAuditWriter audit,
        CancellationToken cancellationToken)
    {
        var result = await bookings.ConfirmRequestAsync(
            id,
            request.Note,
            cancellationToken);
        if (!result.IsSuccess)
        {
            return context.ToProblem(result.Error!);
        }

        await audit.RecordAsync(
            context,
            "booking.request.confirmed",
            "ReservationRequest",
            id.ToString(),
            "Reservation request confirmed from the admin panel",
            after: new { status = "Confirmed", request.Note },
            cancellationToken: cancellationToken);
        return Results.Ok(result.Value);
    }

    private static async Task<IResult> RejectRequestAsync(
        Guid id,
        RejectReservationRequestRequest request,
        HttpContext context,
        IAdminBookingService bookings,
        IAdminAuditWriter audit,
        CancellationToken cancellationToken)
    {
        var result = await bookings.RejectRequestAsync(
            id,
            request.Reason,
            cancellationToken);
        if (!result.IsSuccess)
        {
            return context.ToProblem(result.Error!);
        }

        await audit.RecordAsync(
            context,
            "booking.request.rejected",
            "ReservationRequest",
            id.ToString(),
            request.Reason,
            after: new { status = "Rejected" },
            cancellationToken: cancellationToken);
        return Results.Ok(result.Value);
    }
}

/// <summary>Admin order cancellation request.</summary>
public sealed record CancelOrderRequest(string Reason);

/// <summary>Admin order contact update request.</summary>
public sealed record UpdateOrderContactRequest(
    string ContactEmail,
    string? ContactPhone);

/// <summary>Admin reservation confirmation request.</summary>
public sealed record ConfirmReservationRequestRequest(string? Note);

/// <summary>Admin reservation rejection request.</summary>
public sealed record RejectReservationRequestRequest(string Reason);
