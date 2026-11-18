import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { sessionGet } from "@/lib/hani/server-api";
import { formatIsoInstant } from "@/lib/hani/calendar";
import { formatMoney } from "@/lib/hani/money";
import type { AdminCampaignPage } from "@/features/home-experience/domain/admin-campaign";
import { AdminPageShell } from "@/features/home-experience/ui/AdminPageShell";
import { CampaignActions } from "@/features/home-experience/ui/CampaignActions";

const PAGE_SIZE = 20;

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "adminMarketing" });
  return { title: t("title"), robots: { index: false, follow: false } };
}

export default async function AdminCampaignsPage({
  params,
  searchParams
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ page?: string; q?: string; status?: string }>;
}) {
  const { locale } = await params;
  const sp = await searchParams;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "adminMarketing" });
  const tHome = await getTranslations({ locale, namespace: "adminHome" });
  const page = Math.max(1, Number.parseInt(sp.page ?? "1", 10) || 1);
  const q = typeof sp.q === "string" ? sp.q.trim() : "";
  const status = ["Draft", "Active", "Closed"].includes(sp.status ?? "")
    ? sp.status!
    : "";
  const query = new URLSearchParams({
    page: String(page),
    pageSize: String(PAGE_SIZE)
  });
  if (q) query.set("q", q);
  if (status) query.set("status", status);

  const result = await sessionGet<AdminCampaignPage>(
    `/internal/v1/admin/marketing/campaigns?${query}`
  );

  if (result.status === 401 || result.status === 403) {
    return (
      <AdminPageShell
        locale={locale}
        title={tHome("accessTitle")}
        subtitle={tHome("accessHint")}
        active={t("title")}
        activeSection="marketing"
        activeChild="campaigns"
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
    return `/admin/marketing/campaigns?${nextQuery}`;
  };

  return (
    <AdminPageShell
      locale={locale}
      title={t("title")}
      subtitle={t("subtitle")}
      active={t("title")}
      activeSection="marketing"
      activeChild="campaigns"
    >
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
            <form method="get" className="row g-2 align-items-end flex-grow-1">
              <div className="col-md-5">
                <label className="form-label" htmlFor="campaign-q">
                  {t("search")}
                </label>
                <input
                  id="campaign-q"
                  name="q"
                  className="form-control"
                  defaultValue={q}
                  placeholder={t("searchPlaceholder")}
                />
              </div>
              <div className="col-md-3">
                <label className="form-label" htmlFor="campaign-status">
                  {t("status")}
                </label>
                <select
                  id="campaign-status"
                  name="status"
                  className="form-select"
                  defaultValue={status}
                >
                  <option value="">{t("allStatuses")}</option>
                  <option value="Draft">{t("statusDraft")}</option>
                  <option value="Active">{t("statusActive")}</option>
                  <option value="Closed">{t("statusClosed")}</option>
                </select>
              </div>
              <div className="col-md-4 d-flex gap-2">
                <button type="submit" className="btn btn-primary w-100">
                  {t("apply")}
                </button>
                <Link href="/admin/marketing/campaigns" className="btn btn-light w-100">
                  {t("reset")}
                </Link>
              </div>
            </form>
            <Link
              href="/admin/marketing/campaigns/new"
              className="btn btn-primary"
            >
              {t("create")}
            </Link>
          </div>
        </div>
      </div>

      <div className="card border-0 shadow-sm">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h2 className="h5 mb-0">{t("campaigns")}</h2>
          <span className="fs-13 text-gray-6">
            {t("total", { count: data.total })}
          </span>
        </div>
        <div className="card-body p-0 admin-table-wrap">
          <table className="table admin-data-table content-data-table align-middle mb-0">
            <thead className="thead-light">
              <tr>
                <th>{t("title")}</th>
                <th className="d-none d-lg-table-cell">{t("slug")}</th>
                <th>{t("status")}</th>
                <th className="d-none d-md-table-cell">{t("startsAt")}</th>
                <th className="d-none d-lg-table-cell">{t("endsAt")}</th>
                <th>{t("price")}</th>
                <th className="d-none d-lg-table-cell">{t("discountPercent")}</th>
                <th className="d-none d-md-table-cell">{t("registrations")}</th>
                <th className="text-end">{t("actions")}</th>
              </tr>
            </thead>
            <tbody>
              {data.items.map((campaign) => (
                <tr key={campaign.id}>
                  <td className="text-break">{campaign.title}</td>
                  <td className="d-none d-lg-table-cell text-break" dir="ltr">
                    {campaign.slug}
                  </td>
                  <td>
                    {campaign.status === "Active"
                      ? t("statusActive")
                      : campaign.status === "Closed"
                        ? t("statusClosed")
                        : t("statusDraft")}
                  </td>
                  <td className="text-nowrap">
                    {formatIsoInstant(campaign.startsAt, locale, {
                      dateStyle: "medium"
                    })}
                  </td>
                  <td className="text-nowrap">
                    {formatIsoInstant(campaign.endsAt, locale, {
                      dateStyle: "medium"
                    })}
                  </td>
                  <td>
                    {campaign.price != null && campaign.currency
                      ? formatMoney(campaign.price, campaign.currency, locale)
                      : "—"}
                  </td>
                  <td>
                    {campaign.discountPercent != null
                      ? `${campaign.discountPercent}%`
                      : "—"}
                  </td>
                  <td>{campaign.registrations}</td>
                  <td className="text-end">
                    {campaign.status === "Draft" ? (
                      <CampaignActions slug={campaign.slug} />
                    ) : (
                      "—"
                    )}
                  </td>
                </tr>
              ))}
              {data.items.length === 0 && (
                <tr>
                  <td colSpan={9} className="text-center text-gray-6 py-4">
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
