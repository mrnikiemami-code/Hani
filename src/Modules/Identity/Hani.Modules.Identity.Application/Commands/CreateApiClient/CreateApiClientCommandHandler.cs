using Hani.BuildingBlocks.Application;
using Hani.Modules.Identity.Application.Abstractions;
using Hani.Modules.Identity.Domain.ApiClients;

namespace Hani.Modules.Identity.Application.Commands.CreateApiClient;

internal sealed class CreateApiClientCommandHandler(
    IAgencyRepository agencies,
    IApiClientRepository apiClients,
    ISecretGenerator secretGenerator,
    ISecretHasher secretHasher)
    : ICommandHandler<CreateApiClientCommand, CreateApiClientResult>
{
    public async Task<Result<CreateApiClientResult>> Handle(
        CreateApiClientCommand request,
        CancellationToken cancellationToken)
    {
        var agency = await agencies.GetByIdAsync(request.AgencyId, cancellationToken);

        if (agency is null)
        {
            return Result<CreateApiClientResult>.Failure(
                Error.NotFound("HANI-IDENTITY-1006", "Agency was not found."));
        }

        var clientId = secretGenerator.GenerateClientId(agency.Id);
        var secret = secretGenerator.GenerateSecret();
        var scopes = request.Scopes
            .Select(scope => scope.Trim())
            .Where(scope => scope.Length > 0)
            .Distinct(StringComparer.Ordinal)
            .ToArray();

        var apiClient = ApiClient.Create(
            agency.Id,
            request.Name,
            clientId,
            secretHasher.Hash(secret),
            string.Join(' ', scopes));

        await apiClients.AddAsync(apiClient, cancellationToken);

        return Result<CreateApiClientResult>.Success(
            new CreateApiClientResult(apiClient.Id, clientId, secret, scopes));
    }
}
