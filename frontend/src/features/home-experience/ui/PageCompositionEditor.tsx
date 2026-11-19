"use client";

import { useState, useTransition } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useMessageBox } from "@/components/hani/message-provider";
import type { MediaAsset } from "../domain/media";
import {
  normalizePageComposition,
  type PageCompositionData,
  type PageSection,
  type PageSectionType
} from "../domain/page-composition";
import {
  publishPageComposition,
  savePageComposition
} from "../application/page-composition-actions";

const SECTION_TYPES: PageSectionType[] = [
  "hero",
  "banner",
  "richText",
  "cardGrid",
  "tourCollection",
  "visaCollection",
  "hotelCollection",
  "contentEntry",
  "cta",
  "faq",
  "testimonials",
  "stats",
  "gallery",
  "customHtml"
];

const SECTION_TYPE_KEYS: Record<PageSectionType, string> = {
  hero: "sectionTypeHero",
  banner: "sectionTypeBanner",
  richText: "sectionTypeRichText",
  cardGrid: "sectionTypeCardGrid",
  tourCollection: "sectionTypeTourCollection",
  visaCollection: "sectionTypeVisaCollection",
  hotelCollection: "sectionTypeHotelCollection",
  contentEntry: "sectionTypeContentEntry",
  cta: "sectionTypeCta",
  faq: "sectionTypeFaq",
  testimonials: "sectionTypeTestimonials",
  stats: "sectionTypeStats",
  gallery: "sectionTypeGallery",
  customHtml: "sectionTypeCustomHtml"
};

function newSection(index: number): PageSection {
  return {
    id: `section-${Date.now()}-${index}`,
    type: "richText",
    enabled: true,
    order: (index + 1) * 10,
    title: "",
    subtitle: "",
    body: "",
    mediaId: null,
    fallbackImageUrl: "",
    ctaLabel: "",
    ctaHref: "",
    sourceMode: "auto",
    sourceIds: []
  };
}

export function PageCompositionEditor({
  pageKey,
  locale,
  initialData,
  mediaAssets
}: {
  pageKey: string;
  locale: string;
  initialData: PageCompositionData;
  mediaAssets: MediaAsset[];
}) {
  const t = useTranslations("adminPages");
  const messages = useMessageBox();
  const router = useRouter();
  const [data, setData] = useState(() =>
    normalizePageComposition(initialData)
  );
  const [pending, startTransition] = useTransition();

  const mediaUrl = (mediaId: string | null, fallback: string) =>
    mediaAssets.find((asset) => asset.id === mediaId)?.url ?? fallback;

  const updateHero = (
    key: keyof PageCompositionData["hero"],
    value: string | number | null
  ) =>
    setData((current) => ({
      ...current,
      hero: { ...current.hero, [key]: value }
    }));

  const updateSeo = (
    key: keyof PageCompositionData["seo"],
    value: string | boolean
  ) =>
    setData((current) => ({
      ...current,
      seo: { ...current.seo, [key]: value }
    }));

  const updateSection = (
    id: string,
    patch: Partial<PageSection>
  ) =>
    setData((current) => ({
      ...current,
      sections: current.sections.map((section) =>
        section.id === id ? { ...section, ...patch } : section
      )
    }));

  const moveSection = (index: number, direction: -1 | 1) => {
    setData((current) => {
      const next = [...current.sections];
      const target = index + direction;
      if (target < 0 || target >= next.length) return current;
      [next[index], next[target]] = [next[target], next[index]];
      return {
        ...current,
        sections: next.map((section, order) => ({
          ...section,
          order: (order + 1) * 10
        }))
      };
    });
  };

  const addSection = () =>
    setData((current) => ({
      ...current,
      sections: [...current.sections, newSection(current.sections.length)]
    }));

  const removeSection = (id: string) =>
    setData((current) => ({
      ...current,
      sections: current.sections
        .filter((section) => section.id !== id)
        .map((section, index) => ({ ...section, order: (index + 1) * 10 }))
    }));

  const save = (publish: boolean) => {
    startTransition(async () => {
      const saved = await savePageComposition(pageKey, locale, data);
      if (!saved.ok) {
        messages.toast({ kind: "error", message: t("saveError") });
        return;
      }
      if (publish) {
        const published = await publishPageComposition(pageKey, locale);
        if (!published.ok) {
          messages.toast({ kind: "error", message: t("publishError") });
          return;
        }
      }
      messages.toast({
        kind: "success",
        message: publish ? t("published") : t("saved")
      });
      router.refresh();
    });
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-4">
        <div>
          <h2 className="h4 mb-1">{t("builderTitle")}</h2>
          <p className="text-gray-6 mb-0">{t("builderHint")}</p>
        </div>
        <div className="d-flex gap-2">
          <button
            type="button"
            className="btn btn-light"
            disabled={pending}
            onClick={() => save(false)}
          >
            {pending ? t("saving") : t("saveDraft")}
          </button>
          <button
            type="button"
            className="btn btn-primary"
            disabled={pending}
            onClick={() => save(true)}
          >
            {t("publish")}
          </button>
        </div>
      </div>

      <div className="row g-4">
        <div className="col-xl-8">
          <div className="card border-0 shadow-sm mb-4">
            <div className="card-header">
              <h3 className="h5 mb-0">{t("heroSection")}</h3>
            </div>
            <div className="card-body">
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label" htmlFor="hero-title">
                    {t("fieldTitle")}
                  </label>
                  <input
                    id="hero-title"
                    className="form-control"
                    value={data.hero.title}
                    onChange={(event) => updateHero("title", event.target.value)}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label" htmlFor="hero-subtitle">
                    {t("fieldSubtitle")}
                  </label>
                  <input
                    id="hero-subtitle"
                    className="form-control"
                    value={data.hero.subtitle}
                    onChange={(event) =>
                      updateHero("subtitle", event.target.value)
                    }
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label" htmlFor="hero-media">
                    {t("image")}
                  </label>
                  <select
                    id="hero-media"
                    className="form-select"
                    value={data.hero.mediaId ?? ""}
                    onChange={(event) => {
                      const asset = mediaAssets.find(
                        (item) => item.id === event.target.value
                      );
                      updateHero("mediaId", event.target.value || null);
                      if (asset) updateHero("fallbackImageUrl", asset.url);
                    }}
                  >
                    <option value="">{t("noMedia")}</option>
                    {mediaAssets.map((asset) => (
                      <option key={asset.id} value={asset.id}>
                        {asset.altText || asset.originalFileName}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-6">
                  <label className="form-label" htmlFor="hero-fallback">
                    {t("fallbackImage")}
                  </label>
                  <input
                    id="hero-fallback"
                    className="form-control"
                    dir="ltr"
                    value={data.hero.fallbackImageUrl}
                    onChange={(event) =>
                      updateHero("fallbackImageUrl", event.target.value)
                    }
                  />
                </div>
                <div className="col-md-3">
                  <label className="form-label" htmlFor="hero-cta-label">
                    {t("ctaLabel")}
                  </label>
                  <input
                    id="hero-cta-label"
                    className="form-control"
                    value={data.hero.ctaLabel}
                    onChange={(event) =>
                      updateHero("ctaLabel", event.target.value)
                    }
                  />
                </div>
                <div className="col-md-5">
                  <label className="form-label" htmlFor="hero-cta-href">
                    {t("ctaHref")}
                  </label>
                  <input
                    id="hero-cta-href"
                    className="form-control"
                    dir="ltr"
                    value={data.hero.ctaHref}
                    onChange={(event) =>
                      updateHero("ctaHref", event.target.value)
                    }
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label" htmlFor="hero-overlay">
                    {t("overlay")}
                  </label>
                  <input
                    id="hero-overlay"
                    type="number"
                    min={0}
                    max={100}
                    className="form-control"
                    value={data.hero.overlay}
                    onChange={(event) =>
                      updateHero("overlay", Number(event.target.value))
                    }
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="card border-0 shadow-sm">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h3 className="h5 mb-0">{t("sections")}</h3>
              <button
                type="button"
                className="btn btn-light btn-sm"
                onClick={addSection}
              >
                {t("addSection")}
              </button>
            </div>
            <div className="card-body">
              {data.sections.length === 0 ? (
                <p className="text-gray-6 mb-0">{t("emptySections")}</p>
              ) : (
                <div className="d-flex flex-column gap-3">
                  {data.sections.map((section, index) => (
                    <div className="border rounded p-3" key={section.id}>
                      <div className="row g-3">
                        <div className="col-md-3">
                          <label className="form-label">
                            {t("sectionType")}
                          </label>
                          <select
                            className="form-select"
                            value={section.type}
                            onChange={(event) =>
                              updateSection(section.id, {
                                type: event.target.value as PageSectionType
                              })
                            }
                          >
                            {SECTION_TYPES.map((type) => (
                              <option key={type} value={type}>
                                {t(SECTION_TYPE_KEYS[type])}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="col-md-4">
                          <label className="form-label">{t("fieldTitle")}</label>
                          <input
                            className="form-control"
                            value={section.title}
                            onChange={(event) =>
                              updateSection(section.id, {
                                title: event.target.value
                              })
                            }
                          />
                        </div>
                        <div className="col-md-5">
                          <label className="form-label">{t("fieldSubtitle")}</label>
                          <input
                            className="form-control"
                            value={section.subtitle}
                            onChange={(event) =>
                              updateSection(section.id, {
                                subtitle: event.target.value
                              })
                            }
                          />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label">{t("image")}</label>
                          <select
                            className="form-select"
                            value={section.mediaId ?? ""}
                            onChange={(event) => {
                              const asset = mediaAssets.find(
                                (item) => item.id === event.target.value
                              );
                              updateSection(section.id, {
                                mediaId: event.target.value || null,
                                fallbackImageUrl: asset?.url ?? section.fallbackImageUrl
                              });
                            }}
                          >
                            <option value="">{t("noMedia")}</option>
                            {mediaAssets.map((asset) => (
                              <option key={asset.id} value={asset.id}>
                                {asset.altText || asset.originalFileName}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="col-md-3">
                          <label className="form-label">{t("ctaLabel")}</label>
                          <input
                            className="form-control"
                            value={section.ctaLabel}
                            onChange={(event) =>
                              updateSection(section.id, {
                                ctaLabel: event.target.value
                              })
                            }
                          />
                        </div>
                        <div className="col-md-3">
                          <label className="form-label">{t("ctaHref")}</label>
                          <input
                            className="form-control"
                            dir="ltr"
                            value={section.ctaHref}
                            onChange={(event) =>
                              updateSection(section.id, {
                                ctaHref: event.target.value
                              })
                            }
                          />
                        </div>
                      </div>
                      <div className="d-flex justify-content-between align-items-center mt-3">
                        <div className="form-check form-switch">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            role="switch"
                            id={`section-${section.id}`}
                            checked={section.enabled}
                            onChange={(event) =>
                              updateSection(section.id, {
                                enabled: event.target.checked
                              })
                            }
                          />
                          <label
                            className="form-check-label"
                            htmlFor={`section-${section.id}`}
                          >
                            {section.enabled ? t("visible") : t("hidden")}
                          </label>
                        </div>
                        <div className="d-flex gap-2">
                          <button
                            type="button"
                            className="btn btn-light btn-sm"
                            disabled={index === 0}
                            onClick={() => moveSection(index, -1)}
                          >
                            {t("moveUp")}
                          </button>
                          <button
                            type="button"
                            className="btn btn-light btn-sm"
                            disabled={index === data.sections.length - 1}
                            onClick={() => moveSection(index, 1)}
                          >
                            {t("moveDown")}
                          </button>
                          <button
                            type="button"
                            className="btn btn-danger btn-sm"
                            onClick={() => removeSection(section.id)}
                          >
                            {t("remove")}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="col-xl-4">
          <div className="card border-0 shadow-sm mb-4">
            <div className="card-header">
              <h3 className="h5 mb-0">{t("preview")}</h3>
            </div>
            <div className="card-body">
              <div
                className="rounded overflow-hidden p-3 d-flex flex-column justify-content-end"
                style={{
                  minHeight: 180,
                  color: "#fff",
                  background: `linear-gradient(rgba(0,0,0,${data.hero.overlay / 100}), rgba(0,0,0,${data.hero.overlay / 100})), center / cover no-repeat url("${mediaUrl(data.hero.mediaId, data.hero.fallbackImageUrl)}")`
                }}
              >
                <strong>{data.hero.title || t("heroPreview")}</strong>
                <span className="fs-13">{data.hero.subtitle}</span>
              </div>
              <ol className="ps-3 mt-3 mb-0">
                {data.sections
                  .filter((section) => section.enabled)
                  .sort((a, b) => a.order - b.order)
                  .map((section) => (
                    <li key={section.id} className="mb-2">
                      {section.title || t(SECTION_TYPE_KEYS[section.type])}
                    </li>
                  ))}
              </ol>
            </div>
          </div>

          <div className="card border-0 shadow-sm">
            <div className="card-header">
              <h3 className="h5 mb-0">{t("seo")}</h3>
            </div>
            <div className="card-body">
              <div className="mb-3">
                <label className="form-label" htmlFor="page-seo-title">
                  {t("seoTitle")}
                </label>
                <input
                  id="page-seo-title"
                  className="form-control"
                  value={data.seo.title}
                  onChange={(event) => updateSeo("title", event.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label" htmlFor="page-seo-description">
                  {t("seoDescription")}
                </label>
                <textarea
                  id="page-seo-description"
                  className="form-control"
                  rows={3}
                  value={data.seo.description}
                  onChange={(event) =>
                    updateSeo("description", event.target.value)
                  }
                />
              </div>
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="page-noindex"
                  checked={data.seo.noIndex}
                  onChange={(event) =>
                    updateSeo("noIndex", event.target.checked)
                  }
                />
                <label className="form-check-label" htmlFor="page-noindex">
                  {t("noIndex")}
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
