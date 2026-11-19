import { apiGet } from "@/lib/hani/api";
import type {
  PagedResult,
  TourSearchFilters,
  TourSearchItem
} from "../domain/tour-search";

export async function searchTours(
  locale: string,
  page = 1,
  pageSize = 9,
  filters: TourSearchFilters = {}
): Promise<PagedResult<TourSearchItem>> {
  const query = new URLSearchParams({
    locale,
    page: String(page),
    pageSize: String(pageSize),
    sort: filters.sort ?? "newest"
  });

  if (filters.scope) {
    query.set("scope", filters.scope);
  }
  if (filters.originSlug) {
    query.set("originSlug", filters.originSlug);
  }
  if (filters.q) {
    query.set("q", filters.q);
  }
  if (filters.minPrice !== undefined) {
    query.set("minPrice", String(filters.minPrice));
  }
  if (filters.maxPrice !== undefined) {
    query.set("maxPrice", String(filters.maxPrice));
  }
  if (filters.minDuration !== undefined) {
    query.set("minDuration", String(filters.minDuration));
  }
  if (filters.maxDuration !== undefined) {
    query.set("maxDuration", String(filters.maxDuration));
  }
  if (filters.tourType) {
    query.set("tourType", filters.tourType);
  }

  const result = await apiGet<PagedResult<TourSearchItem>>(
    `/market/v1/search?${query.toString()}`
  );

  const items = (result?.items ?? []).filter(
    (item) => !item.title.includes("?") && !item.title.includes("�??")
  );

  return (
    result
      ? { ...result, items, totalCount: items.length }
      : {
          items: [],
          page,
          pageSize,
          totalCount: 0,
          totalPages: 0
        }
  );
}
