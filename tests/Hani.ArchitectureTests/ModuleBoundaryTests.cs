using System.Reflection;
using Hani.Modules.Catalog.Application.Commands.CreateTourProduct;
using Hani.Modules.Catalog.Domain.TourProducts;
using Hani.Modules.Catalog.Infrastructure.Persistence;
using Hani.Modules.Catalog.Presentation;
using Hani.Modules.Identity.Application.Commands.CreateAgency;
using Hani.Modules.Identity.Domain.Agencies;
using Hani.Modules.Identity.Infrastructure.Persistence;
using Hani.Modules.Identity.Presentation;
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
        typeof(IdentityEndpoints).Assembly
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
