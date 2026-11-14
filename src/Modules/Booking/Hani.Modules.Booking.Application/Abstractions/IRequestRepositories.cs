using Hani.Modules.Booking.Domain.Installments;
using Hani.Modules.Booking.Domain.Leads;
using Hani.Modules.Booking.Domain.PriceDiscrepancies;
using Hani.Modules.Booking.Domain.ReservationRequests;

namespace Hani.Modules.Booking.Application.Abstractions;

/// <summary>
/// Persistence abstraction for reservation requests.
/// </summary>
public interface IReservationRequestRepository
{
    /// <summary>
    /// Adds a request and saves changes.
    /// </summary>
    Task AddAsync(ReservationRequest request, CancellationToken cancellationToken);

    /// <summary>
    /// Returns a request by id, or <c>null</c>.
    /// </summary>
    Task<ReservationRequest?> GetByIdAsync(Guid id, CancellationToken cancellationToken);

    /// <summary>
    /// Returns requests for one agency.
    /// </summary>
    Task<IReadOnlyList<ReservationRequest>> ListByAgencyAsync(
        Guid agencyId,
        CancellationToken cancellationToken);

    /// <summary>
    /// Persists pending changes.
    /// </summary>
    Task SaveChangesAsync(CancellationToken cancellationToken);
}

/// <summary>
/// Persistence abstraction for lead/RFQ requests.
/// </summary>
public interface ILeadRepository
{
    /// <summary>
    /// Adds a lead and saves changes.
    /// </summary>
    Task AddAsync(LeadRequest lead, CancellationToken cancellationToken);

    /// <summary>
    /// Returns a lead by id, or <c>null</c>.
    /// </summary>
    Task<LeadRequest?> GetByIdAsync(Guid id, CancellationToken cancellationToken);

    /// <summary>
    /// Lists leads, optionally filtered by status.
    /// </summary>
    Task<IReadOnlyList<LeadRequest>> ListAsync(
        LeadStatus? status,
        int skip,
        int take,
        CancellationToken cancellationToken);

    /// <summary>
    /// Counts leads, optionally filtered by status.
    /// </summary>
    Task<int> CountAsync(LeadStatus? status, CancellationToken cancellationToken);

    /// <summary>
    /// Persists pending changes.
    /// </summary>
    Task SaveChangesAsync(CancellationToken cancellationToken);
}

/// <summary>
/// Persistence abstraction for price-discrepancy reports.
/// </summary>
public interface IPriceDiscrepancyRepository
{
    /// <summary>
    /// Adds a report and saves changes.
    /// </summary>
    Task AddAsync(PriceDiscrepancyReport report, CancellationToken cancellationToken);

    /// <summary>
    /// Returns a report by id, or <c>null</c>.
    /// </summary>
    Task<PriceDiscrepancyReport?> GetByIdAsync(Guid id, CancellationToken cancellationToken);

    /// <summary>
    /// Lists reports, optionally filtered by status.
    /// </summary>
    Task<IReadOnlyList<PriceDiscrepancyReport>> ListAsync(
        PriceDiscrepancyStatus? status,
        int skip,
        int take,
        CancellationToken cancellationToken);

    /// <summary>
    /// Counts reports, optionally filtered by status.
    /// </summary>
    Task<int> CountAsync(
        PriceDiscrepancyStatus? status,
        CancellationToken cancellationToken);

    /// <summary>
    /// Persists pending changes.
    /// </summary>
    Task SaveChangesAsync(CancellationToken cancellationToken);
}

/// <summary>
/// Persistence abstraction for installment plans.
/// </summary>
public interface IInstallmentPlanRepository
{
    /// <summary>
    /// Adds a plan and saves changes.
    /// </summary>
    Task AddAsync(InstallmentPlan plan, CancellationToken cancellationToken);

    /// <summary>
    /// Returns the plan for an order and currency, or <c>null</c>.
    /// </summary>
    Task<InstallmentPlan?> GetByOrderIdAsync(
        Guid orderId,
        string currency,
        CancellationToken cancellationToken);

    /// <summary>
    /// Persists pending changes.
    /// </summary>
    Task SaveChangesAsync(CancellationToken cancellationToken);
}
