namespace Hani.Api.Configuration;

/// <summary>Single composition entry point for the API host.</summary>
public static class HaniApiBuilderExtensions
{
    /// <summary>
    /// Adds logging, persistence, modules, options, CQRS, validators, auth,
    /// localization, health checks, rate limiting, and problem details.
    /// </summary>
    public static WebApplicationBuilder AddHaniApi(this WebApplicationBuilder builder)
    {
        ProductionConfigurationGuard.Validate(builder.Configuration, builder.Environment);
        builder.AddHaniLogging();
        builder.Services.AddHaniJson();
        builder.Services.AddHaniPersistence(builder.Configuration);
        builder.Services.AddHaniOptions(builder.Configuration);
        builder.Services.AddHaniCrossCutting(builder.Configuration);
        builder.Services.AddHaniCqrs();
        builder.Services.AddHaniValidators();
        builder.Services.AddHaniAuthentication(builder.Configuration);
        builder.Services.AddHaniLocalization(builder.Configuration);
        builder.Services.AddHaniHealthAndRateLimiting(builder.Configuration);
        builder.Services.AddHaniProblemDetails();
        return builder;
    }
}
