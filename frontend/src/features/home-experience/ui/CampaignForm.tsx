"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { HaniDatePicker } from "@/components/hani/date/HaniDatePicker";
import { useMessageBox } from "@/components/hani/message-provider";
import type { IsoDate } from "@/lib/hani/calendar";
import { routing } from "@/i18n/routing";
import { createAdminCampaign } from "../application/admin-marketing-actions";

type TranslationForm = {
  title: string;
  description: string;
};

const LOCALES = [
  { code: "fa", label: "فارسی" },
  { code: "en", label: "English" },
  { code: "ar", label: "العربية" }
] as const;

/** Campaign creation form using Gregorian ISO dates from the Jalali picker. */
export function CampaignForm() {
  const t = useTranslations("adminMarketing");
  const messages = useMessageBox();
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [slug, setSlug] = useState("");
  const [startDate, setStartDate] = useState<IsoDate | null>(null);
  const [endDate, setEndDate] = useState<IsoDate | null>(null);
  const [price, setPrice] = useState("");
  const [currency, setCurrency] = useState("IRR");
  const [discountPercent, setDiscountPercent] = useState("");
  const [translations, setTranslations] = useState<Record<string, TranslationForm>>({
    fa: { title: "", description: "" },
    en: { title: "", description: "" },
    ar: { title: "", description: "" }
  });

  const updateTranslation = (
    locale: string,
    field: keyof TranslationForm,
    value: string
  ) => {
    setTranslations((current) => ({
      ...current,
      [locale]: { ...current[locale], [field]: value }
    }));
  };

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!slug.trim() || !startDate || !endDate) {
      messages.toast({ kind: "error", message: t("required") });
      return;
    }

    const startsAt = `${startDate}T00:00:00.000Z`;
    const endsAt = `${endDate}T23:59:59.999Z`;
    if (endsAt <= startsAt) {
      messages.toast({ kind: "error", message: t("dateRangeInvalid") });
      return;
    }

    const localized = LOCALES.map((item) => ({
      locale: item.code,
      title: translations[item.code].title.trim(),
      description: translations[item.code].description.trim()
    })).filter((item) => item.title.length > 0);
    if (localized.length === 0) {
      messages.toast({ kind: "error", message: t("translationRequired") });
      return;
    }

    setPending(true);
    const result = await createAdminCampaign({
      slug: slug.trim(),
      startsAt,
      endsAt,
      price: price.trim() ? Number(price) : null,
      currency: price.trim() ? currency : null,
      discountPercent: discountPercent.trim() ? Number(discountPercent) : null,
      translations: localized,
      faqs: []
    });
    setPending(false);
    if (!result.ok) {
      messages.toast({ kind: "error", message: t("error") });
      return;
    }

    messages.toast({ kind: "success", message: t("created") });
    router.push("/admin/marketing/campaigns");
  };

  return (
    <form className="card border-0 shadow-sm" onSubmit={submit}>
      <div className="card-header">
        <h2 className="h5 mb-0">{t("createTitle")}</h2>
      </div>
      <div className="card-body">
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label" htmlFor="campaign-slug">
              {t("slug")}
            </label>
            <input
              id="campaign-slug"
              className="form-control"
              dir="ltr"
              value={slug}
              onChange={(event) => setSlug(event.target.value)}
              maxLength={120}
              required
            />
          </div>
          <div className="col-md-3">
            <label className="form-label" htmlFor="campaign-start">
              {t("startsAt")}
            </label>
            <HaniDatePicker
              id="campaign-start"
              value={startDate}
              onChange={setStartDate}
              placeholder={t("startsAt")}
              ariaLabel={t("startsAt")}
            />
          </div>
          <div className="col-md-3">
            <label className="form-label" htmlFor="campaign-end">
              {t("endsAt")}
            </label>
            <HaniDatePicker
              id="campaign-end"
              value={endDate}
              onChange={setEndDate}
              min={startDate ?? undefined}
              placeholder={t("endsAt")}
              ariaLabel={t("endsAt")}
            />
          </div>
          <div className="col-md-3">
            <label className="form-label" htmlFor="campaign-price">
              {t("price")}
            </label>
            <input
              id="campaign-price"
              type="number"
              min="0"
              step="1"
              className="form-control"
              value={price}
              onChange={(event) => setPrice(event.target.value)}
            />
          </div>
          <div className="col-md-3">
            <label className="form-label" htmlFor="campaign-currency">
              {t("currency")}
            </label>
            <select
              id="campaign-currency"
              className="form-select"
              value={currency}
              onChange={(event) => setCurrency(event.target.value)}
            >
              <option value="IRR">IRR</option>
              <option value="USD">USD</option>
            </select>
          </div>
          <div className="col-md-3">
            <label className="form-label" htmlFor="campaign-discount">
              {t("discountPercent")}
            </label>
            <input
              id="campaign-discount"
              type="number"
              min="0"
              max="100"
              step="0.1"
              className="form-control"
              value={discountPercent}
              onChange={(event) => setDiscountPercent(event.target.value)}
            />
          </div>
        </div>

        <hr className="my-4" />
        <h3 className="h6 mb-3">{t("localizedContent")}</h3>
        {LOCALES.map((item) => (
          <div className="row g-3 mb-3" key={item.code}>
            <div className="col-md-4">
              <label className="form-label" htmlFor={`campaign-title-${item.code}`}>
                {t("title")} — {item.label}
              </label>
              <input
                id={`campaign-title-${item.code}`}
                className="form-control"
                dir={item.code === "en" ? "ltr" : "rtl"}
                value={translations[item.code].title}
                onChange={(event) =>
                  updateTranslation(item.code, "title", event.target.value)
                }
                maxLength={300}
              />
            </div>
            <div className="col-md-8">
              <label
                className="form-label"
                htmlFor={`campaign-description-${item.code}`}
              >
                {t("description")} — {item.label}
              </label>
              <textarea
                id={`campaign-description-${item.code}`}
                className="form-control"
                dir={item.code === "en" ? "ltr" : "rtl"}
                rows={2}
                value={translations[item.code].description}
                onChange={(event) =>
                  updateTranslation(item.code, "description", event.target.value)
                }
                maxLength={2000}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="card-footer bg-white d-flex justify-content-end gap-2">
        <button
          type="button"
          className="btn btn-light"
          onClick={() => router.push("/admin/marketing/campaigns")}
          disabled={pending}
        >
          {t("cancel")}
        </button>
        <button type="submit" className="btn btn-primary" disabled={pending}>
          {pending ? t("saving") : t("save")}
        </button>
      </div>
    </form>
  );
}
