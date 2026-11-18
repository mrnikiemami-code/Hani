using Hani.BuildingBlocks.Application;
using Hani.Contracts.Identity;
using Hani.Modules.Identity.Application.Commands.CreateApiClient;
using Hani.Modules.Identity.Domain.Agencies;

namespace Hani.Modules.Admin.Application;

/// <summary>Admin API client row.</summary>
public sealed record AdminApiClientDto(
    Guid Id,
    Guid AgencyId,
    string AgencyName,
    string Name,
    string ClientId,
    string Scopes,
    string Status,
    DateTimeOffset CreatedAt,
    DateTimeOffset? LastUsedAt);

/// <summary>Admin channel agency row.</summary>
public sealed record AdminChannelAgencyDto(
    Guid AgencyId,
    string Name,
    string Slug,
    string Plan,
    bool WhiteLabelEnabled,
    string? CustomDomain,
    bool AttributionRequired,
    string CanonicalMode,
    DateOnly? SubscriptionValidUntil);

/// <summary>Create API client input.</summary>
public sealed record AdminCreateApiClientInput(
    Guid AgencyId,
    string Name,
    IReadOnlyList<string> Scopes);

/// <summary>Channel settings input.</summary>
public sealed record AdminChannelSettingsInput(
    ChannelPlan Plan,
    bool WhiteLabelEnabled,
    string? CustomDomain,
    bool AttributionRequired,
    string CanonicalMode);

/// <summary>Admin channel management service.</summary>
public interface IAdminChannelService
{
    Task<IReadOnlyList<AdminApiClientDto>> ListClientsAsync(
        CancellationToken cancellationToken);
    Task<IReadOnlyList<AdminChannelAgencyDto>> ListAgenciesAsync(
        CancellationToken cancellationToken);
    Task<Result<CreateApiClientResult>> CreateClientAsync(
        AdminCreateApiClientInput input,
        CancellationToken cancellationToken);
    Task<Result<bool>> RevokeClientAsync(
        Guid apiClientId,
        CancellationToken cancellationToken);
    Task<Result<ChannelSettingsSnapshot>> ConfigureSettingsAsync(
        Guid agencyId,
        AdminChannelSettingsInput input,
        CancellationToken cancellationToken);
    Task<Result<bool>> ConfigureWebhookAsync(
        Guid agencyId,
        string? url,
        string? secret,
        CancellationToken cancellationToken);
}
