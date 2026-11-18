import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { sessionGet } from "@/lib/hani/server-api";
import { formatIsoInstant } from "@/lib/hani/calendar";
import type { AdminNotificationPage } from "@/features/home-experience/domain/admin-notification";
import { AdminPageShell } from "@/features/home-experience/ui/AdminPageShell";
import { NotificationRetryAction } from "@/features/home-experience/ui/NotificationRetryAction";

const PAGE_SIZE = 25;

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "adminNotifications" });
  return { title: t("title"), robots: { index: false, follow: false } };
}

export default async function AdminNotificationsPage({
  params,
  searchParams
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{
    page?: string;
    q?: string;
    status?: string;
    channel?: string;
  }>;
}) {
  const { locale } = await params;
  const sp = await searchParams;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "adminNotifications" });
  const tHome = await getTranslations({ locale, namespace: "adminHome" });
  const page = Math.max(1, Number.parseInt(sp.page ?? "1", 10) || 1);
  const q = typeof sp.q === "string" ? sp.q.trim() : "";
  const status = ["Pending", "Sent", "Failed"].includes(sp.status ?? "")
    ? sp.status!
    : "";
  const channel = ["Email", "Sms"].includes(sp.channel ?? "")
    ? sp.channel!
    : "";
  const query = new URLSearchParams({
    page: String(page),
    pageSize: String(PAGE_SIZE)
  });
  if (q) query.set("q", q);
  if (status) query.set("status", status);
  if (channel) query.set("channel", channel);

  const result = await sessionGet<AdminNotificationPage>(
    `/internal/v1/admin/notifications?${query}`
  );

  if (result.status === 401 || result.status === 403) {
    return (
      <AdminPageShell
        locale={locale}
        title={tHome("accessTitle")}
        subtitle={tHome("accessHint")}
        active={t("title")}
        activeSection="support"
        activeChild="notifications"
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
    if (channel) nextQuery.set("channel", channel);
    return `/admin/notifications?${nextQuery}`;
  };

  return (
    <AdminPageShell
      locale={locale}
      title={t("title")}
      subtitle={t("subtitle")}
      active={t("title")}
      activeSection="support"
      activeChild="notifications"
    >
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body">
          <form method="get" className="row g-2 align-items-end">
            <div className="col-md-4">
              <label className="form-label" htmlFor="notification-q">
                {t("search")}
              </label>
              <input
                id="notification-q"
                name="q"
                className="form-control"
                defaultValue={q}
                placeholder={t("searchPlaceholder")}
              />
            </div>
            <div className="col-md-2">
              <label className="form-label" htmlFor="notification-status">
                {t("status")}
              </label>
              <select
                id="notification-status"
                name="status"
                className="form-select"
                defaultValue={status}
              >
                <option value="">{t("allStatuses")}</option>
                <option value="Pending">{t("statusPending")}</option>
                <option value="Sent">{t("statusSent")}</option>
                <option value="Failed">{t("statusFailed")}</option>
              </select>
            </div>
            <div className="col-md-2">
              <label className="form-label" htmlFor="notification-channel">
                {t("channel")}
              </label>
              <select
                id="notification-channel"
                name="channel"
                className="form-select"
                defaultValue={channel}
              >
                <option value="">{t("allChannels")}</option>
                <option value="Email">Email</option>
                <option value="Sms">SMS</option>
              </select>
            </div>
            <div className="col-md-4 d-flex gap-2">
              <button type="submit" className="btn btn-primary w-100">
                {t("apply")}
              </button>
              <Link href="/admin/notifications" className="btn btn-light w-100">
                {t("reset")}
              </Link>
            </div>
          </form>
        </div>
      </div>

      <div className="card border-0 shadow-sm">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h2 className="h5 mb-0">{t("outbox")}</h2>
          <span className="fs-13 text-gray-6">
            {t("total", { count: data.total })}
          </span>
        </div>
        <div className="card-body p-0 admin-table-wrap">
          <table className="table admin-data-table content-data-table report-table align-middle mb-0">
            <thead className="thead-light">
              <tr>
                <th>{t("createdAt")}</th>
                <th>{t("template")}</th>
                <th>{t("channel")}</th>
                <th>{t("status")}</th>
                <th className="d-none d-lg-table-cell">{t("attempts")}</th>
                <th className="d-none d-lg-table-cell">{t("lastError")}</th>
                <th className="text-end">{t("actions")}</th>
              </tr>
            </thead>
            <tbody>
              {data.items.map((notification) => (
                <tr key={notification.id}>
                  <td>
                    {formatIsoInstant(notification.createdAt, locale, {
                      dateStyle: "medium",
                      timeStyle: "short"
                    })}
                  </td>
                  <td className="text-break" dir="ltr">
                    {notification.templateKey}
                  </td>
                  <td>{notification.channel}</td>
                  <td>{notification.status}</td>
                  <td className="d-none d-lg-table-cell">
                    {notification.attemptCount}
                  </td>
                  <td className="d-none d-lg-table-cell text-truncate" title={notification.lastError ?? ""}>
                    {notification.lastError ?? "—"}
                  </td>
                  <td className="text-end">
                    {notification.status === "Failed" ? (
                      <NotificationRetryAction id={notification.id} />
                    ) : (
                      "—"
                    )}
                  </td>
                </tr>
              ))}
              {data.items.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center text-gray-6 py-4">
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
