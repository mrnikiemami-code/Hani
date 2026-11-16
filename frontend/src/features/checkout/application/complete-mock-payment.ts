"use server";

import { redirect } from "next/navigation";
import { routing } from "@/i18n/routing";
import { completeMockPayment } from "../infrastructure/checkout-api";

function parseLocale(value: FormDataEntryValue | null): string {
  const candidate = String(value ?? "");
  return routing.locales.includes(candidate as (typeof routing.locales)[number])
    ? candidate
    : routing.defaultLocale;
}

export async function payWithMockGateway(formData: FormData): Promise<void> {
  const locale = parseLocale(formData.get("locale"));
  const paymentIntentId = String(formData.get("paymentIntentId") ?? "");
  if (paymentIntentId) {
    await completeMockPayment(paymentIntentId);
  }
  redirect(`/${locale}/checkout/confirmation?intent=${encodeURIComponent(paymentIntentId)}`);
}
