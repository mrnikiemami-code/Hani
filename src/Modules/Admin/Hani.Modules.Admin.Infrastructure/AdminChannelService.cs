using Hani.BuildingBlocks.Application;
using Hani.Contracts.Identity;
using Hani.Modules.Admin.Application;
using Hani.Modules.Identity.Application.Commands.ChannelSettings;
using Hani.Modules.Identity.Application.Commands.CreateApiClient;
using Hani.Modules.Identity.Application.Commands.RevokeApiClient;
using Microsoft.EntityFrameworkCore;

namespace Hani.Modules.Admin.Infrastructure;

internal sealed partial class AdminService : IAdminChannelService
{
    public async Task<IReadOnlyList<AdminApiClientDto>> ListClientsAsync(
        CancellationToken cancellationToken)
        => await identity.ApiClients
            .AsNoTracking()
            .OrderByDescending(item => item.CreatedAt)
            .Select(item => new AdminApiClientDto(
                item.Id,
                item.AgencyId,
                identity.Agencies.Where(agency => agency.Id == item.AgencyId)
                    .Select(agency => agency.Name)
                    .FirstOrDefault() ?? string.Empty,
                item.Name,
                item.ClientId,
                item.Scopes,
                item.Status.ToString(),
                item.CreatedAt,
                item.LastUsedAt))
            .ToArrayAsync(cancellationToken);

    public async Task<IReadOnlyList<AdminChannelAgencyDto>> ListAgenciesAsync(
        CancellationToken cancellationToken)
        => await identity.Agencies
            .AsNoTracking()
            .OrderBy(agency => agency.Name)
            .Select(agency => new AdminChannelAgencyDto(
                agency.Id,
                agency.Name,
                agency.Slug,
                agency.ChannelPlan.ToString(),
                agency.WhiteLabelEnabled,
                agency.CustomDomain,
                agency.AttributionRequired,
                agency.CanonicalMode,
                agency.SubscriptionValidUntil))
            .ToArrayAsync(cancellationToken);

    public Task<Result<CreateApiClientResult>> CreateClientAsync(
        AdminCreateApiClientInput input,
        CancellationToken cancellationToken)
        => sender.Send(
            new CreateApiClientCommand(input.AgencyId, input.Name, input.Scopes),
            cancellationToken);

    public Task<Result<bool>> RevokeClientAsync(
        Guid apiClientId,
        CancellationToken cancellationToken)
        => sender.Send(new RevokeApiClientCommand(apiClientId), cancellationToken);

    public Task<Result<ChannelSettingsSnapshot>> ConfigureSettingsAsync(
        Guid agencyId,
        AdminChannelSettingsInput input,
        CancellationToken cancellationToken)
        => sender.Send(
            new ConfigureChannelSettingsCommand(
                agencyId,
                input.Plan,
                input.WhiteLabelEnabled,
                input.CustomDomain,
                input.AttributionRequired,
                input.CanonicalMode),
            cancellationToken);

    public Task<Result<bool>> ConfigureWebhookAsync(
        Guid agencyId,
        string? url,
        string? secret,
        CancellationToken cancellationToken)
        => sender.Send(
            new ConfigureChannelWebhookCommand(agencyId, url, secret),
            cancellationToken);
}
