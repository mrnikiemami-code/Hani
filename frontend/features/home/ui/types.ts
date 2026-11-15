import type { HomeFeed } from "@/lib/types";
import type { HomeExperienceDefinition } from "../domain/home-experience";

export type HomeExperienceProps = {
  locale: string;
  data: HomeFeed | null;
  definition: HomeExperienceDefinition;
};
