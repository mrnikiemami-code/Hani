import { getTranslations, setRequestLocale } from "next-intl/server";
import { apiGet } from "@/lib/api";
import type { PagedResult, TravelogueSummary } from "@/lib/types";
import { Link } from "@/i18n/navigation";
import { SiteFooter, SiteHeader } from "@/components/SiteHeader";

export default async function ItinerariesPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "common" });
  const data = await apiGet<PagedResult<TravelogueSummary>>(
    `/market/v1/content/travelogues?locale=${locale}&page=1&pageSize=20`
  );

  return (
    <>
      <SiteHeader locale={locale} />
      <main className="page">
        <div className="container">
          <h1>{t("itineraries")}</h1>
          <div className="grid">
            {(data?.items ?? []).map((item) => (
              <Link className="card" key={item.travelogueId} href={`/itineraries/${item.slug}`}>
                <h3>{item.title}</h3>
                <div className="muted">{item.seriesName ?? t("itineraries")}</div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
