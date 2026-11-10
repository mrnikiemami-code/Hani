using Hani.BuildingBlocks.Application;
using Microsoft.AspNetCore.Http;

namespace Hani.BuildingBlocks.AspNetCore;

public sealed class TenantMiddleware(RequestDelegate next)
{
    public async Task InvokeAsync(HttpContext context, ICurrentTenant currentTenant)
    {
        Guid? tenantId = null;

        if (context.Request.Headers.TryGetValue("X-Agency-Id", out var values) &&
            Guid.TryParse(values.FirstOrDefault(), out var parsed))
        {
            tenantId = parsed;
        }

        using (currentTenant.Change(tenantId))
        {
            await next(context);
        }
    }
}
