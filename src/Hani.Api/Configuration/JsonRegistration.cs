using System.Text.Json.Serialization;

namespace Hani.Api.Configuration;

/// <summary>JSON serialization configuration for API contracts.</summary>
public static class JsonRegistration
{
    /// <summary>Adds enum-as-string JSON options.</summary>
    public static IServiceCollection AddHaniJson(this IServiceCollection services)
    {
        services.ConfigureHttpJsonOptions(options =>
        {
            options.SerializerOptions.Converters.Add(new JsonStringEnumConverter());
        });
        return services;
    }
}
