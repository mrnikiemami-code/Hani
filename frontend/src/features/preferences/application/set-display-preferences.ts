"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { routing } from "@/i18n/routing";
import { isHomeExperienceId } from "@/features/home-experience/domain/home-experience";
import { HOME_EXPERIENCE_COOKIE } from "@/features/home-experience/application/resolve-home-experience";
import { writeDisplayPreferences } from "./display-preferences";
import type { PreferencesTheme } from "../domain/user-preferences";
import {
  getMyPreferences,
  updateMyPreferences
} from "../infrastructure/preferences-api";

function parseLocale(value: FormDataEntryValue | null): string {
  const candidate = String(value ?? "");
  return routing.locales.includes(candidate as (typeof routing.locales)[number])
    ? candidate
    : routing.defaultLocale;
}

function parseTheme(value: FormDataEntryValue | null): PreferencesTheme {
  const candidate = String(value ?? "");
  return candidate === "light" || candidate === "dark" || candidate === "system"
    ? candidate
    : "system";
}

function parseCurrency(value: FormDataEntryValue | null): string {
  const candidate = String(value ?? "").trim().toUpperCase();
  return /^[A-Z]{3}$/.test(candidate) ? candidate : "IRR";
}

export async function setDisplayPreferences(formData: FormData): Promise<void> {
  const locale = parseLocale(formData.get("locale"));
  const currency = parseCurrency(formData.get("currency"));
  const theme = parseTheme(formData.get("theme"));
  const reducedMotion = String(formData.get("reducedMotion") ?? "") === "on";

  await writeDisplayPreferences({ locale, currency, theme, reducedMotion });

  const stored = await getMyPreferences();
  const cookieStore = await cookies();
  const cookieExperience = cookieStore.get(HOME_EXPERIENCE_COOKIE)?.value;

  await updateMyPreferences({
    homeExperienceId:
      stored?.homeExperienceId ??
      (isHomeExperienceId(cookieExperience) ? cookieExperience : "all-services-classic"),
    locale,
    currency,
    theme,
    reducedMotion
  });

  redirect(`/${locale}/settings/experience?saved=1`);
}
