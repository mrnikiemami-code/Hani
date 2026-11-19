"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useMessageBox } from "@/components/hani/message-provider";
import { createVisaCountry } from "../application/admin-visa-actions";

const LOCALES = [
  { code: "fa", label: "فارسی" },
  { code: "en", label: "English" },
  { code: "ar", label: "العربية" }
] as const;

/** Creates a visa country with one visa type. */
export function VisaCountryForm() {
  const t = useTranslations("adminVisas");
  const messages = useMessageBox();
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [slug, setSlug] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [coverImageUrl, setCoverImageUrl] = useState("");
  const [translations, setTranslations] = useState<
    Record<string, { name: string; description: string }>
  >({
    fa: { name: "", description: "" },
    en: { name: "", description: "" },
    ar: { name: "", description: "" }
  });
  const [type, setType] = useState({
    code: "Tourist",
    entryType: "Single",
    issuanceType: "Embassy",
    processingDaysMin: "3",
    processingDaysMax: "7",
    validityDays: "30",
    priceAdult: "",
    priceChild: "",
    currency: "IRR"
  });

  const updateTranslation = (
    locale: string,
    key: "name" | "description",
    value: string
  ) =>
    setTranslations((current) => ({
      ...current,
      [locale]: { ...current[locale], [key]: value }
    }));

  const setTypeField = (key: keyof typeof type, value: string) =>
    setType((current) => ({ ...current, [key]: value }));

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!slug.trim() || !countryCode.trim() || !type.priceAdult.trim()) {
      messages.toast({ kind: "error", message: t("required") });
      return;
    }

    const localized = LOCALES.map((item) => ({
      locale: item.code,
      ...translations[item.code]
    })).filter((item) => item.name.trim().length > 0);
    if (localized.length === 0) {
      messages.toast({ kind: "error", message: t("translationRequired") });
      return;
    }

    setPending(true);
    const result = await createVisaCountry({
      slug: slug.trim(),
      countryCode: countryCode.trim().toUpperCase(),
      coverImageUrl: coverImageUrl.trim() || null,
      translations: localized.map((item) => ({
        locale: item.locale,
        name: item.name.trim(),
        description: item.description.trim() || null
      })),
      types: [
        {
          code: type.code,
          entryType: type.entryType,
          issuanceType: type.issuanceType,
          processingDaysMin: Number(type.processingDaysMin),
          processingDaysMax: Number(type.processingDaysMax),
          validityDays: Number(type.validityDays),
          priceAdult: Number(type.priceAdult),
          priceChild: type.priceChild.trim() ? Number(type.priceChild) : null,
          currency: type.currency
        }
      ]
    });
    setPending(false);
    if (!result.ok) {
      messages.toast({ kind: "error", message: t("error") });
      return;
    }
    messages.toast({ kind: "success", message: t("created") });
    router.push("/admin/products/visas");
  };

  return (
    <form className="card border-0 shadow-sm" onSubmit={submit}>
      <div className="card-header">
        <h2 className="h5 mb-0">{t("createCountry")}</h2>
      </div>
      <div className="card-body">
        <div className="row g-3">
          <div className="col-md-4">
            <label className="form-label" htmlFor="visa-slug">{t("slug")}</label>
            <input id="visa-slug" className="form-control" dir="ltr" value={slug} onChange={(e) => setSlug(e.target.value)} required />
          </div>
          <div className="col-md-2">
            <label className="form-label" htmlFor="visa-country-code">{t("countryCode")}</label>
            <input id="visa-country-code" className="form-control" dir="ltr" value={countryCode} onChange={(e) => setCountryCode(e.target.value)} maxLength={2} required />
          </div>
          <div className="col-md-6">
            <label className="form-label" htmlFor="visa-cover">{t("coverImage")}</label>
            <input id="visa-cover" className="form-control" dir="ltr" value={coverImageUrl} onChange={(e) => setCoverImageUrl(e.target.value)} maxLength={1000} />
          </div>
        </div>

        <hr className="my-4" />
        <h3 className="h6 mb-3">{t("localizedContent")}</h3>
        {LOCALES.map((item) => (
          <div className="row g-3 mb-3" key={item.code}>
            <div className="col-md-4">
              <label className="form-label" htmlFor={`visa-name-${item.code}`}>{t("countryName")} — {item.label}</label>
              <input id={`visa-name-${item.code}`} className="form-control" dir={item.code === "en" ? "ltr" : "rtl"} value={translations[item.code].name} onChange={(e) => updateTranslation(item.code, "name", e.target.value)} maxLength={200} />
            </div>
            <div className="col-md-8">
              <label className="form-label" htmlFor={`visa-description-${item.code}`}>{t("description")} — {item.label}</label>
              <textarea id={`visa-description-${item.code}`} className="form-control" rows={2} dir={item.code === "en" ? "ltr" : "rtl"} value={translations[item.code].description} onChange={(e) => updateTranslation(item.code, "description", e.target.value)} maxLength={2000} />
            </div>
          </div>
        ))}

        <hr className="my-4" />
        <h3 className="h6 mb-3">{t("visaType")}</h3>
        <div className="row g-3">
          <div className="col-md-2">
            <label className="form-label" htmlFor="visa-type-code">{t("typeCode")}</label>
            <input id="visa-type-code" className="form-control" value={type.code} onChange={(e) => setTypeField("code", e.target.value)} />
          </div>
          <div className="col-md-2">
            <label className="form-label" htmlFor="visa-entry">{t("entryType")}</label>
            <input id="visa-entry" className="form-control" value={type.entryType} onChange={(e) => setTypeField("entryType", e.target.value)} />
          </div>
          <div className="col-md-2">
            <label className="form-label" htmlFor="visa-issuance">{t("issuanceType")}</label>
            <input id="visa-issuance" className="form-control" value={type.issuanceType} onChange={(e) => setTypeField("issuanceType", e.target.value)} />
          </div>
          <div className="col-md-2">
            <label className="form-label" htmlFor="visa-processing-min">{t("processingMin")}</label>
            <input id="visa-processing-min" type="number" className="form-control" value={type.processingDaysMin} onChange={(e) => setTypeField("processingDaysMin", e.target.value)} />
          </div>
          <div className="col-md-2">
            <label className="form-label" htmlFor="visa-processing-max">{t("processingMax")}</label>
            <input id="visa-processing-max" type="number" className="form-control" value={type.processingDaysMax} onChange={(e) => setTypeField("processingDaysMax", e.target.value)} />
          </div>
          <div className="col-md-2">
            <label className="form-label" htmlFor="visa-validity">{t("validityDays")}</label>
            <input id="visa-validity" type="number" className="form-control" value={type.validityDays} onChange={(e) => setTypeField("validityDays", e.target.value)} />
          </div>
          <div className="col-md-3">
            <label className="form-label" htmlFor="visa-price-adult">{t("priceAdult")}</label>
            <input id="visa-price-adult" type="number" className="form-control" value={type.priceAdult} onChange={(e) => setTypeField("priceAdult", e.target.value)} required />
          </div>
          <div className="col-md-3">
            <label className="form-label" htmlFor="visa-price-child">{t("priceChild")}</label>
            <input id="visa-price-child" type="number" className="form-control" value={type.priceChild} onChange={(e) => setTypeField("priceChild", e.target.value)} />
          </div>
          <div className="col-md-2">
            <label className="form-label" htmlFor="visa-currency">Currency</label>
            <select id="visa-currency" className="form-select" value={type.currency} onChange={(e) => setTypeField("currency", e.target.value)}>
              <option value="IRR">IRR</option>
              <option value="USD">USD</option>
            </select>
          </div>
        </div>
      </div>
      <div className="card-footer bg-white d-flex justify-content-end gap-2">
        <button type="button" className="btn btn-light" onClick={() => router.push("/admin/products/visas")} disabled={pending}>{t("cancel")}</button>
        <button type="submit" className="btn btn-primary" disabled={pending}>{pending ? t("saving") : t("save")}</button>
      </div>
    </form>
  );
}
