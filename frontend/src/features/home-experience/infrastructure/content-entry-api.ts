import { apiGet } from "@/lib/hani/api";
import type { ContentEntry } from "../domain/content-entry";

/** Reads a published CMS page by slug and locale. */
export async function getPublishedContentEntry(
  locale: string,
  slug: string
): Promise<ContentEntry | null> {
  return apiGet<ContentEntry>(
    `/market/v1/content-entries/${encodeURIComponent(slug)}?locale=${encodeURIComponent(locale)}&type=Page`
  );
}
