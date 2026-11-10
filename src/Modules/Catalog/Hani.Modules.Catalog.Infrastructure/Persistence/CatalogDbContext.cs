using Hani.Modules.Catalog.Domain.Destinations;
using Hani.Modules.Catalog.Domain.TourProducts;
using Microsoft.EntityFrameworkCore;

namespace Hani.Modules.Catalog.Infrastructure.Persistence;

public sealed class CatalogDbContext(DbContextOptions<CatalogDbContext> options) : DbContext(options)
{
    public DbSet<TourProduct> TourProducts => Set<TourProduct>();

    public DbSet<Destination> Destinations => Set<Destination>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.HasDefaultSchema("catalog");
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(CatalogDbContext).Assembly);
    }
}
