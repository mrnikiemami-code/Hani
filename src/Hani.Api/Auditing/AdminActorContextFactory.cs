using System.Security.Claims;
using Hani.Modules.Admin.Application;

namespace Hani.Api;

/// <summary>Builds audit actor metadata from the HTTP request.</summary>
public static class AdminActorContextFactory
{
    /// <summary>Returns the authenticated administrator and request metadata.</summary>
    public static bool TryCreate(HttpContext context, out AdminActorContext actor)
    {
        var value = context.User.FindFirst("user_id")?.Value
            ?? context.User.FindFirst(ClaimTypes.NameIdentifier)?.Value
            ?? context.User.FindFirst("sub")?.Value;
        if (!Guid.TryParse(value, out var userId))
        {
            actor = null!;
            return false;
        }

        actor = new AdminActorContext(
            userId,
            context.User.FindFirst(ClaimTypes.Role)?.Value ?? "Admin",
            context.TraceIdentifier,
            context.Connection.RemoteIpAddress?.ToString(),
            context.Request.Headers.UserAgent.ToString());
        return true;
    }
}
