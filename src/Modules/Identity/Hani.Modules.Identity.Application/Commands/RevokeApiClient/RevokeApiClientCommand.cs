using Hani.BuildingBlocks.Application;

namespace Hani.Modules.Identity.Application.Commands.RevokeApiClient;

/// <summary>Revokes an agency API client.</summary>
public sealed record RevokeApiClientCommand(Guid ApiClientId) : ICommand<bool>;
