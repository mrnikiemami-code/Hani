"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { HaniDatePicker } from "@/components/hani/date/HaniDatePicker";
import { useMessageBox } from "@/components/hani/message-provider";
import type { IsoDate } from "@/lib/hani/calendar";
import { createFlightRoute, updateFlightRoute } from "../application/admin-flight-actions";
import type { AdminFlightRouteDetail } from "../domain/admin-flight";

/** Creates or edits a flight route with one provider offer. */
export function FlightRouteForm({
  initial,
  edit = false
}: {
  initial?: AdminFlightRouteDetail;
  edit?: boolean;
} = {}) {
  const t = useTranslations("adminFlights");
  const messages = useMessageBox();
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const firstOffer = initial?.offers[0];
  const [date, setDate] = useState<IsoDate | null>(
    (firstOffer?.departureDate as IsoDate | undefined) ?? null
  );
  const [isActive, setIsActive] = useState(initial?.isActive ?? true);
  const [form, setForm] = useState({
    slug: initial?.slug ?? "",
    originCode: initial?.originCode ?? "",
    destinationCode: initial?.destinationCode ?? "",
    originCity: initial?.originCity ?? "",
    destinationCity: initial?.destinationCity ?? "",
    flightNumber: firstOffer?.flightNumber ?? "",
    airlineCode: firstOffer?.airlineCode ?? "",
    airlineName: firstOffer?.airlineName ?? "",
    departureTime: firstOffer?.departureTime?.slice(0, 5) ?? "10:00",
    arrivalTime: firstOffer?.arrivalTime?.slice(0, 5) ?? "12:00",
    durationMinutes: String(firstOffer?.durationMinutes ?? 120),
    stops: String(firstOffer?.stops ?? 0),
    cabin: firstOffer?.cabin ?? "Economy",
    baggageAllowance: firstOffer?.baggageAllowance ?? "20kg",
    price: firstOffer ? String(firstOffer.price) : "",
    currency: firstOffer?.currency ?? "IRR",
    provider: firstOffer?.provider ?? "Mock",
    deepLink: firstOffer?.deepLink ?? "https://"
  });

  const set = (key: keyof typeof form, value: string) =>
    setForm((current) => ({ ...current, [key]: value }));

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!edit && (!form.slug.trim() || !date || !form.price.trim())) {
      messages.toast({ kind: "error", message: t("required") });
      return;
    }

    setPending(true);
    const payload = {
      slug: form.slug.trim(),
      originCode: form.originCode.trim().toUpperCase(),
      destinationCode: form.destinationCode.trim().toUpperCase(),
      originCity: form.originCity.trim(),
      destinationCity: form.destinationCity.trim(),
      isActive,
      offers: [
        {
          flightNumber: form.flightNumber.trim(),
          airlineCode: form.airlineCode.trim().toUpperCase(),
          airlineName: form.airlineName.trim(),
          departureDate: date ?? "",
          departureTime: form.departureTime,
          arrivalTime: form.arrivalTime,
          durationMinutes: Number(form.durationMinutes),
          stops: Number(form.stops),
          cabin: form.cabin,
          baggageAllowance: form.baggageAllowance,
          price: Number(form.price),
          currency: form.currency,
          provider: form.provider,
          deepLink: form.deepLink.trim()
        }
      ]
    };
    const result = edit && initial
      ? await updateFlightRoute(initial.routeId, payload)
      : await createFlightRoute(payload);
    setPending(false);
    if (!result.ok) {
      messages.toast({ kind: "error", message: t("error") });
      return;
    }
    messages.toast({
      kind: "success",
      message: edit ? t("updated") : t("created")
    });
    router.push("/admin/products/flights");
  };

  return (
    <form className="card border-0 shadow-sm" onSubmit={submit}>
      <div className="card-header">
        <h2 className="h5 mb-0">{edit ? t("editRoute") : t("createRoute")}</h2>
      </div>
      <div className="card-body">
        <div className="row g-3">
          <div className="col-md-4">
            <label className="form-label" htmlFor="flight-slug">{t("slug")}</label>
            <input id="flight-slug" className="form-control" dir="ltr" value={form.slug} onChange={(e) => set("slug", e.target.value)} required disabled={edit} />
          </div>
          <div className="col-md-2">
            <label className="form-label" htmlFor="flight-origin">Origin IATA</label>
            <input id="flight-origin" className="form-control" dir="ltr" value={form.originCode} onChange={(e) => set("originCode", e.target.value)} />
          </div>
          <div className="col-md-2">
            <label className="form-label" htmlFor="flight-destination">Destination IATA</label>
            <input id="flight-destination" className="form-control" dir="ltr" value={form.destinationCode} onChange={(e) => set("destinationCode", e.target.value)} />
          </div>
          <div className="col-md-2">
            <label className="form-label" htmlFor="flight-origin-city">Origin city</label>
            <input id="flight-origin-city" className="form-control" value={form.originCity} onChange={(e) => set("originCity", e.target.value)} />
          </div>
          <div className="col-md-2">
            <label className="form-label" htmlFor="flight-destination-city">Destination city</label>
            <input id="flight-destination-city" className="form-control" value={form.destinationCity} onChange={(e) => set("destinationCity", e.target.value)} />
          </div>
          <div className="col-md-3">
            <label className="form-label" htmlFor="flight-number">{t("flightNumber")}</label>
            <input id="flight-number" className="form-control" dir="ltr" value={form.flightNumber} onChange={(e) => set("flightNumber", e.target.value)} />
          </div>
          <div className="col-md-3">
            <label className="form-label" htmlFor="flight-airline-code">Airline IATA</label>
            <input id="flight-airline-code" className="form-control" dir="ltr" value={form.airlineCode} onChange={(e) => set("airlineCode", e.target.value)} />
          </div>
          <div className="col-md-3">
            <label className="form-label" htmlFor="flight-airline-name">Airline name</label>
            <input id="flight-airline-name" className="form-control" value={form.airlineName} onChange={(e) => set("airlineName", e.target.value)} />
          </div>
          <div className="col-md-3">
            <label className="form-label" htmlFor="flight-date">{t("departureDate")}</label>
            <HaniDatePicker id="flight-date" value={date} onChange={setDate} placeholder={t("departureDate")} ariaLabel={t("departureDate")} />
          </div>
          <div className="col-md-2">
            <label className="form-label" htmlFor="flight-dep">Departure</label>
            <input id="flight-dep" type="time" className="form-control" value={form.departureTime} onChange={(e) => set("departureTime", e.target.value)} />
          </div>
          <div className="col-md-2">
            <label className="form-label" htmlFor="flight-arr">Arrival</label>
            <input id="flight-arr" type="time" className="form-control" value={form.arrivalTime} onChange={(e) => set("arrivalTime", e.target.value)} />
          </div>
          <div className="col-md-2">
            <label className="form-label" htmlFor="flight-duration">{t("duration")}</label>
            <input id="flight-duration" type="number" className="form-control" value={form.durationMinutes} onChange={(e) => set("durationMinutes", e.target.value)} />
          </div>
          <div className="col-md-2">
            <label className="form-label" htmlFor="flight-stops">Stops</label>
            <input id="flight-stops" type="number" className="form-control" value={form.stops} onChange={(e) => set("stops", e.target.value)} />
          </div>
          <div className="col-md-2">
            <label className="form-label" htmlFor="flight-cabin">Cabin</label>
            <input id="flight-cabin" className="form-control" value={form.cabin} onChange={(e) => set("cabin", e.target.value)} />
          </div>
          <div className="col-md-2">
            <label className="form-label" htmlFor="flight-baggage">Baggage</label>
            <input id="flight-baggage" className="form-control" value={form.baggageAllowance} onChange={(e) => set("baggageAllowance", e.target.value)} />
          </div>
          <div className="col-md-2">
            <label className="form-label" htmlFor="flight-price">{t("price")}</label>
            <input id="flight-price" type="number" className="form-control" value={form.price} onChange={(e) => set("price", e.target.value)} required />
          </div>
          <div className="col-md-2">
            <label className="form-label" htmlFor="flight-currency">Currency</label>
            <select id="flight-currency" className="form-select" value={form.currency} onChange={(e) => set("currency", e.target.value)}>
              <option value="IRR">IRR</option>
              <option value="USD">USD</option>
            </select>
          </div>
          <div className="col-md-3">
            <label className="form-label" htmlFor="flight-provider">Provider</label>
            <input id="flight-provider" className="form-control" value={form.provider} onChange={(e) => set("provider", e.target.value)} />
          </div>
          <div className="col-md-5">
            <label className="form-label" htmlFor="flight-deeplink">Deep link</label>
            <input id="flight-deeplink" className="form-control" dir="ltr" value={form.deepLink} onChange={(e) => set("deepLink", e.target.value)} />
          </div>
        </div>
      </div>
      <div className="card-footer bg-white d-flex justify-content-end gap-2">
        <button type="button" className="btn btn-light" onClick={() => router.push("/admin/products/flights")} disabled={pending}>{t("cancel")}</button>
        <button type="submit" className="btn btn-primary" disabled={pending}>{pending ? t("saving") : t("save")}</button>
      </div>
    </form>
  );
}
