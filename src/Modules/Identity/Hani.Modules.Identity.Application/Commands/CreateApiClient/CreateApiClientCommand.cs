using Hani.BuildingBlocks.Application;

namespace Hani.Modules.Identity.Application.Commands.CreateApiClient;

public sealed record CreateApiClientCommand(
    Guid AgencyId,
    string Name,
    IReadOnlyList<string> Scopes) : ICommand<CreateApiClientResult>;

public sealed record CreateApiClientResult(
    Guid ApiClientId,
    string ClientId,
    string ClientSecret,
    IReadOnlyList<string> Scopes);
