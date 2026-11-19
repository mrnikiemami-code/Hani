import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { formatIsoDate } from "@/lib/hani/calendar";
import { formatMoney } from "@/lib/hani/money";
import { FlightSearchForm } from "@/features/flights/ui/FlightSearchForm";
import {
  flightAirports,
  flightCabinOptions,
  routeOffers,
  searchFlights
} from "@/features/flights/infrastructure/flights-api";

type SearchParams = {
  origin?: string;
  destination?: string;
  date?: string;
  cabin?: string;
  airline?: string;
  maxStops?: string;
  maxPrice?: string;
};

function isoDate(value: string | undefined): string | undefined {
  return value && /^\d{4}-\d{2}-\d{2}$/.test(value) ? value : undefined;
}

function numberValue(value: string | undefined): number | undefined {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : undefined;
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "flightSearch" });
  return { title: t("resultsTitle"), robots: { index: false, follow: true } };
}

export default async function FlightSearchResultsPage({
  params,
  searchParams
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<SearchParams>;
}) {
  const { locale } = await params;
  const query = await searchParams;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "flightSearch" });
  const date = isoDate(query.date);

  const allRoutes = await searchFlights();
  const airports = flightAirports(allRoutes);
  const cabins = flightCabinOptions(allRoutes);
  const routes = await searchFlights({
    origin: query.origin,
    destination: query.destination,
    departureDate: date,
    cabin: query.cabin,
    airline: query.airline,
    maxStops: numberValue(query.maxStops),
    maxPrice: numberValue(query.maxPrice)
  });
  const results = routeOffers(routes);

  const routeLabel =
    query.origin && query.destination
      ? `${query.origin.toUpperCase()} → ${query.destination.toUpperCase()}`
      : t("allRoutes");

  return (
    <div className="content">
      <div className="container py-5">
        <div className="mb-4">
          <FlightSearchForm
            airports={airports}
            cabins={cabins}
            initial={{
              origin: query.origin,
              destination: query.destination,
              departureDate: date,
              cabin: query.cabin
            }}
          />
        </div>

        <div className="row">
          <div className="col-lg-3">
            <div className="card border-0 shadow-sm mb-4">
              <div className="card-header">
                <h5 className="mb-0">{t("filters")}</h5>
              </div>
              <div className="card-body">
                <form method="get" action={`/${locale}/flights/search`}>
                  {query.origin ? (
                    <input type="hidden" name="origin" value={query.origin} />
                  ) : null}
                  {query.destination ? (
                    <input
                      type="hidden"
                      name="destination"
                      value={query.destination}
                    />
                  ) : null}
                  {date ? <input type="hidden" name="date" value={date} /> : null}
                  <div className="mb-3">
                    <label className="form-label" htmlFor="flight-max-stops">
                      {t("maxStops")}
                    </label>
                    <select
                      id="flight-max-stops"
                      name="maxStops"
                      className="form-select"
                      defaultValue={query.maxStops ?? ""}
                    >
                      <option value="">{t("any")}</option>
                      <option value="0">{t("direct")}</option>
                      <option value="1">{t("oneStop")}</option>
                      <option value="2">{t("twoStops")}</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label" htmlFor="flight-max-price">
                      {t("maxPrice")}
                    </label>
                    <input
                      id="flight-max-price"
                      name="maxPrice"
                      type="number"
                      min="0"
                      className="form-control"
                      defaultValue={query.maxPrice ?? ""}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label" htmlFor="flight-airline">
                      {t("airline")}
                    </label>
                    <input
                      id="flight-airline"
                      name="airline"
                      className="form-control"
                      defaultValue={query.airline ?? ""}
                      placeholder={t("airlinePlaceholder")}
                    />
                  </div>
                  <button type="submit" className="btn btn-primary w-100">
                    {t("applyFilters")}
                  </button>
                </form>
              </div>
            </div>
          </div>

          <div className="col-lg-9">
            <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
              <h4 className="mb-0">{routeLabel}</h4>
              <span className="fs-13 text-gray-6">
                {t("resultCount", { count: results.length })}
              </span>
            </div>

            {results.length === 0 ? (
              <div className="card border-0 shadow-sm">
                <div className="card-body text-center py-5">
                  <h5>{t("noResults")}</h5>
                  <p className="text-gray-6 mb-0">{t("noResultsHint")}</p>
                </div>
              </div>
            ) : (
              <div className="d-flex flex-column gap-3">
                {results.map(({ route, offer }) => (
                  <div
                    className="card border-0 shadow-sm"
                    key={offer.flightOfferId}
                  >
                    <div className="card-body">
                      <div className="row align-items-center g-3">
                        <div className="col-md-4">
                          <div className="d-flex align-items-center gap-2">
                            <span className="avatar avatar-md bg-primary-transparent text-primary rounded-circle">
                              {offer.airlineCode}
                            </span>
                            <div>
                              <strong className="d-block">
                                {offer.airlineName}
                              </strong>
                              <span className="fs-13 text-gray-6" dir="ltr">
                                {offer.flightNumber} · {offer.cabin}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="d-flex align-items-center gap-2">
                            <div>
                              <strong className="d-block" dir="ltr">
                                {offer.departureTime.slice(0, 5)}
                              </strong>
                              <span className="fs-12 text-gray-6">
                                {route.originCode}
                              </span>
                            </div>
                            <div className="flex-grow-1 text-center">
                              <span className="fs-12 text-gray-6 d-block">
                                {Math.floor(offer.durationMinutes / 60)}h{" "}
                                {offer.durationMinutes % 60}m
                              </span>
                              <div className="border-top position-relative my-1">
                                <i className="isax isax-airplane position-absolute top-50 start-50 translate-middle bg-white px-1" />
                              </div>
                              <span className="fs-12 text-gray-6">
                                {offer.stops === 0
                                  ? t("direct")
                                  : t("stops", { count: offer.stops })}
                              </span>
                            </div>
                            <div>
                              <strong className="d-block" dir="ltr">
                                {offer.arrivalTime.slice(0, 5)}
                              </strong>
                              <span className="fs-12 text-gray-6">
                                {route.destinationCode}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-4 text-md-end">
                          <span className="fs-12 text-gray-6 d-block">
                            {formatIsoDate(offer.departureDate, locale, "short")}
                          </span>
                          <strong className="fs-20 d-block">
                            {formatMoney(offer.price, offer.currency, locale)}
                          </strong>
                          <span className="fs-12 text-gray-6 d-block mb-2">
                            {t("provider")}: {offer.provider} ·{" "}
                            {offer.baggageAllowance}
                          </span>
                          <div className="d-flex gap-2 justify-content-md-end">
                            <Link
                              href={`/flights/${encodeURIComponent(route.slug)}`}
                              className="btn btn-light btn-sm"
                            >
                              {t("details")}
                            </Link>
                            <a
                              href={offer.deepLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn btn-primary btn-sm"
                            >
                              {t("bookOnProvider")}
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
