using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace Hani.Modules.Booking.Infrastructure.Persistence;

/// <summary>
/// Design-time factory used by EF Core migrations.
/// </summary>
public sealed class BookingDbContextFactory : IDesignTimeDbContextFactory<BookingDbContext>
{
    /// <summary>
    /// Creates a context using <c>HANI_DB</c> or the local development connection string.
    /// </summary>
    public BookingDbContext CreateDbContext(string[] args)
    {
        var connectionString = Environment.GetEnvironmentVariable("HANI_DB")
            ?? "Host=localhost;Port=5433;Database=hani;Username=hani;Password=hani_dev";

        var options = new DbContextOptionsBuilder<BookingDbContext>()
            .UseNpgsql(connectionString)
            .Options;

        return new BookingDbContext(options);
    }
}
