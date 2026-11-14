using Hani.BuildingBlocks.Application;

namespace Hani.Modules.Booking.Application.Commands.Requests;

/// <summary>
/// Command that creates a hotel availability inquiry.
/// </summary>
public sealed record CreateHotelInquiryCommand(
    Guid HotelId,
    DateOnly CheckIn,
    DateOnly CheckOut,
    int Rooms,
    int Adults,
    int Children,
    string ContactEmail,
    string? ContactPhone,
    string? Notes) : ICommand<HotelInquiryDto>;

/// <summary>
/// Query that returns one hotel inquiry.
/// </summary>
public sealed record GetHotelInquiryQuery(Guid InquiryId) : IQuery<HotelInquiryDto>;

/// <summary>
/// Query that lists hotel inquiries for operations.
/// </summary>
public sealed record ListHotelInquiriesQuery(string? Status, int Page = 1, int PageSize = 20)
    : IQuery<PagedResult<HotelInquiryDto>>;

/// <summary>
/// Command that records an operator response to a hotel inquiry.
/// </summary>
public sealed record RespondHotelInquiryCommand(
    Guid InquiryId,
    string ResponseNote,
    decimal? QuotedTotal = null,
    string? QuotedCurrency = null) : ICommand<bool>;

/// <summary>
/// Hotel inquiry read model.
/// </summary>
public sealed record HotelInquiryDto(
    Guid InquiryId,
    string InquiryNumber,
    Guid HotelId,
    DateOnly CheckIn,
    DateOnly CheckOut,
    int Rooms,
    int Adults,
    int Children,
    string ContactEmail,
    string? ContactPhone,
    string? Notes,
    string Status,
    DateTimeOffset CreatedAt,
    DateTimeOffset? RespondedAt,
    string? ResponseNote,
    decimal? QuotedTotal,
    string? QuotedCurrency);
