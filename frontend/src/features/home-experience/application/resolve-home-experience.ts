import { DEFAULT_HOME_EXPERIENCE_ID, getHomeExperienceDefinition, isHomeExperienceId, type HomeExperienceDefinition } from "../domain/home-experience";

export const HOME_EXPERIENCE_COOKIE = "hani_home_experience";

export type HomeExperienceResolutionInput = {
  userPreference?: string | null;
  cookie?: string | null;
  agencyDefault?: string | null;
  experiment?: string | null;
};

export function resolveHomeExperience(input: HomeExperienceResolutionInput): HomeExperienceDefinition {
  if (isHomeExperienceId(input.userPreference)) return getHomeExperienceDefinition(input.userPreference);
  if (isHomeExperienceId(input.cookie)) return getHomeExperienceDefinition(input.cookie);
  if (isHomeExperienceId(input.agencyDefault)) return getHomeExperienceDefinition(input.agencyDefault);
  if (isHomeExperienceId(input.experiment)) return getHomeExperienceDefinition(input.experiment);
  return getHomeExperienceDefinition(DEFAULT_HOME_EXPERIENCE_ID);
}
