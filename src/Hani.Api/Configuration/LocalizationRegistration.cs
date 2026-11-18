using System.Globalization;
using Hani.BuildingBlocks.Application;
using Hani.BuildingBlocks.AspNetCore;
using Hani.BuildingBlocks.Infrastructure.Localization;
using Microsoft.AspNetCore.Localization;

namespace Hani.Api.Configuration;

/// <summary>Configures supported languages and request localization.</summary>
public static class LocalizationRegistration
{
    /// <summary>Adds localization options, catalog, and request culture.</summary>
    public static IServiceCollection AddHaniLocalization(
        this IServiceCollection services,
        IConfiguration configuration)
    {
        var localizationOptions = configuration
            .GetSection("Localization")
            .Get<LocalizationOptions>() ?? new LocalizationOptions();

        if (localizationOptions.SupportedCultures is not { Count: > 0 } ||
            string.IsNullOrWhiteSpace(localizationOptions.DefaultCulture))
        {
            throw new InvalidOperationException(
                "Localization configuration is required: configure Localization:SupportedCultures and Localization:DefaultCulture.");
        }

        ProblemDetailsLocalizer.Configure(localizationOptions);
        services.Configure<LocalizationOptions>(
            configuration.GetSection("Localization"));
        services.AddSingleton<ILanguageCatalog, LanguageCatalog>();

        services.Configure<RequestLocalizationOptions>(options =>
        {
            var cultures = localizationOptions.SupportedCultures
                .Select(culture => new CultureInfo(culture))
                .ToArray();

            options.DefaultRequestCulture = new RequestCulture(
                localizationOptions.DefaultCulture);
            options.SupportedCultures = cultures;
            options.SupportedUICultures = cultures;
        });

        return services;
    }
}
