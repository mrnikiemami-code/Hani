using Hani.BuildingBlocks.Domain;
using Hani.Contracts.Settlement;
using Hani.Modules.Settlement.Application.Abstractions;
using Hani.Modules.Settlement.Domain.Ledger;

namespace Hani.Modules.Settlement.Infrastructure.Integrations;

internal sealed class RefundLedgerService(
    ICommissionEntryRepository commissions,
    ILedgerTransactionRepository ledger,
    IIdGenerator ids) : IRefundLedgerService
{
    public async Task RecordRefundAsync(
        Guid orderId,
        Guid refundId,
        decimal amount,
        string currency,
        CancellationToken cancellationToken)
    {
        if (amount <= 0)
        {
            return;
        }

        var commission = await commissions.GetByOrderAndCurrencyAsync(
            orderId,
            currency,
            cancellationToken);

        var lines = new List<LedgerEntryInput>();
        if (commission is not null && commission.GrossAmount > 0)
        {
            var ratio = Math.Min(1m, amount / commission.GrossAmount);
            var commissionPart = Math.Round(commission.CommissionAmount * ratio, 2);
            var netPart = amount - commissionPart;
            lines.Add(new LedgerEntryInput(
                LedgerAccounts.AgencyPayable,
                netPart,
                0m,
                "Refund reversal of agency payable"));
            if (commissionPart > 0)
            {
                lines.Add(new LedgerEntryInput(
                    LedgerAccounts.CommissionRevenue,
                    commissionPart,
                    0m,
                    "Refund reversal of Hani commission"));
            }
        }
        else
        {
            lines.Add(new LedgerEntryInput(
                LedgerAccounts.AgencyPayable,
                amount,
                0m,
                "Refund reversal of agency payable"));
        }

        lines.Add(new LedgerEntryInput(
            LedgerAccounts.PspCash,
            0m,
            amount,
            "Refund paid from Hani PSP account"));

        var transaction = LedgerTransaction.Create(
            ids,
            "Refund",
            refundId,
            currency,
            lines);

        await ledger.AddAsync(transaction, cancellationToken);
    }
}
