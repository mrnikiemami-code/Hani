using Hani.BuildingBlocks.Application;

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

/// <summary>Traveler snapshot included in an order contract or voucher.</summary>
public sealed record AdminContractTravelerDto(
    Guid TravelerId,
    string FullName,
    string Type,
    DateOnly? DateOfBirth);

/// <summary>Priced line snapshot included in an order contract or voucher.</summary>
public sealed record AdminContractLineDto(
    Guid LineId,
    string Description,
    int Quantity,
    decimal UnitPrice,
    decimal Total,
    string Currency);

/// <summary>Immutable contract snapshot issued with an order.</summary>
public sealed record AdminContractDto(
    Guid ContractId,
    string ContractNumber,
    Guid OrderId,
    string OrderNumber,
    string OrderStatus,
    DateTimeOffset IssuedAt,
    Guid QuoteId,
    Guid HoldId,
    Guid AgencyId,
    Guid AgencyOfferId,
    Guid DepartureId,
    string RoomType,
    int Adults,
    int Children,
    int Infants,
    int Seats,
    decimal UnitPrice,
    decimal Total,
    string Currency,
    string ContactEmail,
    string? ContactPhone,
    IReadOnlyList<AdminContractTravelerDto> Travelers,
    IReadOnlyList<AdminContractLineDto> Lines,
    DateTimeOffset? CancelledAt,
    string? CancellationReason);

/// <summary>Printable travel voucher derived from the order contract snapshot.</summary>
public sealed record AdminVoucherDto(
    string VoucherNumber,
    Guid OrderId,
    string OrderNumber,
    string ContractNumber,
    string OrderStatus,
    string PaymentStatus,
    DateTimeOffset IssuedAt,
    DateTimeOffset PaymentDueAt,
    Guid AgencyId,
    Guid DepartureId,
    string RoomType,
    int Adults,
    int Children,
    int Infants,
    decimal Total,
    string Currency,
    string ContactEmail,
    string? ContactPhone,
    IReadOnlyList<AdminContractTravelerDto> Travelers,
    IReadOnlyList<AdminContractLineDto> Lines,
    DateTimeOffset? CancelledAt,
    string? CancellationReason);

/// <summary>One auditable order history event.</summary>
public sealed record AdminOrderHistoryEntryDto(
    Guid Id,
    DateTimeOffset OccurredAt,
    string Action,
    string Reason,
    string ActorRole,
    string? ActorMobile,
    string? BeforeJson,
    string? AfterJson);

/// <summary>Paged order history.</summary>
public sealed record AdminOrderHistoryDto(
    IReadOnlyList<AdminOrderHistoryEntryDto> Items,
    int Total,
    int Page,
    int PageSize);

/// <summary>Admin booking read and workflow service.</summary>
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

    /// <summary>Returns the immutable contract snapshot issued with an order.</summary>
    Task<AdminContractDto?> GetContractAsync(
        Guid orderId,
        CancellationToken cancellationToken);

    /// <summary>Returns the printable voucher derived from the order contract.</summary>
    Task<AdminVoucherDto?> GetVoucherAsync(
        Guid orderId,
        CancellationToken cancellationToken);

    /// <summary>Lists admin audit events recorded for one order.</summary>
    Task<AdminOrderHistoryDto> ListHistoryAsync(
        Guid orderId,
        int page,
        int pageSize,
        CancellationToken cancellationToken);

    /// <summary>Lists refund records requested for one order.</summary>
    Task<IReadOnlyList<AdminRefundDto>> ListRefundsAsync(
        Guid orderId,
        CancellationToken cancellationToken);

    /// <summary>Confirms a pending reservation request.</summary>
    Task<Result<bool>> ConfirmRequestAsync(
        Guid requestId,
        string? note,
        CancellationToken cancellationToken);

    /// <summary>Rejects a pending reservation request with a reason.</summary>
    Task<Result<bool>> RejectRequestAsync(
        Guid requestId,
        string reason,
        CancellationToken cancellationToken);

    /// <summary>Updates the non-commercial contact details of an order.</summary>
    Task<Result<bool>> UpdateContactAsync(
        Guid orderId,
        string contactEmail,
        string? contactPhone,
        CancellationToken cancellationToken);
}
