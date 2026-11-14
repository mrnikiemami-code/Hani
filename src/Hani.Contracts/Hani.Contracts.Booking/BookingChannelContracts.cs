namespace Hani.Contracts.Booking;

/// <summary>
/// Channel-facing order summary.
/// </summary>
public sealed record ChannelOrderSummary(
    Guid OrderId,
    string OrderNumber,
    Guid AgencyId,
    string Status,
    string PaymentStatus,
    decimal Total,
    string Currency,
    string ContactEmail,
    DateTimeOffset CreatedAt);

/// <summary>Agency booking dashboard summary.</summary>
public sealed record AgencyBookingDashboardSummary(
    Guid AgencyId,
    int OrderCount,
    int PendingCount,
    int PaidCount,
    int CancelledCount,
    decimal GrossPaid,
    string? Currency);

/// <summary>Traveler booking dashboard summary.</summary>
public sealed record TravelerBookingDashboardSummary(
    string ContactEmail,
    int OrderCount,
    int ReservationRequestCount,
    int LeadCount,
    decimal GrossPaid,
    string? Currency);

/// <summary>Admin booking dashboard summary.</summary>
public sealed record AdminBookingDashboardSummary(
    int OrderCount,
    int ReservationRequestCount,
    int LeadCount,
    int PendingAgencyRequests);

/// <summary>
/// Read-side contract for channel booking lists and dashboards.
/// </summary>
public interface IChannelOrderReadService
{
    /// <summary>
    /// Lists orders for one agency with optional status/date filters.
    /// </summary>
    Task<IReadOnlyList<ChannelOrderSummary>> ListByAgencyAsync(
        Guid agencyId,
        string? status,
        DateOnly? from,
        int skip,
        int take,
        CancellationToken cancellationToken);

    /// <summary>Returns agency booking dashboard totals.</summary>
    Task<AgencyBookingDashboardSummary> GetAgencyDashboardAsync(
        Guid agencyId,
        CancellationToken cancellationToken);

    /// <summary>Returns traveler booking dashboard totals by contact email.</summary>
    Task<TravelerBookingDashboardSummary> GetTravelerDashboardAsync(
        string contactEmail,
        CancellationToken cancellationToken);

    /// <summary>Returns admin booking dashboard totals.</summary>
    Task<AdminBookingDashboardSummary> GetAdminDashboardAsync(
        CancellationToken cancellationToken);
}
