using Hani.Modules.Settlement.Domain.Ledger;
using Shouldly;

namespace Hani.UnitTests.Settlement;

public sealed class LedgerTransactionTests
{
    [Fact]
    public void Create_Should_Accept_Balanced_Transaction()
    {
        var transaction = LedgerTransaction.Create(
            TestIds.Generator,
            "commission_accrual",
            Guid.CreateVersion7(),
            "IRR",
            [
                new LedgerEntryInput(LedgerAccounts.PspCash, 1000m, 0m, "Cash"),
                new LedgerEntryInput(LedgerAccounts.AgencyPayable, 0m, 900m, "Payable"),
                new LedgerEntryInput(LedgerAccounts.CommissionRevenue, 0m, 100m, "Revenue")
            ]);

        transaction.Entries.Count.ShouldBe(3);
        transaction.Entries.Sum(entry => entry.Debit).ShouldBe(1000m);
        transaction.Entries.Sum(entry => entry.Credit).ShouldBe(1000m);
    }

    [Fact]
    public void Create_Should_Reject_Unbalanced_Transaction()
    {
        Should.Throw<ArgumentException>(() =>
            LedgerTransaction.Create(
                TestIds.Generator,
                "commission_accrual",
                Guid.CreateVersion7(),
                "IRR",
                [
                    new LedgerEntryInput(LedgerAccounts.PspCash, 1000m, 0m, "Cash"),
                    new LedgerEntryInput(LedgerAccounts.AgencyPayable, 0m, 900m, "Payable")
                ]));
    }

    [Fact]
    public void Create_Should_Reject_Line_With_Both_Debit_And_Credit()
    {
        Should.Throw<ArgumentException>(() =>
            LedgerTransaction.Create(
                TestIds.Generator,
                "commission_accrual",
                Guid.CreateVersion7(),
                "IRR",
                [
                    new LedgerEntryInput(LedgerAccounts.PspCash, 1000m, 1000m, "Invalid"),
                    new LedgerEntryInput(LedgerAccounts.AgencyPayable, 0m, 1000m, "Payable")
                ]));
    }
}
