using Hani.Contracts.Settlement;
using Hani.Modules.Settlement.Application.Abstractions;
using Hani.Modules.Settlement.Application.Commissions;
using Hani.Modules.Settlement.Application.Payouts;
using Hani.Modules.Settlement.Infrastructure.Repositories;
using Microsoft.Extensions.DependencyInjection;

namespace Hani.Modules.Settlement.Infrastructure;

/// <summary>
/// Registers settlement repositories and commission accrual service.
/// </summary>
public static class DependencyInjection
{
    /// <summary>
    /// Adds settlement services.
    /// </summary>
    public static IServiceCollection AddSettlementInfrastructure(this IServiceCollection services)
    {
        services.AddScoped<ICommissionRuleRepository, CommissionRuleRepository>();
        services.AddScoped<IPayoutRepository, PayoutRepository>();
        services.AddScoped<ICommissionEntryRepository, CommissionEntryRepository>();
        services.AddScoped<ILedgerTransactionRepository, LedgerTransactionRepository>();
        services.AddScoped<ICommissionAccrualService, CommissionAccrualService>();
        return services;
    }
}
