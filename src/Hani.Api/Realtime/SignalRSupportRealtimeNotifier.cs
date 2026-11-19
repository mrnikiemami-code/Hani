using Hani.Modules.Content.Application.Support;
using Microsoft.AspNetCore.SignalR;

namespace Hani.Api.Realtime;

internal sealed class SignalRSupportRealtimeNotifier(
    IHubContext<SupportHub> hub) : ISupportRealtimeNotifier
{
    public Task MessageAddedAsync(
        Guid ticketId,
        Guid messageId,
        string authorType,
        bool isInternal,
        CancellationToken cancellationToken)
        => hub.Clients
            .Group(SupportHub.GroupName(ticketId))
            .SendAsync(
                "SupportMessageAdded",
                new { ticketId, messageId, authorType, isInternal },
                cancellationToken);

    public Task DisputeUpdatedAsync(
        Guid ticketId,
        Guid disputeId,
        string status,
        CancellationToken cancellationToken)
        => hub.Clients
            .Group(SupportHub.GroupName(ticketId))
            .SendAsync(
                "SupportDisputeUpdated",
                new { ticketId, disputeId, status },
                cancellationToken);
}
