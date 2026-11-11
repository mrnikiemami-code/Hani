using Hani.Modules.Payments.Application.Abstractions;
using Hani.Modules.Payments.Infrastructure.Gateways;
using Hani.Modules.Payments.Infrastructure.Repositories;
using Microsoft.Extensions.DependencyInjection;

namespace Hani.Modules.Payments.Infrastructure;

/// <summary>
/// Registers the payment module infrastructure services.
/// </summary>
public static class DependencyInjection
{
    /// <summary>
    /// Adds the payment repository and mock PSP adapter.
    /// </summary>
    public static IServiceCollection AddPaymentsInfrastructure(this IServiceCollection services)
    {
        services.AddScoped<IPaymentIntentRepository, PaymentIntentRepository>();
        services.AddSingleton<IPaymentGateway, MockPaymentGateway>();
        return services;
    }
}
