namespace Hani.Modules.Admin.Application;

/// <summary>Admin booking list payload.</summary>
public sealed record AdminBookingsResponse(
    int OrderCount,
    int RequestCount,
    int InquiryCount,
    IReadOnlyList<AdminOrderDto> Orders,
    IReadOnlyList<AdminReservationDto> Requests,
    IReadOnlyList<AdminHotelInquiryDto> Inquiries);

/// <summary>Admin order payment row.</summary>
public sealed record AdminOrderPaymentDto(
    Guid PaymentIntentId,
    decimal Amount,
    string Currency,
    string Status,
    string Provider,
    DateTimeOffset CreatedAt);

/// <summary>Admin order row.</summary>
public sealed record AdminOrderDto(
    Guid Id,
    string Number,
    Guid AgencyId,
    string Status,
    string PaymentStatus,
    decimal Total,
    string Currency,
    string ContactEmail,
    DateTimeOffset CreatedAt,
    DateTimeOffset PaymentDueAt);

/// <summary>Admin reservation request row.</summary>
public sealed record AdminReservationDto(
    Guid Id,
    string Number,
    Guid AgencyId,
    string Status,
    decimal Total,
    string Currency,
    string ContactEmail,
    DateTimeOffset CreatedAt,
    DateTimeOffset ExpiresAt);

/// <summary>Admin hotel inquiry row.</summary>
public sealed record AdminHotelInquiryDto(
    Guid Id,
    string Number,
    Guid HotelId,
    DateOnly CheckIn,
    DateOnly CheckOut,
    int Rooms,
    int Adults,
    int Children,
    string Status,
    string ContactEmail,
    DateTimeOffset CreatedAt);

/// <summary>Admin booking read service.</summary>
public interface IAdminBookingService
{
    /// <summary>Lists orders, reservation requests, and hotel inquiries.</summary>
    Task<AdminBookingsResponse> ListAsync(
        int page,
        int pageSize,
        string? q,
        CancellationToken cancellationToken);

    /// <summary>Lists payment intents for one order.</summary>
    Task<IReadOnlyList<AdminOrderPaymentDto>> ListPaymentsAsync(
        Guid orderId,
        CancellationToken cancellationToken);
}
