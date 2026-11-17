import { apiGet } from "@/lib/hani/api";
import type { MediaAsset } from "../domain/media";

/** Reads a public media asset with responsive variants. */
export async function getMediaAsset(id: string): Promise<MediaAsset | null> {
  return apiGet<MediaAsset>(`/market/v1/media/${encodeURIComponent(id)}`);
}
