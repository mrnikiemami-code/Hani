using FluentValidation;
using Hani.Modules.Booking.Application.Commands.CreateQuote;
using Hani.Modules.Catalog.Application.Commands.CreateTourProduct;
using Hani.Modules.Content.Application.Commands.Editorial;
using Hani.Modules.Identity.Application.Commands.CreateAgency;
using Hani.Modules.Marketplace.Application.Queries.SearchProducts;
using Hani.Modules.Payments.Application.Commands.CreatePaymentIntent;
using Hani.Modules.Settlement.Application.Commands.CreateCommissionRule;
using Hani.Modules.Supply.Application.Commands.CreateAgencyOffer;

namespace Hani.Api.Configuration;

/// <summary>
/// Registers every FluentValidation validator in module application
/// assemblies by convention.
/// </summary>
public static class ValidatorRegistration
{
    private static readonly Type[] ModuleMarkers =
    [
        typeof(CreateAgencyOfferCommand),
        typeof(CreateTourProductCommand),
        typeof(CreateAgencyCommand),
        typeof(SearchProductsQuery),
        typeof(CreateQuoteCommand),
        typeof(CreatePaymentIntentCommand),
        typeof(CreateCommissionRuleCommand),
        typeof(CreateCategoryCommand)
    ];

    /// <summary>Scans module assemblies and registers validators.</summary>
    public static IServiceCollection AddHaniValidators(this IServiceCollection services)
    {
        var assemblies = ModuleMarkers
            .Select(marker => marker.Assembly)
            .Distinct()
            .ToArray();

        foreach (var assembly in assemblies)
        {
            foreach (var validatorType in assembly
                         .GetTypes()
                         .Where(type => !type.IsAbstract && !type.IsGenericTypeDefinition))
            {
                foreach (var contract in validatorType.GetInterfaces().Where(type =>
                             type.IsGenericType &&
                             type.GetGenericTypeDefinition() == typeof(IValidator<>)))
                {
                    services.AddScoped(contract, validatorType);
                }
            }
        }

        return services;
    }
}
