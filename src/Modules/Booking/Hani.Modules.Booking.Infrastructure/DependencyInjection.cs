using Hani.Modules.Booking.Application.Abstractions;
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
        return services;
    }
}
