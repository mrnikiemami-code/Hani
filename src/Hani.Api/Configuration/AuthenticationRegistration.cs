using System.Text;
using Hani.Modules.Identity.Application;
using Hani.Modules.Identity.Presentation;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;

namespace Hani.Api.Configuration;

/// <summary>Configures JWT/API-key authentication and authorization policies.</summary>
public static class AuthenticationRegistration
{
    /// <summary>Adds authentication schemes and policies.</summary>
    public static IServiceCollection AddHaniAuthentication(
        this IServiceCollection services,
        IConfiguration configuration)
    {
        var jwtOptions = configuration.GetSection("Jwt").Get<JwtOptions>() ?? new JwtOptions();
        if (string.IsNullOrWhiteSpace(jwtOptions.SigningKey) ||
            Encoding.UTF8.GetByteCount(jwtOptions.SigningKey) < 32)
        {
            throw new InvalidOperationException("Jwt:SigningKey must be at least 32 bytes.");
        }

        services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = "HaniAuth";
                options.DefaultChallengeScheme = "HaniAuth";
            })
            .AddPolicyScheme("HaniAuth", "HaniAuth", options =>
            {
                options.ForwardDefaultSelector = context =>
                    context.Request.Headers.ContainsKey("X-Api-Key")
                        ? ApiKeyAuthenticationHandler.SchemeName
                        : JwtBearerDefaults.AuthenticationScheme;
            })
            .AddScheme<AuthenticationSchemeOptions, ApiKeyAuthenticationHandler>(
                ApiKeyAuthenticationHandler.SchemeName,
                _ => { })
            .AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidIssuer = jwtOptions.Issuer,
                    ValidateAudience = true,
                    ValidAudience = jwtOptions.Audience,
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(
                        Encoding.UTF8.GetBytes(jwtOptions.SigningKey)),
                    ValidateLifetime = true,
                    ClockSkew = TimeSpan.FromSeconds(30)
                };
            });

        services.AddAuthorization(options =>
        {
            options.AddPolicy("Supplier", policy => policy
                .AddAuthenticationSchemes(ApiKeyAuthenticationHandler.SchemeName)
                .RequireAuthenticatedUser()
                .RequireClaim("scope", "supplier.write"));

            options.AddPolicy("User", policy => policy.RequireAuthenticatedUser());
            options.AddPolicy("Admin", policy => policy
                .RequireAuthenticatedUser()
                .RequireRole("Admin"));

            options.AddPolicy("Channel", policy => policy
                .AddAuthenticationSchemes(JwtBearerDefaults.AuthenticationScheme)
                .RequireAuthenticatedUser()
                .RequireAssertion(context => context.User
                    .FindAll("scope")
                    .Any(claim => claim.Value.StartsWith(
                        "channel.",
                        StringComparison.OrdinalIgnoreCase))));

            options.AddPolicy("ChannelFinance", policy => policy
                .AddAuthenticationSchemes(JwtBearerDefaults.AuthenticationScheme)
                .RequireAuthenticatedUser()
                .RequireClaim("scope", "channel.finance.read"));

            options.AddPolicy("ChannelCatalog", policy => policy
                .AddAuthenticationSchemes(JwtBearerDefaults.AuthenticationScheme)
                .RequireAuthenticatedUser()
                .RequireClaim("scope", "channel.catalog.read"));

            options.AddPolicy("ChannelBookingRead", policy => policy
                .AddAuthenticationSchemes(JwtBearerDefaults.AuthenticationScheme)
                .RequireAuthenticatedUser()
                .RequireClaim("scope", "channel.booking.read"));

            options.AddPolicy("ChannelBookingWrite", policy => policy
                .AddAuthenticationSchemes(JwtBearerDefaults.AuthenticationScheme)
                .RequireAuthenticatedUser()
                .RequireClaim("scope", "channel.booking.write"));
        });

        return services;
    }
}
