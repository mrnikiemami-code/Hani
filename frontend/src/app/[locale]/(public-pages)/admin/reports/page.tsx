import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { sessionGet } from "@/lib/hani/server-api";
import { formatIsoDate, formatIsoInstant } from "@/lib/hani/calendar";
import { formatMoney } from "@/lib/hani/money";
import type { AdminReportOverview } from "@/features/home-experience/domain/admin-report";
import { AdminPageShell } from "@/features/home-experience/ui/AdminPageShell";

const PERIODS = [
  { days: 7, key: "days7" },
  { days: 30, key: "days30" },
  { days: 90, key: "days90" },
  { days: 365, key: "days365" }
] as const;

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "adminReports" });
  return { title: t("title"), robots: { index: false, follow: false } };
}

export default async function AdminReportsPage({
  params,
  searchParams
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ days?: string }>;
}) {
  const { locale } = await params;
  const sp = await searchParams;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "adminReports" });
  const tHome = await getTranslations({ locale, namespace: "adminHome" });
  const days = [7, 30, 90, 365].includes(Number.parseInt(sp.days ?? "", 10))
    ? Number.parseInt(sp.days!, 10)
    : 30;
  const result = await sessionGet<AdminReportOverview>(
    `/internal/v1/admin/reports/overview?days=${days}`
  );

  if (result.status === 401 || result.status === 403) {
    return (
      <AdminPageShell
        locale={locale}
        title={tHome("accessTitle")}
        subtitle={tHome("accessHint")}
        active={t("title")}
        activeSection="reports"
      >
        <div className="card border-0 shadow-sm">
          <div className="card-body p-4 text-gray-6">
            {tHome("accessHint")}
          </div>
        </div>
      </AdminPageShell>
    );
  }

  const data = result.data;
  if (!data) {
    return (
      <AdminPageShell
        locale={locale}
        title={t("title")}
        subtitle={t("subtitle")}
        active={t("title")}
        activeSection="reports"
      >
        <div className="card border-0 shadow-sm">
          <div className="card-body p-4 text-gray-6">{t("empty")}</div>
        </div>
      </AdminPageShell>
    );
  }

  const kpis = [
    { label: t("totalOrders"), value: data.totalOrders },
    { label: t("paidOrders"), value: data.paidOrders },
    { label: t("pendingOrders"), value: data.pendingPaymentOrders },
    { label: t("cancelledOrders"), value: data.cancelledOrders },
    { label: t("reservationRequests"), value: data.reservationRequests },
    { label: t("hotelInquiries"), value: data.hotelInquiries },
    { label: t("usersTotal"), value: data.usersTotal },
    { label: t("usersNew"), value: data.usersNew }
  ];

  return (
    <AdminPageShell
      locale={locale}
      title={t("title")}
      subtitle={t("subtitle")}
      active={t("title")}
      activeSection="reports"
    >
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body d-flex justify-content-between align-items-center flex-wrap gap-2">
          <div>
            <span className="fs-13 text-gray-6 d-block">{t("period")}</span>
            <strong>
              {formatIsoInstant(data.from, locale, { dateStyle: "medium" })} –{" "}
              {formatIsoInstant(data.to, locale, { dateStyle: "medium" })}
            </strong>
          </div>
          <div className="d-flex gap-2">
            {PERIODS.map((period) => (
              <Link
                key={period.days}
                href={`/admin/reports?days=${period.days}`}
                className={`btn btn-sm ${
                  days === period.days ? "btn-primary" : "btn-light"
                }`}
              >
                {t(period.key)}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="row g-3 mb-4">
        {kpis.map((kpi) => (
          <div className="col-6 col-lg-3" key={kpi.label}>
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body">
                <span className="fs-13 text-gray-6 d-block">{kpi.label}</span>
                <strong className="fs-24">{kpi.value}</strong>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="row g-4 mb-4">
        <div className="col-lg-6">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-header">
              <h2 className="h5 mb-0">{t("revenueTrend")}</h2>
            </div>
            <div className="card-body p-0 admin-table-wrap">
              <table className="table admin-data-table content-data-table report-table align-middle mb-0">
                <thead className="thead-light">
                  <tr>
                    <th>{t("date")}</th>
                    <th>{t("currency")}</th>
                    <th>{t("count")}</th>
                    <th>{t("amount")}</th>
                  </tr>
                </thead>
                <tbody>
                  {data.revenueTrend.slice(-20).map((row) => (
                    <tr key={`${row.date}-${row.currency}`}>
                      <td>{formatIsoDate(row.date, locale, "short")}</td>
                      <td>{row.currency}</td>
                      <td>{row.count}</td>
                      <td>{formatMoney(row.amount, row.currency, locale)}</td>
                    </tr>
                  ))}
                  {data.revenueTrend.length === 0 && (
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
        </div>
        <div className="col-lg-6">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-header">
              <h2 className="h5 mb-0">{t("orderTrend")}</h2>
            </div>
            <div className="card-body p-0 admin-table-wrap">
              <table className="table admin-data-table content-data-table report-table align-middle mb-0">
                <thead className="thead-light">
                  <tr>
                    <th>{t("date")}</th>
                    <th>{t("status")}</th>
                    <th>{t("count")}</th>
                  </tr>
                </thead>
                <tbody>
                  {data.orderTrend.slice(-20).map((row) => (
                    <tr key={`${row.date}-${row.status}`}>
                      <td>{formatIsoDate(row.date, locale, "short")}</td>
                      <td>{row.status}</td>
                      <td>{row.count}</td>
                    </tr>
                  ))}
                  {data.orderTrend.length === 0 && (
                    <tr>
                      <td colSpan={3} className="text-center text-gray-6 py-4">
                        {t("empty")}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-4 mb-4">
        <div className="col-lg-6">
          <ReportMoneyTable
            title={t("revenue")}
            locale={locale}
            empty={t("empty")}
            currencyLabel={t("currency")}
            countLabel={t("count")}
            amountLabel={t("amount")}
            rows={data.revenue}
          />
        </div>
        <div className="col-lg-6">
          <ReportMoneyTable
            title={t("refunds")}
            locale={locale}
            empty={t("empty")}
            currencyLabel={t("currency")}
            countLabel={t("count")}
            amountLabel={t("amount")}
            rows={data.refunds}
          />
        </div>
        <div className="col-lg-6">
          <ReportMoneyTable
            title={t("commissions")}
            locale={locale}
            empty={t("empty")}
            currencyLabel={t("currency")}
            countLabel={t("count")}
            amountLabel={t("amount")}
            rows={data.commissions}
          />
        </div>
        <div className="col-lg-6">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-header">
              <h2 className="h5 mb-0">{t("payouts")}</h2>
            </div>
            <div className="card-body p-0 admin-table-wrap">
              <table className="table admin-data-table content-data-table report-table align-middle mb-0">
                <thead className="thead-light">
                  <tr>
                    <th>{t("status")}</th>
                    <th>{t("currency")}</th>
                    <th className="d-none d-md-table-cell">{t("count")}</th>
                    <th>{t("amount")}</th>
                  </tr>
                </thead>
                <tbody>
                  {data.payouts.map((row) => (
                    <tr key={`${row.status}-${row.currency}`}>
                      <td>{row.status}</td>
                      <td>{row.currency}</td>
                      <td className="d-none d-md-table-cell">{row.count}</td>
                      <td>{formatMoney(row.amount, row.currency, locale)}</td>
                    </tr>
                  ))}
                  {data.payouts.length === 0 && (
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
        </div>
      </div>

      <div className="row g-4 mb-4">
        <div className="col-lg-7">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-header">
              <h2 className="h5 mb-0">{t("topAgencies")}</h2>
            </div>
            <div className="card-body p-0 admin-table-wrap">
              <table className="table admin-data-table content-data-table report-table align-middle mb-0">
                <thead className="thead-light">
                  <tr>
                    <th>{t("agency")}</th>
                    <th>{t("currency")}</th>
                    <th className="d-none d-md-table-cell">{t("orders")}</th>
                    <th>{t("amount")}</th>
                  </tr>
                </thead>
                <tbody>
                  {data.topAgencies.map((row) => (
                    <tr key={`${row.agencyId}-${row.currency}`}>
                      <td className="text-break">{row.agencyName}</td>
                      <td>{row.currency}</td>
                      <td className="d-none d-md-table-cell">{row.orderCount}</td>
                      <td>{formatMoney(row.amount, row.currency, locale)}</td>
                    </tr>
                  ))}
                  {data.topAgencies.length === 0 && (
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
        </div>
        <div className="col-lg-5">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-header">
              <h2 className="h5 mb-0">{t("operations")}</h2>
            </div>
            <div className="card-body">
              <ReportList
                title={t("hotels")}
                rows={data.hotels.map((row) => ({
                  key: row.status,
                  label: row.status,
                  value: row.count
                }))}
              />
              <hr />
              <ReportList
                title={t("campaigns")}
                rows={data.campaigns.map((row) => ({
                  key: row.status,
                  label: row.status,
                  value: row.count
                }))}
              />
              <hr />
              <div className="d-flex justify-content-between fs-14">
                <span className="text-gray-6">{t("campaignRegistrations")}</span>
                <strong>{data.campaignRegistrations}</strong>
              </div>
              <div className="d-flex justify-content-between fs-14 mt-2">
                <span className="text-gray-6">{t("pendingInquiries")}</span>
                <strong>{data.pendingHotelInquiries}</strong>
              </div>
              <div className="d-flex justify-content-between fs-14 mt-2">
                <span className="text-gray-6">{t("openSupportTickets")}</span>
                <strong>{data.openSupportTickets}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card border-0 shadow-sm">
        <div className="card-header">
          <h2 className="h5 mb-0">{t("ordersByStatus")}</h2>
        </div>
        <div className="card-body p-0 admin-table-wrap">
          <table className="table admin-data-table content-data-table report-table align-middle mb-0">
            <thead className="thead-light">
              <tr>
                <th>{t("status")}</th>
                <th>{t("currency")}</th>
                <th className="d-none d-md-table-cell">{t("count")}</th>
                <th>{t("amount")}</th>
              </tr>
            </thead>
            <tbody>
              {data.ordersByStatus.map((row) => (
                <tr key={`${row.status}-${row.currency}`}>
                  <td>{row.status}</td>
                  <td>{row.currency}</td>
                  <td className="d-none d-md-table-cell">{row.count}</td>
                  <td>{formatMoney(row.amount, row.currency, locale)}</td>
                </tr>
              ))}
              {data.ordersByStatus.length === 0 && (
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
    </AdminPageShell>
  );
}

function ReportMoneyTable({
  title,
  locale,
  empty,
  currencyLabel,
  countLabel,
  amountLabel,
  rows
}: {
  title: string;
  locale: string;
  empty: string;
  currencyLabel: string;
  countLabel: string;
  amountLabel: string;
  rows: Array<{ currency: string; count: number; amount: number }>;
}) {
  return (
    <div className="card border-0 shadow-sm h-100">
      <div className="card-header">
        <h2 className="h5 mb-0">{title}</h2>
      </div>
      <div className="card-body p-0 admin-table-wrap">
        <table className="table admin-data-table content-data-table report-table align-middle mb-0">
          <thead className="thead-light">
            <tr>
              <th>{currencyLabel}</th>
              <th className="d-none d-md-table-cell">{countLabel}</th>
              <th>{amountLabel}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.currency}>
                <td>{row.currency}</td>
                <td className="d-none d-md-table-cell">{row.count}</td>
                <td>{formatMoney(row.amount, row.currency, locale)}</td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={3} className="text-center text-gray-6 py-4">
                  {empty}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ReportList({
  title,
  rows
}: {
  title: string;
  rows: Array<{ key: string; label: string; value: number }>;
}) {
  return (
    <div>
      <h3 className="h6 mb-2">{title}</h3>
      {rows.map((row) => (
        <div className="d-flex justify-content-between fs-14 mb-1" key={row.key}>
          <span className="text-gray-6">{row.label}</span>
          <strong>{row.value}</strong>
        </div>
      ))}
      {rows.length === 0 && <span className="fs-13 text-gray-6">—</span>}
    </div>
  );
}
