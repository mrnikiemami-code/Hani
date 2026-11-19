using Hani.Modules.Admin.Application;
using Hani.Modules.Identity.Application.Security;
using Shouldly;

namespace Hani.UnitTests.Admin;

public sealed class FinanceAdministrationTests
{
    [Fact]
    public void PermissionCatalog_Should_Contain_Export_Permission_Once()
    {
        AdminPermissions.All.ShouldContain(AdminPermissions.ReportExport);
        AdminPermissions.All
            .Count(item => item == AdminPermissions.ReportExport)
            .ShouldBe(1);
        AdminPermissions.All.Distinct(StringComparer.Ordinal).Count()
            .ShouldBe(AdminPermissions.All.Count);
    }

    [Fact]
    public void Finance_Export_Datasets_Should_Be_Unique_And_Supported()
    {
        AdminFinanceExportDatasets.All.Distinct(StringComparer.Ordinal).Count()
            .ShouldBe(AdminFinanceExportDatasets.All.Count);

        foreach (var expected in new[]
                 {
                     AdminFinanceExportDatasets.Payments,
                     AdminFinanceExportDatasets.Refunds,
                     AdminFinanceExportDatasets.Invoices,
                     AdminFinanceExportDatasets.Reconciliations,
                     AdminFinanceExportDatasets.Commissions,
                     AdminFinanceExportDatasets.Payouts,
                     AdminFinanceExportDatasets.Ledger,
                     AdminFinanceExportDatasets.Tax
                 })
        {
            AdminFinanceExportDatasets.All.ShouldContain(expected);
        }
    }
}
