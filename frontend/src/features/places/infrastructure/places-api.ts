import { apiGet } from "@/lib/hani/api";
import type { PlaceDetail, PlaceListResult } from "../domain/place";

export type PlaceKind = "restaurants" | "attractions";

export async function getPlaces(
  locale: string,
  kind: PlaceKind,
  page = 1,
  pageSize = 9
): Promise<PlaceListResult> {
  const query = new URLSearchParams({
    locale,
    page: String(page),
    pageSize: String(pageSize)
  });

  const result = await apiGet<PlaceListResult>(
    `/market/v1/${kind}?${query.toString()}`
  );

  return result ?? { items: [], page, pageSize, totalCount: 0, totalPages: 0 };
}

export async function getPlace(
  locale: string,
  kind: PlaceKind,
  slug: string
): Promise<PlaceDetail | null> {
  return apiGet<PlaceDetail>(
    `/market/v1/${kind}/${encodeURIComponent(slug)}?locale=${encodeURIComponent(locale)}`
  );
}
