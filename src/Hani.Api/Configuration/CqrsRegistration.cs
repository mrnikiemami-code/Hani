using Hani.BuildingBlocks.Application;
using Hani.Modules.Booking.Application.Commands.CreateQuote;
using Hani.Modules.Catalog.Application.Commands.CreateTourProduct;
using Hani.Modules.Content.Application.Commands.Editorial;
using Hani.Modules.Identity.Application.Commands.CreateAgency;
using Hani.Modules.Marketplace.Application.Queries.SearchProducts;
using Hani.Modules.Payments.Application.Commands.CreatePaymentIntent;
using Hani.Modules.Settlement.Application.Commands.CreateCommissionRule;
using Hani.Modules.Supply.Application.Commands.CreateAgencyOffer;
using MediatR;

namespace Hani.Api.Configuration;

/// <summary>Registers MediatR handlers and pipeline behaviors.</summary>
public static class CqrsRegistration
{
    /// <summary>Adds CQRS handlers and the behavior order.</summary>
    public static IServiceCollection AddHaniCqrs(this IServiceCollection services)
    {
        services.AddMediatR(configuration =>
            configuration.RegisterServicesFromAssemblies(
                typeof(CreateAgencyOfferCommand).Assembly,
                typeof(CreateTourProductCommand).Assembly,
                typeof(CreateAgencyCommand).Assembly,
                typeof(SearchProductsQuery).Assembly,
                typeof(CreateQuoteCommand).Assembly,
                typeof(CreatePaymentIntentCommand).Assembly,
                typeof(CreateCommissionRuleCommand).Assembly,
                typeof(CreateCategoryCommand).Assembly));

        services.AddTransient(typeof(IPipelineBehavior<,>), typeof(LoggingBehavior<,>));
        services.AddTransient(typeof(IPipelineBehavior<,>), typeof(ValidationBehavior<,>));
        services.AddTransient(typeof(IPipelineBehavior<,>), typeof(GregorianDateBehavior<,>));
        services.AddTransient(typeof(IPipelineBehavior<,>), typeof(IdempotencyBehavior<,>));
        return services;
    }
}
