import { apiGet } from "@/lib/hani/api";
import type { HotelPagedResult, HotelSearchItem } from "../domain/hotel-search";

export type HotelFacets = {
  total: number;
  stars: { stars: number; count: number }[];
  amenities: {
    category: string;
    code: string;
    name: string;
    count: number;
  }[];
};

export async function searchHotels(
  locale: string,
  page = 1,
  pageSize = 9,
  sortBy = "rating",
  filters: { q?: string; minStars?: number; amenity?: string } = {}
): Promise<HotelPagedResult> {
  const query = new URLSearchParams({
    locale,
    page: String(page),
    pageSize: String(pageSize),
    sortBy
  });
  if (filters.q) query.set("q", filters.q);
  if (filters.minStars) query.set("minStars", String(filters.minStars));
  if (filters.amenity) query.set("amenity", filters.amenity);

  const result = await apiGet<HotelPagedResult>(
    `/market/v1/hotels?${query.toString()}`
  );

  const items = (result?.items ?? []).filter(
    (item: HotelSearchItem) => !item.name.includes("?") && !item.name.includes("�??")
  );

  return result
    ? { ...result, items }
    : { items: [], page, pageSize, totalCount: 0, totalPages: 0 };
}

export async function getHotelFacets(): Promise<HotelFacets | null> {
  return apiGet<HotelFacets>("/market/v1/hotels/facets");
}
