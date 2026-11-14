using Hani.Contracts.Booking;
using Hani.Modules.Booking.Application.Abstractions;
using Hani.Modules.Booking.Infrastructure.ReadServices;
using Hani.Modules.Booking.Infrastructure.Repositories;
using Microsoft.Extensions.DependencyInjection;

namespace Hani.Modules.Booking.Infrastructure;

/// <summary>
/// Registers booking infrastructure services.
/// </summary>
public static class DependencyInjection
{
    /// <summary>
    /// Adds booking repositories.
    /// </summary>
    public static IServiceCollection AddBookingInfrastructure(this IServiceCollection services)
    {
        services.AddScoped<IQuoteRepository, QuoteRepository>();
        services.AddScoped<IHoldRepository, HoldRepository>();
        services.AddScoped<IOrderRepository, OrderRepository>();
        services.AddScoped<IReservationRequestRepository, ReservationRequestRepository>();
        services.AddScoped<ILeadRepository, LeadRepository>();
        services.AddScoped<IPriceDiscrepancyRepository, PriceDiscrepancyRepository>();
        services.AddScoped<IInstallmentPlanRepository, InstallmentPlanRepository>();
        services.AddScoped<IOrderPaymentReadService, OrderPaymentReadService>();
        services.AddScoped<IOrderPaymentWriteService, OrderPaymentWriteService>();
        return services;
    }
}
