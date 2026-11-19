import type { ComponentType } from "react";
import type { HomeExperienceId } from "../domain/home-experience";
import type { HomePageSettings } from "../domain/home-page-settings";
import type { PageCompositionData } from "../domain/page-composition";

export type HomeExperienceScope = "Domestic" | "Foreign";

export type HomeExperienceModule = {
  default: ComponentType<{
    tourScope?: HomeExperienceScope;
    homeSettings?: HomePageSettings;
    composition?: PageCompositionData | null;
  }>;
};

export const HOME_EXPERIENCE_LOADERS: Record<HomeExperienceId, () => Promise<HomeExperienceModule>> = {
  "all-services-classic": () => import("@/views/home-service-one/homeServiceOne"),
  "all-services-modern": () => import("@/views/home-service-two/homeServiceTwo"),
  "tour-classic": () => import("@/views/home-one/homeOne"),
  hotel: () => import("@/views/home-two/homeTwo"),
  car: () => import("@/views/home-three/homeThree"),
  flight: () => import("@/views/home-four/homeFour"),
  cruise: () => import("@/views/home-five/homeFive"),
  "tour-editorial": () => import("@/views/home-six/homeSix"),
  bus: () => import("@/views/home-seven/homeSeven"),
  guide: () => import("@/views/home-ten/homeTen"),
  activity: () => import("@/views/home-eleven/homeEleven"),
  visa: () => import("@/views/home-twelve/homeTwelve")
};
