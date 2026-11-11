using System.Reflection;
using FluentValidation;
using Hani.BuildingBlocks.Application;
using Hani.Modules.Booking.Application.Commands.CreateQuote;
using Hani.Modules.Catalog.Application.Commands.CreateTourProduct;
using Hani.Modules.Identity.Application.Commands.CreateAgency;
using Hani.Modules.Marketplace.Application.Queries.SearchProducts;
using Hani.Modules.Supply.Application.Commands.CreateAgencyOffer;
using Shouldly;

namespace Hani.ArchitectureTests;

public sealed class CqrsConventionTests
{
    private static readonly Assembly[] ApplicationAssemblies =
    [
        typeof(CreateAgencyOfferCommand).Assembly,
        typeof(CreateTourProductCommand).Assembly,
        typeof(CreateAgencyCommand).Assembly,
        typeof(SearchProductsQuery).Assembly,
        typeof(CreateQuoteCommand).Assembly
    ];

    [Fact]
    public void Every_Command_Should_Have_Exactly_One_Handler()
    {
        foreach (var assembly in ApplicationAssemblies)
        {
            var commands = GetRequestTypes(assembly, typeof(ICommand<>));

            foreach (var command in commands)
            {
                var handlers = assembly.GetTypes()
                    .Where(type => ImplementsHandler(type, typeof(ICommandHandler<,>), command))
                    .ToArray();

                handlers.Length.ShouldBe(
                    1,
                    $"{command.FullName} must have exactly one command handler.");
            }
        }
    }

    [Fact]
    public void Every_Command_And_Query_Should_Have_A_Validator()
    {
        foreach (var assembly in ApplicationAssemblies)
        {
            var requests = GetRequestTypes(assembly, typeof(ICommand<>))
                .Concat(GetRequestTypes(assembly, typeof(IQuery<>)))
                .ToArray();

            var validators = assembly.GetTypes()
                .Where(type => !type.IsAbstract && type.BaseType is { IsGenericType: true })
                .Where(type => type.BaseType!.GetGenericTypeDefinition() == typeof(AbstractValidator<>))
                .ToArray();

            foreach (var request in requests)
            {
                var expectedValidator = typeof(AbstractValidator<>).MakeGenericType(request);

                validators.Any(validator => expectedValidator.IsAssignableFrom(validator))
                    .ShouldBeTrue($"{request.FullName} must have a validator.");
            }
        }
    }

    [Fact]
    public void Handlers_Should_Be_Internal_And_Sealed()
    {
        var handlers = ApplicationAssemblies
            .SelectMany(assembly => assembly.GetTypes())
            .Where(ImplementsAnyHandler)
            .ToArray();

        handlers.ShouldNotBeEmpty();

        foreach (var handler in handlers)
        {
            handler.IsSealed.ShouldBeTrue($"{handler.FullName} must be sealed.");
            handler.IsPublic.ShouldBeFalse($"{handler.FullName} must be internal.");
        }
    }

    private static Type[] GetRequestTypes(Assembly assembly, Type openGenericInterface)
        => assembly.GetTypes()
            .Where(type => !type.IsAbstract && !type.IsInterface)
            .Where(type => type.GetInterfaces().Any(@interface =>
                @interface.IsGenericType &&
                @interface.GetGenericTypeDefinition() == openGenericInterface))
            .ToArray();

    private static bool ImplementsHandler(Type type, Type openGenericHandler, Type requestType)
        => type.GetInterfaces().Any(@interface =>
            @interface.IsGenericType &&
            @interface.GetGenericTypeDefinition() == openGenericHandler &&
            @interface.GetGenericArguments()[0] == requestType);

    private static bool ImplementsAnyHandler(Type type)
        => type.GetInterfaces().Any(@interface =>
            @interface.IsGenericType &&
            (@interface.GetGenericTypeDefinition() == typeof(ICommandHandler<,>) ||
             @interface.GetGenericTypeDefinition() == typeof(IQueryHandler<,>)));
}
