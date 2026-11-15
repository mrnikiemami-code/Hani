export const HOME_EXPERIENCE_IDS = [
  "all-services-classic",
  "all-services-modern",
  "tour-classic",
  "hotel",
  "car",
  "flight",
  "cruise",
  "tour-editorial",
  "bus",
  "guide",
  "activity",
  "visa"
] as const;

export type HomeExperienceId = (typeof HOME_EXPERIENCE_IDS)[number];

export type HomeExperienceHeroStyle = "classic" | "split" | "editorial" | "compact";

export type HomeExperienceDefinition = {
  id: HomeExperienceId;
  source: string;
  labelKey: string;
  descriptionKey: string;
  accent: string;
  heroStyle: HomeExperienceHeroStyle;
};

export const HOME_EXPERIENCE_DEFINITIONS: readonly HomeExperienceDefinition[] = [
  {
    id: "all-services-classic",
    source: "index-1",
    labelKey: "allServicesClassic.label",
    descriptionKey: "allServicesClassic.description",
    accent: "#0f6b5b",
    heroStyle: "classic"
  },
  {
    id: "all-services-modern",
    source: "index-2",
    labelKey: "allServicesModern.label",
    descriptionKey: "allServicesModern.description",
    accent: "#155eef",
    heroStyle: "split"
  },
  {
    id: "tour-classic",
    source: "index-3",
    labelKey: "tourClassic.label",
    descriptionKey: "tourClassic.description",
    accent: "#b45309",
    heroStyle: "classic"
  },
  {
    id: "hotel",
    source: "index-4",
    labelKey: "hotel.label",
    descriptionKey: "hotel.description",
    accent: "#7c3aed",
    heroStyle: "split"
  },
  {
    id: "car",
    source: "index-5",
    labelKey: "car.label",
    descriptionKey: "car.description",
    accent: "#0369a1",
    heroStyle: "compact"
  },
  {
    id: "flight",
    source: "index-6",
    labelKey: "flight.label",
    descriptionKey: "flight.description",
    accent: "#c2410c",
    heroStyle: "split"
  },
  {
    id: "cruise",
    source: "index-7",
    labelKey: "cruise.label",
    descriptionKey: "cruise.description",
    accent: "#0e7490",
    heroStyle: "editorial"
  },
  {
    id: "tour-editorial",
    source: "index-8",
    labelKey: "tourEditorial.label",
    descriptionKey: "tourEditorial.description",
    accent: "#4d7c0f",
    heroStyle: "editorial"
  },
  {
    id: "bus",
    source: "index-9",
    labelKey: "bus.label",
    descriptionKey: "bus.description",
    accent: "#a16207",
    heroStyle: "compact"
  },
  {
    id: "guide",
    source: "index-10",
    labelKey: "guide.label",
    descriptionKey: "guide.description",
    accent: "#be185d",
    heroStyle: "split"
  },
  {
    id: "activity",
    source: "index-11",
    labelKey: "activity.label",
    descriptionKey: "activity.description",
    accent: "#7e22ce",
    heroStyle: "editorial"
  },
  {
    id: "visa",
    source: "index-12",
    labelKey: "visa.label",
    descriptionKey: "visa.description",
    accent: "#1d4ed8",
    heroStyle: "classic"
  }
];

const HOME_EXPERIENCE_BY_ID = new Map(
  HOME_EXPERIENCE_DEFINITIONS.map((definition) => [definition.id, definition])
);

export const DEFAULT_HOME_EXPERIENCE_ID: HomeExperienceId = "all-services-classic";

export function isHomeExperienceId(value: unknown): value is HomeExperienceId {
  return typeof value === "string" && HOME_EXPERIENCE_BY_ID.has(value as HomeExperienceId);
}

export function getHomeExperienceDefinition(
  value: string | null | undefined
): HomeExperienceDefinition {
  const id = isHomeExperienceId(value) ? value : DEFAULT_HOME_EXPERIENCE_ID;
  return HOME_EXPERIENCE_BY_ID.get(id) ?? HOME_EXPERIENCE_DEFINITIONS[0];
}
