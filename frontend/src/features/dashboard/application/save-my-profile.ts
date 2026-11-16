"use server";

import { redirect } from "next/navigation";
import { routing } from "@/i18n/routing";
import { updateMyProfile } from "../infrastructure/profile-api";

function parseLocale(value: FormDataEntryValue | null): string {
  const candidate = String(value ?? "");
  return routing.locales.includes(candidate as (typeof routing.locales)[number])
    ? candidate
    : routing.defaultLocale;
}

export async function saveMyProfile(formData: FormData): Promise<void> {
  const locale = parseLocale(formData.get("locale"));
  await updateMyProfile({
    firstName: String(formData.get("firstName") ?? "").trim(),
    lastName: String(formData.get("lastName") ?? "").trim(),
    email: String(formData.get("email") ?? "").trim() || null,
    bio: String(formData.get("bio") ?? "").trim() || null,
    avatarUrl: String(formData.get("avatarUrl") ?? "").trim() || null
  });
  redirect(`/${locale}/user/my-profile?saved=1`);
}
