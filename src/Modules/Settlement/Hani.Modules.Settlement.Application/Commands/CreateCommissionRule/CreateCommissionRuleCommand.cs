using Hani.BuildingBlocks.Application;

namespace Hani.Modules.Settlement.Application.Commands.CreateCommissionRule;

/// <summary>
/// Command that creates an agency/product commission rule.
/// </summary>
public sealed record CreateCommissionRuleCommand(
    Guid AgencyId,
    string ProductType,
    decimal Rate,
    decimal? MinAmount,
    decimal? MaxAmount,
    DateTimeOffset EffectiveFrom,
    DateTimeOffset? EffectiveTo) : ICommand<Guid>;
