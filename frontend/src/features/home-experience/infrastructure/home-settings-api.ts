import { cache } from "react";
import { apiGet } from "@/lib/hani/api";
import {
  normalizeHomePageSettings,
  type HomePageSettings,
  type HomePageSettingsResponse
} from "../domain/home-page-settings";

/** Reads the public homepage composition; missing settings use the parity defaults. */
export const getHomePageSettings = cache(async function getHomePageSettings(
  locale: string
): Promise<HomePageSettings> {
  const response = await apiGet<HomePageSettingsResponse>(
    `/market/v1/home-settings?locale=${encodeURIComponent(locale)}`
  );

  return normalizeHomePageSettings(response?.settings ?? null);
});
