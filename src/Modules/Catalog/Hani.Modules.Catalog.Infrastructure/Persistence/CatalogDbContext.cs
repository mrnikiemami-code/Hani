using Hani.Modules.Catalog.Domain.Destinations;
using Hani.Modules.Catalog.Domain.Hotels;
using Hani.Modules.Catalog.Domain.Places;
using Hani.Modules.Catalog.Domain.TourProducts;
using Microsoft.EntityFrameworkCore;

namespace Hani.Modules.Catalog.Infrastructure.Persistence;

/// <summary>
/// EF Core context for the catalog schema.
/// </summary>
public sealed class CatalogDbContext(DbContextOptions<CatalogDbContext> options) : DbContext(options)
{
    public DbSet<TourProduct> TourProducts => Set<TourProduct>();

    public DbSet<Destination> Destinations => Set<Destination>();

    public DbSet<Hotel> Hotels => Set<Hotel>();

    public DbSet<Place> Places => Set<Place>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.HasDefaultSchema("catalog");
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(CatalogDbContext).Assembly);
    }
}
