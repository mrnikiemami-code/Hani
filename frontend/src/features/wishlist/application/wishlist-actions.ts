"use server";

import { redirect } from "next/navigation";
import { routing } from "@/i18n/routing";
import {
  removeWishlistProduct,
  saveWishlistProduct
} from "../infrastructure/wishlist-api";

function parseLocale(value: FormDataEntryValue | null): string {
  const candidate = String(value ?? "");
  return routing.locales.includes(candidate as (typeof routing.locales)[number])
    ? candidate
    : routing.defaultLocale;
}

export async function addWishlist(formData: FormData): Promise<void> {
  const locale = parseLocale(formData.get("locale"));
  const productId = String(formData.get("productId") ?? "");
  if (productId) {
    await saveWishlistProduct(productId);
  }
  redirect(`/${locale}/user/wishlist`);
}

export async function removeWishlist(formData: FormData): Promise<void> {
  const locale = parseLocale(formData.get("locale"));
  const productId = String(formData.get("productId") ?? "");
  if (productId) {
    await removeWishlistProduct(productId);
  }
  redirect(`/${locale}/user/wishlist`);
}
