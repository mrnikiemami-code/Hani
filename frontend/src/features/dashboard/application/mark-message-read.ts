"use server";

import { redirect } from "next/navigation";
import { routing } from "@/i18n/routing";
import { markMessageRead } from "../infrastructure/notifications-api";

function parseLocale(value: FormDataEntryValue | null): string {
  const candidate = String(value ?? "");
  return routing.locales.includes(candidate as (typeof routing.locales)[number])
    ? candidate
    : routing.defaultLocale;
}

export async function markMessageReadAction(formData: FormData): Promise<void> {
  const locale = parseLocale(formData.get("locale"));
  const messageId = String(formData.get("messageId") ?? "");
  if (messageId) {
    await markMessageRead(messageId);
  }
  redirect(`/${locale}/user/notifications`);
}
