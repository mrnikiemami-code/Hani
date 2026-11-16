import { sessionDelete, sessionGet, sessionPost } from "@/lib/hani/server-api";

export type WishlistProduct = {
  productId: string;
  slug: string;
  title: string;
  minPrice: number | null;
  currency: string | null;
  savedAt: string;
};

export async function getMyWishlist(): Promise<WishlistProduct[]> {
  const result = await sessionGet<WishlistProduct[]>("/market/v1/me/wishlist");
  return result.status === 200 && result.data ? result.data : [];
}

export async function saveWishlistProduct(productId: string): Promise<boolean> {
  const result = await sessionPost(`/market/v1/me/wishlist/${encodeURIComponent(productId)}`, {});
  return result.status === 201;
}

export async function removeWishlistProduct(productId: string): Promise<boolean> {
  const result = await sessionDelete(`/market/v1/me/wishlist/${encodeURIComponent(productId)}`);
  return result.status === 204;
}
