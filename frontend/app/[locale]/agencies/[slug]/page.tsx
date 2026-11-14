import { getTranslations, setRequestLocale } from "next-intl/server";
import { apiGet } from "@/lib/api";
import type { AgencyProfile } from "@/lib/types";
import { SiteFooter, SiteHeader } from "@/components/SiteHeader";

export default async function AgencyDetailPage({
  params
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "common" });
  const data = await apiGet<AgencyProfile>(`/market/v1/agencies/${slug}/profile`);

  return (
    <>
      <SiteHeader locale={locale} />
      <main className="page">
        <div className="container">
          {!data ? (
            <p className="muted">{t("noResults")}</p>
          ) : (
            <>
              <h1>{data.agency.name}</h1>
              <div className="muted">
                {data.agency.city} · {data.agency.averageRating ?? "—"} / 5 ·{" "}
                {data.agency.reviewCount} reviews · {data.approvedTourCount} tours
              </div>
              <p>{data.agency.about}</p>
              <div className="list">
                <div className="row">
                  <span>License</span>
                  <strong>{data.agency.licenseNo}</strong>
                </div>
                <div className="row">
                  <span>Manager</span>
                  <strong>{data.agency.managerName ?? "—"}</strong>
                </div>
                <div className="row">
                  <span>Staff</span>
                  <strong>{data.agency.staffCount ?? "—"}</strong>
                </div>
                <div className="row">
                  <span>Address</span>
                  <strong>{data.agency.address ?? "—"}</strong>
                </div>
              </div>
            </>
          )}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
