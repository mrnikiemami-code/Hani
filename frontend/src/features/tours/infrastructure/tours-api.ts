import { apiGet } from "@/lib/hani/api";
import type {
  PagedResult,
  TourScopeValue,
  TourSearchItem
} from "../domain/tour-search";

export async function searchTours(
  locale: string,
  page = 1,
  pageSize = 9,
  scope?: TourScopeValue
): Promise<PagedResult<TourSearchItem>> {
  const query = new URLSearchParams({
    locale,
    page: String(page),
    pageSize: String(pageSize),
    sort: "newest"
  });

  if (scope) {
    query.set("scope", scope);
  }

  const result = await apiGet<PagedResult<TourSearchItem>>(
    `/market/v1/search?${query.toString()}`
  );

  const items = (result?.items ?? []).filter(
    (item) => !item.title.includes("?") && !item.title.includes("�")
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
