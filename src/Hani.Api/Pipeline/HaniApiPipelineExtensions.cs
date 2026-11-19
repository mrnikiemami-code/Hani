using Hani.Api.Endpoints;
using Hani.Api.Realtime;
using Hani.Api.Middleware;
using Hani.BuildingBlocks.AspNetCore;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Diagnostics.HealthChecks;

namespace Hani.Api.Pipeline;

/// <summary>Configures the HTTP request pipeline for the API host.</summary>
public static class HaniApiPipelineExtensions
{
    /// <summary>
    /// Adds correlation, security headers, problem details, localization,
    /// authentication, tenancy, rate limiting, authorization, health checks,
    /// and all endpoints.
    /// </summary>
    public static WebApplication UseHaniApi(this WebApplication app)
    {
        app.UseMiddleware<CorrelationIdMiddleware>();
        app.UseMiddleware<SecurityHeadersMiddleware>();
        app.UseExceptionHandler();
        if (!app.Environment.IsDevelopment())
        {
            app.UseHsts();
        }

        app.UseRequestLocalization();
        app.UseStaticFiles();
        app.UseCors("hani");
        app.UseAuthentication();
        app.UseMiddleware<TenantMiddleware>();
        app.UseStatusCodePages(WriteProblemDetailsAsync);
        app.UseRateLimiter();
        app.UseAuthorization();
        app.UseMiddleware<AdminPermissionMiddleware>();
        MapHealthEndpoints(app);
        app.MapHub<SupportHub>("/hubs/support");
        app.MapHaniEndpoints();
        return app;
    }

    private static void MapHealthEndpoints(WebApplication app)
    {
        app.MapHealthChecks("/health", new HealthCheckOptions
        {
            ResponseWriter = HealthResponseWriter.WriteAsync
        });
        app.MapHealthChecks("/health/live", new HealthCheckOptions
        {
            Predicate = _ => false,
            ResponseWriter = HealthResponseWriter.WriteAsync
        });
        app.MapHealthChecks("/health/ready", new HealthCheckOptions
        {
            Predicate = check => check.Tags.Contains("ready"),
            ResponseWriter = HealthResponseWriter.WriteAsync
        });
    }

    private static async Task WriteProblemDetailsAsync(StatusCodeContext context)
    {
        var httpContext = context.HttpContext;
        if (httpContext.Response.HasStarted)
        {
            return;
        }

        var problem = HaniProblemDetails.Create(
            httpContext,
            httpContext.Response.StatusCode);
        await HaniProblemDetails.WriteAsync(httpContext, problem);
    }
}
