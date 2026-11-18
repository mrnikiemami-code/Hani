using Hani.Modules.Admin.Infrastructure;
using Hani.Modules.Booking.Infrastructure;
using Hani.Modules.Booking.Infrastructure.Persistence;
using Hani.Modules.Catalog.Infrastructure;
using Hani.Modules.Catalog.Infrastructure.Persistence;
using Hani.Modules.Content.Infrastructure;
using Hani.Modules.Content.Infrastructure.Persistence;
using Hani.Modules.Identity.Infrastructure;
using Hani.Modules.Identity.Infrastructure.Persistence;
using Hani.Modules.Marketplace.Infrastructure;
using Hani.Modules.Payments.Infrastructure;
using Hani.Modules.Payments.Infrastructure.Persistence;
using Hani.Modules.Settlement.Infrastructure;
using Hani.Modules.Settlement.Infrastructure.Persistence;
using Hani.Modules.Supply.Infrastructure;
using Hani.Modules.Supply.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Hani.Api.Configuration;

/// <summary>Registers persistence contexts and module infrastructure.</summary>
public static class PersistenceRegistration
{
    /// <summary>Adds one DbContext per module and module infrastructure services.</summary>
    public static IServiceCollection AddHaniPersistence(
        this IServiceCollection services,
        IConfiguration configuration)
    {
        var connectionString = configuration.GetConnectionString("Default")
            ?? "Host=localhost;Database=hani;Username=postgres;Password=postgres";

        services.AddDbContext<SupplyDbContext>(options => options.UseNpgsql(connectionString));
        services.AddDbContext<CatalogDbContext>(options => options.UseNpgsql(connectionString));
        services.AddDbContext<ContentDbContext>(options => options.UseNpgsql(connectionString));
        services.AddDbContext<IdentityDbContext>(options => options.UseNpgsql(connectionString));
        services.AddDbContext<BookingDbContext>(options => options.UseNpgsql(connectionString));
        services.AddDbContext<PaymentsDbContext>(options => options.UseNpgsql(connectionString));
        services.AddDbContext<SettlementDbContext>(options => options.UseNpgsql(connectionString));

        services.AddSupplyInfrastructure();
        services.AddCatalogInfrastructure();
        services.AddContentInfrastructure();
        services.AddIdentityInfrastructure();
        services.AddMarketplaceInfrastructure();
        services.AddBookingInfrastructure();
        services.AddPaymentsInfrastructure();
        services.AddSettlementInfrastructure();
        services.AddAdminInfrastructure();
        return services;
    }
}
