using Hani.Modules.Supply.Domain.AgencyOffers;
using Microsoft.EntityFrameworkCore;

namespace Hani.Modules.Supply.Infrastructure.Persistence;

public sealed class SupplyDbContext(DbContextOptions<SupplyDbContext> options) : DbContext(options)
{
    public DbSet<AgencyOffer> AgencyOffers => Set<AgencyOffer>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.HasDefaultSchema("supply");
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(SupplyDbContext).Assembly);
    }
}
