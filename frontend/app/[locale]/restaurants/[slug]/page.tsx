import { getTranslations, setRequestLocale } from "next-intl/server";
import { apiGet, formatMoney } from "@/lib/api";
import type { PlaceDetail } from "@/lib/types";
import { SiteFooter, SiteHeader } from "@/components/SiteHeader";

export default async function RestaurantDetailPage({
  params
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "common" });
  const place = await apiGet<PlaceDetail>(`/market/v1/restaurants/${slug}`);
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
              <section className="section">
                <h2>Menu</h2>
                <div className="list">
                  {place.menuItems.map((item) => (
                    <div className="row" key={`${item.section}-${item.name}`}>
                      <span>
                        {item.name} <span className="muted">({item.section})</span>
                      </span>
                      <span className="price">{formatMoney(item.price, item.currency)}</span>
                    </div>
                  ))}
                </div>
              </section>
            </>
          )}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
