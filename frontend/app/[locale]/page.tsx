import { getTranslations, setRequestLocale } from "next-intl/server";
import { apiGet, formatMoney } from "@/lib/api";
import type { HomeFeed } from "@/lib/types";
import { Link } from "@/i18n/navigation";
import { SiteFooter, SiteHeader } from "@/components/SiteHeader";

export default async function HomePage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "home" });
  const common = await getTranslations({ locale, namespace: "common" });
  const nav = await getTranslations({ locale, namespace: "nav" });
  const data = await apiGet<HomeFeed>(`/market/v1/home?locale=${locale}`);

  return (
    <>
      <SiteHeader locale={locale} />
      <main>
        <section className="hero">
          <div className="container">
            <h1>{t("title")}</h1>
            <p>{t("subtitle")}</p>
            <div className="filters">
              <Link className="button" href="/tours">
                {common("search")} {nav("tours")}
              </Link>
              <Link className="button" href="/visa">
                {common("search")} {nav("visa")}
              </Link>
            </div>
          </div>
        </section>

        <div className="container">
          <section className="section">
            <div className="section-head">
              <h2>{t("featuredTours")}</h2>
              <Link href="/tours">{common("viewAll")}</Link>
            </div>
            <div className="grid">
              {(data?.tours.items ?? []).map((tour) => (
                <Link className="card" key={tour.productId} href={`/tours/${tour.slug}`}>
                  <span className="badge">{tour.tourType}</span>
                  <h3>{tour.title}</h3>
                  <div className="muted">
                    {tour.durationDays} {common("nights")}
                  </div>
                  <div className="price">
                    {common("from")} {formatMoney(tour.minPrice, tour.currency)}
                  </div>
                </Link>
              ))}
              {!data?.tours.items.length && <p className="muted">{common("noResults")}</p>}
            </div>
          </section>

          <section className="section">
            <div className="section-head">
              <h2>{t("visas")}</h2>
              <Link href="/visa">{common("viewAll")}</Link>
            </div>
            <div className="grid">
              {(data?.visas ?? []).slice(0, 8).map((visa) => (
                <Link className="card" key={visa.countryId} href={`/visa/${visa.slug}`}>
                  <h3>{visa.name}</h3>
                  <div className="muted">
                    {visa.typeCount} {common("visa")}
                  </div>
                  <div className="price">
                    {common("from")} {formatMoney(visa.minimumPrice, visa.minimumPriceCurrency)}
                  </div>
                </Link>
              ))}
            </div>
          </section>

          <section className="section">
            <div className="section-head">
              <h2>{t("latestItineraries")}</h2>
              <Link href="/itineraries">{common("viewAll")}</Link>
            </div>
            <div className="grid">
              {(data?.travelogues.items ?? []).map((item) => (
                <Link className="card" key={item.travelogueId} href={`/itineraries/${item.slug}`}>
                  <h3>{item.title}</h3>
                  <div className="muted">
                    {item.seriesName ?? common("itineraries")}
                  </div>
                </Link>
              ))}
            </div>
          </section>

          <section className="section">
            <div className="section-head">
              <h2>{t("latestBlog")}</h2>
              <Link href="/blog">{common("viewAll")}</Link>
            </div>
            <div className="grid">
              {(data?.blog.items ?? []).map((post) => (
                <Link className="card" key={post.postId} href={`/blog/${post.slug}`}>
                  <h3>{post.title}</h3>
                  <p className="muted">{post.excerpt}</p>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
