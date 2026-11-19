namespace Hani.Api;

/// <summary>
/// Adds baseline security headers to every API response.
/// </summary>
internal sealed class SecurityHeadersMiddleware(RequestDelegate next)
{
    /// <summary>
    /// Applies response headers and continues the pipeline.
    /// </summary>
    public async Task InvokeAsync(HttpContext context)
    {
        var headers = context.Response.Headers;
        headers["X-Content-Type-Options"] = "nosniff";
        headers["X-Frame-Options"] = "DENY";
        headers["Referrer-Policy"] = "no-referrer";
        headers["Permissions-Policy"] = "camera=(), microphone=(), geolocation=()";
        headers["Cross-Origin-Opener-Policy"] = "same-origin";
        headers["Cross-Origin-Resource-Policy"] = "same-site";
        headers["X-Permitted-Cross-Domain-Policies"] = "none";
        headers["Content-Security-Policy"] = "default-src 'none'; frame-ancestors 'none'";

        var path = context.Request.Path.Value ?? string.Empty;
        if (path.StartsWith("/internal/", StringComparison.OrdinalIgnoreCase) ||
            path.Contains("/auth/", StringComparison.OrdinalIgnoreCase) ||
            path.StartsWith("/admin", StringComparison.OrdinalIgnoreCase))
        {
            headers["Cache-Control"] = "no-store, no-cache, must-revalidate";
            headers["Pragma"] = "no-cache";
        }

        await next(context);
    }
}
