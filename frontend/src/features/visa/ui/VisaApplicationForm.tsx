"use client";

import { useState } from "react";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { HaniDatePicker } from "@/components/hani/date/HaniDatePicker";
import type { IsoDate } from "@/lib/hani/calendar";
import { submitVisaApplication } from "../application/submit-visa-application";
import type { VisaCountryDetail } from "../infrastructure/visa-detail-api";

/** Real visa application form backed by the booking module. */
export function VisaApplicationForm({
  locale,
  visa,
  error
}: {
  locale: string;
  visa: VisaCountryDetail;
  error?: string;
}) {
  const t = useTranslations("visaApplication");
  const [typeId, setTypeId] = useState(visa.types[0]?.visaTypeId ?? "");
  const [dateOfBirth, setDateOfBirth] = useState<IsoDate | null>(null);
  const [travelDate, setTravelDate] = useState<IsoDate | null>(null);
  const selected = visa.types.find((type) => type.visaTypeId === typeId) ?? visa.types[0];

  return (
    <form action={submitVisaApplication} className="card border-0 shadow-sm">
      <input type="hidden" name="locale" value={locale} />
      <input type="hidden" name="slug" value={visa.slug} />
      <input type="hidden" name="countryId" value={visa.countryId} />
      <input type="hidden" name="typeId" value={typeId} />
      <input type="hidden" name="dateOfBirth" value={dateOfBirth ?? ""} />
      <input type="hidden" name="travelDate" value={travelDate ?? ""} />
      <input
        type="hidden"
        name="documents"
        value={selected?.documents.map((document) => document.name).join("|") ?? ""}
      />

      <div className="card-header">
        <h5 className="mb-0">{t("title")} — {visa.name}</h5>
      </div>
      <div className="card-body">
        {error && (
          <div className="alert alert-danger" role="alert">
            {error === "submit"
              ? t("submitError")
              : error === "upload"
                ? t("uploadError")
                : t("required")}
          </div>
        )}
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label" htmlFor="visa-type">
              {t("visaType")}
            </label>
            <select
              id="visa-type"
              className="form-select"
              value={typeId}
              onChange={(event) => setTypeId(event.target.value)}
              required
            >
              {visa.types.map((type) => (
                <option key={type.visaTypeId} value={type.visaTypeId}>
                  {type.code} — {type.entryType} — {type.issuanceType}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-3">
            <label className="form-label" htmlFor="visa-email">
              {t("email")}
            </label>
            <input id="visa-email" name="contactEmail" type="email" className="form-control" dir="ltr" required />
          </div>
          <div className="col-md-3">
            <label className="form-label" htmlFor="visa-phone">
              {t("phone")}
            </label>
            <input id="visa-phone" name="contactPhone" className="form-control" dir="ltr" required />
          </div>

          <div className="col-md-6">
            <label className="form-label" htmlFor="visa-name">
              {t("applicantName")}
            </label>
            <input id="visa-name" name="applicantName" className="form-control" maxLength={200} required />
          </div>
          <div className="col-md-3">
            <label className="form-label" htmlFor="visa-passport">
              {t("passportNo")}
            </label>
            <input id="visa-passport" name="passportNo" className="form-control" dir="ltr" maxLength={40} required />
          </div>
          <div className="col-md-3">
            <label className="form-label" htmlFor="visa-nationality">
              {t("nationality")}
            </label>
            <input id="visa-nationality" name="nationality" className="form-control" defaultValue={t("defaultNationality")} maxLength={80} required />
          </div>

          <div className="col-md-6">
            <label className="form-label">{t("dateOfBirth")}</label>
            <HaniDatePicker
              value={dateOfBirth}
              onChange={setDateOfBirth}
              ariaLabel={t("dateOfBirth")}
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">{t("travelDate")}</label>
            <HaniDatePicker
              value={travelDate}
              onChange={setTravelDate}
              ariaLabel={t("travelDate")}
            />
          </div>
          <div className="col-12">
            <label className="form-label" htmlFor="visa-documents">
              {t("upload")}
            </label>
            <input
              id="visa-documents"
              name="documentFiles"
              type="file"
              className="form-control"
              accept=".pdf,.jpg,.jpeg,.png"
              multiple
              required
            />
            <p className="fs-12 text-gray-5 mb-0 mt-1">{t("uploadHint")}</p>
          </div>
          <div className="col-12">
            <label className="form-label" htmlFor="visa-notes">
              {t("notes")}
            </label>
            <textarea id="visa-notes" name="notes" className="form-control" rows={3} maxLength={2000} />
          </div>
        </div>

        {selected && (
          <div className="alert alert-light mt-3 mb-0">
            <strong>{t("selectedType")}:</strong> {selected.code} · {selected.processingDaysMin}–{selected.processingDaysMax} {t("days")} · {t("documentsHint")}
          </div>
        )}
      </div>
      <div className="card-footer bg-white d-flex justify-content-between align-items-center flex-wrap gap-2">
        <Link href={`/visa/${visa.slug}`} className="btn btn-light">
          {t("back")}
        </Link>
        <button type="submit" className="btn btn-primary">
          {t("submit")}
        </button>
      </div>
    </form>
  );
}
