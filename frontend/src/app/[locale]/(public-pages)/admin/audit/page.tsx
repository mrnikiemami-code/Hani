import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { sessionGet } from "@/lib/hani/server-api";
import { formatIsoInstant } from "@/lib/hani/calendar";
import type { AdminAuditPage } from "@/features/home-experience/domain/admin-bookings";
import { AdminPageShell } from "@/features/home-experience/ui/AdminPageShell";

const PAGE_SIZE = 25;

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "adminAudit" });
  return { title: t("title"), robots: { index: false, follow: false } };
}

export default async function AdminAuditPage({
  params,
  searchParams
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ page?: string; q?: string; action?: string }>;
}) {
  const { locale } = await params;
  const sp = await searchParams;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "adminAudit" });
  const tHome = await getTranslations({ locale, namespace: "adminHome" });
  const page = Math.max(1, Number.parseInt(sp.page ?? "1", 10) || 1);
  const q = typeof sp.q === "string" ? sp.q.trim() : "";
  const action = typeof sp.action === "string" ? sp.action.trim() : "";
  const query = new URLSearchParams({
    page: String(page),
    pageSize: String(PAGE_SIZE)
  });
  if (q) query.set("q", q);
  if (action) query.set("action", action);

  const result = await sessionGet<AdminAuditPage>(
    `/internal/v1/admin/audit?${query}`
  );

  if (result.status === 401 || result.status === 403) {
    return (
      <AdminPageShell
        locale={locale}
        title={tHome("accessTitle")}
        subtitle={tHome("accessHint")}
        active={t("title")}
        activeSection="settings"
        activeChild="audit"
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
    items: [],
    total: 0,
    page,
    pageSize: PAGE_SIZE
  };
  const pageCount = Math.max(1, Math.ceil(data.total / PAGE_SIZE));
  const pageQuery = (next: number) => {
    const nextQuery = new URLSearchParams({ page: String(next) });
    if (q) nextQuery.set("q", q);
    if (action) nextQuery.set("action", action);
    return `/admin/audit?${nextQuery}`;
  };

  return (
    <AdminPageShell
      locale={locale}
      title={t("title")}
      subtitle={t("subtitle")}
      active={t("title")}
      activeSection="settings"
      activeChild="audit"
    >
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body">
          <form method="get" className="row g-2 align-items-end">
            <div className="col-md-5">
              <label className="form-label" htmlFor="audit-q">
                {t("search")}
              </label>
              <input
                id="audit-q"
                name="q"
                className="form-control"
                defaultValue={q}
                placeholder={t("searchPlaceholder")}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label" htmlFor="audit-action">
                {t("action")}
              </label>
              <input
                id="audit-action"
                name="action"
                className="form-control"
                dir="ltr"
                defaultValue={action}
                placeholder="finance.refund.approved"
              />
            </div>
            <div className="col-md-3 d-flex gap-2">
              <button type="submit" className="btn btn-primary w-100">
                {t("apply")}
              </button>
              <Link href="/admin/audit" className="btn btn-light w-100">
                {t("reset")}
              </Link>
            </div>
          </form>
        </div>
      </div>

      <div className="card border-0 shadow-sm">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h2 className="h5 mb-0">{t("events")}</h2>
          <span className="fs-13 text-gray-6">
            {t("total", { count: data.total })}
          </span>
        </div>
        <div className="card-body p-0 admin-table-wrap">
          <table className="table admin-data-table content-data-table align-middle mb-0">
            <thead className="thead-light">
              <tr>
                <th>{t("occurredAt")}</th>
                <th>{t("actor")}</th>
                <th>{t("action")}</th>
                <th>{t("entity")}</th>
                <th>{t("reason")}</th>
                <th>{t("correlation")}</th>
              </tr>
            </thead>
            <tbody>
              {data.items.map((event) => (
                <tr key={event.id}>
                  <td className="text-nowrap">
                    {formatIsoInstant(event.occurredAt, locale, {
                      dateStyle: "medium",
                      timeStyle: "short"
                    })}
                  </td>
                  <td dir="ltr">
                    {event.actorMobile || event.actorUserId || "—"}
                    <span className="d-block fs-12 text-gray-6">
                      {event.actorRole}
                    </span>
                  </td>
                  <td>
                    <code>{event.action}</code>
                  </td>
                  <td>
                    <span className="d-block">{event.entityType}</span>
                    <span className="d-block fs-12 text-gray-6" dir="ltr">
                      {event.entityId}
                    </span>
                  </td>
                  <td className="text-truncate" title={event.reason}>
                    {event.reason}
                  </td>
                  <td className="text-truncate" title={event.correlationId} dir="ltr">
                    {event.correlationId}
                  </td>
                </tr>
              ))}
              {data.items.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center text-gray-6 py-4">
                    {t("empty")}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="card-footer bg-white d-flex justify-content-between align-items-center">
          <span className="fs-13 text-gray-6">
            {t("page", { page: data.page, pages: pageCount })}
          </span>
          <div className="d-flex gap-2">
            {page > 1 && (
              <Link href={pageQuery(page - 1)} className="btn btn-light btn-sm">
                {t("previous")}
              </Link>
            )}
            {page < pageCount && (
              <Link href={pageQuery(page + 1)} className="btn btn-light btn-sm">
                {t("next")}
              </Link>
            )}
          </div>
        </div>
      </div>
    </AdminPageShell>
  );
}
