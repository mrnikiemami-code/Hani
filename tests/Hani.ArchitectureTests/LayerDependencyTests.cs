using Hani.Modules.Catalog.Application.Commands.CreateTourProduct;
using Hani.Modules.Catalog.Domain.TourProducts;
using Hani.Modules.Catalog.Presentation;
using Hani.Modules.Supply.Application.Commands.CreateAgencyOffer;
using Hani.Modules.Supply.Domain.AgencyOffers;
using Hani.Modules.Supply.Presentation;
using NetArchTest.Rules;
using Shouldly;

namespace Hani.ArchitectureTests;

public sealed class LayerDependencyTests
{
    [Fact]
    public void Domain_Should_Not_Depend_On_Infrastructure()
    {
        var result = Types.InAssembly(typeof(AgencyOffer).Assembly)
            .That().ResideInNamespace("Hani.Modules.Supply.Domain")
            .ShouldNot().HaveDependencyOnAny(
                "Microsoft.EntityFrameworkCore",
                "Microsoft.AspNetCore",
                "MassTransit",
                "StackExchange.Redis",
                "System.Net.Http")
            .GetResult();

        result.IsSuccessful.ShouldBeTrue(
            string.Join(", ", result.FailingTypeNames ?? []));
    }

    [Fact]
    public void Application_Should_Not_Depend_On_Infrastructure()
    {
        var result = Types.InAssembly(typeof(CreateAgencyOfferCommand).Assembly)
            .That().ResideInNamespace("Hani.Modules.Supply.Application")
            .ShouldNot().HaveDependencyOnAny(
                "Hani.Modules.Supply.Infrastructure",
                "Microsoft.EntityFrameworkCore",
                "MassTransit",
                "StackExchange.Redis",
                "System.Net.Http")
            .GetResult();

        result.IsSuccessful.ShouldBeTrue(
            string.Join(", ", result.FailingTypeNames ?? []));
    }

    [Fact]
    public void Presentation_Should_Not_Use_DbContext()
    {
        var result = Types.InAssembly(typeof(SupplyEndpoints).Assembly)
            .That().ResideInNamespace("Hani.Modules.Supply.Presentation")
            .ShouldNot().HaveDependencyOn("Microsoft.EntityFrameworkCore")
            .GetResult();

        result.IsSuccessful.ShouldBeTrue(
            string.Join(", ", result.FailingTypeNames ?? []));
    }

    [Fact]
    public void Catalog_Domain_Should_Not_Depend_On_Infrastructure()
    {
        var result = Types.InAssembly(typeof(TourProduct).Assembly)
            .That().ResideInNamespace("Hani.Modules.Catalog.Domain")
            .ShouldNot().HaveDependencyOnAny(
                "Microsoft.EntityFrameworkCore",
                "Microsoft.AspNetCore",
                "MassTransit",
                "StackExchange.Redis",
                "System.Net.Http")
            .GetResult();

        result.IsSuccessful.ShouldBeTrue(
            string.Join(", ", result.FailingTypeNames ?? []));
    }

    [Fact]
    public void Catalog_Application_Should_Not_Depend_On_Infrastructure()
    {
        var result = Types.InAssembly(typeof(CreateTourProductCommand).Assembly)
            .That().ResideInNamespace("Hani.Modules.Catalog.Application")
            .ShouldNot().HaveDependencyOnAny(
                "Hani.Modules.Catalog.Infrastructure",
                "Microsoft.EntityFrameworkCore",
                "MassTransit",
                "StackExchange.Redis",
                "System.Net.Http")
            .GetResult();

        result.IsSuccessful.ShouldBeTrue(
            string.Join(", ", result.FailingTypeNames ?? []));
    }

    [Fact]
    public void Catalog_Presentation_Should_Not_Use_DbContext()
    {
        var result = Types.InAssembly(typeof(CatalogEndpoints).Assembly)
            .That().ResideInNamespace("Hani.Modules.Catalog.Presentation")
            .ShouldNot().HaveDependencyOn("Microsoft.EntityFrameworkCore")
            .GetResult();

        result.IsSuccessful.ShouldBeTrue(
            string.Join(", ", result.FailingTypeNames ?? []));
    }
}
