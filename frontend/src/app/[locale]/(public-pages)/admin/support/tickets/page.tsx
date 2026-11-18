import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { sessionGet } from "@/lib/hani/server-api";
import { formatIsoInstant } from "@/lib/hani/calendar";
import type { SupportTicketPage } from "@/features/home-experience/domain/admin-support";
import { AdminPageShell } from "@/features/home-experience/ui/AdminPageShell";

const PAGE_SIZE = 20;

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "adminSupport" });
  return { title: t("title"), robots: { index: false, follow: false } };
}

export default async function AdminSupportTicketsPage({
  params,
  searchParams
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{
    page?: string;
    q?: string;
    status?: string;
    priority?: string;
  }>;
}) {
  const { locale } = await params;
  const sp = await searchParams;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "adminSupport" });
  const tHome = await getTranslations({ locale, namespace: "adminHome" });
  const page = Math.max(1, Number.parseInt(sp.page ?? "1", 10) || 1);
  const q = typeof sp.q === "string" ? sp.q.trim() : "";
  const status = [
    "Open",
    "InProgress",
    "WaitingCustomer",
    "Resolved",
    "Closed"
  ].includes(sp.status ?? "")
    ? sp.status!
    : "";
  const priority = ["Low", "Normal", "High", "Urgent"].includes(
    sp.priority ?? ""
  )
    ? sp.priority!
    : "";
  const query = new URLSearchParams({
    page: String(page),
    pageSize: String(PAGE_SIZE)
  });
  if (q) query.set("q", q);
  if (status) query.set("status", status);
  if (priority) query.set("priority", priority);

  const result = await sessionGet<SupportTicketPage>(
    `/internal/v1/admin/support/tickets?${query}`
  );

  if (result.status === 401 || result.status === 403) {
    return (
      <AdminPageShell
        locale={locale}
        title={tHome("accessTitle")}
        subtitle={tHome("accessHint")}
        active={t("title")}
        activeSection="support"
        activeChild="tickets"
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
    page,
    pageSize: PAGE_SIZE,
    total: 0
  };
  const pageCount = Math.max(1, Math.ceil(data.total / PAGE_SIZE));
  const pageQuery = (next: number) => {
    const nextQuery = new URLSearchParams({ page: String(next) });
    if (q) nextQuery.set("q", q);
    if (status) nextQuery.set("status", status);
    if (priority) nextQuery.set("priority", priority);
    return `/admin/support/tickets?${nextQuery}`;
  };

  return (
    <AdminPageShell
      locale={locale}
      title={t("title")}
      subtitle={t("subtitle")}
      active={t("title")}
      activeSection="support"
      activeChild="tickets"
    >
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
            <form method="get" className="row g-2 align-items-end flex-grow-1">
              <div className="col-md-4">
                <label className="form-label" htmlFor="support-q">
                  {t("search")}
                </label>
                <input
                  id="support-q"
                  name="q"
                  className="form-control"
                  defaultValue={q}
                  placeholder={t("searchPlaceholder")}
                />
              </div>
              <div className="col-md-2">
                <label className="form-label" htmlFor="support-status">
                  {t("status")}
                </label>
                <select
                  id="support-status"
                  name="status"
                  className="form-select"
                  defaultValue={status}
                >
                  <option value="">{t("allStatuses")}</option>
                  <option value="Open">{t("statusOpen")}</option>
                  <option value="InProgress">{t("statusInProgress")}</option>
                  <option value="WaitingCustomer">
                    {t("statusWaitingCustomer")}
                  </option>
                  <option value="Resolved">{t("statusResolved")}</option>
                  <option value="Closed">{t("statusClosed")}</option>
                </select>
              </div>
              <div className="col-md-2">
                <label className="form-label" htmlFor="support-priority">
                  {t("priority")}
                </label>
                <select
                  id="support-priority"
                  name="priority"
                  className="form-select"
                  defaultValue={priority}
                >
                  <option value="">{t("allPriorities")}</option>
                  <option value="Low">{t("priorityLow")}</option>
                  <option value="Normal">{t("priorityNormal")}</option>
                  <option value="High">{t("priorityHigh")}</option>
                  <option value="Urgent">{t("priorityUrgent")}</option>
                </select>
              </div>
              <div className="col-md-4 d-flex gap-2">
                <button type="submit" className="btn btn-primary w-100">
                  {t("apply")}
                </button>
                <Link href="/admin/support/tickets" className="btn btn-light w-100">
                  {t("reset")}
                </Link>
              </div>
            </form>
            <Link href="/admin/support/tickets/new" className="btn btn-primary">
              {t("create")}
            </Link>
          </div>
        </div>
      </div>

      <div className="card border-0 shadow-sm">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h2 className="h5 mb-0">{t("tickets")}</h2>
          <span className="fs-13 text-gray-6">
            {t("total", { count: data.total })}
          </span>
        </div>
        <div className="card-body p-0 admin-table-wrap">
          <table className="table admin-data-table content-data-table report-table align-middle mb-0">
            <thead className="thead-light">
              <tr>
                <th>{t("ticketNumber")}</th>
                <th>{t("subject")}</th>
                <th className="d-none d-lg-table-cell">{t("contact")}</th>
                <th className="d-none d-lg-table-cell">{t("category")}</th>
                <th>{t("priority")}</th>
                <th>{t("status")}</th>
                <th className="d-none d-md-table-cell">{t("lastMessage")}</th>
                <th className="text-end">{t("actions")}</th>
              </tr>
            </thead>
            <tbody>
              {data.items.map((ticket) => (
                <tr key={ticket.id}>
                  <td dir="ltr">{ticket.ticketNumber}</td>
                  <td className="text-break">
                    <Link
                      href={`/admin/support/tickets/${ticket.id}`}
                      className="link-primary"
                    >
                      {ticket.subject}
                    </Link>
                  </td>
                  <td className="d-none d-lg-table-cell">
                    <span className="d-block">{ticket.contactName}</span>
                    <span className="d-block fs-12 text-gray-6" dir="ltr">
                      {ticket.contactEmail}
                    </span>
                  </td>
                  <td className="d-none d-lg-table-cell">{ticket.category}</td>
                  <td>{ticket.priority}</td>
                  <td>{ticket.status}</td>
                  <td className="d-none d-md-table-cell">
                    {formatIsoInstant(ticket.lastMessageAt, locale, {
                      dateStyle: "medium",
                      timeStyle: "short"
                    })}
                  </td>
                  <td className="text-end">
                    <Link
                      href={`/admin/support/tickets/${ticket.id}`}
                      className="btn btn-light btn-sm"
                    >
                      {t("open")}
                    </Link>
                  </td>
                </tr>
              ))}
              {data.items.length === 0 && (
                <tr>
                  <td colSpan={8} className="text-center text-gray-6 py-4">
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
