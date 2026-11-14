using Hani.BuildingBlocks.Application;
using Hani.Contracts.Identity;
using Hani.Modules.Identity.Domain.Agencies;

namespace Hani.Modules.Identity.Application.Commands.ChannelSettings;

/// <summary>Configure channel plan and white-label settings.</summary>
public sealed record ConfigureChannelSettingsCommand(
    Guid AgencyId,
    ChannelPlan Plan,
    bool WhiteLabelEnabled,
    string? CustomDomain,
    bool AttributionRequired,
    string CanonicalMode) : ICommand<ChannelSettingsSnapshot>;

/// <summary>Configure the agency channel webhook.</summary>
public sealed record ConfigureChannelWebhookCommand(
    Guid AgencyId,
    string? Url,
    string? Secret) : ICommand<bool>;
