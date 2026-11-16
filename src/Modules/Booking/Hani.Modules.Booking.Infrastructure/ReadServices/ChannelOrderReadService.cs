using Hani.Contracts.Booking;
using Hani.Modules.Booking.Domain.Leads;
using Hani.Modules.Booking.Domain.Orders;
using Hani.Modules.Booking.Domain.ReservationRequests;
using Hani.Modules.Booking.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Hani.Modules.Booking.Infrastructure.ReadServices;

internal sealed class ChannelOrderReadService(BookingDbContext dbContext) : IChannelOrderReadService
{
    public async Task<IReadOnlyList<ChannelOrderSummary>> ListByAgencyAsync(
        Guid agencyId,
        string? status,
        DateOnly? from,
        int skip,
        int take,
        CancellationToken cancellationToken)
    {
        var query = dbContext.Orders
            .AsNoTracking()
            .Where(order => order.AgencyId == agencyId);

        if (!string.IsNullOrWhiteSpace(status) &&
            Enum.TryParse<OrderStatus>(status, ignoreCase: true, out var parsedStatus))
        {
            query = query.Where(order => order.Status == parsedStatus);
        }

        if (from is not null)
        {
            var start = new DateTimeOffset(
                from.Value.ToDateTime(TimeOnly.MinValue),
                TimeSpan.Zero);
            query = query.Where(order => order.CreatedAt >= start);
        }

        return await query
            .OrderByDescending(order => order.CreatedAt)
            .Skip(skip)
            .Take(take)
            .Select(order => new ChannelOrderSummary(
                order.Id,
                order.OrderNumber,
                order.AgencyId,
                order.Status.ToString(),
                order.PaymentStatus.ToString(),
                order.Total,
                order.Currency,
                order.ContactEmail,
                order.CreatedAt))
            .ToArrayAsync(cancellationToken);
    }

    public async Task<AgencyBookingDashboardSummary> GetAgencyDashboardAsync(
        Guid agencyId,
        CancellationToken cancellationToken)
    {
        var orders = await dbContext.Orders
            .AsNoTracking()
            .Where(order => order.AgencyId == agencyId)
            .ToArrayAsync(cancellationToken);

        var paid = orders.Where(order => order.Status == OrderStatus.Paid).ToArray();
        return new AgencyBookingDashboardSummary(
            agencyId,
            orders.Length,
            orders.Count(order => order.Status == OrderStatus.PendingPayment),
            paid.Length,
            orders.Count(order => order.Status == OrderStatus.Cancelled),
            paid.Sum(order => order.Total),
            paid.FirstOrDefault()?.Currency);
    }

    public async Task<TravelerBookingDashboardSummary> GetTravelerDashboardAsync(
        string contactEmail,
        CancellationToken cancellationToken)
    {
        var email = contactEmail.Trim().ToLowerInvariant();
        var orders = await dbContext.Orders
            .AsNoTracking()
            .Where(order => order.ContactEmail == email)
            .ToArrayAsync(cancellationToken);
        var reservations = await dbContext.ReservationRequests
            .AsNoTracking()
            .CountAsync(request => request.ContactEmail == email, cancellationToken);
        var leads = await dbContext.Leads
            .AsNoTracking()
            .CountAsync(request => request.ContactEmail == email, cancellationToken);
        var paid = orders.Where(order => order.Status == OrderStatus.Paid).ToArray();

        return new TravelerBookingDashboardSummary(
            email,
            orders.Length,
            reservations,
            leads,
            paid.Sum(order => order.Total),
            paid.FirstOrDefault()?.Currency);
    }

    public async Task<TravelerBookingDashboardSummary> GetTravelerDashboardByContactAsync(
        string? contactEmail,
        string? contactPhone,
        CancellationToken cancellationToken)
    {
        var orders = await FilterByContact(contactEmail, contactPhone)
            .ToArrayAsync(cancellationToken);

        var reservations = await FilterReservationsByContact(contactEmail, contactPhone)
            .CountAsync(cancellationToken);
        var leads = await FilterLeadsByContact(contactEmail, contactPhone)
            .CountAsync(cancellationToken);
        var paid = orders.Where(order => order.Status == OrderStatus.Paid).ToArray();

        return new TravelerBookingDashboardSummary(
            NormalizeEmail(contactEmail) ?? NormalizePhone(contactPhone) ?? string.Empty,
            orders.Length,
            reservations,
            leads,
            paid.Sum(order => order.Total),
            paid.FirstOrDefault()?.Currency);
    }

    public async Task<TravelerOrderPage> ListTravelerOrdersAsync(
        string? contactEmail,
        string? contactPhone,
        int skip,
        int take,
        CancellationToken cancellationToken)
    {
        var query = FilterByContact(contactEmail, contactPhone);
        var total = await query.CountAsync(cancellationToken);
        var items = await query
            .OrderByDescending(order => order.CreatedAt)
            .Skip(skip)
            .Take(take)
            .Select(order => new ChannelOrderSummary(
                order.Id,
                order.OrderNumber,
                order.AgencyId,
                order.Status.ToString(),
                order.PaymentStatus.ToString(),
                order.Total,
                order.Currency,
                order.ContactEmail,
                order.CreatedAt))
            .ToArrayAsync(cancellationToken);

        return new TravelerOrderPage(items, total);
    }

    public async Task<IReadOnlyList<Guid>> ListTravelerOrderIdsAsync(
        string? contactEmail,
        string? contactPhone,
        CancellationToken cancellationToken)
        => await FilterByContact(contactEmail, contactPhone)
            .Select(order => order.Id)
            .ToArrayAsync(cancellationToken);

    public async Task<AdminBookingDashboardSummary> GetAdminDashboardAsync(
        CancellationToken cancellationToken)
    {
        var orders = await dbContext.Orders.CountAsync(cancellationToken);
        var reservations = await dbContext.ReservationRequests.CountAsync(cancellationToken);
        var leads = await dbContext.Leads.CountAsync(cancellationToken);
        var pending = await dbContext.ReservationRequests.CountAsync(
            request => request.Status == ReservationRequestStatus.PendingAgencyReview,
            cancellationToken);

        return new AdminBookingDashboardSummary(orders, reservations, leads, pending);
    }

    private IQueryable<Order> FilterByContact(string? contactEmail, string? contactPhone)
    {
        var email = NormalizeEmail(contactEmail);
        var phone = NormalizePhone(contactPhone);
        var query = dbContext.Orders.AsNoTracking();

        if (email is not null && phone is not null)
        {
            return query.Where(order =>
                order.ContactEmail == email ||
                (order.ContactPhone != null && order.ContactPhone == phone));
        }

        if (email is not null)
        {
            return query.Where(order => order.ContactEmail == email);
        }

        if (phone is not null)
        {
            return query.Where(order =>
                order.ContactPhone != null && order.ContactPhone == phone);
        }

        return query.Where(_ => false);
    }

    private IQueryable<ReservationRequest> FilterReservationsByContact(
        string? contactEmail,
        string? contactPhone)
    {
        var email = NormalizeEmail(contactEmail);
        var phone = NormalizePhone(contactPhone);
        var query = dbContext.ReservationRequests.AsNoTracking();

        if (email is not null && phone is not null)
        {
            return query.Where(request =>
                request.ContactEmail == email ||
                (request.ContactPhone != null && request.ContactPhone == phone));
        }

        if (email is not null)
        {
            return query.Where(request => request.ContactEmail == email);
        }

        if (phone is not null)
        {
            return query.Where(request =>
                request.ContactPhone != null && request.ContactPhone == phone);
        }

        return query.Where(_ => false);
    }

    private IQueryable<LeadRequest> FilterLeadsByContact(
        string? contactEmail,
        string? contactPhone)
    {
        var email = NormalizeEmail(contactEmail);
        var phone = NormalizePhone(contactPhone);
        var query = dbContext.Leads.AsNoTracking();

        if (email is not null && phone is not null)
        {
            return query.Where(request =>
                request.ContactEmail == email ||
                request.ContactPhone == phone);
        }

        if (email is not null)
        {
            return query.Where(request => request.ContactEmail == email);
        }

        if (phone is not null)
        {
            return query.Where(request => request.ContactPhone == phone);
        }

        return query.Where(_ => false);
    }

    private static string? NormalizeEmail(string? value)
        => string.IsNullOrWhiteSpace(value) ? null : value.Trim().ToLowerInvariant();

    private static string? NormalizePhone(string? value)
    {
        if (string.IsNullOrWhiteSpace(value))
        {
            return null;
        }

        var digits = new string(value.Where(char.IsDigit).ToArray());
        return digits.Length == 0 ? null : digits;
    }
}
