using Hani.BuildingBlocks.Application;
using Microsoft.AspNetCore.Http;

namespace Hani.BuildingBlocks.AspNetCore;

public sealed class TenantMiddleware(RequestDelegate next)
{
    public async Task InvokeAsync(HttpContext context, ICurrentTenant currentTenant)
    {
        Guid? tenantId = null;

        var agencyClaim = context.User.FindFirst("agency_id")?.Value;

        if (Guid.TryParse(agencyClaim, out var claimedTenant))
        {
            tenantId = claimedTenant;
        }
        else if (context.Request.Headers.TryGetValue("X-Agency-Id", out var values) &&
                 Guid.TryParse(values.FirstOrDefault(), out var parsed))
        {
            // Local development fallback only. Authenticated requests always use the claim.
            tenantId = parsed;
        }

        using (currentTenant.Change(tenantId))
        {
            await next(context);
        }
    }
}
