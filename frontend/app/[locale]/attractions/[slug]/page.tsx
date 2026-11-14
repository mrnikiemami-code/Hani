import { getTranslations, setRequestLocale } from "next-intl/server";
import { apiGet, formatMoney } from "@/lib/api";
import type { PlaceDetail } from "@/lib/types";
import { SiteFooter, SiteHeader } from "@/components/SiteHeader";

export default async function AttractionDetailPage({
  params
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "common" });
  const place = await apiGet<PlaceDetail>(`/market/v1/attractions/${slug}`);
  const name =
    place?.translations.find((item) => item.locale === locale)?.name ??
    place?.translations[0]?.name ??
    slug;

  return (
    <>
      <SiteHeader locale={locale} />
      <main className="page">
        <div className="container">
          {!place ? (
            <p className="muted">{t("noResults")}</p>
          ) : (
            <>
              <h1>{name}</h1>
              <div className="muted">
                {place.category} · {place.averageRating ?? "—"} / 5 · {place.reviewCount} reviews
              </div>
              <p>{place.translations[0]?.description}</p>
            </>
          )}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
