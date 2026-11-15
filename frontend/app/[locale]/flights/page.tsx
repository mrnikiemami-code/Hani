import { getTranslations, setRequestLocale } from "next-intl/server";
import { apiGet, formatMoney } from "@/lib/api";
import type { FlightRoute } from "@/lib/types";
import { SiteFooter, SiteHeader } from "@/components/SiteHeader";

export default async function FlightsPage({
  params,
  searchParams
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ origin?: string; destination?: string; departureDate?: string }>;
}) {
  const { locale } = await params;
  const query = await searchParams;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "common" });
  const routes = await apiGet<FlightRoute[]>(
    `/market/v1/flights/search?origin=${encodeURIComponent(query.origin ?? "")}` +
      `&destination=${encodeURIComponent(query.destination ?? "")}` +
      `&departureDate=${encodeURIComponent(query.departureDate ?? "")}`
  );

  return (
    <>
      <SiteHeader locale={locale} />
      <main className="page">
        <div className="container">
          <h1>{t("flights")}</h1>
          <form className="filters" action={`/${locale}/flights`}>
            <input className="input" name="origin" defaultValue={query.origin ?? ""} placeholder="THR" />
            <input
              className="input"
              name="destination"
              defaultValue={query.destination ?? ""}
              placeholder="MHD"
            />
            <input
              className="input"
              name="departureDate"
              defaultValue={query.departureDate ?? ""}
              placeholder="2026-12-01"
            />
            <button className="button" type="submit">
              {t("search")}
            </button>
          </form>
          <div className="list">
            {(routes ?? []).flatMap((route) =>
              route.offers.map((offer) => (
                <a className="row" key={`${route.routeId}-${offer.flightNumber}`} href={offer.deepLink}>
                  <span>
                    {route.originCity} → {route.destinationCity} · {offer.airlineName}{" "}
                    {offer.flightNumber}
                  </span>
                  <span className="price">
                    {formatMoney(offer.price, offer.currency, locale)}
                  </span>
                </a>
              ))
            )}
          </div>
          {!routes?.length && <p className="muted">{t("noResults")}</p>}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
