using FluentValidation;

namespace Hani.Modules.Settlement.Application.Queries.GetLedgerTransaction;

/// <summary>
/// Validation rules for reading a ledger transaction.
/// </summary>
public sealed class GetLedgerTransactionQueryValidator
    : AbstractValidator<GetLedgerTransactionQuery>
{
    /// <summary>
    /// Creates validation rules for the transaction id.
    /// </summary>
    public GetLedgerTransactionQueryValidator()
    {
        RuleFor(query => query.TransactionId)
            .NotEmpty()
            .WithErrorCode("HANI-SETTLEMENT-1102");
    }
}
