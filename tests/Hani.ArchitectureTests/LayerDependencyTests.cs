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
}
