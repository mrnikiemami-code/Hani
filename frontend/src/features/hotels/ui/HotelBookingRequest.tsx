"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { HaniDatePicker } from "@/components/hani/date/HaniDatePicker";
import { useMessageBox } from "@/components/hani/message-provider";
import type { IsoDate } from "@/lib/hani/calendar";

const apiBase =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:5099";

/** Hotel reservation request; this is an inquiry, not a live availability hold. */
export function HotelBookingRequest({ hotelId }: { hotelId: string }) {
  const t = useTranslations("hotelDetail");
  const messages = useMessageBox();
  const [checkIn, setCheckIn] = useState<IsoDate | null>(null);
  const [checkOut, setCheckOut] = useState<IsoDate | null>(null);
  const [rooms, setRooms] = useState(1);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [pending, setPending] = useState(false);

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!checkIn || !checkOut) return;
    setPending(true);
    try {
      const response = await fetch(`${apiBase}/market/v1/hotel-inquiries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          hotelId,
          checkIn,
          checkOut,
          rooms,
          adults,
          children,
          contactEmail: email,
          contactPhone: phone,
          notes
        })
      });
      if (!response.ok) throw new Error("failed");
      messages.toast({ kind: "success", message: t("requestSent") });
      setNotes("");
    } catch {
      messages.toast({ kind: "error", message: t("requestError") });
    } finally {
      setPending(false);
    }
  };

  return (
    <form onSubmit={submit} className="card border-0 shadow-sm">
      <div className="card-header">
        <h2 className="h5 mb-1">{t("bookingTitle")}</h2>
        <p className="fs-13 text-gray-6 mb-0">{t("bookingHint")}</p>
      </div>
      <div className="card-body">
        <div className="row g-3">
          <div className="col-6">
            <label className="form-label">{t("checkIn")}</label>
            <HaniDatePicker
              value={checkIn}
              onChange={setCheckIn}
              placeholder={t("checkIn")}
              ariaLabel={t("checkIn")}
              disablePast
            />
          </div>
          <div className="col-6">
            <label className="form-label">{t("checkOut")}</label>
            <HaniDatePicker
              value={checkOut}
              onChange={setCheckOut}
              placeholder={t("checkOut")}
              ariaLabel={t("checkOut")}
              min={checkIn ?? undefined}
            />
          </div>
          <div className="col-4">
            <label className="form-label">{t("rooms")}</label>
            <input
              className="form-control"
              type="number"
              min={1}
              max={10}
              value={rooms}
              onChange={(event) => setRooms(Number(event.target.value))}
            />
          </div>
          <div className="col-4">
            <label className="form-label">{t("adults")}</label>
            <input
              className="form-control"
              type="number"
              min={1}
              max={20}
              value={adults}
              onChange={(event) => setAdults(Number(event.target.value))}
            />
          </div>
          <div className="col-4">
            <label className="form-label">{t("children")}</label>
            <input
              className="form-control"
              type="number"
              min={0}
              max={10}
              value={children}
              onChange={(event) => setChildren(Number(event.target.value))}
            />
          </div>
          <div className="col-12">
            <label className="form-label">{t("email")}</label>
            <input
              className="form-control"
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div className="col-12">
            <label className="form-label">{t("phone")}</label>
            <input
              className="form-control"
              type="tel"
              dir="ltr"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
            />
          </div>
          <div className="col-12">
            <label className="form-label">{t("notes")}</label>
            <textarea
              className="form-control"
              rows={2}
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
            />
          </div>
          <div className="col-12">
            <button
              type="submit"
              className="btn btn-primary w-100"
              disabled={pending || !checkIn || !checkOut}
            >
              {pending ? t("sending") : t("sendRequest")}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
