using Hani.Modules.Payments.Application.Abstractions;
using Hani.Modules.Payments.Application.Commands.Finance;
using Hani.Modules.Payments.Application.Invoices;
using Hani.Modules.Payments.Infrastructure.Gateways;
using Hani.Modules.Payments.Infrastructure.Notifications;
using Hani.Modules.Payments.Infrastructure.Repositories;
using Microsoft.Extensions.Configuration;
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
    public static IServiceCollection AddPaymentsInfrastructure(
        this IServiceCollection services,
        IConfiguration configuration)
    {
        services.AddScoped<IPaymentIntentRepository, PaymentIntentRepository>();
        services.AddScoped<IPaymentWebhookEventRepository, PaymentWebhookEventRepository>();
        services.AddScoped<IOfflinePaymentRepository, OfflinePaymentRepository>();
        services.AddScoped<IFinanceRepository, FinanceRepository>();
        services.AddScoped<IInvoicePdfGenerator, InvoicePdfGenerator>();
        services.AddScoped<IInvoiceReminderSender, LoggingInvoiceReminderSender>();
        services.AddHostedService<InvoiceDunningService>();
        services.AddHttpClient("payments");
        var provider = configuration["Payments:Provider"] ?? "Mock";
        if (string.Equals(provider, "Mock", StringComparison.OrdinalIgnoreCase))
        {
            services.AddSingleton<IPaymentGateway, MockPaymentGateway>();
        }
        else
        {
            services.AddSingleton<IPaymentGateway, HttpPaymentGateway>();
        }

        return services;
    }
}
