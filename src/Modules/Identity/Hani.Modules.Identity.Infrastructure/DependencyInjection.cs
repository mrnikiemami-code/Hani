using Hani.Modules.Identity.Application.Abstractions;
using Hani.Modules.Identity.Infrastructure.Repositories;
using Hani.Modules.Identity.Infrastructure.Security;
using Microsoft.Extensions.DependencyInjection;

namespace Hani.Modules.Identity.Infrastructure;

/// <summary>
/// Registers the module infrastructure services.
/// </summary>
public static class DependencyInjection
{
    public static IServiceCollection AddIdentityInfrastructure(this IServiceCollection services)
    {
        services.AddScoped<IAgencyRepository, AgencyRepository>();
        services.AddScoped<IApiClientRepository, ApiClientRepository>();
        services.AddSingleton<ISecretGenerator, SecretGenerator>();
        services.AddSingleton<ISecretHasher, SecretHasher>();
        services.AddScoped<IApiKeyValidator, ApiKeyValidator>();
        return services;
    }
}
