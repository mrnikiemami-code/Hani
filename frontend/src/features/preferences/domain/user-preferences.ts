export type PreferencesTheme = "light" | "dark" | "system";

export type UserPreferences = {
  userId: string;
  homeExperienceId: string;
  locale: string;
  currency: string;
  theme: PreferencesTheme;
  reducedMotion: boolean;
  updatedAt: string | null;
};

export type UserPreferencesInput = {
  homeExperienceId: string;
  locale: string;
  currency: string;
  theme: PreferencesTheme;
  reducedMotion: boolean;
};

export type DisplayPreferences = {
  locale: string;
  currency: string;
  theme: PreferencesTheme;
  reducedMotion: boolean;
};

export const DEFAULT_DISPLAY_PREFERENCES: DisplayPreferences = {
  locale: "fa",
  currency: "IRR",
  theme: "system",
  reducedMotion: false
};
