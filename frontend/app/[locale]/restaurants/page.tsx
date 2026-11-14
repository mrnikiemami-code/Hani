import { getTranslations, setRequestLocale } from "next-intl/server";
import { apiGet } from "@/lib/api";
import type { PagedResult, PlaceSummary } from "@/lib/types";
import { Link } from "@/i18n/navigation";
import { SiteFooter, SiteHeader } from "@/components/SiteHeader";

export default async function RestaurantsPage({
  params,
  searchParams
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ q?: string; page?: string }>;
}) {
  const { locale } = await params;
  const query = await searchParams;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "common" });
  const page = Math.max(1, Number(query.page ?? "1"));
  const data = await apiGet<PagedResult<PlaceSummary>>(
    `/market/v1/restaurants?locale=${locale}&page=${page}&pageSize=20&q=${encodeURIComponent(
      query.q ?? ""
    )}`
  );

  return (
    <>
      <SiteHeader locale={locale} />
      <main className="page">
        <div className="container">
          <h1>{t("restaurants")}</h1>
          <form className="filters" action={`/${locale}/restaurants`}>
            <input className="input" name="q" defaultValue={query.q ?? ""} placeholder={t("search")} />
            <button className="button" type="submit">
              {t("search")}
            </button>
          </form>
          <div className="grid">
            {(data?.items ?? []).map((place) => (
              <Link className="card" key={place.placeId} href={`/restaurants/${place.slug}`}>
                <h3>{place.name}</h3>
                <div className="muted">
                  {place.category} · {place.averageRating ?? "—"} / 5
                </div>
                <div className="muted">{place.reviewCount} reviews</div>
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
