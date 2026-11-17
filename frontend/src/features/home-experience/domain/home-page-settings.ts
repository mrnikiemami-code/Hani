export const HOME_SECTION_IDS = [
  "featured",
  "latestDomestic",
  "latestForeign",
  "visas",
  "originCities",
  "travelogues",
  "magazine",
  "experience",
  "delivery",
  "guide",
  "testimonials",
  "whyChoose"
] as const;

export type HomeSectionId = (typeof HOME_SECTION_IDS)[number];

export type HomeSectionSetting = {
  id: HomeSectionId;
  enabled: boolean;
  order: number;
  imageUrl?: string;
};

export type HomePageSettings = {
  heroImageUrl: string;
  sections: HomeSectionSetting[];
};

export type HomePageSettingsResponse = {
  key: string;
  locale: string;
  settings: Partial<HomePageSettings> | null;
  updatedAt?: string | null;
};

const DEFAULT_SECTION_ORDER: Array<{
  id: HomeSectionId;
  enabled: boolean;
  order: number;
}> = [
  { id: "featured", enabled: true, order: 10 },
  { id: "latestDomestic", enabled: true, order: 20 },
  { id: "latestForeign", enabled: true, order: 30 },
  { id: "visas", enabled: true, order: 40 },
  { id: "originCities", enabled: true, order: 50 },
  { id: "travelogues", enabled: true, order: 60 },
  { id: "magazine", enabled: true, order: 70 },
  { id: "experience", enabled: false, order: 80 },
  { id: "delivery", enabled: false, order: 90 },
  { id: "guide", enabled: false, order: 100 },
  { id: "testimonials", enabled: false, order: 110 },
  { id: "whyChoose", enabled: false, order: 120 }
];

export const DEFAULT_HOME_PAGE_SETTINGS: HomePageSettings = {
  heroImageUrl: "",
  sections: DEFAULT_SECTION_ORDER
};

/** Normalizes API or admin input into a complete, ordered settings object. */
export function normalizeHomePageSettings(
  input: Partial<HomePageSettings> | null | undefined
): HomePageSettings {
  const incoming = new Map(
    (input?.sections ?? []).map((section) => [section.id, section])
  );
  const sections = DEFAULT_SECTION_ORDER.map((fallback) => {
    const section = incoming.get(fallback.id);
    return {
      id: fallback.id,
      enabled: section?.enabled ?? fallback.enabled,
      order: Number.isFinite(section?.order) ? Number(section?.order) : fallback.order,
      imageUrl: section?.imageUrl ?? ""
    };
  }).sort((left, right) => left.order - right.order);

  return {
    heroImageUrl: input?.heroImageUrl ?? "",
    sections
  };
}

/** Returns the enabled sections in their configured order. */
export function orderedHomeSections(
  settings: HomePageSettings
): HomeSectionSetting[] {
  return [...settings.sections]
    .filter((section) => section.enabled)
    .sort((left, right) => left.order - right.order);
}
