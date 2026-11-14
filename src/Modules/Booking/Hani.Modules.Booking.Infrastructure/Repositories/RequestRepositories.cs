using Hani.Modules.Booking.Application.Abstractions;
using Hani.Modules.Booking.Domain.Installments;
using Hani.Modules.Booking.Domain.Leads;
using Hani.Modules.Booking.Domain.PriceDiscrepancies;
using Hani.Modules.Booking.Domain.ReservationRequests;
using Hani.Modules.Booking.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Hani.Modules.Booking.Infrastructure.Repositories;

internal sealed class ReservationRequestRepository(BookingDbContext dbContext)
    : IReservationRequestRepository
{
    public async Task AddAsync(ReservationRequest request, CancellationToken cancellationToken)
    {
        await dbContext.ReservationRequests.AddAsync(request, cancellationToken);
        await dbContext.SaveChangesAsync(cancellationToken);
    }

    public Task<ReservationRequest?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
        => dbContext.ReservationRequests.FirstOrDefaultAsync(
            request => request.Id == id,
            cancellationToken);

    public async Task<IReadOnlyList<ReservationRequest>> ListByAgencyAsync(
        Guid agencyId,
        CancellationToken cancellationToken)
        => await dbContext.ReservationRequests
            .AsNoTracking()
            .Where(request => request.AgencyId == agencyId)
            .OrderByDescending(request => request.CreatedAt)
            .ToArrayAsync(cancellationToken);

    public Task SaveChangesAsync(CancellationToken cancellationToken)
        => dbContext.SaveChangesAsync(cancellationToken);
}

internal sealed class LeadRepository(BookingDbContext dbContext) : ILeadRepository
{
    public async Task AddAsync(LeadRequest lead, CancellationToken cancellationToken)
    {
        await dbContext.Leads.AddAsync(lead, cancellationToken);
        await dbContext.SaveChangesAsync(cancellationToken);
    }

    public Task<LeadRequest?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
        => dbContext.Leads
            .Include(lead => lead.Invitations)
            .FirstOrDefaultAsync(lead => lead.Id == id, cancellationToken);

    public async Task<IReadOnlyList<LeadRequest>> ListAsync(
        LeadStatus? status,
        int skip,
        int take,
        CancellationToken cancellationToken)
    {
        var query = dbContext.Leads
            .AsNoTracking()
            .Include(lead => lead.Invitations)
            .AsQueryable();

        if (status is not null)
        {
            query = query.Where(lead => lead.Status == status);
        }

        return await query
            .OrderByDescending(lead => lead.CreatedAt)
            .Skip(skip)
            .Take(take)
            .ToArrayAsync(cancellationToken);
    }

    public Task<int> CountAsync(LeadStatus? status, CancellationToken cancellationToken)
    {
        var query = dbContext.Leads.AsQueryable();

        if (status is not null)
        {
            query = query.Where(lead => lead.Status == status);
        }

        return query.CountAsync(cancellationToken);
    }

    public Task SaveChangesAsync(CancellationToken cancellationToken)
        => dbContext.SaveChangesAsync(cancellationToken);
}

internal sealed class PriceDiscrepancyRepository(BookingDbContext dbContext)
    : IPriceDiscrepancyRepository
{
    public async Task AddAsync(
        PriceDiscrepancyReport report,
        CancellationToken cancellationToken)
    {
        await dbContext.PriceDiscrepancies.AddAsync(report, cancellationToken);
        await dbContext.SaveChangesAsync(cancellationToken);
    }

    public Task<PriceDiscrepancyReport?> GetByIdAsync(
        Guid id,
        CancellationToken cancellationToken)
        => dbContext.PriceDiscrepancies.FirstOrDefaultAsync(
            report => report.Id == id,
            cancellationToken);

    public async Task<IReadOnlyList<PriceDiscrepancyReport>> ListAsync(
        PriceDiscrepancyStatus? status,
        int skip,
        int take,
        CancellationToken cancellationToken)
    {
        var query = dbContext.PriceDiscrepancies.AsNoTracking().AsQueryable();

        if (status is not null)
        {
            query = query.Where(report => report.Status == status);
        }

        return await query
            .OrderByDescending(report => report.CreatedAt)
            .Skip(skip)
            .Take(take)
            .ToArrayAsync(cancellationToken);
    }

    public Task<int> CountAsync(
        PriceDiscrepancyStatus? status,
        CancellationToken cancellationToken)
    {
        var query = dbContext.PriceDiscrepancies.AsQueryable();

        if (status is not null)
        {
            query = query.Where(report => report.Status == status);
        }

        return query.CountAsync(cancellationToken);
    }

    public Task SaveChangesAsync(CancellationToken cancellationToken)
        => dbContext.SaveChangesAsync(cancellationToken);
}

internal sealed class InstallmentPlanRepository(BookingDbContext dbContext)
    : IInstallmentPlanRepository
{
    public async Task AddAsync(InstallmentPlan plan, CancellationToken cancellationToken)
    {
        await dbContext.InstallmentPlans.AddAsync(plan, cancellationToken);
        await dbContext.SaveChangesAsync(cancellationToken);
    }

    public Task<InstallmentPlan?> GetByOrderIdAsync(
        Guid orderId,
        string currency,
        CancellationToken cancellationToken)
    {
        var normalizedCurrency = currency.ToUpperInvariant();

        return dbContext.InstallmentPlans
            .Include(plan => plan.Installments)
            .FirstOrDefaultAsync(
                plan =>
                    plan.OrderId == orderId &&
                    plan.Currency == normalizedCurrency,
                cancellationToken);
    }

    public Task SaveChangesAsync(CancellationToken cancellationToken)
        => dbContext.SaveChangesAsync(cancellationToken);
}
