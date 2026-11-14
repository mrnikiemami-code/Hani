using Hani.Modules.Booking.Domain.Holds;
using Hani.Modules.Booking.Domain.HotelInquiries;
using Hani.Modules.Booking.Domain.Installments;
using Hani.Modules.Booking.Domain.Leads;
using Hani.Modules.Booking.Domain.Orders;
using Hani.Modules.Booking.Domain.PriceDiscrepancies;
using Hani.Modules.Booking.Domain.Quotes;
using Hani.Modules.Booking.Domain.ReservationRequests;
using Hani.Modules.Booking.Domain.RestaurantReservations;
using Hani.Modules.Booking.Domain.VisaApplications;
using Microsoft.EntityFrameworkCore;

namespace Hani.Modules.Booking.Infrastructure.Persistence;

/// <summary>
/// EF Core context for the booking schema.
/// </summary>
public sealed class BookingDbContext(DbContextOptions<BookingDbContext> options) : DbContext(options)
{
    /// <summary>
    /// Priced quotes.
    /// </summary>
    public DbSet<Quote> Quotes => Set<Quote>();

    /// <summary>
    /// Seat holds.
    /// </summary>
    public DbSet<Hold> Holds => Set<Hold>();

    /// <summary>
    /// Confirmed orders with immutable contracts.
    /// </summary>
    public DbSet<Order> Orders => Set<Order>();

    /// <summary>
    /// Reservation requests.
    /// </summary>
    public DbSet<ReservationRequest> ReservationRequests => Set<ReservationRequest>();

    /// <summary>
    /// Hotel inquiries.
    /// </summary>
    public DbSet<HotelInquiry> HotelInquiries => Set<HotelInquiry>();

    /// <summary>
    /// Restaurant reservations.
    /// </summary>
    public DbSet<RestaurantReservation> RestaurantReservations => Set<RestaurantReservation>();

    /// <summary>
    /// Visa applications.
    /// </summary>
    public DbSet<VisaApplication> VisaApplications => Set<VisaApplication>();

    /// <summary>
    /// Lead/RFQ requests.
    /// </summary>
    public DbSet<LeadRequest> Leads => Set<LeadRequest>();

    /// <summary>
    /// Price-discrepancy reports.
    /// </summary>
    public DbSet<PriceDiscrepancyReport> PriceDiscrepancies => Set<PriceDiscrepancyReport>();

    /// <summary>
    /// Installment plans.
    /// </summary>
    public DbSet<InstallmentPlan> InstallmentPlans => Set<InstallmentPlan>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.HasDefaultSchema("booking");
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(BookingDbContext).Assembly);
    }
}
