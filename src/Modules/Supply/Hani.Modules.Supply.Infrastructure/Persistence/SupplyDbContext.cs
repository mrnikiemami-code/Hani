using Hani.Modules.Supply.Domain.AgencyOffers;
using Hani.Modules.Supply.Domain.Departures;
using MassTransit;
using Microsoft.EntityFrameworkCore;

namespace Hani.Modules.Supply.Infrastructure.Persistence;

/// <summary>
/// EF Core context for the supply schema, including outbox/inbox.
/// </summary>
public sealed class SupplyDbContext(DbContextOptions<SupplyDbContext> options) : DbContext(options)
{
    public DbSet<AgencyOffer> AgencyOffers => Set<AgencyOffer>();

    public DbSet<TourDeparture> TourDepartures => Set<TourDeparture>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.HasDefaultSchema("supply");
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(SupplyDbContext).Assembly);

        modelBuilder.AddInboxStateEntity();
        modelBuilder.AddOutboxMessageEntity();
        modelBuilder.AddOutboxStateEntity();
    }
}
