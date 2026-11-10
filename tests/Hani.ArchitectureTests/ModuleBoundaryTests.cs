using System.Reflection;
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
        typeof(SupplyEndpoints).Assembly
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
