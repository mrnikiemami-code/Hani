import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { sessionGet } from "@/lib/hani/server-api";
import { formatIsoInstant } from "@/lib/hani/calendar";
import {
  PAGE_KEY_OPTIONS,
  type PageCompositionListItem
} from "@/features/home-experience/domain/page-composition";
import { AdminPageShell } from "@/features/home-experience/ui/AdminPageShell";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "adminPages" });
  return { title: t("title"), robots: { index: false, follow: false } };
}

export default async function AdminPagesPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "adminPages" });
  const tHome = await getTranslations({ locale, namespace: "adminHome" });
  const result = await sessionGet<PageCompositionListItem[]>(
    `/internal/v1/page-compositions?locale=${encodeURIComponent(locale)}`
  );

  if (result.status === 401 || result.status === 403) {
    return (
      <AdminPageShell
        locale={locale}
        title={tHome("accessTitle")}
        subtitle={tHome("accessHint")}
        active={t("title")}
        activeSection="content"
        activeChild="pages"
      >
        <div className="card border-0 shadow-sm">
          <div className="card-body p-4 text-gray-6">
            {tHome("accessHint")}
          </div>
        </div>
      </AdminPageShell>
    );
  }

  const rows = new Map(
    (result.data ?? []).map((item) => [item.pageKey, item])
  );

  return (
    <AdminPageShell
      locale={locale}
      title={t("title")}
      subtitle={t("subtitle")}
      active={t("title")}
      activeSection="content"
      activeChild="pages"
    >
      <div className="card border-0 shadow-sm">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h2 className="h5 mb-0">{t("title")}</h2>
          <span className="fs-13 text-gray-6">
            {t("localeLabel", { locale })}
          </span>
        </div>
        <div className="card-body p-0 admin-table-wrap">
          <table className="table admin-data-table content-data-table report-table align-middle mb-0">
            <thead className="thead-light">
              <tr>
                <th>{t("page")}</th>
                <th>{t("draft")}</th>
                <th>{t("published")}</th>
                <th className="d-none d-md-table-cell">{t("updatedAt")}</th>
                <th className="text-end">{t("actions")}</th>
              </tr>
            </thead>
            <tbody>
              {PAGE_KEY_OPTIONS.map((option) => {
                const item = rows.get(option.key);
                return (
                  <tr key={option.key}>
                    <td>
                      <strong className="d-block">{t(option.labelKey)}</strong>
                      <span className="fs-12 text-gray-6" dir="ltr">
                        {option.key}
                      </span>
                    </td>
                    <td>
                      <span
                        className={`badge ${item?.hasDraft ? "badge-soft-success" : "badge-soft-secondary"}`}
                      >
                        {item?.hasDraft ? t("available") : t("empty")}
                      </span>
                    </td>
                    <td>
                      <span
                        className={`badge ${item?.hasPublished ? "badge-soft-success" : "badge-soft-warning"}`}
                      >
                        {item?.hasPublished ? t("publishedState") : t("notPublished")}
                      </span>
                    </td>
                    <td className="d-none d-md-table-cell">
                      {item?.updatedAt
                        ? formatIsoInstant(item.updatedAt, locale, {
                            dateStyle: "medium"
                          })
                        : "—"}
                    </td>
                    <td className="text-end">
                      <Link
                        href={`/admin/content/pages/${encodeURIComponent(option.key)}`}
                        className="btn btn-light btn-sm"
                      >
                        {t("edit")}
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </AdminPageShell>
  );
}
