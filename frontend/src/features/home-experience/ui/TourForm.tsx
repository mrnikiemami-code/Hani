"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useMessageBox } from "@/components/hani/message-provider";
import type { AdminTourCreateInput, AdminTourDetail } from "../domain/admin-tour";
import {
  createAdminTour,
  updateAdminTour
} from "../application/admin-tour-actions";

const LOCALES = [
  { code: "fa", label: "فارسی" },
  { code: "en", label: "English" },
  { code: "ar", label: "العربية" }
] as const;

/** Create or edit a shared tour product. */
export function TourForm({
  initial,
  edit = false
}: {
  initial?: AdminTourDetail;
  edit?: boolean;
} = {}) {
  const t = useTranslations("adminTours");
  const messages = useMessageBox();
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [durationDays, setDurationDays] = useState(
    String(initial?.durationDays ?? 3)
  );
  const [tourType, setTourType] = useState(initial?.tourType ?? "Cultural");
  const [scope, setScope] = useState(initial?.scope ?? "Foreign");
  const [category, setCategory] = useState(initial?.category ?? "Normal");
  const [travelType, setTravelType] = useState(initial?.travelType ?? "Other");
  const [coverImageUrl, setCoverImageUrl] = useState(initial?.coverImageUrl ?? "");
  const [destinationIds, setDestinationIds] = useState("");
  const [translations, setTranslations] = useState<
    Record<string, { title: string; summary: string; description: string }>
  >(() => {
    const base = {
      fa: { title: "", summary: "", description: "" },
      en: { title: "", summary: "", description: "" },
      ar: { title: "", summary: "", description: "" }
    };
    for (const item of initial?.translations ?? []) {
      if (item.locale in base) {
        base[item.locale as keyof typeof base] = {
          title: item.title,
          summary: item.summary,
          description: item.description
        };
      }
    }
    return base;
  });

  const updateTranslation = (
    locale: string,
    key: "title" | "summary" | "description",
    value: string
  ) =>
    setTranslations((current) => ({
      ...current,
      [locale]: { ...current[locale], [key]: value }
    }));

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!edit && (!slug.trim() || Number(durationDays) <= 0)) {
      messages.toast({ kind: "error", message: t("required") });
      return;
    }

    const localized = LOCALES.map((item) => ({
      locale: item.code,
      ...translations[item.code]
    })).filter((item) => item.title.trim().length > 0);
    if (localized.length === 0) {
      messages.toast({ kind: "error", message: t("translationRequired") });
      return;
    }

    const input: AdminTourCreateInput = {
      slug: slug.trim(),
      durationDays: Number(durationDays),
      tourType,
      scope,
      category,
      travelType,
      coverImageUrl: coverImageUrl.trim() || null,
      destinationIds: destinationIds
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
      translations: localized.map((item) => ({
        locale: item.locale,
        title: item.title.trim(),
        summary: item.summary.trim(),
        description: item.description.trim()
      }))
    };

    setPending(true);
    const result = edit && initial
      ? await updateAdminTour(initial.id, {
          durationDays: input.durationDays,
          tourType: input.tourType,
          scope: input.scope,
          category: input.category,
          travelType: input.travelType,
          coverImageUrl: input.coverImageUrl,
          translations: input.translations
        })
      : await createAdminTour(input);
    setPending(false);
    if (!result.ok) {
      messages.toast({ kind: "error", message: t("error") });
      return;
    }
    messages.toast({
      kind: "success",
      message: edit ? t("updated") : t("created")
    });
    router.push("/admin/products/tours");
  };

  return (
    <form className="card border-0 shadow-sm" onSubmit={submit}>
      <div className="card-header">
        <h2 className="h5 mb-0">{edit ? t("editTitle") : t("createTitle")}</h2>
      </div>
      <div className="card-body">
        <div className="row g-3">
          <div className="col-md-4">
            <label className="form-label" htmlFor="tour-slug">{t("slug")}</label>
            <input id="tour-slug" className="form-control" dir="ltr" value={slug} onChange={(e) => setSlug(e.target.value)} maxLength={180} required disabled={edit} />
          </div>
          <div className="col-md-2">
            <label className="form-label" htmlFor="tour-duration">{t("duration")}</label>
            <input id="tour-duration" type="number" min="1" className="form-control" value={durationDays} onChange={(e) => setDurationDays(e.target.value)} required />
          </div>
          <div className="col-md-3">
            <label className="form-label" htmlFor="tour-type">{t("tourType")}</label>
            <input id="tour-type" className="form-control" value={tourType} onChange={(e) => setTourType(e.target.value)} required />
          </div>
          <div className="col-md-3">
            <label className="form-label" htmlFor="tour-cover">{t("coverImage")}</label>
            <input id="tour-cover" className="form-control" dir="ltr" value={coverImageUrl} onChange={(e) => setCoverImageUrl(e.target.value)} maxLength={1000} />
          </div>
          <div className="col-md-3">
            <label className="form-label" htmlFor="tour-scope">{t("scope")}</label>
            <select id="tour-scope" className="form-select" value={scope} onChange={(e) => setScope(e.target.value)}>
              <option value="Foreign">{t("scopeForeign")}</option>
              <option value="Domestic">{t("scopeDomestic")}</option>
            </select>
          </div>
          <div className="col-md-3">
            <label className="form-label" htmlFor="tour-category">{t("category")}</label>
            <select id="tour-category" className="form-select" value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="Normal">{t("categoryNormal")}</option>
              <option value="Luxury">{t("categoryLuxury")}</option>
              <option value="Budget">{t("categoryBudget")}</option>
              <option value="Adventure">{t("categoryAdventure")}</option>
            </select>
          </div>
          <div className="col-md-3">
            <label className="form-label" htmlFor="tour-travel">{t("travelType")}</label>
            <input id="tour-travel" className="form-control" value={travelType} onChange={(e) => setTravelType(e.target.value)} />
          </div>
          <div className="col-md-3">
            <label className="form-label" htmlFor="tour-destinations">{t("destinations")}</label>
            <input id="tour-destinations" className="form-control" dir="ltr" value={destinationIds} onChange={(e) => setDestinationIds(e.target.value)} placeholder="guid,guid" disabled={edit} />
          </div>
        </div>

        <hr className="my-4" />
        <h3 className="h6 mb-3">{t("localizedContent")}</h3>
        {LOCALES.map((item) => (
          <div className="row g-3 mb-3" key={item.code}>
            <div className="col-md-3">
              <label className="form-label" htmlFor={`tour-title-${item.code}`}>{t("title")} — {item.label}</label>
              <input id={`tour-title-${item.code}`} className="form-control" dir={item.code === "en" ? "ltr" : "rtl"} value={translations[item.code].title} onChange={(e) => updateTranslation(item.code, "title", e.target.value)} maxLength={300} />
            </div>
            <div className="col-md-3">
              <label className="form-label" htmlFor={`tour-summary-${item.code}`}>{t("summary")} — {item.label}</label>
              <textarea id={`tour-summary-${item.code}`} className="form-control" rows={2} dir={item.code === "en" ? "ltr" : "rtl"} value={translations[item.code].summary} onChange={(e) => updateTranslation(item.code, "summary", e.target.value)} maxLength={1000} />
            </div>
            <div className="col-md-6">
              <label className="form-label" htmlFor={`tour-description-${item.code}`}>{t("description")} — {item.label}</label>
              <textarea id={`tour-description-${item.code}`} className="form-control" rows={2} dir={item.code === "en" ? "ltr" : "rtl"} value={translations[item.code].description} onChange={(e) => updateTranslation(item.code, "description", e.target.value)} maxLength={4000} />
            </div>
          </div>
        ))}
      </div>
      <div className="card-footer bg-white d-flex justify-content-end gap-2">
        <button type="button" className="btn btn-light" onClick={() => router.push("/admin/products/tours")} disabled={pending}>{t("cancel")}</button>
        <button type="submit" className="btn btn-primary" disabled={pending}>{pending ? t("saving") : t("save")}</button>
      </div>
    </form>
  );
}
