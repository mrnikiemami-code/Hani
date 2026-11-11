using Hani.Modules.Booking.Domain.Holds;
using Hani.Modules.Booking.Domain.Orders;
using Hani.Modules.Booking.Domain.Quotes;
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

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.HasDefaultSchema("booking");
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(BookingDbContext).Assembly);
    }
}
