"use client";

import { useState, useTransition } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import {
  normalizeHomePageSettings,
  type HomePageSettings,
  type HomeSectionId
} from "../domain/home-page-settings";
import { saveHomePageSettings } from "../application/save-home-settings";

const SECTION_LABEL_KEYS: Record<HomeSectionId, string> = {
  featured: "sectionFeatured",
  latestDomestic: "sectionLatestDomestic",
  latestForeign: "sectionLatestForeign",
  visas: "sectionVisas",
  originCities: "sectionOriginCities",
  travelogues: "sectionTravelogues",
  magazine: "sectionMagazine",
  experience: "sectionExperience",
  delivery: "sectionDelivery",
  guide: "sectionGuide",
  testimonials: "sectionTestimonials",
  whyChoose: "sectionWhyChoose"
};

export function HomeSettingsEditor({
  locale,
  initialSettings
}: {
  locale: string;
  initialSettings: HomePageSettings;
}) {
  const t = useTranslations("adminHome");
  const router = useRouter();
  const [settings, setSettings] = useState(() =>
    normalizeHomePageSettings(initialSettings)
  );
  const [status, setStatus] = useState<"idle" | "saved" | "error">("idle");
  const [pending, startTransition] = useTransition();

  const updateSection = (
    id: HomeSectionId,
    patch: Partial<HomePageSettings["sections"][number]>
  ) => {
    setSettings((current) => ({
      ...current,
      sections: current.sections.map((section) =>
        section.id === id ? { ...section, ...patch } : section
      )
    }));
    setStatus("idle");
  };

  const moveSection = (index: number, direction: -1 | 1) => {
    setSettings((current) => {
      const next = [...current.sections];
      const target = index + direction;
      if (target < 0 || target >= next.length) {
        return current;
      }
      [next[index], next[target]] = [next[target], next[index]];
      return {
        ...current,
        sections: next.map((section, order) => ({
          ...section,
          order: (order + 1) * 10
        }))
      };
    });
    setStatus("idle");
  };

  const save = () => {
    startTransition(async () => {
      const result = await saveHomePageSettings(locale, settings);
      setStatus(result.ok ? "saved" : "error");
      if (result.ok) {
        router.refresh();
      }
    });
  };

  return (
    <div className="content">
      <div className="container py-5">
        <div className="d-flex align-items-start justify-content-between flex-wrap gap-3 mb-4">
          <div>
            <span className="badge badge-primary mb-2">{t("badge")}</span>
            <h1 className="mb-2">{t("title")}</h1>
            <p className="text-gray-6 mb-0">{t("subtitle")}</p>
          </div>
          <button
            type="button"
            className="btn btn-primary"
            disabled={pending}
            onClick={save}
          >
            {pending ? t("saving") : t("save")}
          </button>
        </div>

        {status === "saved" && (
          <div className="alert alert-success" role="status">
            {t("saved")}
          </div>
        )}
        {status === "error" && (
          <div className="alert alert-danger" role="alert">
            {t("saveError")}
          </div>
        )}

        <div className="row g-4">
          <div className="col-xl-8">
            <div className="card border-0 shadow-sm mb-4">
              <div className="card-header">
                <h2 className="h4 mb-1">{t("heroTitle")}</h2>
                <p className="text-gray-6 mb-0">{t("heroHint")}</p>
              </div>
              <div className="card-body">
                <label className="form-label" htmlFor="heroImageUrl">
                  {t("heroImage")}
                </label>
                <input
                  id="heroImageUrl"
                  className="form-control"
                  value={settings.heroImageUrl}
                  onChange={(event) => {
                    setSettings((current) => ({
                      ...current,
                      heroImageUrl: event.target.value
                    }));
                    setStatus("idle");
                  }}
                  placeholder="https://cdn.hani.ir/home/hero.jpg"
                />
                <p className="fs-12 text-gray-6 mt-2 mb-0">
                  {t("heroImageHint")}
                </p>
              </div>
            </div>

            <div className="card border-0 shadow-sm">
              <div className="card-header">
                <h2 className="h4 mb-1">{t("sectionsTitle")}</h2>
                <p className="text-gray-6 mb-0">{t("sectionsHint")}</p>
              </div>
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table align-middle mb-0">
                    <thead>
                      <tr>
                        <th>{t("order")}</th>
                        <th>{t("section")}</th>
                        <th>{t("visible")}</th>
                        <th className="text-end">{t("actions")}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {settings.sections.map((section, index) => (
                        <tr key={section.id}>
                          <td>
                            <span className="badge badge-light text-dark">
                              {index + 1}
                            </span>
                          </td>
                          <td>{t(SECTION_LABEL_KEYS[section.id])}</td>
                          <td>
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
                                {section.enabled
                                  ? t("visibleOn")
                                  : t("visibleOff")}
                              </label>
                            </div>
                          </td>
                          <td className="text-end">
                            <div className="btn-group btn-group-sm">
                              <button
                                type="button"
                                className="btn btn-light"
                                aria-label={t("moveUp")}
                                disabled={index === 0}
                                onClick={() => moveSection(index, -1)}
                              >
                                ↑
                              </button>
                              <button
                                type="button"
                                className="btn btn-light"
                                aria-label={t("moveDown")}
                                disabled={index === settings.sections.length - 1}
                                onClick={() => moveSection(index, 1)}
                              >
                                ↓
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-4">
            <div className="card border-0 shadow-sm sticky-top" style={{ top: 90 }}>
              <div className="card-header">
                <h2 className="h4 mb-0">{t("preview")}</h2>
              </div>
              <div className="card-body">
                <div
                  className="rounded overflow-hidden mb-3"
                  style={{
                    minHeight: 180,
                    background: settings.heroImageUrl
                      ? `center / cover no-repeat url("${settings.heroImageUrl}")`
                      : "linear-gradient(135deg, #cf3425, #ffb199)",
                    color: "#fff",
                    padding: 20,
                    display: "flex",
                    alignItems: "flex-end"
                  }}
                >
                  <strong>{t("heroPreview")}</strong>
                </div>
                <ol className="ps-3 mb-0">
                  {settings.sections
                    .filter((section) => section.enabled)
                    .map((section) => (
                      <li key={section.id} className="mb-2">
                        {t(SECTION_LABEL_KEYS[section.id])}
                      </li>
                    ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
