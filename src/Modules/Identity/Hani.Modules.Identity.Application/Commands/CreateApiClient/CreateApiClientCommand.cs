using Hani.BuildingBlocks.Application;

namespace Hani.Modules.Identity.Application.Commands.CreateApiClient;

/// <summary>
/// Command that creates an API client and returns its secret once.
/// </summary>
public sealed record CreateApiClientCommand(
    Guid AgencyId,
    string Name,
    IReadOnlyList<string> Scopes) : ICommand<CreateApiClientResult>;

/// <summary>
/// Newly created API client credentials (secret shown once).
/// </summary>
public sealed record CreateApiClientResult(
    Guid ApiClientId,
    string ClientId,
    string ClientSecret,
    IReadOnlyList<string> Scopes);
