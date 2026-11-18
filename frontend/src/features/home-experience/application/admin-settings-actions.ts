"use server";

import { cookies } from "next/headers";
import type { PlatformSettings } from "../domain/admin-platform-settings";

const apiBase =
  process.env.API_BASE_URL ??
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  "http://localhost:5099";

export async function savePlatformSettings(
  settings: PlatformSettings
): Promise<{ ok: boolean }> {
  const token = (await cookies()).get("hani_access_token")?.value;
  if (!token) return { ok: false };
  const response = await fetch(
    `${apiBase}/internal/v1/admin/platform-settings`,
    {
      method: "PUT",
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ settings })
    }
  );
  return { ok: response.ok };
}
