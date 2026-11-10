using Hani.BuildingBlocks.Application;

namespace Hani.Modules.Identity.Application.Commands.CreateAgency;

public sealed record CreateAgencyCommand(
    string Slug,
    string Name,
    string LicenseNo,
    string City,
    DateOnly? SubscriptionValidUntil = null) : ICommand<Guid>;
