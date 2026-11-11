using System.Reflection;
using Hani.Modules.Booking.Application.Commands.CreateQuote;
using Hani.Modules.Booking.Domain.Quotes;
using Hani.Modules.Booking.Infrastructure.Persistence;
using Hani.Modules.Booking.Presentation;
using Hani.Modules.Catalog.Application.Commands.CreateTourProduct;
using Hani.Modules.Catalog.Domain.TourProducts;
using Hani.Modules.Catalog.Infrastructure.Persistence;
using Hani.Modules.Catalog.Presentation;
using Hani.Modules.Identity.Application.Commands.CreateAgency;
using Hani.Modules.Identity.Domain.Agencies;
using Hani.Modules.Identity.Infrastructure.Persistence;
using Hani.Modules.Identity.Presentation;
using Hani.Modules.Marketplace.Application.Queries.SearchProducts;
using Hani.Modules.Marketplace.Domain;
using Hani.Modules.Marketplace.Infrastructure;
using Hani.Modules.Marketplace.Presentation;
using Hani.Modules.Payments.Application.Commands.CreatePaymentIntent;
using Hani.Modules.Payments.Domain.PaymentIntents;
using Hani.Modules.Payments.Infrastructure.Persistence;
using Hani.Modules.Payments.Presentation;
using Hani.Modules.Settlement.Application.Commands.CreateCommissionRule;
using Hani.Modules.Settlement.Domain.Commissions;
using Hani.Modules.Settlement.Infrastructure.Persistence;
using Hani.Modules.Settlement.Presentation;
using Hani.Modules.Supply.Application.Commands.CreateAgencyOffer;
using Hani.Modules.Supply.Domain.AgencyOffers;
using Hani.Modules.Supply.Infrastructure.Persistence;
using Hani.Modules.Supply.Presentation;
using Shouldly;

namespace Hani.ArchitectureTests;

public sealed class ModuleBoundaryTests
{
    private static readonly Assembly[] ModuleAssemblies =
    [
        typeof(AgencyOffer).Assembly,
        typeof(CreateAgencyOfferCommand).Assembly,
        typeof(SupplyDbContext).Assembly,
        typeof(SupplyEndpoints).Assembly,
        typeof(TourProduct).Assembly,
        typeof(CreateTourProductCommand).Assembly,
        typeof(CatalogDbContext).Assembly,
        typeof(CatalogEndpoints).Assembly,
        typeof(Agency).Assembly,
        typeof(CreateAgencyCommand).Assembly,
        typeof(IdentityDbContext).Assembly,
        typeof(IdentityEndpoints).Assembly,
        typeof(MarketplaceModule).Assembly,
        typeof(SearchProductsQuery).Assembly,
        typeof(DependencyInjection).Assembly,
        typeof(MarketplaceEndpoints).Assembly,
        typeof(Quote).Assembly,
        typeof(CreateQuoteCommand).Assembly,
        typeof(BookingDbContext).Assembly,
        typeof(BookingEndpoints).Assembly,
        typeof(PaymentIntent).Assembly,
        typeof(CreatePaymentIntentCommand).Assembly,
        typeof(PaymentsDbContext).Assembly,
        typeof(PaymentEndpoints).Assembly,
        typeof(CommissionEntry).Assembly,
        typeof(CreateCommissionRuleCommand).Assembly,
        typeof(SettlementDbContext).Assembly,
        typeof(SettlementEndpoints).Assembly
    ];

    [Fact]
    public void Module_Should_Not_Reference_Another_Module()
    {
        foreach (var assembly in ModuleAssemblies)
        {
            var assemblyName = assembly.GetName().Name!;
            var moduleRoot = string.Join('.', assemblyName.Split('.').Take(3));

            var references = assembly.GetReferencedAssemblies()
                .Select(reference => reference.Name!)
                .Where(name => name.StartsWith("Hani.Modules.", StringComparison.Ordinal))
                .Where(name => !name.StartsWith(moduleRoot + ".", StringComparison.Ordinal))
                .ToArray();

            references.ShouldBeEmpty(
                $"{assemblyName} must not reference another module. Found: {string.Join(", ", references)}");
        }
    }
}
