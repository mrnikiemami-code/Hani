using Hani.BuildingBlocks.Application;
using Hani.Contracts.Identity;
using Hani.Modules.Identity.Application.Abstractions;

namespace Hani.Modules.Identity.Application.Commands.ChannelSettings;

internal sealed class ConfigureChannelSettingsCommandHandler(IAgencyRepository agencies)
    : ICommandHandler<ConfigureChannelSettingsCommand, ChannelSettingsSnapshot>
{
    public async Task<Result<ChannelSettingsSnapshot>> Handle(
        ConfigureChannelSettingsCommand request,
        CancellationToken cancellationToken)
    {
        var agency = await agencies.GetByIdAsync(request.AgencyId, cancellationToken);

        if (agency is null)
        {
            return Result<ChannelSettingsSnapshot>.Failure(
                Error.NotFound("HANI-IDENTITY-1801", "Agency was not found."));
        }

        try
        {
            agency.ConfigureChannel(
                request.Plan,
                request.WhiteLabelEnabled,
                request.CustomDomain,
                request.AttributionRequired,
                request.CanonicalMode);
            await agencies.SaveChangesAsync(cancellationToken);
            return Result<ChannelSettingsSnapshot>.Success(new ChannelSettingsSnapshot(
                agency.ChannelPlan.ToString(),
                agency.WhiteLabelEnabled,
                agency.CustomDomain,
                agency.AttributionRequired,
                agency.CanonicalMode));
        }
        catch (ArgumentException exception)
        {
            return Result<ChannelSettingsSnapshot>.Failure(
                Error.Validation("HANI-IDENTITY-1802", exception.Message));
        }
    }
}

internal sealed class ConfigureChannelWebhookCommandHandler(IAgencyRepository agencies)
    : ICommandHandler<ConfigureChannelWebhookCommand, bool>
{
    public async Task<Result<bool>> Handle(
        ConfigureChannelWebhookCommand request,
        CancellationToken cancellationToken)
    {
        var agency = await agencies.GetByIdAsync(request.AgencyId, cancellationToken);

        if (agency is null)
        {
            return Result<bool>.Failure(Error.NotFound("HANI-IDENTITY-1801", "Agency was not found."));
        }

        try
        {
            agency.ConfigureWebhook(request.Url, request.Secret);
            await agencies.SaveChangesAsync(cancellationToken);
            return Result<bool>.Success(true);
        }
        catch (ArgumentException exception)
        {
            return Result<bool>.Failure(Error.Validation("HANI-IDENTITY-1803", exception.Message));
        }
    }
}
