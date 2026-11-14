using Hani.BuildingBlocks.Application;
using Hani.Modules.Booking.Domain.Leads;

namespace Hani.Modules.Booking.Application.Commands.Requests;

/// <summary>
/// Command that submits a reservation request for a non-instant-bookable quote.
/// </summary>
public sealed record CreateReservationRequestCommand(
    Guid QuoteId,
    string ContactEmail,
    string? ContactPhone,
    string? Notes) : ICommand<ReservationRequestDto>;

/// <summary>
/// Query that returns a reservation request.
/// </summary>
public sealed record GetReservationRequestQuery(Guid RequestId) : IQuery<ReservationRequestDto>;

/// <summary>
/// Query that lists reservation requests for one agency.
/// </summary>
public sealed record ListReservationRequestsQuery(Guid AgencyId, string? Status)
    : IQuery<IReadOnlyList<ReservationRequestDto>>;

/// <summary>
/// Command that confirms a pending reservation request. When <paramref name="AgencyId"/>
/// is supplied, the request must belong to that agency.
/// </summary>
public sealed record ConfirmReservationRequestCommand(
    Guid RequestId,
    string? AgencyNote,
    Guid? AgencyId = null) : ICommand<bool>;

/// <summary>
/// Command that rejects a pending reservation request. When <paramref name="AgencyId"/>
/// is supplied, the request must belong to that agency.
/// </summary>
public sealed record RejectReservationRequestCommand(
    Guid RequestId,
    string Reason,
    Guid? AgencyId = null) : ICommand<bool>;

/// <summary>
/// Command that accepts a confirmed reservation request.
/// </summary>
public sealed record AcceptReservationRequestCommand(Guid RequestId) : ICommand<bool>;

/// <summary>
/// Reservation request read model.
/// </summary>
public sealed record ReservationRequestDto(
    Guid RequestId,
    string RequestNumber,
    Guid QuoteId,
    Guid AgencyOfferId,
    Guid AgencyId,
    Guid DepartureId,
    string RoomType,
    int Adults,
    int Children,
    int Infants,
    decimal Total,
    string Currency,
    string Status,
    string? AgencyNote,
    string? RejectionReason,
    DateTimeOffset CreatedAt,
    DateTimeOffset ExpiresAt,
    DateTimeOffset? DecidedAt,
    DateTimeOffset? AcceptedAt);

/// <summary>
/// Command that creates a Safarsaz/RFQ lead.
/// </summary>
public sealed record CreateLeadCommand(
    LeadServiceType ServiceType,
    string? Destination,
    DateOnly? StartDate,
    DateOnly? EndDate,
    int Adults,
    int Children,
    int Infants,
    decimal? BudgetAmount,
    string? Currency,
    string ContactName,
    string ContactEmail,
    string ContactPhone,
    string? Notes) : ICommand<LeadDto>;

/// <summary>
/// Query that returns one lead.
/// </summary>
public sealed record GetLeadQuery(Guid LeadId) : IQuery<LeadDto>;

/// <summary>
/// Query that lists leads for the admin panel.
/// </summary>
public sealed record ListLeadsQuery(string? Status, int Page = 1, int PageSize = 20)
    : IQuery<PagedResult<LeadDto>>;

/// <summary>
/// Command that matches an open lead to an agency.
/// </summary>
public sealed record MatchLeadCommand(Guid LeadId, Guid AgencyId) : ICommand<bool>;

/// <summary>
/// Command that distributes a lead to every active agency and returns the number
/// of newly added invitations.
/// </summary>
public sealed record DistributeLeadCommand(Guid LeadId) : ICommand<int>;

/// <summary>
/// Command that closes a lead.
/// </summary>
public sealed record CloseLeadCommand(Guid LeadId) : ICommand<bool>;

/// <summary>
/// Lead read model.
/// </summary>
public sealed record LeadDto(
    Guid LeadId,
    string RequestNumber,
    string ServiceType,
    string? Destination,
    DateOnly? StartDate,
    DateOnly? EndDate,
    int Adults,
    int Children,
    int Infants,
    decimal? BudgetAmount,
    string? Currency,
    string ContactName,
    string ContactEmail,
    string ContactPhone,
    string? Notes,
    string Status,
    Guid? MatchedAgencyId,
    DateTimeOffset CreatedAt,
    DateTimeOffset? MatchedAt,
    DateTimeOffset? ClosedAt,
    IReadOnlyList<Guid> InvitedAgencyIds);

/// <summary>
/// Command that creates a price-discrepancy report.
/// </summary>
public sealed record CreatePriceDiscrepancyCommand(
    Guid AgencyOfferId,
    Guid? DepartureId,
    string? ContactEmail,
    decimal ReportedPrice,
    string Currency,
    string Note) : ICommand<PriceDiscrepancyDto>;

/// <summary>
/// Query that lists price-discrepancy reports.
/// </summary>
public sealed record ListPriceDiscrepanciesQuery(
    string? Status,
    int Page = 1,
    int PageSize = 20) : IQuery<PagedResult<PriceDiscrepancyDto>>;

/// <summary>
/// Command that resolves a price-discrepancy report.
/// </summary>
public sealed record ResolvePriceDiscrepancyCommand(Guid ReportId, string Resolution)
    : ICommand<bool>;

/// <summary>
/// Price-discrepancy read model.
/// </summary>
public sealed record PriceDiscrepancyDto(
    Guid ReportId,
    Guid AgencyOfferId,
    Guid? DepartureId,
    string? ContactEmail,
    decimal ReportedPrice,
    string Currency,
    string Note,
    string Status,
    DateTimeOffset CreatedAt,
    DateTimeOffset? ReviewedAt,
    string? Resolution);

/// <summary>
/// Command that creates an installment plan for one order currency.
/// </summary>
public sealed record CreateInstallmentPlanCommand(
    Guid OrderId,
    string Currency,
    int InstallmentCount,
    int IntervalDays,
    decimal? DownPaymentAmount = null,
    string? ChequeReference = null) : ICommand<InstallmentPlanDto>;

/// <summary>
/// Query that returns an order installment plan.
/// </summary>
public sealed record GetInstallmentPlanQuery(Guid OrderId, string Currency)
    : IQuery<InstallmentPlanDto>;

/// <summary>
/// Command that marks an installment paid.
/// </summary>
public sealed record PayInstallmentCommand(Guid OrderId, string Currency, int Sequence)
    : ICommand<bool>;

/// <summary>
/// Installment plan read model.
/// </summary>
public sealed record InstallmentPlanDto(
    Guid PlanId,
    Guid OrderId,
    string Currency,
    decimal TotalAmount,
    decimal DownPaymentAmount,
    decimal FinancedAmount,
    decimal MonthlyFeeRate,
    decimal TotalPayable,
    bool RequiresCheque,
    string? ChequeReference,
    int InstallmentCount,
    int IntervalDays,
    string Status,
    DateTimeOffset CreatedAt,
    IReadOnlyList<InstallmentDto> Installments);

/// <summary>
/// Installment read model.
/// </summary>
public sealed record InstallmentDto(
    Guid InstallmentId,
    int Sequence,
    DateOnly DueDate,
    decimal Amount,
    string Status,
    DateTimeOffset? PaidAt);
