using Hani.Contracts.Identity;
using Hani.Modules.Identity.Application.Abstractions;
using Hani.Modules.Identity.Infrastructure.ReadServices;
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
        services.AddScoped<IUserRepository, UserRepository>();
        services.AddScoped<IReviewRepository, ReviewRepository>();
        services.AddScoped<IClaimRepository, ClaimRepository>();
        services.AddScoped<IMediaRepository, MediaRepository>();
        services.AddSingleton<ISecretGenerator, SecretGenerator>();
        services.AddSingleton<ISecretHasher, SecretHasher>();
        services.AddSingleton<IOtpCodeGenerator, NumericOtpCodeGenerator>();
        services.AddSingleton<IOtpCodeHasher, HmacOtpCodeHasher>();
        services.AddSingleton<IOtpSender, LogOtpSender>();
        services.AddSingleton<IJwtTokenService, JwtTokenService>();
        services.AddScoped<IApiKeyValidator, ApiKeyValidator>();
        services.AddScoped<IAgencyReadService, AgencyReadService>();
        return services;
    }
}
