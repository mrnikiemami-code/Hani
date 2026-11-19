namespace Hani.Modules.Admin.Application;

/// <summary>Operational report overview.</summary>
public sealed record AdminReportOverviewDto(
    int PeriodDays,
    DateTimeOffset From,
    DateTimeOffset To,
    int TotalOrders,
    int PaidOrders,
    int PendingPaymentOrders,
    int CancelledOrders,
    int ReservationRequests,
    int HotelInquiries,
    int PendingHotelInquiries,
    int OpenSupportTickets,
    IReadOnlyList<AdminMoneyReportDto> Revenue,
    IReadOnlyList<AdminMoneyReportDto> Refunds,
    IReadOnlyList<AdminMoneyReportDto> Commissions,
    IReadOnlyList<AdminStatusMoneyReportDto> Payouts,
    IReadOnlyList<AdminOrderStatusReportDto> OrdersByStatus,
    IReadOnlyList<AdminAgencyReportDto> TopAgencies,
    IReadOnlyList<AdminHotelReportDto> Hotels,
    IReadOnlyList<AdminCampaignReportDto> Campaigns,
    int CampaignRegistrations,
    int UsersTotal,
    int UsersNew,
    IReadOnlyList<AdminDailyRevenueReportDto> RevenueTrend,
    IReadOnlyList<AdminDailyOrderReportDto> OrderTrend);

/// <summary>Daily successful revenue grouped by date and currency.</summary>
public sealed record AdminDailyRevenueReportDto(
    DateOnly Date,
    string Currency,
    int Count,
    decimal Amount);

/// <summary>Daily order count grouped by date and status.</summary>
public sealed record AdminDailyOrderReportDto(
    DateOnly Date,
    string Status,
    int Count);

/// <summary>Amount grouped by currency.</summary>
public sealed record AdminMoneyReportDto(string Currency, int Count, decimal Amount);

/// <summary>Amount grouped by status and currency.</summary>
public sealed record AdminStatusMoneyReportDto(
    string Status,
    string Currency,
    int Count,
    decimal Amount);

/// <summary>Orders grouped by status and currency.</summary>
public sealed record AdminOrderStatusReportDto(
    string Status,
    string Currency,
    int Count,
    decimal Amount);

/// <summary>Top agency by paid orders.</summary>
public sealed record AdminAgencyReportDto(
    Guid AgencyId,
    string AgencyName,
    string Currency,
    int OrderCount,
    decimal Amount);

/// <summary>Hotel counts by status.</summary>
public sealed record AdminHotelReportDto(string Status, int Count);

/// <summary>Campaign counts by status.</summary>
public sealed record AdminCampaignReportDto(string Status, int Count);

/// <summary>Admin operational report service.</summary>
public interface IAdminReportService
{
    /// <summary>Returns the operational KPI overview.</summary>
    Task<AdminReportOverviewDto> GetOverviewAsync(int? days, CancellationToken cancellationToken);
}
