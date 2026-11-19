"use client";

import { useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { HaniDatePicker } from "@/components/hani/date/HaniDatePicker";
import type { IsoDate } from "@/lib/hani/calendar";

type AirportOption = { code: string; city: string };

/** Real flight metasearch form backed by the flight catalog. */
export function FlightSearchForm({
  airports,
  cabins,
  initial
}: {
  airports: AirportOption[];
  cabins: string[];
  initial?: {
    origin?: string;
    destination?: string;
    departureDate?: string;
    cabin?: string;
  };
}) {
  const t = useTranslations("flightSearch");
  const router = useRouter();
  const [origin, setOrigin] = useState(initial?.origin ?? "");
  const [destination, setDestination] = useState(initial?.destination ?? "");
  const [departureDate, setDepartureDate] = useState<IsoDate | null>(
    (initial?.departureDate as IsoDate | undefined) ?? null
  );
  const [cabin, setCabin] = useState(initial?.cabin ?? "");
  const [error, setError] = useState<string | null>(null);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const from = origin.trim().toUpperCase();
    const to = destination.trim().toUpperCase();
    if (from.length !== 3 || to.length !== 3) {
      setError(t("airportCodeHint"));
      return;
    }
    if (from === to) {
      setError(t("sameAirport"));
      return;
    }
    setError(null);
    const query = new URLSearchParams({ origin: from, destination: to });
    if (departureDate) query.set("date", departureDate);
    if (cabin) query.set("cabin", cabin);
    router.push(`/flights/search?${query.toString()}`);
  }

  return (
    <form onSubmit={submit} className="card border-0 shadow-sm">
      <div className="card-body">
        {error ? (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        ) : null}
        <div className="row g-3 align-items-end">
          <div className="col-lg-3 col-md-6">
            <label className="form-label" htmlFor="flight-origin">
              {t("from")}
            </label>
            <input
              id="flight-origin"
              className="form-control"
              list="flight-airports"
              value={origin}
              onChange={(event) => setOrigin(event.target.value.toUpperCase())}
              placeholder="IKA"
              maxLength={3}
              dir="ltr"
              required
            />
          </div>
          <div className="col-lg-3 col-md-6">
            <label className="form-label" htmlFor="flight-destination">
              {t("to")}
            </label>
            <input
              id="flight-destination"
              className="form-control"
              list="flight-airports"
              value={destination}
              onChange={(event) =>
                setDestination(event.target.value.toUpperCase())
              }
              placeholder="IST"
              maxLength={3}
              dir="ltr"
              required
            />
          </div>
          <div className="col-lg-2 col-md-6">
            <label className="form-label">{t("date")}</label>
            <HaniDatePicker
              value={departureDate}
              onChange={setDepartureDate}
              ariaLabel={t("date")}
              placeholder={t("date")}
            />
          </div>
          <div className="col-lg-2 col-md-6">
            <label className="form-label" htmlFor="flight-cabin">
              {t("cabin")}
            </label>
            <select
              id="flight-cabin"
              className="form-select"
              value={cabin}
              onChange={(event) => setCabin(event.target.value)}
            >
              <option value="">{t("anyCabin")}</option>
              {cabins.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
          <div className="col-lg-2 col-md-12">
            <button type="submit" className="btn btn-primary w-100">
              <i className="isax isax-search-normal-1 me-1" />
              {t("search")}
            </button>
          </div>
        </div>
        <datalist id="flight-airports">
          {airports.map((airport) => (
            <option key={airport.code} value={airport.code}>
              {airport.city}
            </option>
          ))}
        </datalist>
        {airports.length > 0 ? (
          <p className="fs-12 text-gray-5 mb-0 mt-3">
            {t("availableRoutes", {
              airports: airports
                .slice(0, 10)
                .map((airport) => airport.code)
                .join(" · ")
            })}
          </p>
        ) : null}
      </div>
    </form>
  );
}
