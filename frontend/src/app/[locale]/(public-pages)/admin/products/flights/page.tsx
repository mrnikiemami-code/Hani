import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { sessionGet } from "@/lib/hani/server-api";
import { formatMoney } from "@/lib/hani/money";
import type {
  AdminFlightPage,
  AdminFlightReferences
} from "@/features/home-experience/domain/admin-flight";
import { AdminPageShell } from "@/features/home-experience/ui/AdminPageShell";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "adminFlights" });
  return { title: t("title"), robots: { index: false, follow: false } };
}

export default async function AdminFlightsPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "adminFlights" });
  const tHome = await getTranslations({ locale, namespace: "adminHome" });
  const [routes, references] = await Promise.all([
    sessionGet<AdminFlightPage>(
      "/internal/v1/admin/catalog/flights/routes?page=1&pageSize=50"
    ),
    sessionGet<AdminFlightReferences>(
      "/internal/v1/admin/catalog/flights/references"
    )
  ]);

  if (routes.status === 401 || routes.status === 403) {
    return (
      <AdminPageShell
        locale={locale}
        title={tHome("accessTitle")}
        subtitle={tHome("accessHint")}
        active={tHome("accessTitle")}
        activeSection="products"
        activeChild="flights"
      >
        <div className="card border-0 shadow-sm">
          <div className="card-body p-4 text-gray-6">
            {tHome("accessHint")}
          </div>
        </div>
      </AdminPageShell>
    );
  }

  return (
    <AdminPageShell
      locale={locale}
      title={t("title")}
      subtitle={t("subtitle")}
      active={t("title")}
      activeSection="products"
      activeChild="flights"
    >
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h2 className="h5 mb-0">{t("routes")}</h2>
          <Link href="/admin/products/flights/new" className="btn btn-primary btn-sm">
            {t("createRoute")}
          </Link>
        </div>
        <div className="card-body p-0 admin-table-wrap">
          <table className="table admin-data-table content-data-table report-table align-middle mb-0">
            <thead className="thead-light">
              <tr>
                <th>{t("route")}</th>
                <th>{t("from")}</th>
                <th>{t("to")}</th>
                <th>{t("offers")}</th>
                <th>{t("priceFrom")}</th>
                <th>{t("status")}</th>
                <th className="text-end">{t("actions")}</th>
              </tr>
            </thead>
            <tbody>
              {(routes.data?.items ?? []).map((route) => (
                <tr key={route.routeId}>
                  <td dir="ltr">{route.slug}</td>
                  <td>
                    {route.originCode} · {route.originCity}
                  </td>
                  <td>
                    {route.destinationCode} · {route.destinationCity}
                  </td>
                  <td>{route.offerCount}</td>
                  <td>
                    {route.minimumPrice != null && route.currency
                      ? formatMoney(route.minimumPrice, route.currency, locale)
                      : "—"}
                  </td>
                  <td>{route.isActive ? t("active") : t("inactive")}</td>
                  <td className="text-end">
                    <Link
                      href={`/admin/products/flights/${route.routeId}`}
                      className="btn btn-light btn-sm"
                    >
                      {t("edit")}
                    </Link>
                  </td>
                </tr>
              ))}
              {(routes.data?.items ?? []).length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center text-gray-6 py-4">
                    {t("emptyRoutes")}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="row g-4">
        <div className="col-lg-6">
          <div className="card border-0 shadow-sm">
            <div className="card-header">
              <h2 className="h5 mb-0">{t("airlines")}</h2>
            </div>
            <div className="card-body">
              <p className="fs-13 text-gray-6">
                {(references.data?.airlines ?? [])
                  .map((item) => `${item.iata} — ${item.name}`)
                  .join(" · ") || t("emptyReferences")}
              </p>
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="card border-0 shadow-sm">
            <div className="card-header">
              <h2 className="h5 mb-0">{t("airports")}</h2>
            </div>
            <div className="card-body">
              <p className="fs-13 text-gray-6">
                {(references.data?.airports ?? [])
                  .map((item) => `${item.iata} — ${item.city}`)
                  .join(" · ") || t("emptyReferences")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </AdminPageShell>
  );
}
