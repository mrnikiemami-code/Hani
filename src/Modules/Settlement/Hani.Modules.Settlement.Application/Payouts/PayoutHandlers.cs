using Hani.BuildingBlocks.Application;
using Hani.BuildingBlocks.Domain;
using Hani.Modules.Settlement.Domain.Payouts;

namespace Hani.Modules.Settlement.Application.Payouts;

internal sealed class CreateSettlementTermsCommandHandler(IPayoutRepository payouts, IIdGenerator ids)
    : ICommandHandler<CreateSettlementTermsCommand, Guid>
{
    public async Task<Result<Guid>> Handle(
        CreateSettlementTermsCommand request,
        CancellationToken cancellationToken)
    {
        try
        {
            var terms = AgencySettlementTerms.Create(
                ids,
                request.AgencyId,
                request.Cycle,
                request.MinimumPayout,
                request.Currency,
                request.BankAccountRef);
            await payouts.AddTermsAsync(terms, cancellationToken);
            return Result<Guid>.Success(terms.Id);
        }
        catch (ArgumentException exception)
        {
            return Result<Guid>.Failure(Error.Validation("HANI-SETTLEMENT-3101", exception.Message));
        }
    }
}

internal sealed class CreatePayoutCommandHandler(IPayoutRepository payouts, IIdGenerator ids)
    : ICommandHandler<CreatePayoutCommand, PayoutDto>
{
    public async Task<Result<PayoutDto>> Handle(
        CreatePayoutCommand request,
        CancellationToken cancellationToken)
    {
        try
        {
            var payout = Payout.Create(
                ids,
                request.AgencyId,
                request.PeriodStart,
                request.PeriodEnd,
                request.Amount,
                request.Currency);
            await payouts.AddPayoutAsync(payout, cancellationToken);
            return Result<PayoutDto>.Success(Map(payout));
        }
        catch (ArgumentException exception)
        {
            return Result<PayoutDto>.Failure(Error.Validation("HANI-SETTLEMENT-3102", exception.Message));
        }
    }

    internal static PayoutDto Map(Payout payout)
        => new(
            payout.Id,
            payout.AgencyId,
            payout.PeriodStart,
            payout.PeriodEnd,
            payout.Amount,
            payout.Currency,
            payout.Status.ToString(),
            payout.CreatedAt,
            payout.PaidAt);
}

internal sealed class MarkPayoutPaidCommandHandler(IPayoutRepository payouts)
    : ICommandHandler<MarkPayoutPaidCommand, bool>
{
    public async Task<Result<bool>> Handle(
        MarkPayoutPaidCommand request,
        CancellationToken cancellationToken)
    {
        var payout = await payouts.GetPayoutAsync(request.PayoutId, cancellationToken);

        if (payout is null)
        {
            return Result<bool>.Failure(Error.NotFound("HANI-SETTLEMENT-3103", "Payout was not found."));
        }

        payout.MarkPaid();
        await payouts.SaveChangesAsync(cancellationToken);
        return Result<bool>.Success(true);
    }
}

internal sealed class GetSettlementTermsQueryHandler(IPayoutRepository payouts)
    : IQueryHandler<GetSettlementTermsQuery, SettlementTermsDto>
{
    public async Task<Result<SettlementTermsDto>> Handle(
        GetSettlementTermsQuery request,
        CancellationToken cancellationToken)
    {
        var terms = await payouts.GetTermsAsync(request.AgencyId, cancellationToken);

        return terms is null
            ? Result<SettlementTermsDto>.Failure(
                Error.NotFound("HANI-SETTLEMENT-3104", "Settlement terms were not found."))
            : Result<SettlementTermsDto>.Success(new SettlementTermsDto(
                terms.AgencyId,
                terms.Cycle.ToString(),
                terms.MinimumPayout,
                terms.Currency,
                terms.BankAccountRef,
                terms.IsActive));
    }
}

internal sealed class ListPayoutsQueryHandler(IPayoutRepository payouts)
    : IQueryHandler<ListPayoutsQuery, IReadOnlyList<PayoutDto>>
{
    public async Task<Result<IReadOnlyList<PayoutDto>>> Handle(
        ListPayoutsQuery request,
        CancellationToken cancellationToken)
    {
        var items = await payouts.ListPayoutsAsync(request.AgencyId, cancellationToken);
        return Result<IReadOnlyList<PayoutDto>>.Success(
            items.Select(CreatePayoutCommandHandler.Map).ToArray());
    }
}
