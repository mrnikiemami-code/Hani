export type PageKey =
  | "home"
  | "tours"
  | "tours.foreign"
  | "tours.domestic"
  | "visa"
  | "hotels"
  | "flights"
  | "about"
  | "contact"
  | "header"
  | "footer";

export const PAGE_KEY_OPTIONS: Array<{ key: PageKey; labelKey: string }> = [
  { key: "home", labelKey: "pageHome" },
  { key: "tours", labelKey: "pageTours" },
  { key: "tours.foreign", labelKey: "pageToursForeign" },
  { key: "tours.domestic", labelKey: "pageToursDomestic" },
  { key: "visa", labelKey: "pageVisa" },
  { key: "hotels", labelKey: "pageHotels" },
  { key: "flights", labelKey: "pageFlights" },
  { key: "about", labelKey: "pageAbout" },
  { key: "contact", labelKey: "pageContact" },
  { key: "header", labelKey: "pageHeader" },
  { key: "footer", labelKey: "pageFooter" }
];

export type PageSectionType =
  | "hero"
  | "banner"
  | "richText"
  | "cardGrid"
  | "tourCollection"
  | "visaCollection"
  | "hotelCollection"
  | "contentEntry"
  | "cta"
  | "faq"
  | "testimonials"
  | "stats"
  | "gallery"
  | "customHtml";

export type PageSection = {
  id: string;
  type: PageSectionType;
  enabled: boolean;
  order: number;
  title: string;
  subtitle: string;
  body: string;
  mediaId: string | null;
  fallbackImageUrl: string;
  ctaLabel: string;
  ctaHref: string;
  sourceMode: "auto" | "manual" | "collection";
  sourceIds: string[];
};

export type PageCompositionSeo = {
  title: string;
  description: string;
  noIndex: boolean;
};

export type PageCompositionData = {
  hero: {
    title: string;
    subtitle: string;
    mediaId: string | null;
    fallbackImageUrl: string;
    ctaLabel: string;
    ctaHref: string;
    overlay: number;
  };
  sections: PageSection[];
  seo: PageCompositionSeo;
};

export type PageCompositionDto = {
  pageKey: PageKey;
  locale: string;
  status: "Draft" | "Published";
  data: PageCompositionData;
  updatedAt: string | null;
  publishedAt: string | null;
};

export type PageCompositionListItem = {
  pageKey: PageKey;
  locale: string;
  hasDraft: boolean;
  hasPublished: boolean;
  updatedAt: string | null;
  publishedAt: string | null;
};

export const EMPTY_PAGE_COMPOSITION: PageCompositionData = {
  hero: {
    title: "",
    subtitle: "",
    mediaId: null,
    fallbackImageUrl: "",
    ctaLabel: "",
    ctaHref: "",
    overlay: 30
  },
  sections: [],
  seo: {
    title: "",
    description: "",
    noIndex: false
  }
};

export function normalizePageComposition(
  input: Partial<PageCompositionData> | null | undefined
): PageCompositionData {
  return {
    hero: {
      ...EMPTY_PAGE_COMPOSITION.hero,
      ...(input?.hero ?? {})
    },
    sections: (input?.sections ?? []).map((section, index) => ({
      id: section.id || `section-${index + 1}`,
      type: section.type || "richText",
      enabled: section.enabled ?? true,
      order: Number.isFinite(section.order) ? section.order : (index + 1) * 10,
      title: section.title ?? "",
      subtitle: section.subtitle ?? "",
      body: section.body ?? "",
      mediaId: section.mediaId ?? null,
      fallbackImageUrl: section.fallbackImageUrl ?? "",
      ctaLabel: section.ctaLabel ?? "",
      ctaHref: section.ctaHref ?? "",
      sourceMode: section.sourceMode ?? "auto",
      sourceIds: section.sourceIds ?? []
    })),
    seo: {
      ...EMPTY_PAGE_COMPOSITION.seo,
      ...(input?.seo ?? {})
    }
  };
}
