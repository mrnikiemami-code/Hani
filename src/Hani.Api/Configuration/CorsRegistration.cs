namespace Hani.Api.Configuration;

/// <summary>Configures the browser CORS policy used by SignalR and public calls.</summary>
public static class CorsRegistration
{
    /// <summary>Adds the named Hani CORS policy with credentials support.</summary>
    public static IServiceCollection AddHaniCors(
        this IServiceCollection services,
        IConfiguration configuration)
    {
        var origins = configuration
            .GetSection("Cors:AllowedOrigins")
            .Get<string[]>() ?? ["http://localhost:3000"];
        services.AddCors(options =>
        {
            options.AddPolicy("hani", policy =>
            {
                policy.WithOrigins(origins)
                    .AllowAnyHeader()
                    .AllowAnyMethod()
                    .AllowCredentials();
            });
        });
        return services;
    }
}
