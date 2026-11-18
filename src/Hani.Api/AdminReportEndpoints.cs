using Hani.Modules.Booking.Domain.HotelInquiries;
using Hani.Modules.Booking.Domain.Orders;
using Hani.Modules.Booking.Infrastructure.Persistence;
using Hani.Modules.Catalog.Infrastructure.Persistence;
using Hani.Modules.Content.Domain.Support;
using Hani.Modules.Content.Infrastructure.Persistence;
using Hani.Modules.Identity.Infrastructure.Persistence;
using Hani.Modules.Payments.Domain.PaymentIntents;
using Hani.Modules.Payments.Domain.Refunds;
using Hani.Modules.Payments.Infrastructure.Persistence;
using Hani.Modules.Settlement.Domain.Commissions;
using Hani.Modules.Settlement.Infrastructure.Persistence;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using IResult = Microsoft.AspNetCore.Http.IResult;

namespace Hani.Api;

/// <summary>
/// Operational reporting across bookings, payments, settlement, catalog,
/// identity, and content. Amounts are always grouped by currency.
/// </summary>
public static class AdminReportEndpoints
{
    /// <summary>Maps admin report endpoints.</summary>
    public static IEndpointRouteBuilder MapAdminReportEndpoints(this IEndpointRouteBuilder app)
    {
        app.MapGet("/internal/v1/admin/reports/overview", GetOverviewAsync)
            .WithTags("Internal.Admin.Reports")
            .WithName("Internal.GetAdminReportOverview")
            .RequireAuthorization("Admin")
            .Produces<AdminReportOverviewDto>();
        return app;
    }

    private static async Task<IResult> GetOverviewAsync(
        [FromQuery] int? days,
        BookingDbContext booking,
        PaymentsDbContext payments,
        SettlementDbContext settlement,
        CatalogDbContext catalog,
        IdentityDbContext identity,
        ContentDbContext content,
        CancellationToken cancellationToken)
    {
        var periodDays = days is > 0 and <= 3650 ? days.Value : 30;
        var to = DateTimeOffset.UtcNow;
        var from = to.AddDays(-periodDays);

        var orders = booking.Orders.AsNoTracking().Where(item => item.CreatedAt >= from);
        var requests = booking.ReservationRequests.AsNoTracking()
            .Where(item => item.CreatedAt >= from);
        var inquiries = booking.HotelInquiries.AsNoTracking()
            .Where(item => item.CreatedAt >= from);

        var orderStatusRows = await orders
            .GroupBy(item => new { item.Status, item.Currency })
            .Select(group => new
            {
                group.Key.Status,
                group.Key.Currency,
                Count = group.Count(),
                Amount = group.Sum(item => item.Total)
            })
            .ToArrayAsync(cancellationToken);
        var ordersByStatus = orderStatusRows
            .Select(row => new AdminOrderStatusReportDto(
                row.Status.ToString(),
                row.Currency,
                row.Count,
                row.Amount))
            .OrderBy(row => row.Status)
            .ThenBy(row => row.Currency)
            .ToArray();

        var revenueRows = await payments.PaymentIntents
            .AsNoTracking()
            .Where(item => item.Status == PaymentIntentStatus.Succeeded && item.CreatedAt >= from)
            .GroupBy(item => item.Currency)
            .Select(group => new AdminMoneyReportDto(
                group.Key,
                group.Count(),
                group.Sum(item => item.Amount)))
            .ToArrayAsync(cancellationToken);

        var refundRows = await payments.Refunds
            .AsNoTracking()
            .Where(item => item.RequestedAt >= from && item.Status != RefundStatus.Failed)
            .GroupBy(item => item.Currency)
            .Select(group => new AdminMoneyReportDto(
                group.Key,
                group.Count(),
                group.Sum(item => item.Amount)))
            .ToArrayAsync(cancellationToken);

        var commissionRows = await settlement.CommissionEntries
            .AsNoTracking()
            .Where(item => item.CreatedAt >= from && item.Status == CommissionStatus.Accrued)
            .GroupBy(item => item.Currency)
            .Select(group => new AdminMoneyReportDto(
                group.Key,
                group.Count(),
                group.Sum(item => item.CommissionAmount)))
            .ToArrayAsync(cancellationToken);

        var payoutRows = await settlement.Payouts
            .AsNoTracking()
            .Where(item => item.CreatedAt >= from)
            .GroupBy(item => new { item.Status, item.Currency })
            .Select(group => new AdminStatusMoneyReportDto(
                group.Key.Status.ToString(),
                group.Key.Currency,
                group.Count(),
                group.Sum(item => item.Amount)))
            .ToArrayAsync(cancellationToken);

        var topAgencyRows = await booking.Orders
            .AsNoTracking()
            .Where(item => item.Status == OrderStatus.Paid && item.CreatedAt >= from)
            .GroupBy(item => new { item.AgencyId, item.Currency })
            .Select(group => new
            {
                group.Key.AgencyId,
                group.Key.Currency,
                Count = group.Count(),
                Amount = group.Sum(item => item.Total)
            })
            .OrderByDescending(row => row.Amount)
            .Take(12)
            .ToArrayAsync(cancellationToken);
        var agencyIds = topAgencyRows.Select(row => row.AgencyId).Distinct().ToArray();
        var agencyNames = await identity.Agencies
            .AsNoTracking()
            .Where(item => agencyIds.Contains(item.Id))
            .Select(item => new { item.Id, item.Name })
            .ToDictionaryAsync(item => item.Id, item => item.Name, cancellationToken);
        var topAgencies = topAgencyRows
            .Select(row => new AdminAgencyReportDto(
                row.AgencyId,
                agencyNames.GetValueOrDefault(row.AgencyId, row.AgencyId.ToString()),
                row.Currency,
                row.Count,
                row.Amount))
            .ToArray();

        var hotelRows = await catalog.Hotels
            .AsNoTracking()
            .GroupBy(item => item.Status)
            .Select(group => new { Status = group.Key, Count = group.Count() })
            .ToArrayAsync(cancellationToken);
        var hotels = hotelRows
            .Select(row => new AdminHotelReportDto(row.Status.ToString(), row.Count))
            .OrderBy(row => row.Status)
            .ToArray();

        var campaignRows = await content.Campaigns
            .AsNoTracking()
            .GroupBy(item => item.Status)
            .Select(group => new { Status = group.Key, Count = group.Count() })
            .ToArrayAsync(cancellationToken);
        var campaigns = campaignRows
            .Select(row => new AdminCampaignReportDto(row.Status.ToString(), row.Count))
            .OrderBy(row => row.Status)
            .ToArray();
        var registrationCount = await content.CampaignRegistrations
            .AsNoTracking()
            .CountAsync(item => item.CreatedAt >= from, cancellationToken);

        var openSupportTickets = await content.SupportTickets
            .AsNoTracking()
            .CountAsync(
                item => item.Status != SupportTicketStatus.Resolved &&
                    item.Status != SupportTicketStatus.Closed,
                cancellationToken);

        var usersTotal = await identity.Users.AsNoTracking().CountAsync(cancellationToken);
        var usersNew = await identity.Users.AsNoTracking()
            .CountAsync(item => item.CreatedAt >= from, cancellationToken);

        return Results.Ok(new AdminReportOverviewDto(
            periodDays,
            from,
            to,
            await orders.CountAsync(cancellationToken),
            await orders.CountAsync(item => item.Status == OrderStatus.Paid, cancellationToken),
            await orders.CountAsync(item => item.Status == OrderStatus.PendingPayment, cancellationToken),
            await orders.CountAsync(item => item.Status == OrderStatus.Cancelled, cancellationToken),
            await requests.CountAsync(cancellationToken),
            await inquiries.CountAsync(cancellationToken),
            await inquiries.CountAsync(item => item.Status == HotelInquiryStatus.Pending, cancellationToken),
            openSupportTickets,
            revenueRows.OrderBy(row => row.Currency).ToArray(),
            refundRows.OrderBy(row => row.Currency).ToArray(),
            commissionRows.OrderBy(row => row.Currency).ToArray(),
            payoutRows.OrderBy(row => row.Status).ThenBy(row => row.Currency).ToArray(),
            ordersByStatus,
            topAgencies,
            hotels,
            campaigns,
            registrationCount,
            usersTotal,
            usersNew));
    }
}

/// <summary>Admin operational report overview.</summary>
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
    int UsersNew);

/// <summary>Amount grouped by currency.</summary>
public sealed record AdminMoneyReportDto(
    string Currency,
    int Count,
    decimal Amount);

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

/// <summary>Top agency by paid order amount.</summary>
public sealed record AdminAgencyReportDto(
    Guid AgencyId,
    string AgencyName,
    string Currency,
    int OrderCount,
    decimal Amount);

/// <summary>Hotel counts by lifecycle status.</summary>
public sealed record AdminHotelReportDto(string Status, int Count);

/// <summary>Campaign counts by status.</summary>
public sealed record AdminCampaignReportDto(string Status, int Count);
