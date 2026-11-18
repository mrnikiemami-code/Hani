using Hani.BuildingBlocks.Application;
using Hani.Modules.Identity.Application.Abstractions;
using Hani.Modules.Identity.Domain.ApiClients;

namespace Hani.Modules.Identity.Application.Commands.RevokeApiClient;

internal sealed class RevokeApiClientCommandHandler(IApiClientRepository apiClients)
    : ICommandHandler<RevokeApiClientCommand, bool>
{
    public async Task<Result<bool>> Handle(
        RevokeApiClientCommand request,
        CancellationToken cancellationToken)
    {
        var client = await apiClients.GetAsync(request.ApiClientId, cancellationToken);
        if (client is null)
        {
            return Result<bool>.Failure(Error.NotFound(
                "HANI-IDENTITY-1821",
                "API client was not found."));
        }

        if (client.Status == ApiClientStatus.Revoked)
        {
            return Result<bool>.Success(true);
        }

        client.Revoke();
        await apiClients.SaveChangesAsync(cancellationToken);
        return Result<bool>.Success(true);
    }
}
