using Hani.Modules.Content.Application.Support;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;

namespace Hani.Api.Realtime;

/// <summary>
/// Authenticated support hub for ticket-scoped real-time refresh events.
/// </summary>
[Authorize]
public sealed class SupportHub(ISupportTicketAccessService access) : Hub
{
    /// <summary>Joins the real-time group for one ticket after an access check.</summary>
    public async Task JoinTicket(Guid ticketId)
    {
        if (!TryGetUserId(out var userId))
        {
            throw new HubException("Authentication is required.");
        }

        var isAgent = Context.User?.IsInRole("Admin") == true ||
            Context.User?.HasClaim("permission", "support.view") == true;
        if (!await access.CanAccessAsync(
                ticketId,
                userId,
                isAgent,
                Context.ConnectionAborted))
        {
            throw new HubException("Ticket access is denied.");
        }

        await Groups.AddToGroupAsync(
            Context.ConnectionId,
            GroupName(ticketId),
            Context.ConnectionAborted);
    }

    /// <summary>Leaves the real-time group for one ticket.</summary>
    public Task LeaveTicket(Guid ticketId)
        => Groups.RemoveFromGroupAsync(
            Context.ConnectionId,
            GroupName(ticketId),
            Context.ConnectionAborted);

    /// <summary>Stable SignalR group name for a ticket.</summary>
    public static string GroupName(Guid ticketId)
        => $"support-ticket-{ticketId:N}";

    private bool TryGetUserId(out Guid userId)
    {
        var value = Context.User?.FindFirst("user_id")?.Value
            ?? Context.User?.FindFirst("sub")?.Value;
        return Guid.TryParse(value, out userId);
    }
}
