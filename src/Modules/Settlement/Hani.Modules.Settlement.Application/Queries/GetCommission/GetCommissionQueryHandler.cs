using Hani.BuildingBlocks.Application;
using Hani.Modules.Settlement.Application.Abstractions;
using Hani.Modules.Settlement.Domain.Commissions;

namespace Hani.Modules.Settlement.Application.Queries.GetCommission;

internal sealed class GetCommissionQueryHandler(ICommissionEntryRepository entries)
    : IQueryHandler<GetCommissionQuery, CommissionDto>
{
    public async Task<Result<CommissionDto>> Handle(
        GetCommissionQuery request,
        CancellationToken cancellationToken)
    {
        var entry = await entries.GetByOrderIdAsync(request.OrderId, cancellationToken);

        if (entry is null)
        {
            return Result<CommissionDto>.Failure(
                Error.NotFound("HANI-SETTLEMENT-1001", "Commission entry was not found."));
        }

        return Result<CommissionDto>.Success(Map(entry));
    }

    private static CommissionDto Map(CommissionEntry entry)
        => new(
            entry.Id,
            entry.OrderId,
            entry.AgencyId,
            entry.ProductType.ToString(),
            entry.GrossAmount,
            entry.Rate,
            entry.CommissionAmount,
            entry.NetAmount,
            entry.Currency,
            entry.RuleId,
            entry.RuleSource,
            entry.LedgerTransactionId,
            entry.Status.ToString(),
            entry.CreatedAt);
}
