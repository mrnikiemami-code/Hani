using Microsoft.Extensions.DependencyInjection;

namespace Hani.Modules.Marketplace.Infrastructure;

/// <summary>
/// Registers marketplace infrastructure services.
/// </summary>
public static class DependencyInjection
{
    /// <summary>
    /// Marketplace is read-only today; the method keeps the module composition consistent.
    /// </summary>
    public static IServiceCollection AddMarketplaceInfrastructure(this IServiceCollection services)
        => services;
}
