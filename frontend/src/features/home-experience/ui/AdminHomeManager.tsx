"use client";

import { useMemo, useState, useTransition } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useRouter } from "next/navigation";
import { useMessageBox } from "@/components/hani/message-provider";
import type { HomeFeed } from "../domain/home-feed";
import type { MediaAsset } from "../domain/media";
import {
  type HomeExtraSection,
  type HomeMenuItem,
  type HomePageSettings,
  type HomeSectionId,
  type HomeSectionRule,
  type TourCollection
} from "../domain/home-page-settings";
import { saveHomePageSettings } from "../application/save-home-settings";
import { TourPickerDialog } from "./TourPickerDialog";

const SECTION_KEYS: Record<HomeSectionId, string> = {
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

const SECTION_ICONS: Record<HomeSectionId, string> = {
  featured: "isax isax-ranking",
  latestDomestic: "isax isax-map-1",
  latestForeign: "isax isax-global",
  visas: "isax isax-document-text",
  originCities: "isax isax-location",
  travelogues: "isax isax-book",
  magazine: "isax isax-note-text",
  experience: "isax isax-camera",
  delivery: "isax isax-truck-fast",
  guide: "isax isax-user-tag",
  testimonials: "isax isax-message-question",
  whyChoose: "isax isax-shield-tick"
};

const DEFAULT_MENU: HomeMenuItem[] = [
  {
    id: "tours",
    label: "تورها",
    href: "/tours",
    children: [
      { id: "tours-foreign", label: "تورهای خارجی", href: "/tours?scope=foreign", children: [] },
      { id: "tours-domestic", label: "تورهای داخلی", href: "/tours?scope=domestic", children: [] }
    ]
  },
  { id: "visa", label: "ویزا", href: "/visa", children: [] },
  { id: "hotels", label: "هتل‌ها", href: "/hotels", children: [] },
  { id: "flights", label: "پروازها", href: "/flights", children: [] },
  { id: "car", label: "خودرو", href: "/car/car-grid", children: [] },
  { id: "cruise", label: "کروز", href: "/cruise/cruise-grid", children: [] },
  { id: "bus", label: "اتوبوس", href: "/bus/bus-list", children: [] },
  { id: "blog", label: "مجله", href: "/blog", children: [] },
  { id: "contact", label: "تماس", href: "/contact", children: [] }
];

function sectionItems(section: HomeSectionId, feed: HomeFeed | null) {
  if (!feed) return [];
  switch (section) {
    case "featured":
      return feed.featuredTours.items.map((item) => ({
        id: item.productId,
        title: item.title,
        subtitle: item.agencyName ?? item.destinationNames?.[0] ?? "",
        image: item.coverImageUrl
      }));
    case "latestDomestic":
      return feed.latestDomesticTours.items.map((item) => ({
        id: item.productId,
        title: item.title,
        subtitle: item.agencyName ?? item.destinationNames?.[0] ?? "",
        image: item.coverImageUrl
      }));
    case "latestForeign":
      return feed.latestForeignTours.items.map((item) => ({
        id: item.productId,
        title: item.title,
        subtitle: item.agencyName ?? item.destinationNames?.[0] ?? "",
        image: item.coverImageUrl
      }));
    case "visas":
      return feed.visas.map((item) => ({
        id: item.countryId,
        title: item.name,
        subtitle: item.countryCode,
        image: item.coverImageUrl
      }));
    case "travelogues":
      return feed.travelogues.items.map((item) => ({
        id: item.travelogueId,
        title: item.title,
        subtitle: item.seriesName ?? "",
        image: item.coverUrl
      }));
    case "magazine":
      return feed.blog.items.map((item) => ({
        id: item.postId,
        title: item.title,
        subtitle: item.excerpt,
        image: item.coverUrl
      }));
    default:
      return [];
  }
}

export function AdminHomeManager({
  locale,
  initialSettings,
  mediaAssets,
  feed
}: {
  locale: string;
  initialSettings: HomePageSettings;
  mediaAssets: MediaAsset[];
  feed: HomeFeed | null;
}) {
  const t = useTranslations("adminHome");
  const messages = useMessageBox();
  const router = useRouter();
  const [settings, setSettings] = useState(initialSettings);
  const [menu, setMenu] = useState<HomeMenuItem[]>(() => {
    const current = initialSettings.menu?.length
      ? initialSettings.menu
      : DEFAULT_MENU;
    const ids = new Set(current.map((item) => item.id));
    return [
      ...current,
      ...DEFAULT_MENU.filter(
        (item) =>
          ["car", "cruise", "bus"].includes(item.id) && !ids.has(item.id)
      )
    ];
  });
  const [rules, setRules] = useState<Partial<Record<HomeSectionId, HomeSectionRule>>>(
    initialSettings.sectionRules ?? {}
  );
  const [expanded, setExpanded] = useState<HomeSectionId | null>(null);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryTarget, setGalleryTarget] = useState<string>("hero");
  const [extraSections, setExtraSections] = useState<HomeExtraSection[]>(
    initialSettings.extraSections ?? []
  );
  const [tourCollections, setTourCollections] = useState<TourCollection[]>(
    initialSettings.tourCollections ?? []
  );
  const [pickerSection, setPickerSection] = useState<HomeSectionId | null>(null);
  const [pending, startTransition] = useTransition();

  const sections = useMemo(
    () => [...settings.sections].sort((a, b) => a.order - b.order),
    [settings.sections]
  );

  const updateSection = (
    id: HomeSectionId,
    patch: Partial<HomePageSettings["sections"][number]>
  ) =>
    setSettings((current) => ({
      ...current,
      sections: current.sections.map((section) =>
        section.id === id ? { ...section, ...patch } : section
      )
    }));

  const moveSection = (index: number, direction: -1 | 1) => {
    setSettings((current) => {
      const next = [...sections];
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

  const ruleFor = (id: HomeSectionId): HomeSectionRule =>
    rules[id] ?? {
      algorithm: id === "featured" || id === "visas" ? "rating" : "newest",
      limit: 6,
      source: "auto",
      selectedIds: []
    };

  const updateRule = (id: HomeSectionId, patch: Partial<HomeSectionRule>) =>
    setRules((current) => ({ ...current, [id]: { ...ruleFor(id), ...patch } }));

  const setHero = (key: keyof HomePageSettings, value: string | number) =>
    setSettings((current) => ({ ...current, [key]: value }));

  const updateMenu = (id: string, patch: Partial<HomeMenuItem>) =>
    setMenu((current) =>
      current.map((item) =>
        item.id === id
          ? { ...item, ...patch }
          : {
              ...item,
              children: item.children.map((child) =>
                child.id === id ? { ...child, ...patch } : child
              )
            }
      )
    );

  const removeMenu = (id: string) =>
    setMenu((current) =>
      current
        .filter((item) => item.id !== id)
        .map((item) => ({
          ...item,
          children: item.children.filter((child) => child.id !== id)
        }))
    );

  const updateExtraSection = (id: string, patch: Partial<HomeExtraSection>) =>
    setExtraSections((current) =>
      current.map((section) =>
        section.id === id ? { ...section, ...patch } : section
      )
    );

  const addExtraSection = (type: HomeExtraSection["type"]) =>
    setExtraSections((current) => [
      ...current,
      {
        id: `extra-${Date.now()}`,
        type,
        enabled: true,
        order: (current.length + 1) * 10,
        title: type === "banner" ? "بنر جدید" : "بخش جدید",
        subtitle: "",
        body: "",
        mediaId: null,
        fallbackImageUrl: "",
        ctaLabel: "",
        ctaHref: "",
        sourceMode: "auto",
        sourceIds: [],
        placementAfter: null
      }
    ]);

  const removeExtraSection = (id: string) =>
    setExtraSections((current) =>
      current
        .filter((section) => section.id !== id)
        .map((section, index) => ({ ...section, order: (index + 1) * 10 }))
    );

  const moveExtraSection = (index: number, direction: -1 | 1) =>
    setExtraSections((current) => {
      const next = [...current];
      const target = index + direction;
      if (target < 0 || target >= next.length) return current;
      [next[index], next[target]] = [next[target], next[index]];
      return next.map((section, order) => ({
        ...section,
        order: (order + 1) * 10
      }));
    });

  const applyTourSelection = (section: HomeSectionId, ids: string[]) => {
    updateRule(section, { selectedIds: ids, algorithm: "manual" });
    setPickerSection(null);
  };

  const saveTourCollection = (name: string, ids: string[]) =>
    setTourCollections((current) => [
      ...current.filter((collection) => collection.name !== name),
      {
        id: `collection-${Date.now()}`,
        name,
        ids: Array.from(new Set(ids)),
        updatedAt: new Date().toISOString()
      }
    ]);

  const deleteTourCollection = (id: string) =>
    setTourCollections((current) =>
      current.filter((collection) => collection.id !== id)
    );

  const addMenu = () =>
    setMenu((current) => [
      ...current,
      {
        id: `menu-${Date.now()}`,
        label: "منوی جدید",
        href: "/",
        children: []
      }
    ]);

  const addSubmenu = (parentId: string) =>
    setMenu((current) =>
      current.map((item) =>
        item.id === parentId
          ? {
              ...item,
              children: [
                ...item.children,
                {
                  id: `submenu-${Date.now()}`,
                  label: "زیرمنوی جدید",
                  href: "/",
                  children: []
                }
              ]
            }
          : item
      )
    );

  const save = () => {
    startTransition(async () => {
      const result = await saveHomePageSettings(locale, {
        ...settings,
        menu,
        sectionRules: rules,
        extraSections,
        tourCollections
      });
      if (result.ok) {
        messages.toast({ kind: "success", message: t("saved") });
        router.refresh();
      } else {
        messages.toast({ kind: "error", message: t("saveError") });
      }
    });
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-start flex-wrap gap-3 mb-4">
        <div>
          <span className="badge bg-primary-transparent text-primary mb-2">
            {t("badge")}
          </span>
          <h1 className="h3 mb-1">{t("title")}</h1>
          <p className="text-gray-6 mb-0">{t("subtitle")}</p>
        </div>
        <div className="d-flex gap-2">
          <button
            type="button"
            className="btn btn-light"
            disabled={pending}
            onClick={save}
          >
            {pending ? t("saving") : t("save")}
          </button>
        </div>
      </div>

      <div className="row g-4">
        <div className="col-xl-8">
          <div className="card border-0 shadow-sm mb-4">
            <div className="card-header d-flex justify-content-between align-items-center">
              <div>
                <h2 className="h5 mb-1">{t("menuTitle")}</h2>
                <p className="fs-13 text-gray-6 mb-0">{t("menuHint")}</p>
              </div>
              <button type="button" className="btn btn-light btn-sm" onClick={addMenu}>
                <i className="isax isax-add me-1" />
                {t("addMenu")}
              </button>
            </div>
            <div className="card-body">
              <div className="d-flex flex-column gap-3">
                {menu.map((item) => (
                  <div className="border rounded p-3" key={item.id}>
                    <div className="row g-2 align-items-end">
                      <div className="col-md-4">
                        <label className="form-label fs-12">{t("menuLabel")}</label>
                        <input
                          className="form-control"
                          value={item.label}
                          onChange={(event) =>
                            updateMenu(item.id, { label: event.target.value })
                          }
                        />
                      </div>
                      <div className="col-md-5">
                        <label className="form-label fs-12">{t("menuLink")}</label>
                        <input
                          className="form-control"
                          dir="ltr"
                          value={item.href}
                          onChange={(event) =>
                            updateMenu(item.id, { href: event.target.value })
                          }
                        />
                      </div>
                      <div className="col-md-3 d-flex gap-2">
                        <button
                          type="button"
                          className="btn btn-light btn-sm"
                          onClick={() => addSubmenu(item.id)}
                        >
                          {t("addSubmenu")}
                        </button>
                        <button
                          type="button"
                          className="btn btn-outline-danger btn-sm"
                          onClick={() => removeMenu(item.id)}
                        >
                          {t("remove")}
                        </button>
                      </div>
                    </div>
                    {item.children.length > 0 ? (
                      <div className="ms-4 mt-3 d-flex flex-column gap-2">
                        {item.children.map((child) => (
                          <div className="row g-2 align-items-center" key={child.id}>
                            <div className="col-md-4">
                              <input
                                className="form-control form-control-sm"
                                value={child.label}
                                onChange={(event) =>
                                  updateMenu(child.id, {
                                    label: event.target.value
                                  })
                                }
                              />
                            </div>
                            <div className="col-md-6">
                              <input
                                className="form-control form-control-sm"
                                dir="ltr"
                                value={child.href}
                                onChange={(event) =>
                                  updateMenu(child.id, {
                                    href: event.target.value
                                  })
                                }
                              />
                            </div>
                            <div className="col-md-2 text-end">
                              <button
                                type="button"
                                className="btn btn-light btn-sm"
                                onClick={() => removeMenu(child.id)}
                              >
                                {t("remove")}
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="card border-0 shadow-sm mb-4">
            <div className="card-header">
              <h2 className="h5 mb-1">{t("heroTitle")}</h2>
              <p className="fs-13 text-gray-6 mb-0">{t("heroHint")}</p>
            </div>
            <div className="card-body">
              <div className="row g-4">
                <div className="col-lg-5">
                  <div
                    className="rounded overflow-hidden d-flex align-items-end p-3"
                    style={{
                      minHeight: 220,
                      background: settings.heroImageUrl
                        ? `center / cover no-repeat url("${settings.heroImageUrl}")`
                        : "linear-gradient(135deg, #cf3425, #ffb199)"
                    }}
                  >
                    <div className="text-white">
                      <strong>{settings.heroTitle || t("heroPreview")}</strong>
                      <span className="d-block fs-13">
                        {settings.heroSubtitle}
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="btn btn-light w-100 mt-3"
                    onClick={() => {
                      setGalleryTarget("hero");
                      setGalleryOpen(true);
                    }}
                  >
                    <i className="isax isax-gallery me-2" />
                    {t("chooseGallery")}
                  </button>
                  <p className="fs-12 text-gray-6 mt-2 mb-0">
                    {t("heroSize")}
                  </p>
                </div>
                <div className="col-lg-7">
                  <div className="row g-3">
                    <div className="col-12">
                      <label className="form-label" htmlFor="home-hero-title">
                        {t("heroHeading")}
                      </label>
                      <input
                        id="home-hero-title"
                        className="form-control"
                        value={settings.heroTitle ?? ""}
                        onChange={(event) =>
                          setHero("heroTitle", event.target.value)
                        }
                      />
                    </div>
                    <div className="col-12">
                      <label className="form-label" htmlFor="home-hero-subtitle">
                        {t("heroSubheading")}
                      </label>
                      <input
                        id="home-hero-subtitle"
                        className="form-control"
                        value={settings.heroSubtitle ?? ""}
                        onChange={(event) =>
                          setHero("heroSubtitle", event.target.value)
                        }
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label" htmlFor="home-hero-cta">
                        {t("ctaLabel")}
                      </label>
                      <input
                        id="home-hero-cta"
                        className="form-control"
                        value={settings.heroCtaLabel ?? ""}
                        onChange={(event) =>
                          setHero("heroCtaLabel", event.target.value)
                        }
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label" htmlFor="home-hero-cta-href">
                        {t("ctaHref")}
                      </label>
                      <input
                        id="home-hero-cta-href"
                        className="form-control"
                        dir="ltr"
                        value={settings.heroCtaHref ?? ""}
                        onChange={(event) =>
                          setHero("heroCtaHref", event.target.value)
                        }
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label" htmlFor="home-hero-overlay">
                        {t("overlay")}
                      </label>
                      <input
                        id="home-hero-overlay"
                        type="number"
                        min={0}
                        max={100}
                        className="form-control"
                        value={settings.heroOverlay ?? 30}
                        onChange={(event) =>
                          setHero("heroOverlay", Number(event.target.value))
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="card border-0 shadow-sm">
            <div className="card-header">
              <h2 className="h5 mb-1">{t("sectionsTitle")}</h2>
              <p className="fs-13 text-gray-6 mb-0">{t("sectionsHint")}</p>
            </div>
            <div className="card-body">
              <div className="d-flex flex-column gap-3">
                {sections.map((section, index) => {
                  const rule = ruleFor(section.id);
                  const items = sectionItems(section.id, feed);
                  return (
                    <div className="border rounded p-3" key={section.id}>
                      <div className="d-flex align-items-center gap-3 flex-wrap">
                        <span className="badge bg-light text-gray-9">
                          {index + 1}
                        </span>
                        <span className="avatar avatar-sm bg-primary-transparent text-primary rounded-circle">
                          <i className={SECTION_ICONS[section.id]} />
                        </span>
                        <div className="flex-grow-1">
                          <strong className="d-block">
                            {t(SECTION_KEYS[section.id])}
                          </strong>
                          <span className="fs-12 text-gray-6">
                            {rule.algorithm === "manual"
                              ? t("algorithmManual")
                              : rule.algorithm === "advertising"
                                ? t("algorithmAd")
                                : rule.algorithm === "rating"
                                  ? t("algorithmRating")
                                  : t("algorithmNewest")}
                            {" · "}
                            {t("limit", { count: rule.limit })}
                          </span>
                        </div>
                        <div className="form-check form-switch mb-0">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            role="switch"
                            id={`home-section-${section.id}`}
                            checked={section.enabled}
                            onChange={(event) =>
                              updateSection(section.id, {
                                enabled: event.target.checked
                              })
                            }
                          />
                          <label
                            className="form-check-label"
                            htmlFor={`home-section-${section.id}`}
                          >
                            {section.enabled ? t("visibleOn") : t("visibleOff")}
                          </label>
                        </div>
                        <div className="d-flex gap-1">
                          <button
                            type="button"
                            className="btn btn-light btn-sm"
                            disabled={index === 0}
                            onClick={() => moveSection(index, -1)}
                            aria-label={t("moveUp")}
                          >
                            <i className="isax isax-arrow-up" />
                          </button>
                          <button
                            type="button"
                            className="btn btn-light btn-sm"
                            disabled={index === sections.length - 1}
                            onClick={() => moveSection(index, 1)}
                            aria-label={t("moveDown")}
                          >
                            <i className="isax isax-arrow-down" />
                          </button>
                          <button
                            type="button"
                            className="btn btn-light btn-sm"
                            onClick={() =>
                              setExpanded(
                                expanded === section.id ? null : section.id
                              )
                            }
                          >
                            {t("settings")}
                          </button>
                        </div>
                      </div>

                      {expanded === section.id ? (
                        <div className="border-top mt-3 pt-3">
                          <div className="row g-3">
                            <div className="col-md-4">
                              <label className="form-label">
                                {t("algorithm")}
                              </label>
                              <select
                                className="form-select"
                                value={rule.algorithm}
                                onChange={(event) =>
                                  updateRule(section.id, {
                                    algorithm: event.target
                                      .value as HomeSectionRule["algorithm"]
                                  })
                                }
                              >
                                <option value="newest">{t("algorithmNewest")}</option>
                                <option value="rating">{t("algorithmRating")}</option>
                                <option value="advertising">{t("algorithmAd")}</option>
                                <option value="manual">{t("algorithmManual")}</option>
                                <option value="custom">{t("algorithmCustom")}</option>
                              </select>
                            </div>
                            <div className="col-md-2">
                              <label className="form-label">{t("limitLabel")}</label>
                              <input
                                type="number"
                                min={1}
                                max={20}
                                className="form-control"
                                value={rule.limit}
                                onChange={(event) =>
                                  updateRule(section.id, {
                                    limit: Number(event.target.value)
                                  })
                                }
                              />
                            </div>
                            <div className="col-md-6">
                              <label className="form-label">{t("manualSelection")}</label>
                              <p className="fs-12 text-gray-6 mb-0">
                                {rule.algorithm === "manual"
                                  ? t("manualHint")
                                  : t("algorithmHint")}
                              </p>
                            </div>
                          </div>
                          {rule.algorithm === "manual" ? (
                            <div className="mt-3">
                              {["featured", "latestDomestic", "latestForeign"].includes(section.id) ? (
                                <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 border rounded p-3">
                                  <div>
                                    <strong className="d-block fs-14">
                                      {t("selectedTours", { count: rule.selectedIds.length })}
                                    </strong>
                                    <span className="fs-12 text-gray-6">
                                      {t("pickerHint")}
                                    </span>
                                  </div>
                                  <button
                                    type="button"
                                    className="btn btn-primary btn-sm"
                                    onClick={() => setPickerSection(section.id)}
                                  >
                                    <i className="isax isax-search-normal me-1" />
                                    {t("openTourPicker")}
                                  </button>
                                </div>
                              ) : items.length > 0 ? (
                                <div className="row g-2">
                                  {items.map((item) => (
                                    <div className="col-md-6" key={item.id}>
                                      <label className="border rounded p-2 d-flex gap-2 align-items-center w-100">
                                        <input
                                          type="checkbox"
                                          className="form-check-input mt-0"
                                          checked={rule.selectedIds.includes(item.id)}
                                          onChange={(event) =>
                                            updateRule(section.id, {
                                              selectedIds: event.target.checked
                                                ? [...rule.selectedIds, item.id]
                                                : rule.selectedIds.filter(
                                                    (id) => id !== item.id
                                                  )
                                            })
                                          }
                                        />
                                        {item.image ? (
                                          <img
                                            src={item.image}
                                            alt=""
                                            width={42}
                                            height={32}
                                            className="rounded object-fit-cover"
                                          />
                                        ) : null}
                                        <span className="fs-13 text-truncate">
                                          {item.title}
                                        </span>
                                      </label>
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                <p className="fs-13 text-gray-6 mb-0">
                                  {section.id === "travelogues"
                                    ? t("traveloguesEmpty")
                                    : section.id === "magazine"
                                      ? t("articlesEmpty")
                                      : t("noItems")}
                                </p>
                              )}
                            </div>
                          ) : null}
                        </div>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="card border-0 shadow-sm mt-4">
            <div className="card-header d-flex justify-content-between align-items-center flex-wrap gap-2">
              <div>
                <h2 className="h5 mb-1">{t("extrasTitle")}</h2>
                <p className="fs-13 text-gray-6 mb-0">{t("extrasHint")}</p>
              </div>
              <div className="d-flex gap-2 flex-wrap">
                <button type="button" className="btn btn-light btn-sm" onClick={() => addExtraSection("banner")}>
                  {t("addBanner")}
                </button>
                <button type="button" className="btn btn-light btn-sm" onClick={() => addExtraSection("richText")}>
                  {t("addContent")}
                </button>
                <button type="button" className="btn btn-light btn-sm" onClick={() => addExtraSection("cta")}>
                  {t("addCta")}
                </button>
              </div>
            </div>
            <div className="card-body">
              {extraSections.length === 0 ? (
                <p className="fs-13 text-gray-6 mb-0">{t("extrasEmpty")}</p>
              ) : (
                <div className="d-flex flex-column gap-3">
                  {extraSections.map((section, index) => (
                    <div className="border rounded p-3" key={section.id}>
                      <div className="d-flex justify-content-between align-items-center mb-2 flex-wrap gap-2">
                        <span className="badge bg-light text-gray-9">{section.type}</span>
                        <div className="d-flex gap-1">
                          <button type="button" className="btn btn-light btn-sm" aria-label={t("moveUp")} disabled={index === 0} onClick={() => moveExtraSection(index, -1)}><i className="isax isax-arrow-up" /></button>
                          <button type="button" className="btn btn-light btn-sm" aria-label={t("moveDown")} disabled={index === extraSections.length - 1} onClick={() => moveExtraSection(index, 1)}><i className="isax isax-arrow-down" /></button>
                          <button type="button" className="btn btn-outline-danger btn-sm" onClick={() => removeExtraSection(section.id)}>{t("remove")}</button>
                        </div>
                      </div>
                      <div className="row g-2">
                        <div className="col-md-5">
                          <input className="form-control" value={section.title} placeholder={t("fieldTitle")} onChange={(event) => updateExtraSection(section.id, { title: event.target.value })} />
                        </div>
                        <div className="col-md-5">
                          <input className="form-control" value={section.fallbackImageUrl} placeholder={t("imageUrl")} dir="ltr" onChange={(event) => updateExtraSection(section.id, { fallbackImageUrl: event.target.value })} />
                        </div>
                        <div className="col-md-2">
                          <button type="button" className="btn btn-light w-100" onClick={() => { setGalleryTarget(section.id); setGalleryOpen(true); }}>{t("gallery")}</button>
                        </div>
                        <div className="col-12">
                          <textarea className="form-control" rows={2} value={section.body} placeholder={t("body")} onChange={(event) => updateExtraSection(section.id, { body: event.target.value })} />
                        </div>
                        <div className="col-md-6">
                          <input className="form-control" value={section.ctaLabel} placeholder={t("ctaLabel")} onChange={(event) => updateExtraSection(section.id, { ctaLabel: event.target.value })} />
                        </div>
                        <div className="col-md-6">
                          <input className="form-control" dir="ltr" value={section.ctaHref} placeholder={t("ctaHref")} onChange={(event) => updateExtraSection(section.id, { ctaHref: event.target.value })} />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label fs-12 text-gray-6">{t("placement")}</label>
                          <select
                            className="form-select"
                            value={section.placementAfter ?? ""}
                            onChange={(event) =>
                              updateExtraSection(section.id, {
                                placementAfter: (event.target.value || null) as HomeSectionId | null
                              })
                            }
                          >
                            <option value="">{t("placementEnd")}</option>
                            {sections.map((known) => (
                              <option key={known.id} value={known.id}>
                                {t("placementAfter")} {t(SECTION_KEYS[known.id])}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="col-md-6 d-flex align-items-end">
                          <label className="form-check mb-2">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              checked={section.enabled}
                              onChange={(event) =>
                                updateExtraSection(section.id, { enabled: event.target.checked })
                              }
                            />
                            <span className="form-check-label fs-13">{t("visible")}</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <div className="mt-3">
                <Link href="/admin/content/pages/home" className="btn btn-light btn-sm">
                  {t("extrasAction")}
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-4">
          <div className="card border-0 shadow-sm sticky-top" style={{ top: 90 }}>
            <div className="card-header">
              <h2 className="h5 mb-0">{t("preview")}</h2>
            </div>
            <div className="card-body">
              <div
                className="rounded overflow-hidden mb-3 d-flex align-items-end p-3"
                style={{
                  minHeight: 170,
                  color: "#fff",
                  background: settings.heroImageUrl
                    ? `center / cover no-repeat url("${settings.heroImageUrl}")`
                    : "linear-gradient(135deg, #cf3425, #ffb199)"
                }}
              >
                <div>
                  <strong>{settings.heroTitle || t("heroPreview")}</strong>
                  <span className="d-block fs-12">
                    {settings.heroSubtitle}
                  </span>
                </div>
              </div>
              <ol className="ps-3 mb-0">
                {sections
                  .filter((section) => section.enabled)
                  .map((section) => (
                    <li key={section.id} className="mb-2 fs-13">
                      {t(SECTION_KEYS[section.id])}
                    </li>
                  ))}
              </ol>
            </div>
          </div>
        </div>
      </div>

      {pickerSection ? (
        <TourPickerDialog
          locale={locale}
          scope={
            pickerSection === "latestDomestic"
              ? "Domestic"
              : pickerSection === "latestForeign"
                ? "Foreign"
                : undefined
          }
          initialSelectedIds={ruleFor(pickerSection).selectedIds}
          collections={tourCollections}
          onSaveCollection={saveTourCollection}
          onDeleteCollection={deleteTourCollection}
          onClose={() => setPickerSection(null)}
          onApply={(ids) => applyTourSelection(pickerSection, ids)}
        />
      ) : null}

      {galleryOpen ? (
        <div className="hani-date-modal" role="dialog" aria-modal="true">
          <button
            type="button"
            className="hani-date-modal__backdrop"
            aria-label="بستن"
            onClick={() => setGalleryOpen(false)}
          />
          <div className="hani-date-modal__panel">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h3 className="h5 mb-0">{t("galleryTitle")}</h3>
              <button
                type="button"
                className="btn btn-light btn-sm"
                onClick={() => setGalleryOpen(false)}
              >
                {t("close")}
              </button>
            </div>
            <div className="row g-3">
              {mediaAssets.map((asset) => (
                <div className="col-md-4" key={asset.id}>
                  <button
                    type="button"
                    className="border rounded p-2 w-100 text-start"
                    onClick={() => {
                      if (galleryTarget === "hero") {
                        setHero("heroImageUrl", asset.url);
                      } else {
                        updateExtraSection(galleryTarget, {
                          mediaId: asset.id,
                          fallbackImageUrl: asset.url
                        });
                      }
                      setGalleryOpen(false);
                    }}
                  >
                    <img
                      src={asset.url}
                      alt={asset.altText}
                      className="img-fluid rounded mb-2"
                      style={{ height: 110, width: "100%", objectFit: "cover" }}
                    />
                    <span className="fs-12 d-block text-truncate">
                      {asset.altText || asset.originalFileName}
                    </span>
                    <span className="fs-11 text-gray-6">
                      {asset.width}×{asset.height}px
                    </span>
                  </button>
                </div>
              ))}
              {mediaAssets.length === 0 ? (
                <div className="col-12">
                  <p className="text-gray-6 mb-0">{t("noMedia")}</p>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
