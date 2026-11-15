import { apiGet } from "@/lib/hani/api";
import type {
  ContentPaged,
  TravelogueDetail,
  TravelogueSummary,
  VideoDetail,
  VideoSummary
} from "../domain/content";

export async function getTravelogues(
  locale: string,
  page = 1,
  pageSize = 9
): Promise<ContentPaged<TravelogueSummary>> {
  const query = new URLSearchParams({
    locale,
    page: String(page),
    pageSize: String(pageSize)
  });
  const result = await apiGet<ContentPaged<TravelogueSummary>>(
    `/market/v1/content/travelogues?${query.toString()}`
  );
  return result ?? { items: [], page, pageSize, totalCount: 0, totalPages: 0 };
}

export async function getTravelogue(
  locale: string,
  slug: string
): Promise<TravelogueDetail | null> {
  return apiGet<TravelogueDetail>(
    `/market/v1/content/travelogues/${encodeURIComponent(slug)}?locale=${encodeURIComponent(locale)}`
  );
}

export async function getVideos(
  locale: string,
  page = 1,
  pageSize = 9
): Promise<ContentPaged<VideoSummary>> {
  const query = new URLSearchParams({
    locale,
    page: String(page),
    pageSize: String(pageSize)
  });
  const result = await apiGet<ContentPaged<VideoSummary>>(
    `/market/v1/content/videos?${query.toString()}`
  );
  return result ?? { items: [], page, pageSize, totalCount: 0, totalPages: 0 };
}

export async function getVideo(
  locale: string,
  slug: string
): Promise<VideoDetail | null> {
  return apiGet<VideoDetail>(
    `/market/v1/content/videos/${encodeURIComponent(slug)}?locale=${encodeURIComponent(locale)}`
  );
}
