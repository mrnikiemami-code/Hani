import { getTranslations, setRequestLocale } from "next-intl/server";
import { apiGet, formatMoney } from "@/lib/api";
import type { PagedResult, ProductComparison, ProductSearchItem } from "@/lib/types";
import { SiteFooter, SiteHeader } from "@/components/SiteHeader";

export default async function TourDetailPage({
  params
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "common" });
  const search = await apiGet<PagedResult<ProductSearchItem>>(
    `/market/v1/search?locale=${locale}&pageSize=5&q=${encodeURIComponent(slug)}`
  );
  const product = search?.items[0];
  const comparison = product
    ? await apiGet<ProductComparison>(
        `/market/v1/products/${product.productId}/compare?locale=${locale}`
      )
    : null;

  return (
    <>
      <SiteHeader locale={locale} />
      <main className="page">
        <div className="container">
          {!product ? (
            <p className="muted">{t("noResults")}</p>
          ) : (
            <>
              <h1>{comparison?.title ?? product.title}</h1>
              <p className="muted">{comparison?.summary}</p>
              <div className="badge">
                {product.durationDays} {t("nights")} · {product.tourType}
              </div>

              <section className="section">
                <h2>{t("offers")}</h2>
                <div className="list">
                  {(comparison?.offers ?? []).map((offer) => (
                    <article className="row" key={offer.offerId}>
                      <div>
                        <strong>{offer.agencyName}</strong>
                        <div className="muted">{offer.title}</div>
                        <div className="muted">
                          {offer.bookingMode} · {offer.collectionMode}
                        </div>
                      </div>
                      <div className="price">
                        {formatMoney(offer.minPrice, offer.currency, locale)}
                      </div>
                    </article>
                  ))}
                </div>
              </section>

              <section className="section">
                <h2>{comparison?.description}</h2>
                <div className="grid">
                  {(comparison?.offers ?? []).flatMap((offer) =>
                    offer.accommodationOptions.map((option) => (
                      <article className="card" key={option.optionId}>
                        <h3>{option.hotelName}</h3>
                        <div className="muted">
                          {option.roomType} · {option.mealPlan} · {option.hotelStars}★
                        </div>
                        <div className="muted">{option.description}</div>
                      </article>
                    ))
                  )}
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
