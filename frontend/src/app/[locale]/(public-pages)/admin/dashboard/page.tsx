import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { sessionGet } from "@/lib/hani/server-api";
import { AdminPageShell } from "@/features/home-experience/ui/AdminPageShell";

type AdminDashboardSummary = {
  orderCount: number;
  reservationRequestCount: number;
  leadCount: number;
  pendingAgencyRequests: number;
};

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "adminDashboard" });
  return { title: t("title"), robots: { index: false, follow: false } };
}

export default async function AdminDashboardPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "adminDashboard" });
  const tHome = await getTranslations({ locale, namespace: "adminHome" });
  const result = await sessionGet<AdminDashboardSummary>(
    "/internal/v1/dashboard/admin"
  );

  if (result.status === 401 || result.status === 403) {
    return (
      <AdminPageShell
        locale={locale}
        title={tHome("accessTitle")}
        subtitle={tHome("accessHint")}
        active={tHome("navHomepage")}
        activeSection="dashboard"
      >
        <div className="card border-0 shadow-sm">
          <div className="card-body p-4 text-gray-6">
            {tHome("accessHint")}
          </div>
        </div>
      </AdminPageShell>
    );
  }

  const summary = result.data ?? {
    orderCount: 0,
    reservationRequestCount: 0,
    leadCount: 0,
    pendingAgencyRequests: 0
  };
  const metrics = [
    { label: t("orders"), value: summary.orderCount, hint: t("ordersHint"), icon: "isax isax-shopping-bag" },
    { label: t("reservationRequests"), value: summary.reservationRequestCount, hint: t("requestsHint"), icon: "isax isax-calendar-tick" },
    { label: t("leads"), value: summary.leadCount, hint: t("leadsHint"), icon: "isax isax-profile-2user" },
    { label: t("pendingAgencyRequests"), value: summary.pendingAgencyRequests, hint: t("pendingHint"), icon: "isax isax-clock" }
  ];

  return (
    <AdminPageShell
      locale={locale}
      title={t("title")}
      subtitle={t("subtitle")}
      active={tHome("navHomepage")}
      activeSection="dashboard"
    >
      <div className="row g-4 mb-4">
        {metrics.map((metric) => (
          <div className="col-xl-3 col-md-6" key={metric.label}>
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body">
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <span className="avatar avatar-lg bg-primary-transparent text-primary rounded-circle">
                    <i className={`${metric.icon} fs-20`} />
                  </span>
                </div>
                <p className="fs-14 text-gray-6 mb-1">{metric.label}</p>
                <h3 className="mb-1">{metric.value.toLocaleString(locale)}</h3>
                <p className="fs-12 text-gray-5 mb-0">{metric.hint}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="card border-0 shadow-sm">
        <div className="card-header">
          <h2 className="h5 mb-1">{t("queueTitle")}</h2>
          <p className="fs-13 text-gray-6 mb-0">{t("queueHint")}</p>
        </div>
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-6">
              <Link
                href="/admin/agencies"
                className="d-flex align-items-center gap-3 p-3 border rounded text-decoration-none"
              >
                <i className="isax isax-buildings-2 fs-24 text-primary" />
                <span>
                  <strong className="d-block text-dark">{t("manageAgencies")}</strong>
                  <small className="text-gray-6">{t("manageAgenciesHint")}</small>
                </span>
              </Link>
            </div>
            <div className="col-md-6">
              <Link
                href="/admin/users"
                className="d-flex align-items-center gap-3 p-3 border rounded text-decoration-none"
              >
                <i className="isax isax-people fs-24 text-primary" />
                <span>
                  <strong className="d-block text-dark">{t("manageUsers")}</strong>
                  <small className="text-gray-6">{t("manageUsersHint")}</small>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </AdminPageShell>
  );
}
