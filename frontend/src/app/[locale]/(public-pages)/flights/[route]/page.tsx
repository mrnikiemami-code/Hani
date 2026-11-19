import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { formatIsoDate } from "@/lib/hani/calendar";
import { formatMoney } from "@/lib/hani/money";
import { getFlightRoute } from "@/features/flights/infrastructure/flights-api";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string; route: string }>;
}): Promise<Metadata> {
  const { locale, route } = await params;
  const flight = await getFlightRoute(route);
  const t = await getTranslations({ locale, namespace: "flightSearch" });
  return {
    title: flight
      ? `${flight.originCode} → ${flight.destinationCode} | ${t("title")}`
      : t("title"),
    robots: { index: false, follow: true }
  };
}

export default async function FlightRoutePage({
  params
}: {
  params: Promise<{ locale: string; route: string }>;
}) {
  const { locale, route } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "flightSearch" });
  const flight = await getFlightRoute(route);
  if (!flight) notFound();

  return (
    <div className="content">
      <div className="container py-5">
        <div className="d-flex justify-content-between align-items-start flex-wrap gap-3 mb-4">
          <div>
            <h3 className="mb-1" dir="ltr">
              {flight.originCode} → {flight.destinationCode}
            </h3>
            <p className="text-gray-6 mb-0" dir="auto">
              {flight.originCity} — {flight.destinationCity}
            </p>
          </div>
          <Link
            href={`/flights/search?origin=${encodeURIComponent(flight.originCode)}&destination=${encodeURIComponent(flight.destinationCode)}`}
            className="btn btn-light"
          >
            {t("searchThisRoute")}
          </Link>
        </div>

        {flight.offers.length === 0 ? (
          <div className="card border-0 shadow-sm">
            <div className="card-body text-center py-5 text-gray-6">
              {t("noResults")}
            </div>
          </div>
        ) : (
          <div className="d-flex flex-column gap-3">
            {flight.offers.map((offer) => (
              <div className="card border-0 shadow-sm" key={offer.flightOfferId}>
                <div className="card-body">
                  <div className="row align-items-center g-3">
                    <div className="col-md-4">
                      <strong className="d-block">{offer.airlineName}</strong>
                      <span className="fs-13 text-gray-6" dir="ltr">
                        {offer.flightNumber} · {offer.cabin} ·{" "}
                        {offer.baggageAllowance}
                      </span>
                    </div>
                    <div className="col-md-4">
                      <span className="d-block" dir="ltr">
                        {offer.departureTime.slice(0, 5)} —{" "}
                        {offer.arrivalTime.slice(0, 5)}
                      </span>
                      <span className="fs-13 text-gray-6">
                        {formatIsoDate(offer.departureDate, locale, "short")} ·{" "}
                        {offer.stops === 0
                          ? t("direct")
                          : t("stops", { count: offer.stops })}
                      </span>
                    </div>
                    <div className="col-md-4 text-md-end">
                      <strong className="fs-20 d-block">
                        {formatMoney(offer.price, offer.currency, locale)}
                      </strong>
                      <a
                        href={offer.deepLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary btn-sm mt-2"
                      >
                        {t("bookOnProvider")}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
