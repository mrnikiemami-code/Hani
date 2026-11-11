using Hani.Modules.Booking.Application.Commands.CreateQuote;
using Hani.Modules.Booking.Domain.Quotes;
using Hani.Modules.Booking.Presentation;
using Hani.Modules.Catalog.Application.Commands.CreateTourProduct;
using Hani.Modules.Catalog.Domain.TourProducts;
using Hani.Modules.Catalog.Presentation;
using Hani.Modules.Identity.Application.Commands.CreateAgency;
using Hani.Modules.Identity.Domain.Agencies;
using Hani.Modules.Identity.Presentation;
using Hani.Modules.Marketplace.Application.Queries.SearchProducts;
using Hani.Modules.Marketplace.Domain;
using Hani.Modules.Marketplace.Presentation;
using Hani.Modules.Payments.Application.Commands.CreatePaymentIntent;
using Hani.Modules.Payments.Domain.PaymentIntents;
using Hani.Modules.Payments.Presentation;
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

    [Fact]
    public void Identity_Domain_Should_Not_Depend_On_Infrastructure()
    {
        var result = Types.InAssembly(typeof(Agency).Assembly)
            .That().ResideInNamespace("Hani.Modules.Identity.Domain")
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
    public void Identity_Application_Should_Not_Depend_On_Infrastructure()
    {
        var result = Types.InAssembly(typeof(CreateAgencyCommand).Assembly)
            .That().ResideInNamespace("Hani.Modules.Identity.Application")
            .ShouldNot().HaveDependencyOnAny(
                "Hani.Modules.Identity.Infrastructure",
                "Microsoft.EntityFrameworkCore",
                "MassTransit",
                "StackExchange.Redis",
                "System.Net.Http")
            .GetResult();

        result.IsSuccessful.ShouldBeTrue(
            string.Join(", ", result.FailingTypeNames ?? []));
    }

    [Fact]
    public void Booking_Application_Should_Not_Depend_On_Infrastructure()
    {
        var result = Types.InAssembly(typeof(CreateQuoteCommand).Assembly)
            .That().ResideInNamespace("Hani.Modules.Booking.Application")
            .ShouldNot().HaveDependencyOnAny(
                "Hani.Modules.Booking.Infrastructure",
                "Microsoft.EntityFrameworkCore",
                "MassTransit",
                "StackExchange.Redis",
                "System.Net.Http")
            .GetResult();

        result.IsSuccessful.ShouldBeTrue(string.Join(", ", result.FailingTypeNames ?? []));
    }

    [Fact]
    public void Booking_Domain_Should_Not_Depend_On_Infrastructure()
    {
        var result = Types.InAssembly(typeof(Quote).Assembly)
            .That().ResideInNamespace("Hani.Modules.Booking.Domain")
            .ShouldNot().HaveDependencyOnAny(
                "Microsoft.EntityFrameworkCore",
                "Microsoft.AspNetCore",
                "MassTransit",
                "StackExchange.Redis",
                "System.Net.Http")
            .GetResult();

        result.IsSuccessful.ShouldBeTrue(string.Join(", ", result.FailingTypeNames ?? []));
    }

    [Fact]
    public void Booking_Presentation_Should_Not_Use_DbContext()
    {
        var result = Types.InAssembly(typeof(BookingEndpoints).Assembly)
            .That().ResideInNamespace("Hani.Modules.Booking.Presentation")
            .ShouldNot().HaveDependencyOn("Microsoft.EntityFrameworkCore")
            .GetResult();

        result.IsSuccessful.ShouldBeTrue(string.Join(", ", result.FailingTypeNames ?? []));
    }

    [Fact]
    public void Marketplace_Application_Should_Not_Depend_On_Infrastructure()
    {
        var result = Types.InAssembly(typeof(SearchProductsQuery).Assembly)
            .That().ResideInNamespace("Hani.Modules.Marketplace.Application")
            .ShouldNot().HaveDependencyOnAny(
                "Hani.Modules.Marketplace.Infrastructure",
                "Microsoft.EntityFrameworkCore",
                "MassTransit",
                "StackExchange.Redis",
                "System.Net.Http")
            .GetResult();

        result.IsSuccessful.ShouldBeTrue(
            string.Join(", ", result.FailingTypeNames ?? []));
    }

    [Fact]
    public void Marketplace_Domain_Should_Not_Depend_On_Infrastructure()
    {
        var result = Types.InAssembly(typeof(MarketplaceModule).Assembly)
            .That().ResideInNamespace("Hani.Modules.Marketplace.Domain")
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
    public void Marketplace_Presentation_Should_Not_Use_DbContext()
    {
        var result = Types.InAssembly(typeof(MarketplaceEndpoints).Assembly)
            .That().ResideInNamespace("Hani.Modules.Marketplace.Presentation")
            .ShouldNot().HaveDependencyOn("Microsoft.EntityFrameworkCore")
            .GetResult();

        result.IsSuccessful.ShouldBeTrue(
            string.Join(", ", result.FailingTypeNames ?? []));
    }

    [Fact]
    public void Identity_Presentation_Should_Not_Use_DbContext()
    {
        var result = Types.InAssembly(typeof(IdentityEndpoints).Assembly)
            .That().ResideInNamespace("Hani.Modules.Identity.Presentation")
            .ShouldNot().HaveDependencyOn("Microsoft.EntityFrameworkCore")
            .GetResult();

        result.IsSuccessful.ShouldBeTrue(
            string.Join(", ", result.FailingTypeNames ?? []));
    }

    [Fact]
    public void Payments_Domain_Should_Not_Depend_On_Infrastructure()
    {
        var result = Types.InAssembly(typeof(PaymentIntent).Assembly)
            .That().ResideInNamespace("Hani.Modules.Payments.Domain")
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
    public void Payments_Application_Should_Not_Depend_On_Infrastructure()
    {
        var result = Types.InAssembly(typeof(CreatePaymentIntentCommand).Assembly)
            .That().ResideInNamespace("Hani.Modules.Payments.Application")
            .ShouldNot().HaveDependencyOnAny(
                "Hani.Modules.Payments.Infrastructure",
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
    public void Payments_Presentation_Should_Not_Use_DbContext()
    {
        var result = Types.InAssembly(typeof(PaymentEndpoints).Assembly)
            .That().ResideInNamespace("Hani.Modules.Payments.Presentation")
            .ShouldNot().HaveDependencyOn("Microsoft.EntityFrameworkCore")
            .GetResult();

        result.IsSuccessful.ShouldBeTrue(
            string.Join(", ", result.FailingTypeNames ?? []));
    }
}
