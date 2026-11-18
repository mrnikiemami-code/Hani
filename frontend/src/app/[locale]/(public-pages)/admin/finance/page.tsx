import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { sessionGet } from "@/lib/hani/server-api";
import { formatMoney } from "@/lib/hani/money";
import type { AdminFinance } from "@/features/home-experience/domain/admin-bookings";
import { AdminPageShell } from "@/features/home-experience/ui/AdminPageShell";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "adminFinance" });
  return { title: t("title"), robots: { index: false, follow: false } };
}

export default async function AdminFinancePage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "adminFinance" });
  const tHome = await getTranslations({ locale, namespace: "adminHome" });
  const result = await sessionGet<AdminFinance>(
    "/internal/v1/admin/finance/summary"
  );

  if (result.status === 401 || result.status === 403) {
    return (
      <AdminPageShell
        locale={locale}
        title={tHome("accessTitle")}
        subtitle={tHome("accessHint")}
        active={tHome("accessTitle")}
        activeSection="finance"
      >
        <div className="card border-0 shadow-sm">
          <div className="card-body p-4 text-gray-6">
            {tHome("accessHint")}
          </div>
        </div>
      </AdminPageShell>
    );
  }

  const data = result.data ?? {
    payments: [],
    refundCount: 0,
    commissions: [],
    payouts: []
  };

  const tables = [
    {
      title: t("payments"),
      rows: data.payments.map((item) => ({
        key: `${item.status}-${item.currency}`,
        status: item.status,
        currency: item.currency,
        count: item.count,
        amount: item.amount
      }))
    },
    {
      title: t("commissions"),
      rows: data.commissions.map((item) => ({
        key: item.currency,
        status: "Accrued",
        currency: item.currency,
        count: item.count,
        amount: item.amount
      }))
    },
    {
      title: t("payouts"),
      rows: data.payouts.map((item) => ({
        key: `${item.status}-${item.currency}`,
        status: item.status,
        currency: item.currency,
        count: item.count,
        amount: item.amount
      }))
    }
  ];

  return (
    <AdminPageShell
      locale={locale}
      title={t("title")}
      subtitle={t("subtitle")}
      active={t("title")}
      activeSection="finance"
    >
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body d-flex justify-content-between">
          <span className="fs-14 text-gray-6">{t("refunds")}</span>
          <strong>{t("refundCount", { count: data.refundCount })}</strong>
        </div>
      </div>

      {tables.map((table) => (
        <div className="card border-0 shadow-sm mb-4" key={table.title}>
          <div className="card-header">
            <h2 className="h5 mb-0">{table.title}</h2>
          </div>
          <div className="card-body p-0 admin-table-wrap">
            <table className="table admin-data-table content-data-table align-middle mb-0">
              <thead className="thead-light">
                <tr>
                  <th>{t("status")}</th>
                  <th>{t("currency")}</th>
                  <th>{t("count")}</th>
                  <th>{t("amount")}</th>
                </tr>
              </thead>
              <tbody>
                {table.rows.map((row) => (
                  <tr key={row.key}>
                    <td>{row.status}</td>
                    <td>{row.currency}</td>
                    <td>{row.count}</td>
                    <td>{formatMoney(row.amount, row.currency, locale)}</td>
                  </tr>
                ))}
                {table.rows.length === 0 && (
                  <tr>
                    <td colSpan={4} className="text-center text-gray-6 py-4">
                      {t("empty")}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </AdminPageShell>
  );
}
