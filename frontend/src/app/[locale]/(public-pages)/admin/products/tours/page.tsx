import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { sessionGet } from "@/lib/hani/server-api";
import { formatIsoInstant } from "@/lib/hani/calendar";
import type { AdminTourPage } from "@/features/home-experience/domain/admin-tour";
import { AdminPageShell } from "@/features/home-experience/ui/AdminPageShell";
import { TourActions } from "@/features/home-experience/ui/TourActions";

const PAGE_SIZE = 20;

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "adminTours" });
  return { title: t("title"), robots: { index: false, follow: false } };
}

export default async function AdminToursPage({
  params,
  searchParams
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ page?: string; q?: string; status?: string }>;
}) {
  const { locale } = await params;
  const sp = await searchParams;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "adminTours" });
  const tHome = await getTranslations({ locale, namespace: "adminHome" });
  const page = Math.max(1, Number.parseInt(sp.page ?? "1", 10) || 1);
  const q = typeof sp.q === "string" ? sp.q.trim() : "";
  const status = ["Draft", "Published", "Archived"].includes(sp.status ?? "")
    ? sp.status!
    : "";
  const query = new URLSearchParams({
    page: String(page),
    pageSize: String(PAGE_SIZE)
  });
  if (q) query.set("q", q);
  if (status) query.set("status", status);

  const result = await sessionGet<AdminTourPage>(
    `/internal/v1/admin/catalog/tours?${query}`
  );

  if (result.status === 401 || result.status === 403) {
    return (
      <AdminPageShell
        locale={locale}
        title={tHome("accessTitle")}
        subtitle={tHome("accessHint")}
        active={t("title")}
        activeSection="products"
        activeChild="tours"
      >
        <div className="card border-0 shadow-sm">
          <div className="card-body p-4 text-gray-6">
            {tHome("accessHint")}
          </div>
        </div>
      </AdminPageShell>
    );
  }

  const data = result.data ?? { items: [], page, pageSize: PAGE_SIZE, total: 0 };
  const pageCount = Math.max(1, Math.ceil(data.total / PAGE_SIZE));
  const pageQuery = (next: number) => {
    const nextQuery = new URLSearchParams({ page: String(next) });
    if (q) nextQuery.set("q", q);
    if (status) nextQuery.set("status", status);
    return `/admin/products/tours?${nextQuery}`;
  };

  return (
    <AdminPageShell
      locale={locale}
      title={t("title")}
      subtitle={t("subtitle")}
      active={t("title")}
      activeSection="products"
      activeChild="tours"
    >
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
            <form method="get" className="row g-2 align-items-end flex-grow-1">
              <div className="col-md-5">
                <label className="form-label" htmlFor="tour-q">
                  {t("search")}
                </label>
                <input
                  id="tour-q"
                  name="q"
                  className="form-control"
                  defaultValue={q}
                  placeholder={t("searchPlaceholder")}
                />
              </div>
              <div className="col-md-3">
                <label className="form-label" htmlFor="tour-status">
                  {t("status")}
                </label>
                <select
                  id="tour-status"
                  name="status"
                  className="form-select"
                  defaultValue={status}
                >
                  <option value="">{t("allStatuses")}</option>
                  <option value="Draft">{t("statusDraft")}</option>
                  <option value="Published">{t("statusPublished")}</option>
                  <option value="Archived">{t("statusArchived")}</option>
                </select>
              </div>
              <div className="col-md-4 d-flex gap-2">
                <button type="submit" className="btn btn-primary w-100">
                  {t("apply")}
                </button>
                <Link href="/admin/products/tours" className="btn btn-light w-100">
                  {t("reset")}
                </Link>
              </div>
            </form>
            <Link href="/admin/products/tours/new" className="btn btn-primary">
              {t("create")}
            </Link>
          </div>
        </div>
      </div>

      <div className="card border-0 shadow-sm">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h2 className="h5 mb-0">{t("tours")}</h2>
          <span className="fs-13 text-gray-6">{t("total", { count: data.total })}</span>
        </div>
        <div className="card-body p-0 admin-table-wrap">
          <table className="table admin-data-table content-data-table report-table align-middle mb-0">
            <thead className="thead-light">
              <tr>
                <th>{t("title")}</th>
                <th className="d-none d-lg-table-cell">{t("slug")}</th>
                <th>{t("duration")}</th>
                <th className="d-none d-md-table-cell">{t("scope")}</th>
                <th>{t("status")}</th>
                <th className="d-none d-md-table-cell">{t("createdAt")}</th>
                <th className="text-end">{t("actions")}</th>
              </tr>
            </thead>
            <tbody>
              {data.items.map((tour) => (
                <tr key={tour.id}>
                  <td className="text-break">{tour.title}</td>
                  <td className="d-none d-lg-table-cell" dir="ltr">
                    {tour.slug}
                  </td>
                  <td>{tour.durationDays}</td>
                  <td className="d-none d-md-table-cell">{tour.scope}</td>
                  <td>{tour.status}</td>
                  <td className="d-none d-md-table-cell">
                    {formatIsoInstant(tour.createdAt, locale, {
                      dateStyle: "medium"
                    })}
                  </td>
                  <td className="text-end">
                    {tour.status === "Draft" ? <TourActions id={tour.id} /> : "—"}
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
