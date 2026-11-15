import { cookies } from "next/headers";
import type {
  DisplayPreferences,
  PreferencesTheme
} from "../domain/user-preferences";
import { DEFAULT_DISPLAY_PREFERENCES } from "../domain/user-preferences";

export const DISPLAY_PREFERENCES_COOKIE = "hani_display_preferences";

function isTheme(value: unknown): value is PreferencesTheme {
  return value === "light" || value === "dark" || value === "system";
}

export async function readDisplayPreferences(
  fallbackLocale: string
): Promise<DisplayPreferences> {
  const store = await cookies();
  const raw = store.get(DISPLAY_PREFERENCES_COOKIE)?.value;

  if (!raw) {
    return { ...DEFAULT_DISPLAY_PREFERENCES, locale: fallbackLocale };
  }

  try {
    const parsed = JSON.parse(raw) as Partial<DisplayPreferences>;

    return {
      locale:
        typeof parsed.locale === "string" && parsed.locale.length > 0
          ? parsed.locale
          : fallbackLocale,
      currency:
        typeof parsed.currency === "string" && parsed.currency.length === 3
          ? parsed.currency
          : DEFAULT_DISPLAY_PREFERENCES.currency,
      theme: isTheme(parsed.theme) ? parsed.theme : DEFAULT_DISPLAY_PREFERENCES.theme,
      reducedMotion:
        typeof parsed.reducedMotion === "boolean"
          ? parsed.reducedMotion
          : DEFAULT_DISPLAY_PREFERENCES.reducedMotion
    };
  } catch {
    return { ...DEFAULT_DISPLAY_PREFERENCES, locale: fallbackLocale };
  }
}

export async function writeDisplayPreferences(
  preferences: DisplayPreferences
): Promise<void> {
  const store = await cookies();
  store.set(DISPLAY_PREFERENCES_COOKIE, JSON.stringify(preferences), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 365
  });
}
