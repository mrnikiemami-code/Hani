import { getTranslations, setRequestLocale } from "next-intl/server";
import { apiGet, formatMoney } from "@/lib/api";
import type { PagedResult, ProductSearchItem } from "@/lib/types";
import { Link } from "@/i18n/navigation";
import { SiteFooter, SiteHeader } from "@/components/SiteHeader";

export default async function ToursPage({
  params,
  searchParams
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ q?: string; destinationSlug?: string; page?: string }>;
}) {
  const { locale } = await params;
  const query = await searchParams;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "common" });
  const page = Math.max(1, Number(query.page ?? "1"));
  const data = await apiGet<PagedResult<ProductSearchItem>>(
    `/market/v1/search?locale=${locale}&page=${page}&pageSize=20` +
      `&q=${encodeURIComponent(query.q ?? "")}` +
      `&destinationSlug=${encodeURIComponent(query.destinationSlug ?? "")}`
  );

  return (
    <>
      <SiteHeader locale={locale} />
      <main className="page">
        <div className="container">
          <h1>{t("tours")}</h1>
          <form className="filters" action={`/${locale}/tours`}>
            <input className="input" name="q" defaultValue={query.q ?? ""} placeholder={t("search")} />
            <button className="button" type="submit">
              {t("search")}
            </button>
          </form>
          <div className="grid">
            {(data?.items ?? []).map((tour) => (
              <Link className="card" key={tour.productId} href={`/tours/${tour.slug}`}>
                <span className="badge">{tour.tourType}</span>
                <h3>{tour.title}</h3>
                <div className="muted">
                  {tour.durationDays} {t("nights")} · {tour.offerCount} offer
                </div>
                <div className="price">
                  {t("from")} {formatMoney(tour.minPrice, tour.currency, locale)}
                </div>
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
