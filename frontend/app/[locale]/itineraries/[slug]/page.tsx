import { getTranslations, setRequestLocale } from "next-intl/server";
import { apiGet } from "@/lib/api";
import type { TravelogueDetail } from "@/lib/types";
import { SiteFooter, SiteHeader } from "@/components/SiteHeader";

export default async function ItineraryDetailPage({
  params
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "common" });
  const item = await apiGet<TravelogueDetail>(
    `/market/v1/content/travelogues/${slug}?locale=${locale}`
  );

  return (
    <>
      <SiteHeader locale={locale} />
      <main className="page">
        <div className="container">
          {!item ? (
            <p className="muted">{t("noResults")}</p>
          ) : (
            <article>
              <h1>{item.title}</h1>
              <p className="muted">{item.seriesName}</p>
              <div style={{ whiteSpace: "pre-wrap" }}>{item.body}</div>
            </article>
          )}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
