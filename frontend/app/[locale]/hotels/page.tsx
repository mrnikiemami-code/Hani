import { getTranslations, setRequestLocale } from "next-intl/server";
import { apiGet, formatMoney } from "@/lib/api";
import type { HotelSummary, PagedResult } from "@/lib/types";
import { Link } from "@/i18n/navigation";
import { SiteFooter, SiteHeader } from "@/components/SiteHeader";

export default async function HotelsPage({
  params,
  searchParams
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ destinationSlug?: string; sortBy?: string; page?: string }>;
}) {
  const { locale } = await params;
  const query = await searchParams;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "common" });
  const page = Math.max(1, Number(query.page ?? "1"));
  const data = await apiGet<PagedResult<HotelSummary>>(
    `/market/v1/hotels?locale=${locale}&page=${page}&pageSize=20` +
      `&destinationSlug=${encodeURIComponent(query.destinationSlug ?? "")}` +
      `&sortBy=${encodeURIComponent(query.sortBy ?? "rating")}`
  );

  return (
    <>
      <SiteHeader locale={locale} />
      <main className="page">
        <div className="container">
          <h1>{t("hotels")}</h1>
          <form className="filters" action={`/${locale}/hotels`}>
            <input
              className="input"
              name="destinationSlug"
              defaultValue={query.destinationSlug ?? ""}
              placeholder="destination"
            />
            <select className="select" name="sortBy" defaultValue={query.sortBy ?? "rating"}>
              <option value="rating">rating</option>
              <option value="reviews">reviews</option>
              <option value="newest">newest</option>
              <option value="alphabetical">alphabetical</option>
              <option value="rank">rank</option>
            </select>
            <button className="button" type="submit">
              {t("search")}
            </button>
          </form>
          <div className="grid">
            {(data?.items ?? []).map((hotel) => (
              <Link className="card" key={hotel.hotelId} href={`/hotels/${hotel.slug}`}>
                <span className="badge">{hotel.stars}★</span>
                <h3>{hotel.name}</h3>
                <div className="muted">
                  {hotel.averageRating ?? "—"} / 5 · {hotel.reviewCount} reviews
                  {hotel.rankInCity ? ` · rank ${hotel.rankInCity}` : ""}
                </div>
                <div className="muted">{hotel.address}</div>
              </Link>
            ))}
          </div>
          {!data?.items.length && <p className="muted">{t("noResults")}</p>}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
