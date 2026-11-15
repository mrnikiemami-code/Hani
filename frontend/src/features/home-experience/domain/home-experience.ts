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

export type HomeExperienceDefinition = {
  id: HomeExperienceId;
  source: string;
  templateView: string;
  labelKey: string;
  descriptionKey: string;
  accent: string;
};

export const HOME_EXPERIENCE_DEFINITIONS: readonly HomeExperienceDefinition[] = [
  { id: "all-services-classic", source: "index-1", templateView: "@/views/home-service-one/homeServiceOne", labelKey: "allServicesClassic.label", descriptionKey: "allServicesClassic.description", accent: "#0f6b5b" },
  { id: "all-services-modern", source: "index-2", templateView: "@/views/home-service-two/homeServiceTwo", labelKey: "allServicesModern.label", descriptionKey: "allServicesModern.description", accent: "#155eef" },
  { id: "tour-classic", source: "index-3", templateView: "@/views/home-one/homeOne", labelKey: "tourClassic.label", descriptionKey: "tourClassic.description", accent: "#b45309" },
  { id: "hotel", source: "index-4", templateView: "@/views/home-two/homeTwo", labelKey: "hotel.label", descriptionKey: "hotel.description", accent: "#7c3aed" },
  { id: "car", source: "index-5", templateView: "@/views/home-three/homeThree", labelKey: "car.label", descriptionKey: "car.description", accent: "#0369a1" },
  { id: "flight", source: "index-6", templateView: "@/views/home-four/homeFour", labelKey: "flight.label", descriptionKey: "flight.description", accent: "#c2410c" },
  { id: "cruise", source: "index-7", templateView: "@/views/home-five/homeFive", labelKey: "cruise.label", descriptionKey: "cruise.description", accent: "#0e7490" },
  { id: "tour-editorial", source: "index-8", templateView: "@/views/home-six/homeSix", labelKey: "tourEditorial.label", descriptionKey: "tourEditorial.description", accent: "#4d7c0f" },
  { id: "bus", source: "index-9", templateView: "@/views/home-seven/homeSeven", labelKey: "bus.label", descriptionKey: "bus.description", accent: "#a16207" },
  { id: "guide", source: "index-10", templateView: "@/views/home-ten/homeTen", labelKey: "guide.label", descriptionKey: "guide.description", accent: "#be185d" },
  { id: "activity", source: "index-11", templateView: "@/views/home-eleven/homeEleven", labelKey: "activity.label", descriptionKey: "activity.description", accent: "#7e22ce" },
  { id: "visa", source: "index-12", templateView: "@/views/home-twelve/homeTwelve", labelKey: "visa.label", descriptionKey: "visa.description", accent: "#1d4ed8" }
];

const byId = new Map(HOME_EXPERIENCE_DEFINITIONS.map((item) => [item.id, item]));
export const DEFAULT_HOME_EXPERIENCE_ID: HomeExperienceId = "all-services-classic";

export function isHomeExperienceId(value: unknown): value is HomeExperienceId {
  return typeof value === "string" && byId.has(value as HomeExperienceId);
}

export function getHomeExperienceDefinition(value: string | null | undefined): HomeExperienceDefinition {
  const id = isHomeExperienceId(value) ? value : DEFAULT_HOME_EXPERIENCE_ID;
  return byId.get(id) ?? HOME_EXPERIENCE_DEFINITIONS[0];
}
