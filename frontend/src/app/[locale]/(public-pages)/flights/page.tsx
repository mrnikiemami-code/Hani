import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { formatIsoDate } from "@/lib/hani/calendar";
import { formatMoney } from "@/lib/hani/money";
import { FlightSearchForm } from "@/features/flights/ui/FlightSearchForm";
import {
  flightAirports,
  flightCabinOptions,
  searchFlights
} from "@/features/flights/infrastructure/flights-api";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "flightSearch" });
  return {
    title: t("title"),
    description: t("subtitle"),
    alternates: { canonical: `/${locale}/flights` }
  };
}

export default async function FlightsPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "flightSearch" });
  const routes = await searchFlights();
  const airports = flightAirports(routes);
  const cabins = flightCabinOptions(routes);

  return (
    <>
      <div className="breadcrumb-bar breadcrumb-bg-04">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h2 className="breadcrumb-title mb-2">{t("title")}</h2>
              <p className="mb-0 text-white-50">{t("subtitle")}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="content">
        <div className="container">
          <div className="row justify-content-center mb-5">
            <div className="col-xl-10">
              <FlightSearchForm airports={airports} cabins={cabins} />
            </div>
          </div>

          <div className="d-flex align-items-center justify-content-between mb-3">
            <h4 className="mb-0">{t("popularRoutes")}</h4>
            <span className="fs-13 text-gray-6">
              {t("routeCount", { count: routes.length })}
            </span>
          </div>
          {routes.length === 0 ? (
            <div className="card border-0 shadow-sm">
              <div className="card-body text-center text-gray-6 py-5">
                {t("noRoutes")}
              </div>
            </div>
          ) : (
            <div className="row g-4">
              {routes.slice(0, 12).map((route) => {
                const cheapest = [...route.offers].sort(
                  (a, b) => a.price - b.price
                )[0];
                return (
                  <div className="col-xl-4 col-md-6" key={route.routeId}>
                    <div className="card border-0 shadow-sm h-100">
                      <div className="card-body">
                        <div className="d-flex align-items-center justify-content-between mb-2">
                          <h5 className="mb-0" dir="ltr">
                            {route.originCode} → {route.destinationCode}
                          </h5>
                          <span className="badge badge-soft-info rounded-pill">
                            {t("directOrStops", {
                              count: cheapest?.stops ?? 0
                            })}
                          </span>
                        </div>
                        <p className="fs-14 text-gray-6 mb-2" dir="auto">
                          {route.originCity} — {route.destinationCity}
                        </p>
                        {cheapest ? (
                          <>
                            <span className="d-block fs-18 fw-bold mb-1">
                              {formatMoney(
                                cheapest.price,
                                cheapest.currency,
                                locale
                              )}
                            </span>
                            <span className="fs-13 text-gray-6 d-block mb-3">
                              {cheapest.airlineName} ·{" "}
                              {formatIsoDate(
                                cheapest.departureDate,
                                locale,
                                "short"
                              )}
                            </span>
                          </>
                        ) : null}
                        <Link
                          href={`/flights/${encodeURIComponent(route.slug)}`}
                          className="btn btn-outline-primary btn-sm w-100"
                        >
                          {t("viewOffers")}
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
