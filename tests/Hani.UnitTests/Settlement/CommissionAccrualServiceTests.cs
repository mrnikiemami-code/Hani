using Hani.Contracts.Settlement;
using Hani.Modules.Settlement.Application;
using Hani.Modules.Settlement.Application.Abstractions;
using Hani.Modules.Settlement.Application.Commissions;
using Hani.Modules.Settlement.Domain.Commissions;
using Hani.Modules.Settlement.Domain.Ledger;
using Microsoft.Extensions.Options;
using Shouldly;

namespace Hani.UnitTests.Settlement;

public sealed class CommissionAccrualServiceTests
{
    [Fact]
    public async Task Accrue_Should_Use_Default_Rate_And_Post_Balanced_Ledger()
    {
        var entries = new FakeCommissionEntryRepository();
        var service = CreateService(new FakeCommissionRuleRepository(), entries);
        var orderId = Guid.CreateVersion7();
        var agencyId = Guid.CreateVersion7();

        await service.AccrueAsync(
            new CommissionAccrualRequest(orderId, agencyId, 1000m, "IRR", "Tour", DateTimeOffset.UtcNow),
            CancellationToken.None);

        var entry = entries.Entries.Single();
        entry.CommissionAmount.ShouldBe(100m);
        entry.NetAmount.ShouldBe(900m);
        entry.RuleSource.ShouldBe("Default");
        entries.Transactions.Single().Entries.Count.ShouldBe(3);
        entries.Transactions.Single().Entries.Sum(line => line.Debit).ShouldBe(1000m);
        entries.Transactions.Single().Entries.Sum(line => line.Credit).ShouldBe(1000m);
    }

    [Fact]
    public async Task Accrue_Should_Use_Effective_Agency_Rule_And_Be_Idempotent()
    {
        var rules = new FakeCommissionRuleRepository();
        var entries = new FakeCommissionEntryRepository();
        var orderId = Guid.CreateVersion7();
        var agencyId = Guid.CreateVersion7();
        var now = DateTimeOffset.UtcNow;

        await rules.AddAsync(
            AgencyCommissionRule.Create(
                TestIds.Generator,
                agencyId,
                ProductType.Tour,
                0.2m,
                null,
                null,
                now.AddDays(-1),
                null),
            CancellationToken.None);

        var service = CreateService(rules, entries);

        await service.AccrueAsync(
            new CommissionAccrualRequest(orderId, agencyId, 1000m, "IRR", "Tour", now),
            CancellationToken.None);
        await service.AccrueAsync(
            new CommissionAccrualRequest(orderId, agencyId, 1000m, "IRR", "Tour", now),
            CancellationToken.None);

        entries.Entries.Count.ShouldBe(1);
        entries.Transactions.Count.ShouldBe(1);
        entries.Entries.Single().CommissionAmount.ShouldBe(200m);
        entries.Entries.Single().RuleSource.ShouldBe("Rule");
    }

    [Fact]
    public async Task Accrue_Should_Keep_One_Entry_Per_Currency()
    {
        var entries = new FakeCommissionEntryRepository();
        var service = CreateService(new FakeCommissionRuleRepository(), entries);
        var orderId = Guid.CreateVersion7();
        var agencyId = Guid.CreateVersion7();
        var now = DateTimeOffset.UtcNow;

        await service.AccrueAsync(
            new CommissionAccrualRequest(orderId, agencyId, 1000m, "IRR", "Tour", now),
            CancellationToken.None);
        await service.AccrueAsync(
            new CommissionAccrualRequest(orderId, agencyId, 20m, "USD", "Tour", now),
            CancellationToken.None);

        entries.Entries.Count.ShouldBe(2);
        entries.Transactions.Count.ShouldBe(2);
        entries.Entries.ShouldContain(entry => entry.Currency == "IRR");
        entries.Entries.ShouldContain(entry => entry.Currency == "USD");
    }

    private static CommissionAccrualService CreateService(
        ICommissionRuleRepository rules,
        ICommissionEntryRepository entries)
        => new(
            rules,
            entries,
            Options.Create(new CommissionOptions { DefaultRate = 0.10m }),
            TestIds.Generator);

    private sealed class FakeCommissionRuleRepository : ICommissionRuleRepository
    {
        private readonly List<AgencyCommissionRule> _rules = [];

        public Task AddAsync(AgencyCommissionRule rule, CancellationToken cancellationToken)
        {
            _rules.Add(rule);
            return Task.CompletedTask;
        }

        public Task<AgencyCommissionRule?> FindEffectiveAsync(
            Guid agencyId,
            ProductType productType,
            DateTimeOffset at,
            CancellationToken cancellationToken)
            => Task.FromResult(_rules
                .Where(rule =>
                    rule.AgencyId == agencyId &&
                    rule.ProductType == productType &&
                    rule.IsEffectiveAt(at))
                .OrderByDescending(rule => rule.EffectiveFrom)
                .FirstOrDefault());
    }

    private sealed class FakeCommissionEntryRepository : ICommissionEntryRepository
    {
        public List<CommissionEntry> Entries { get; } = [];

        public List<LedgerTransaction> Transactions { get; } = [];

        public Task AddAsync(
            CommissionEntry entry,
            LedgerTransaction transaction,
            CancellationToken cancellationToken)
        {
            Entries.Add(entry);
            Transactions.Add(transaction);
            return Task.CompletedTask;
        }

        public Task<CommissionEntry?> GetByOrderIdAsync(
            Guid orderId,
            CancellationToken cancellationToken)
            => Task.FromResult(Entries.FirstOrDefault(entry => entry.OrderId == orderId));

        public Task<CommissionEntry?> GetByOrderAndCurrencyAsync(
            Guid orderId,
            string currency,
            CancellationToken cancellationToken)
            => Task.FromResult(Entries.FirstOrDefault(entry =>
                entry.OrderId == orderId &&
                string.Equals(entry.Currency, currency, StringComparison.OrdinalIgnoreCase)));

        public Task SaveChangesAsync(CancellationToken cancellationToken) => Task.CompletedTask;
    }
}
