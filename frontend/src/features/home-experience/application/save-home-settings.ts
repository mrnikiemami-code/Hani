"use server";

import { cookies } from "next/headers";
import type { HomePageSettings } from "../domain/home-page-settings";

const apiBase =
  process.env.API_BASE_URL ??
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  "http://localhost:5099";

export type SaveHomeSettingsResult = {
  ok: boolean;
  error?: "unauthorized" | "failed";
};

/** Persists homepage composition through the admin-only backend endpoint. */
export async function saveHomePageSettings(
  locale: string,
  settings: HomePageSettings
): Promise<SaveHomeSettingsResult> {
  const token = (await cookies()).get("hani_access_token")?.value;
  if (!token) {
    return { ok: false, error: "unauthorized" };
  }

  const response = await fetch(`${apiBase}/internal/v1/home-settings`, {
    method: "PUT",
    cache: "no-store",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      key: "default",
      locale,
      settings
    })
  });

  if (response.status === 401 || response.status === 403) {
    return { ok: false, error: "unauthorized" };
  }

  return { ok: response.ok, error: response.ok ? undefined : "failed" };
}
