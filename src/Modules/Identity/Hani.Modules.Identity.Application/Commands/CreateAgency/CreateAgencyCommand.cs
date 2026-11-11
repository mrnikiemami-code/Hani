using Hani.BuildingBlocks.Application;

namespace Hani.Modules.Identity.Application.Commands.CreateAgency;

/// <summary>
/// Command that creates an agency tenant.
/// </summary>
public sealed record CreateAgencyCommand(
    string Slug,
    string Name,
    string LicenseNo,
    string City,
    DateOnly? SubscriptionValidUntil = null) : ICommand<Guid>;
