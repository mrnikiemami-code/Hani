using Hani.BuildingBlocks.Application;
using Hani.Modules.Settlement.Application.Abstractions;
using Hani.Modules.Settlement.Domain.Ledger;

namespace Hani.Modules.Settlement.Application.Queries.GetLedgerTransaction;

internal sealed class GetLedgerTransactionQueryHandler(
    ILedgerTransactionRepository transactions)
    : IQueryHandler<GetLedgerTransactionQuery, LedgerTransactionDto>
{
    public async Task<Result<LedgerTransactionDto>> Handle(
        GetLedgerTransactionQuery request,
        CancellationToken cancellationToken)
    {
        var transaction = await transactions.GetByIdAsync(
            request.TransactionId,
            cancellationToken);

        if (transaction is null)
        {
            return Result<LedgerTransactionDto>.Failure(
                Error.NotFound("HANI-SETTLEMENT-1101", "Ledger transaction was not found."));
        }

        return Result<LedgerTransactionDto>.Success(Map(transaction));
    }

    private static LedgerTransactionDto Map(LedgerTransaction transaction)
        => new(
            transaction.Id,
            transaction.ReferenceType,
            transaction.ReferenceId,
            transaction.Currency,
            transaction.CreatedAt,
            transaction.Entries
                .Select(entry => new LedgerLineDto(
                    entry.Id,
                    entry.AccountCode,
                    entry.Debit,
                    entry.Credit,
                    entry.Description))
                .ToArray());
}
