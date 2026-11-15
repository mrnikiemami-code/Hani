import { apiGet } from "@/lib/hani/api";
import type { HotelPagedResult, HotelSearchItem } from "../domain/hotel-search";

export async function searchHotels(
  locale: string,
  page = 1,
  pageSize = 9,
  sortBy = "rating"
): Promise<HotelPagedResult> {
  const query = new URLSearchParams({
    locale,
    page: String(page),
    pageSize: String(pageSize),
    sortBy
  });

  const result = await apiGet<HotelPagedResult>(
    `/market/v1/hotels?${query.toString()}`
  );

  const items = (result?.items ?? []).filter(
    (item: HotelSearchItem) => !item.name.includes("?") && !item.name.includes("�")
  );

  return result
    ? { ...result, items, totalCount: items.length }
    : { items: [], page, pageSize, totalCount: 0, totalPages: 0 };
}
