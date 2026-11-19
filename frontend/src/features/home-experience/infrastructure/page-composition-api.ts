import { sessionGet } from "@/lib/hani/server-api";
import { apiGet } from "@/lib/hani/api";
import type {
  PageCompositionDto,
  PageCompositionListItem
} from "../domain/page-composition";

/** Admin list of page compositions for one locale. */
export async function getPageCompositionList(
  locale: string
): Promise<PageCompositionListItem[]> {
  const result = await sessionGet<PageCompositionListItem[]>(
    `/internal/v1/page-compositions?locale=${encodeURIComponent(locale)}`
  );
  return result.data ?? [];
}

/** Admin draft or published composition. */
export async function getPageComposition(
  pageKey: string,
  locale: string,
  published = false
): Promise<PageCompositionDto | null> {
  const result = await sessionGet<PageCompositionDto>(
    `/internal/v1/page-compositions/${encodeURIComponent(pageKey)}?locale=${encodeURIComponent(locale)}&published=${published}`
  );
  return result.data ?? null;
}

/** Published composition for public rendering. */
export async function getPublishedPageComposition(
  pageKey: string,
  locale: string
): Promise<PageCompositionDto | null> {
  return apiGet<PageCompositionDto>(
    `/market/v1/pages/${encodeURIComponent(pageKey)}?locale=${encodeURIComponent(locale)}`
  );
}
