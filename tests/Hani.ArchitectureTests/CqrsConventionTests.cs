using System.Reflection;
using FluentValidation;
using Hani.BuildingBlocks.Application;
using Hani.Modules.Supply.Application.Commands.CreateAgencyOffer;
using Shouldly;

namespace Hani.ArchitectureTests;

public sealed class CqrsConventionTests
{
    private static readonly Assembly ApplicationAssembly =
        typeof(CreateAgencyOfferCommand).Assembly;

    [Fact]
    public void Every_Command_Should_Have_Exactly_One_Handler()
    {
        var commands = GetRequestTypes(typeof(ICommand<>));

        foreach (var command in commands)
        {
            var handlers = ApplicationAssembly.GetTypes()
                .Where(type => ImplementsHandler(type, typeof(ICommandHandler<,>), command))
                .ToArray();

            handlers.Length.ShouldBe(1, $"{command.Name} must have exactly one command handler.");
        }
    }

    [Fact]
    public void Every_Command_And_Query_Should_Have_A_Validator()
    {
        var requests = GetRequestTypes(typeof(ICommand<>))
            .Concat(GetRequestTypes(typeof(IQuery<>)))
            .ToArray();

        var validators = ApplicationAssembly.GetTypes()
            .Where(type => !type.IsAbstract && type.BaseType is { IsGenericType: true })
            .Where(type => type.BaseType!.GetGenericTypeDefinition() == typeof(AbstractValidator<>))
            .ToArray();

        foreach (var request in requests)
        {
            var expectedValidator = typeof(AbstractValidator<>).MakeGenericType(request);

            validators.Any(validator => expectedValidator.IsAssignableFrom(validator))
                .ShouldBeTrue($"{request.Name} must have a validator.");
        }
    }

    [Fact]
    public void Handlers_Should_Be_Internal_And_Sealed()
    {
        var handlers = ApplicationAssembly.GetTypes()
            .Where(type => ImplementsAnyHandler(type))
            .ToArray();

        handlers.ShouldNotBeEmpty();

        foreach (var handler in handlers)
        {
            handler.IsSealed.ShouldBeTrue($"{handler.Name} must be sealed.");
            handler.IsPublic.ShouldBeFalse($"{handler.Name} must be internal.");
        }
    }

    private static Type[] GetRequestTypes(Type openGenericInterface)
        => ApplicationAssembly.GetTypes()
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
