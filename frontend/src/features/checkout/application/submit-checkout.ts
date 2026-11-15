"use server";

import { redirect } from "next/navigation";
import { routing } from "@/i18n/routing";
import { sessionPost } from "@/lib/hani/server-api";
import type {
  CheckoutHold,
  CheckoutPaymentIntent,
  CheckoutQuote
} from "../domain/checkout";

function parseLocale(value: FormDataEntryValue | null): string {
  const candidate = String(value ?? "");
  return routing.locales.includes(candidate as (typeof routing.locales)[number])
    ? candidate
    : routing.defaultLocale;
}

function parsePositiveInt(value: FormDataEntryValue | null, fallback: number): number {
  const number = Number(value ?? fallback);
  return Number.isFinite(number) && number > 0 ? Math.floor(number) : fallback;
}

function parseTravelers(formData: FormData, count: number): string[] {
  return Array.from({ length: count }, (_, index) =>
    String(formData.get(`traveler-${index}`) ?? "").trim()
  ).filter((name) => name.length > 0);
}

export async function submitCheckout(formData: FormData): Promise<void> {
  const locale = parseLocale(formData.get("locale"));
  const productId = String(formData.get("productId") ?? "");
  const departureId = String(formData.get("departureId") ?? "");
  const roomType = String(formData.get("roomType") ?? "");
  const adults = parsePositiveInt(formData.get("adults"), 1);
  const children = Number(formData.get("children") ?? 0);
  const infants = Number(formData.get("infants") ?? 0);
  const contactEmail = String(formData.get("contactEmail") ?? "").trim();
  const contactPhone = String(formData.get("contactPhone") ?? "").trim();
  const travelerCount = adults + Math.max(0, children) + Math.max(0, infants);
  const travelers = parseTravelers(formData, travelerCount);

  if (
    !productId ||
    !departureId ||
    !roomType ||
    !contactEmail ||
    travelers.length !== travelerCount
  ) {
    redirect(`/${locale}/checkout/${productId}?error=invalid`);
  }

  const quote = await sessionPost<CheckoutQuote>("/market/v1/quotes", {
    departureId,
    roomType,
    adults,
    children: Math.max(0, children),
    infants: Math.max(0, infants)
  });

  if (!quote.data) {
    redirect(`/${locale}/checkout/${productId}?error=quote`);
  }

  const idempotencyKey = crypto.randomUUID();
  const hold = await sessionPost<CheckoutHold>(
    "/market/v1/holds",
    { quoteId: quote.data.quoteId },
    { "Idempotency-Key": `checkout-hold-${idempotencyKey}` }
  );

  if (!hold.data) {
    redirect(`/${locale}/checkout/${productId}?error=hold`);
  }

  const order = await sessionPost<{ orderId: string }>(
    "/market/v1/orders",
    {
      holdId: hold.data.holdId,
      contactEmail,
      contactPhone,
      travelers: travelers.map((fullName, index) => ({
        fullName,
        type: index < adults ? "Adult" : index < adults + children ? "Child" : "Infant"
      }))
    },
    { "Idempotency-Key": `checkout-order-${idempotencyKey}` }
  );

  if (!order.data) {
    redirect(`/${locale}/checkout/${productId}?error=order`);
  }

  const payment = await sessionPost<CheckoutPaymentIntent>(
    "/market/v1/payments/intents",
    { orderId: order.data.orderId },
    { "Idempotency-Key": `checkout-payment-${idempotencyKey}` }
  );

  const target = payment.data?.redirectUrl
    ? payment.data.redirectUrl
    : `/${locale}/checkout/confirmation?orderId=${order.data.orderId}`;

  redirect(target);
}
