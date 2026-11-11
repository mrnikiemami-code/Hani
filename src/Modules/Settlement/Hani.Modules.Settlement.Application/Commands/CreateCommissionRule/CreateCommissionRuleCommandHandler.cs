using Hani.BuildingBlocks.Application;
using Hani.BuildingBlocks.Domain;
using Hani.Modules.Settlement.Application.Abstractions;
using Hani.Modules.Settlement.Domain.Commissions;

namespace Hani.Modules.Settlement.Application.Commands.CreateCommissionRule;

internal sealed class CreateCommissionRuleCommandHandler(
    ICommissionRuleRepository rules,
    IIdGenerator ids)
    : ICommandHandler<CreateCommissionRuleCommand, Guid>
{
    public async Task<Result<Guid>> Handle(
        CreateCommissionRuleCommand request,
        CancellationToken cancellationToken)
    {
        if (!Enum.TryParse<ProductType>(request.ProductType, ignoreCase: true, out var productType))
        {
            return Result<Guid>.Failure(
                Error.Validation("HANI-SETTLEMENT-1201", "Product type is invalid."));
        }

        AgencyCommissionRule rule;

        try
        {
            rule = AgencyCommissionRule.Create(
                ids,
                request.AgencyId,
                productType,
                request.Rate,
                request.MinAmount,
                request.MaxAmount,
                request.EffectiveFrom,
                request.EffectiveTo);
        }
        catch (ArgumentException exception)
        {
            return Result<Guid>.Failure(
                Error.Validation("HANI-SETTLEMENT-1202", exception.Message));
        }

        await rules.AddAsync(rule, cancellationToken);
        return Result<Guid>.Success(rule.Id);
    }
}
