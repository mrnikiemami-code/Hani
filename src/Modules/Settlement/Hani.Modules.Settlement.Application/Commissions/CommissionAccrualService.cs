using Hani.BuildingBlocks.Domain;
using Hani.Contracts.Settlement;
using Hani.Modules.Settlement.Application.Abstractions;
using Hani.Modules.Settlement.Domain.Commissions;
using Hani.Modules.Settlement.Domain.Ledger;
using Microsoft.Extensions.Options;

namespace Hani.Modules.Settlement.Application.Commissions;

/// <summary>
/// Accrues commission for a paid order and posts a balanced ledger transaction.
/// Idempotent per order.
/// </summary>
public sealed class CommissionAccrualService(
    ICommissionRuleRepository rules,
    ICommissionEntryRepository entries,
    IOptions<CommissionOptions> options,
    IIdGenerator ids) : ICommissionAccrualService
{
    /// <inheritdoc />
    public async Task AccrueAsync(
        CommissionAccrualRequest request,
        CancellationToken cancellationToken)
    {
        var existing = await entries.GetByOrderAndCurrencyAsync(
            request.OrderId,
            request.Currency,
            cancellationToken);

        if (existing is not null)
        {
            return;
        }

        if (request.GrossAmount <= 0m)
        {
            throw new ArgumentOutOfRangeException(nameof(request), "Gross amount must be positive.");
        }

        if (!Enum.TryParse<ProductType>(request.ProductType, ignoreCase: true, out var productType))
        {
            throw new ArgumentException("Product type is invalid.", nameof(request));
        }

        var rule = await rules.FindEffectiveAsync(
            request.AgencyId,
            productType,
            request.PaidAt,
            cancellationToken);

        var rate = rule?.Rate ?? options.Value.DefaultRate;
        var min = rule?.MinAmount ?? options.Value.DefaultMinAmount;
        var max = rule?.MaxAmount ?? options.Value.DefaultMaxAmount;

        var commission = Math.Round(request.GrossAmount * rate, 2, MidpointRounding.AwayFromZero);

        if (min is not null)
        {
            commission = Math.Max(commission, min.Value);
        }

        if (max is not null)
        {
            commission = Math.Min(commission, max.Value);
        }

        commission = Math.Clamp(commission, 0m, request.GrossAmount);
        var net = request.GrossAmount - commission;

        var lines = new List<LedgerEntryInput>(3)
        {
            new(
                LedgerAccounts.PspCash,
                request.GrossAmount,
                0m,
                "Payment received into Hani PSP account"),
            new(
                LedgerAccounts.AgencyPayable,
                0m,
                net,
                "Amount payable to agency")
        };

        if (commission > 0m)
        {
            lines.Add(new LedgerEntryInput(
                LedgerAccounts.CommissionRevenue,
                0m,
                commission,
                "Hani commission revenue"));
        }

        var transaction = LedgerTransaction.Create(
            ids,
            "commission_accrual",
            request.OrderId,
            request.Currency,
            lines,
            request.PaidAt);

        var entry = CommissionEntry.Create(
            ids,
            request.OrderId,
            request.AgencyId,
            productType,
            request.GrossAmount,
            rate,
            commission,
            net,
            request.Currency,
            rule?.Id,
            rule is null ? "Default" : "Rule",
            transaction.Id,
            request.PaidAt);

        await entries.AddAsync(entry, transaction, cancellationToken);
    }
}
