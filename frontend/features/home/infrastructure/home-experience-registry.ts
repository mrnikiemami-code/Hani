import type { ComponentType } from "react";
import type { HomeExperienceId } from "../domain/home-experience";
import type { HomeExperienceProps } from "../ui/types";

export type HomeExperienceModule = {
  default: ComponentType<HomeExperienceProps>;
};

export const HOME_EXPERIENCE_LOADERS: Record<
  HomeExperienceId,
  () => Promise<HomeExperienceModule>
> = {
  "all-services-classic": () => import("../ui/experiences/all-services-classic"),
  "all-services-modern": () => import("../ui/experiences/all-services-modern"),
  "tour-classic": () => import("../ui/experiences/tour-classic"),
  hotel: () => import("../ui/experiences/hotel"),
  car: () => import("../ui/experiences/car"),
  flight: () => import("../ui/experiences/flight"),
  cruise: () => import("../ui/experiences/cruise"),
  "tour-editorial": () => import("../ui/experiences/tour-editorial"),
  bus: () => import("../ui/experiences/bus"),
  guide: () => import("../ui/experiences/guide"),
  activity: () => import("../ui/experiences/activity"),
  visa: () => import("../ui/experiences/visa")
};
