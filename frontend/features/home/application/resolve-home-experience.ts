import {
  DEFAULT_HOME_EXPERIENCE_ID,
  getHomeExperienceDefinition,
  isHomeExperienceId,
  type HomeExperienceDefinition
} from "../domain/home-experience";

export const HOME_EXPERIENCE_COOKIE = "hani_home_experience";

export type HomeExperienceResolutionInput = {
  userPreference?: string | null;
  cookie?: string | null;
  agencyDefault?: string | null;
  experiment?: string | null;
};

/**
 * Resolves the home experience deterministically on the server.
 *
 * Precedence:
 * 1. explicit user preference
 * 2. signed anonymous cookie
 * 3. agency/channel default
 * 4. experiment assignment
 * 5. system default
 */
export function resolveHomeExperience(
  input: HomeExperienceResolutionInput
): HomeExperienceDefinition {
  if (isHomeExperienceId(input.userPreference)) {
    return getHomeExperienceDefinition(input.userPreference);
  }

  if (isHomeExperienceId(input.cookie)) {
    return getHomeExperienceDefinition(input.cookie);
  }

  if (isHomeExperienceId(input.agencyDefault)) {
    return getHomeExperienceDefinition(input.agencyDefault);
  }

  if (isHomeExperienceId(input.experiment)) {
    return getHomeExperienceDefinition(input.experiment);
  }

  return getHomeExperienceDefinition(DEFAULT_HOME_EXPERIENCE_ID);
}
