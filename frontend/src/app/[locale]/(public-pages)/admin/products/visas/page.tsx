import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { sessionGet } from "@/lib/hani/server-api";
import { formatIsoDate, formatIsoInstant } from "@/lib/hani/calendar";
import { formatMoney } from "@/lib/hani/money";
import type {
  AdminVisaApplicationPage,
  AdminVisaCountryPage
} from "@/features/home-experience/domain/admin-visa";
import { AdminPageShell } from "@/features/home-experience/ui/AdminPageShell";
import { VisaApplicationStatus } from "@/features/home-experience/ui/VisaApplicationStatus";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "adminVisas" });
  return { title: t("title"), robots: { index: false, follow: false } };
}

export default async function AdminVisasPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "adminVisas" });
  const tHome = await getTranslations({ locale, namespace: "adminHome" });
  const [countries, applications] = await Promise.all([
    sessionGet<AdminVisaCountryPage>(
      "/internal/v1/admin/catalog/visas?page=1&pageSize=100"
    ),
    sessionGet<AdminVisaApplicationPage>(
      "/internal/v1/admin/catalog/visa-applications?page=1&pageSize=100"
    )
  ]);

  if (countries.status === 401 || countries.status === 403) {
    return (
      <AdminPageShell
        locale={locale}
        title={tHome("accessTitle")}
        subtitle={tHome("accessHint")}
        active={tHome("accessTitle")}
        activeSection="products"
        activeChild="visas"
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
      activeChild="visas"
    >
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h2 className="h5 mb-0">{t("countries")}</h2>
          <Link href="/admin/products/visas/new" className="btn btn-primary btn-sm">
            {t("createCountry")}
          </Link>
        </div>
        <div className="card-body p-0 admin-table-wrap">
          <table className="table admin-data-table content-data-table report-table align-middle mb-0">
            <thead className="thead-light">
              <tr>
                <th>{t("country")}</th>
                <th>{t("countryCode")}</th>
                <th>{t("types")}</th>
                <th>{t("priceFrom")}</th>
              </tr>
            </thead>
            <tbody>
              {(countries.data?.items ?? []).map((country) => (
                <tr key={country.id}>
                  <td className="text-break">{country.name}</td>
                  <td dir="ltr">{country.countryCode}</td>
                  <td>{country.typeCount}</td>
                  <td>
                    {country.minimumPrice != null && country.currency
                      ? formatMoney(country.minimumPrice, country.currency, locale)
                      : "—"}
                  </td>
                </tr>
              ))}
              {(countries.data?.items ?? []).length === 0 && (
                <tr>
                  <td colSpan={4} className="text-center text-gray-6 py-4">
                    {t("emptyCountries")}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card border-0 shadow-sm">
        <div className="card-header">
          <h2 className="h5 mb-0">{t("applications")}</h2>
        </div>
        <div className="card-body p-0 admin-table-wrap">
          <table className="table admin-data-table content-data-table report-table align-middle mb-0">
            <thead className="thead-light">
              <tr>
                <th>{t("applicationNumber")}</th>
                <th>{t("applicant")}</th>
                <th className="d-none d-lg-table-cell">{t("passport")}</th>
                <th className="d-none d-md-table-cell">{t("travelDate")}</th>
                <th>{t("status")}</th>
                <th className="d-none d-md-table-cell">{t("createdAt")}</th>
                <th className="text-end">{t("actions")}</th>
              </tr>
            </thead>
            <tbody>
              {(applications.data?.items ?? []).map((application) => (
                <tr key={application.id}>
                  <td dir="ltr">{application.applicationNumber}</td>
                  <td className="text-break">{application.applicantName}</td>
                  <td className="d-none d-lg-table-cell" dir="ltr">
                    {application.passportNo}
                  </td>
                  <td className="d-none d-md-table-cell">
                    {application.travelDate
                      ? formatIsoDate(application.travelDate, locale, "short")
                      : "—"}
                  </td>
                  <td>{application.status}</td>
                  <td className="d-none d-md-table-cell">
                    {formatIsoInstant(application.createdAt, locale, {
                      dateStyle: "medium"
                    })}
                  </td>
                  <td className="text-end">
                    <VisaApplicationStatus
                      id={application.id}
                      status={application.status}
                    />
                  </td>
                </tr>
              ))}
              {(applications.data?.items ?? []).length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center text-gray-6 py-4">
                    {t("emptyApplications")}
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
