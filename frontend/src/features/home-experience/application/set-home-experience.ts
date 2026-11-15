"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { routing } from "@/i18n/routing";
import { isHomeExperienceId } from "../domain/home-experience";
import { HOME_EXPERIENCE_COOKIE } from "./resolve-home-experience";

export async function setHomeExperience(formData: FormData): Promise<void> {
  const requestedLocale = String(formData.get("locale") ?? routing.defaultLocale);
  const locale = routing.locales.includes(requestedLocale as (typeof routing.locales)[number])
    ? requestedLocale
    : routing.defaultLocale;
  const experienceId = String(formData.get("experienceId") ?? "");

  if (!isHomeExperienceId(experienceId)) {
    redirect(`/${locale}/settings/experience?error=invalid`);
  }

  const cookieStore = await cookies();
  cookieStore.set(HOME_EXPERIENCE_COOKIE, experienceId, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 365
  });

  redirect(`/${locale}`);
}
