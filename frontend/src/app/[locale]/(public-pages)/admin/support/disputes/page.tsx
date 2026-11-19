import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { sessionGet } from "@/lib/hani/server-api";
import { formatIsoInstant } from "@/lib/hani/calendar";
import { formatMoney } from "@/lib/hani/money";
import type { SupportDisputePage } from "@/features/home-experience/domain/admin-support";
import { AdminPageShell } from "@/features/home-experience/ui/AdminPageShell";

const PAGE_SIZE = 20;
const STATUSES = ["Open", "Investigating", "AwaitingCustomer", "Resolved", "Rejected"];
const TYPES = ["Refund", "Cancellation", "ServiceQuality", "Pricing", "NoShow", "Other"];

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "adminSupport" });
  return { title: t("disputes"), robots: { index: false, follow: false } };
}

export default async function AdminSupportDisputesPage({
  params,
  searchParams
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{
    page?: string;
    status?: string;
    type?: string;
  }>;
}) {
  const { locale } = await params;
  const sp = await searchParams;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "adminSupport" });
  const tHome = await getTranslations({ locale, namespace: "adminHome" });
  const page = Math.max(1, Number.parseInt(sp.page ?? "1", 10) || 1);
  const status = STATUSES.includes(sp.status ?? "") ? sp.status! : "";
  const type = TYPES.includes(sp.type ?? "") ? sp.type! : "";
  const query = new URLSearchParams({
    page: String(page),
    pageSize: String(PAGE_SIZE)
  });
  if (status) query.set("status", status);
  if (type) query.set("type", type);

  const result = await sessionGet<SupportDisputePage>(
    `/internal/v1/admin/support/disputes?${query}`
  );

  if (result.status === 401 || result.status === 403) {
    return (
      <AdminPageShell
        locale={locale}
        title={tHome("accessTitle")}
        subtitle={tHome("accessHint")}
        active={tHome("accessTitle")}
        activeSection="support"
        activeChild="disputes"
      >
        <div className="card border-0 shadow-sm">
          <div className="card-body p-4 text-gray-6">{tHome("accessHint")}</div>
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
    if (status) nextQuery.set("status", status);
    if (type) nextQuery.set("type", type);
    return `/admin/support/disputes?${nextQuery}`;
  };

  return (
    <AdminPageShell
      locale={locale}
      title={t("disputes")}
      subtitle={t("disputesHint")}
      active={t("disputes")}
      activeSection="support"
      activeChild="disputes"
    >
      <form className="card border-0 shadow-sm mb-4" method="get">
        <div className="card-body row g-2 align-items-end">
          <div className="col-md-4">
            <label className="form-label" htmlFor="dispute-filter-status">
              {t("status")}
            </label>
            <select
              id="dispute-filter-status"
              name="status"
              className="form-select"
              defaultValue={status}
            >
              <option value="">{t("allStatuses")}</option>
              {STATUSES.map((item) => (
                <option key={item} value={item}>
                  {t(`disputeStatus${item}`)}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-4">
            <label className="form-label" htmlFor="dispute-filter-type">
              {t("disputeType")}
            </label>
            <select
              id="dispute-filter-type"
              name="type"
              className="form-select"
              defaultValue={type}
            >
              <option value="">{t("allTypes")}</option>
              {TYPES.map((item) => (
                <option key={item} value={item}>
                  {t(`disputeType${item}`)}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-4 d-flex gap-2">
            <button type="submit" className="btn btn-primary w-100">
              {t("apply")}
            </button>
            <Link href="/admin/support/disputes" className="btn btn-light w-100">
              {t("reset")}
            </Link>
          </div>
        </div>
      </form>

      <div className="card border-0 shadow-sm">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h2 className="h5 mb-0">{t("disputes")}</h2>
          <span className="fs-13 text-gray-6">
            {t("total", { count: data.total })}
          </span>
        </div>
        <div className="card-body p-0 admin-table-wrap">
          <table className="table admin-data-table content-data-table report-table align-middle mb-0">
            <thead className="thead-light">
              <tr>
                <th>{t("ticket")}</th>
                <th>{t("disputeType")}</th>
                <th>{t("status")}</th>
                <th className="d-none d-md-table-cell">{t("amount")}</th>
                <th className="d-none d-lg-table-cell">{t("order")}</th>
                <th className="d-none d-lg-table-cell">{t("openedAt")}</th>
                <th className="text-end">{t("actions")}</th>
              </tr>
            </thead>
            <tbody>
              {data.items.map((dispute) => (
                <tr key={dispute.id}>
                  <td dir="ltr">{dispute.ticketNumber}</td>
                  <td>{t(`disputeType${dispute.type}`)}</td>
                  <td>{t(`disputeStatus${dispute.status}`)}</td>
                  <td className="d-none d-md-table-cell">
                    {dispute.amount != null && dispute.currency
                      ? formatMoney(dispute.amount, dispute.currency, locale)
                      : "—"}
                  </td>
                  <td className="d-none d-lg-table-cell" dir="ltr">
                    {dispute.orderId ?? "—"}
                  </td>
                  <td className="d-none d-lg-table-cell text-nowrap">
                    {formatIsoInstant(dispute.openedAt, locale, {
                      dateStyle: "medium",
                      timeStyle: "short"
                    })}
                  </td>
                  <td className="text-end">
                    <Link
                      href={`/admin/support/tickets/${dispute.ticketId}`}
                      className="btn btn-light btn-sm"
                    >
                      {t("openTicket")}
                    </Link>
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
