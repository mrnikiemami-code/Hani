using Hani.Modules.Catalog.Infrastructure.Providers;
using Hani.Modules.Content.Infrastructure.Storage;
using Hani.Modules.Identity.Application;
using Hani.Modules.Marketplace.Application;
using Hani.Modules.Payments.Application;
using Hani.Modules.Settlement.Application;

namespace Hani.Api.Configuration;

/// <summary>Binds module options from configuration.</summary>
public static class OptionsRegistration
{
    /// <summary>Adds all module option bindings.</summary>
    public static IServiceCollection AddHaniOptions(
        this IServiceCollection services,
        IConfiguration configuration)
    {
        services.Configure<PaymentOptions>(configuration.GetSection("Payments"));
        services.Configure<CommissionOptions>(configuration.GetSection("Commissions"));
        services.Configure<SeoOptions>(configuration.GetSection("Seo"));
        services.Configure<Hani.Modules.Content.Application.Queries.Sitemap.ContentSitemapOptions>(
            configuration.GetSection("Seo"));
        services.Configure<Hani.Modules.Content.Application.Notifications.NotificationProviderOptions>(
            configuration.GetSection("Notifications"));
        services.Configure<Hani.Modules.Identity.Infrastructure.Storage.MediaStorageOptions>(
            configuration.GetSection("Storage"));
        services.Configure<Hani.Modules.Content.Infrastructure.Storage.ContentMediaStorageOptions>(
            configuration.GetSection("Storage"));
        services.Configure<SupportAttachmentOptions>(
            configuration.GetSection("Support:Attachments"));
        services.Configure<FlightProviderOptions>(configuration.GetSection("FlightProvider"));
        services.Configure<JwtOptions>(configuration.GetSection("Jwt"));
        services.Configure<OtpOptions>(configuration.GetSection("Otp"));
        services.Configure<TrustOptions>(configuration.GetSection("Trust"));
        return services;
    }
}
