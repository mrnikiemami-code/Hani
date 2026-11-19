import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { sessionGet } from "@/lib/hani/server-api";
import { formatIsoInstant } from "@/lib/hani/calendar";
import type { SupportReport } from "@/features/home-experience/domain/admin-support";
import { AdminPageShell } from "@/features/home-experience/ui/AdminPageShell";

const PERIODS = [7, 30, 90, 365] as const;

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "adminSupport" });
  return { title: t("reports"), robots: { index: false, follow: false } };
}

export default async function AdminSupportReportPage({
  params,
  searchParams
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ days?: string }>;
}) {
  const { locale } = await params;
  const sp = await searchParams;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "adminSupport" });
  const tHome = await getTranslations({ locale, namespace: "adminHome" });
  const days = PERIODS.includes(
    Number.parseInt(sp.days ?? "", 10) as (typeof PERIODS)[number]
  )
    ? Number.parseInt(sp.days!, 10)
    : 30;
  const result = await sessionGet<SupportReport>(
    `/internal/v1/admin/support/report?days=${days}`
  );

  if (result.status === 401 || result.status === 403) {
    return (
      <AdminPageShell
        locale={locale}
        title={tHome("accessTitle")}
        subtitle={tHome("accessHint")}
        active={tHome("accessTitle")}
        activeSection="support"
        activeChild="reports"
      >
        <div className="card border-0 shadow-sm">
          <div className="card-body p-4 text-gray-6">{tHome("accessHint")}</div>
        </div>
      </AdminPageShell>
    );
  }

  const data = result.data ?? {
    periodDays: days,
    from: new Date().toISOString(),
    to: new Date().toISOString(),
    totalTickets: 0,
    openTickets: 0,
    resolvedTickets: 0,
    breachedTickets: 0,
    atRiskTickets: 0,
    averageFirstResponseHours: 0,
    averageResolutionHours: 0,
    slaBreakdown: [],
    byCategory: [],
    byAssignee: []
  };

  return (
    <AdminPageShell
      locale={locale}
      title={t("reports")}
      subtitle={t("reportsHint")}
      active={t("reports")}
      activeSection="support"
      activeChild="reports"
    >
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body d-flex justify-content-between align-items-center flex-wrap gap-2">
          <div>
            <span className="fs-13 text-gray-6 d-block">{t("period")}</span>
            <strong>
              {formatIsoInstant(data.from, locale, { dateStyle: "medium" })} —{" "}
              {formatIsoInstant(data.to, locale, { dateStyle: "medium" })}
            </strong>
          </div>
          <div className="d-flex gap-2">
            {PERIODS.map((period) => (
              <Link
                key={period}
                href={`/admin/support/reports?days=${period}`}
                className={`btn btn-sm ${
                  days === period ? "btn-primary" : "btn-light"
                }`}
              >
                {t("days", { count: period })}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="row g-3 mb-4">
        {[
          [t("totalTickets"), data.totalTickets],
          [t("openTickets"), data.openTickets],
          [t("resolvedTickets"), data.resolvedTickets],
          [t("breachedTickets"), data.breachedTickets],
          [t("atRiskTickets"), data.atRiskTickets],
          [t("avgFirstResponse"), `${data.averageFirstResponseHours}h`],
          [t("avgResolution"), `${data.averageResolutionHours}h`]
        ].map(([label, value]) => (
          <div className="col-6 col-lg-3" key={String(label)}>
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body">
                <span className="fs-13 text-gray-6 d-block">{label}</span>
                <strong className="fs-24">{value}</strong>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="row g-4">
        <div className="col-lg-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-header">
              <h2 className="h5 mb-0">{t("slaBreakdown")}</h2>
            </div>
            <div className="card-body p-0 admin-table-wrap">
              <table className="table admin-data-table content-data-table align-middle mb-0">
                <thead className="thead-light">
                  <tr>
                    <th>{t("sla")}</th>
                    <th>{t("count")}</th>
                  </tr>
                </thead>
                <tbody>
                  {data.slaBreakdown.map((row) => (
                    <tr key={row.state}>
                      <td>{t(`sla${row.state}`)}</td>
                      <td>{row.count}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-header">
              <h2 className="h5 mb-0">{t("byCategory")}</h2>
            </div>
            <div className="card-body p-0 admin-table-wrap">
              <table className="table admin-data-table content-data-table align-middle mb-0">
                <thead className="thead-light">
                  <tr>
                    <th>{t("category")}</th>
                    <th>{t("count")}</th>
                  </tr>
                </thead>
                <tbody>
                  {data.byCategory.map((row) => (
                    <tr key={row.category}>
                      <td>{row.category}</td>
                      <td>{row.count}</td>
                    </tr>
                  ))}
                  {data.byCategory.length === 0 && (
                    <tr>
                      <td colSpan={2} className="text-center text-gray-6 py-4">
                        {t("empty")}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-header">
              <h2 className="h5 mb-0">{t("byAssignee")}</h2>
            </div>
            <div className="card-body p-0 admin-table-wrap">
              <table className="table admin-data-table content-data-table align-middle mb-0">
                <thead className="thead-light">
                  <tr>
                    <th>{t("assignedTo")}</th>
                    <th>{t("openTickets")}</th>
                    <th>{t("totalTickets")}</th>
                  </tr>
                </thead>
                <tbody>
                  {data.byAssignee.map((row) => (
                    <tr key={row.assignedTo ?? "unassigned"}>
                      <td>{row.assignee || t("unassigned")}</td>
                      <td>{row.openCount}</td>
                      <td>{row.totalCount}</td>
                    </tr>
                  ))}
                  {data.byAssignee.length === 0 && (
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
    </AdminPageShell>
  );
}
