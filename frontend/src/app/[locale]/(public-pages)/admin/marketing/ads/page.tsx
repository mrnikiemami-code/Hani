import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { sessionGet } from "@/lib/hani/server-api";
import { formatIsoInstant } from "@/lib/hani/calendar";
import type { AdminAdSlot } from "@/features/home-experience/domain/admin-ad";
import { AdminPageShell } from "@/features/home-experience/ui/AdminPageShell";
import { AdCreativeForm } from "@/features/home-experience/ui/AdCreativeForm";
import { AdSlotForm } from "@/features/home-experience/ui/AdSlotForm";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "adminAds" });
  return { title: t("title"), robots: { index: false, follow: false } };
}

export default async function AdminAdsPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "adminAds" });
  const tHome = await getTranslations({ locale, namespace: "adminHome" });
  const result = await sessionGet<AdminAdSlot[]>(
    "/internal/v1/admin/marketing/ad-slots"
  );

  if (result.status === 401 || result.status === 403) {
    return (
      <AdminPageShell
        locale={locale}
        title={tHome("accessTitle")}
        subtitle={tHome("accessHint")}
        active={t("title")}
        activeSection="marketing"
        activeChild="ads"
      >
        <div className="card border-0 shadow-sm">
          <div className="card-body p-4 text-gray-6">
            {tHome("accessHint")}
          </div>
        </div>
      </AdminPageShell>
    );
  }

  const slots = result.data ?? [];

  return (
    <AdminPageShell
      locale={locale}
      title={t("title")}
      subtitle={t("subtitle")}
      active={t("title")}
      activeSection="marketing"
      activeChild="ads"
    >
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-header">
          <h2 className="h5 mb-0">{t("createSlotTitle")}</h2>
        </div>
        <div className="card-body">
          <AdSlotForm />
        </div>
      </div>

      {slots.map((slot) => (
        <div className="card border-0 shadow-sm mb-4" key={slot.id}>
          <div className="card-header d-flex justify-content-between align-items-center flex-wrap gap-2">
            <div>
              <h2 className="h5 mb-1">{slot.name}</h2>
              <span className="fs-13 text-gray-6" dir="ltr">
                {slot.code}
              </span>
            </div>
            <span className="badge bg-light text-gray-9">
              {slot.isActive ? t("active") : t("inactive")}
            </span>
          </div>
          <div className="card-body p-0 admin-table-wrap">
            <table className="table admin-data-table content-data-table report-table align-middle mb-0">
              <thead className="thead-light">
                <tr>
                  <th>{t("creativeTitle")}</th>
                  <th className="d-none d-lg-table-cell">{t("imageUrl")}</th>
                  <th className="d-none d-lg-table-cell">{t("targetUrl")}</th>
                  <th>{t("impressions")}</th>
                  <th>{t("clicks")}</th>
                  <th className="d-none d-md-table-cell">{t("createdAt")}</th>
                </tr>
              </thead>
              <tbody>
                {slot.creatives.map((creative) => (
                  <tr key={creative.id}>
                    <td className="text-break">{creative.title}</td>
                    <td className="d-none d-lg-table-cell">
                      <a
                        href={creative.imageUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="link-primary"
                      >
                        {t("viewImage")}
                      </a>
                    </td>
                    <td className="d-none d-lg-table-cell">
                      <a
                        href={creative.targetUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="link-primary"
                      >
                        {t("openTarget")}
                      </a>
                    </td>
                    <td>{creative.impressions}</td>
                    <td>{creative.clicks}</td>
                    <td className="d-none d-md-table-cell">
                      {formatIsoInstant(slot.createdAt, locale, {
                        dateStyle: "medium"
                      })}
                    </td>
                  </tr>
                ))}
                {slot.creatives.length === 0 && (
                  <tr>
                    <td colSpan={6} className="text-center text-gray-6 py-4">
                      {t("emptyCreatives")}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="card-footer bg-white">
            <h3 className="h6 mb-3">{t("addCreativeTitle")}</h3>
            <AdCreativeForm code={slot.code} />
          </div>
        </div>
      ))}

      {slots.length === 0 && (
        <div className="card border-0 shadow-sm">
          <div className="card-body text-center text-gray-6 py-4">
            {t("emptySlots")}
          </div>
        </div>
      )}
    </AdminPageShell>
  );
}
