"use server";

import { cookies } from "next/headers";
import type { AdminHotelDetail } from "../domain/admin-hotel-detail";

const apiBase =
  process.env.API_BASE_URL ??
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  "http://localhost:5099";

export async function updateAdminHotel(
  id: string,
  input: AdminHotelDetail
): Promise<{ ok: boolean; data?: AdminHotelDetail }> {
  const token = (await cookies()).get("hani_access_token")?.value;
  if (!token) return { ok: false };

  const response = await fetch(`${apiBase}/internal/v1/admin/catalog/hotels/${id}`, {
    method: "PUT",
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      slug: input.slug,
      destinationId: input.destinationId,
      stars: input.stars,
      address: input.address,
      latitude: input.latitude,
      longitude: input.longitude,
      translations: input.translations,
      amenities: input.amenities,
      images: input.images,
      rooms: input.rooms,
      propertyType: input.propertyType,
      contactPhone: input.contactPhone,
      websiteUrl: input.websiteUrl,
      checkInTime: input.checkInTime,
      checkOutTime: input.checkOutTime,
      status: input.status,
      seoTitle: input.seoTitle,
      seoDescription: input.seoDescription
    })
  });

  return response.ok
    ? { ok: true, data: (await response.json()) as AdminHotelDetail }
    : { ok: false };
}
