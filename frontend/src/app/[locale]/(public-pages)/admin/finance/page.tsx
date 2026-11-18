import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { sessionGet } from "@/lib/hani/server-api";
import { formatIsoDate, formatIsoInstant } from "@/lib/hani/calendar";
import { formatMoney } from "@/lib/hani/money";
import type {
  AdminCommission,
  AdminFinance,
  AdminInvoice,
  AdminLedger,
  AdminPayout,
  AdminReconciliation,
  AdminRefund
} from "@/features/home-experience/domain/admin-bookings";
import { AdminPageShell } from "@/features/home-experience/ui/AdminPageShell";
import { PayoutAction } from "@/features/home-experience/ui/PayoutAction";

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
  const [
    result,
    payoutResult,
    refundResult,
    invoiceResult,
    reconciliationResult,
    commissionResult,
    ledgerResult
  ] = await Promise.all([
    sessionGet<AdminFinance>("/internal/v1/admin/finance/summary"),
    sessionGet<AdminPayout[]>("/internal/v1/admin/finance/payouts"),
    sessionGet<AdminRefund[]>("/internal/v1/admin/finance/refunds"),
    sessionGet<AdminInvoice[]>("/internal/v1/admin/finance/invoices"),
    sessionGet<AdminReconciliation[]>(
      "/internal/v1/admin/finance/reconciliations"
    ),
    sessionGet<AdminCommission[]>("/internal/v1/admin/finance/commissions"),
    sessionGet<AdminLedger[]>("/internal/v1/admin/finance/ledger")
  ]);

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
  const payoutItems = payoutResult.data ?? [];
  const refundItems = refundResult.data ?? [];
  const invoiceItems = invoiceResult.data ?? [];
  const reconciliationItems = reconciliationResult.data ?? [];
  const commissionItems = commissionResult.data ?? [];
  const ledgerItems = ledgerResult.data ?? [];

  const extraTables = [
    {
      title: t("refundList"),
      headers: [
        t("order"),
        t("amount"),
        t("status"),
        t("reason"),
        t("requestedAt")
      ],
      rows: refundItems.map((item) => ({
        key: item.id,
        cells: [
          item.orderId,
          formatMoney(item.amount, item.currency, locale),
          item.status,
          item.reason,
          formatIsoInstant(item.requestedAt, locale, { dateStyle: "medium" })
        ]
      }))
    },
    {
      title: t("invoices"),
      headers: [
        t("invoiceNumber"),
        t("order"),
        t("buyer"),
        t("total"),
        t("status"),
        t("issuedAt")
      ],
      rows: invoiceItems.map((item) => ({
        key: item.id,
        cells: [
          item.invoiceNumber,
          item.orderId,
          item.buyerEmail,
          formatMoney(item.total, item.currency, locale),
          item.status,
          formatIsoInstant(item.issuedAt, locale, { dateStyle: "medium" })
        ]
      }))
    },
    {
      title: t("reconciliations"),
      headers: [
        t("provider"),
        t("period"),
        t("expected"),
        t("actual"),
        t("difference"),
        t("status")
      ],
      rows: reconciliationItems.map((item) => ({
        key: item.id,
        cells: [
          item.provider,
          `${formatIsoDate(item.periodStart, locale, "short")} – ${formatIsoDate(item.periodEnd, locale, "short")}`,
          formatMoney(item.expectedAmount, item.currency, locale),
          formatMoney(item.actualAmount, item.currency, locale),
          formatMoney(item.difference, item.currency, locale),
          item.status
        ]
      }))
    },
    {
      title: t("commissionsList"),
      headers: [
        t("order"),
        t("agency"),
        t("gross"),
        t("rate"),
        t("commission"),
        t("net"),
        t("status")
      ],
      rows: commissionItems.map((item) => ({
        key: item.id,
        cells: [
          item.orderId,
          item.agencyId,
          formatMoney(item.grossAmount, item.currency, locale),
          `${item.rate}%`,
          formatMoney(item.commissionAmount, item.currency, locale),
          formatMoney(item.netAmount, item.currency, locale),
          item.status
        ]
      }))
    },
    {
      title: t("ledger"),
      headers: [
        t("reference"),
        t("account"),
        t("debit"),
        t("credit"),
        t("description")
      ],
      rows: ledgerItems.flatMap((item) =>
        item.entries.map((entry) => ({
          key: `${item.id}-${entry.accountCode}-${entry.debit}`,
          cells: [
            `${item.referenceType} · ${item.referenceId}`,
            entry.accountCode,
            formatMoney(entry.debit, item.currency, locale),
            formatMoney(entry.credit, item.currency, locale),
            entry.description
          ]
        }))
      )
    }
  ];

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

      {payoutItems.length > 0 && (
        <div className="card border-0 shadow-sm mb-4">
          <div className="card-header">
            <h2 className="h5 mb-0">{t("payoutList")}</h2>
          </div>
          <div className="card-body p-0 admin-table-wrap">
            <table className="table admin-data-table content-data-table align-middle mb-0">
              <thead className="thead-light">
                <tr>
                  <th>{t("agency")}</th>
                  <th>{t("period")}</th>
                  <th>{t("amount")}</th>
                  <th>{t("status")}</th>
                  <th className="text-end">{t("actions")}</th>
                </tr>
              </thead>
              <tbody>
                {payoutItems.map((payout) => (
                  <tr key={payout.id}>
                    <td dir="ltr">{payout.agencyId}</td>
                    <td className="text-nowrap">
                      {formatIsoDate(payout.periodStart, locale, "short")} –{" "}
                      {formatIsoDate(payout.periodEnd, locale, "short")}
                    </td>
                    <td>{formatMoney(payout.amount, payout.currency, locale)}</td>
                    <td>{payout.status}</td>
                    <td className="text-end">
                      {payout.status === "Pending" ? (
                        <PayoutAction payoutId={payout.id} />
                      ) : (
                        "—"
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {extraTables.map((table) => (
        <div className="card border-0 shadow-sm mb-4" key={table.title}>
          <div className="card-header">
            <h2 className="h5 mb-0">{table.title}</h2>
          </div>
          <div className="card-body p-0 admin-table-wrap">
            <table className="table admin-data-table content-data-table align-middle mb-0">
              <thead className="thead-light">
                <tr>
                  {table.headers.map((header) => (
                    <th key={header}>{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {table.rows.map((row) => (
                  <tr key={row.key}>
                    {row.cells.map((cell, index) => (
                      <td key={index}>{cell}</td>
                    ))}
                  </tr>
                ))}
                {table.rows.length === 0 && (
                  <tr>
                    <td
                      colSpan={table.headers.length}
                      className="text-center text-gray-6 py-4"
                    >
                      {t("empty")}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      ))}

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
