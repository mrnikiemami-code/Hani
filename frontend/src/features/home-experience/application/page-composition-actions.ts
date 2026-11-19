"use server";

import { cookies } from "next/headers";
import type { PageCompositionData } from "../domain/page-composition";

const apiBase =
  process.env.API_BASE_URL ??
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  "http://localhost:5099";

async function token() {
  return (await cookies()).get("hani_access_token")?.value;
}

export async function savePageComposition(
  pageKey: string,
  locale: string,
  data: PageCompositionData
): Promise<{ ok: boolean }> {
  const accessToken = await token();
  if (!accessToken) return { ok: false };
  const response = await fetch(
    `${apiBase}/internal/v1/page-compositions/${encodeURIComponent(pageKey)}?locale=${encodeURIComponent(locale)}`,
    {
      method: "PUT",
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ data })
    }
  );
  return { ok: response.ok };
}

export async function publishPageComposition(
  pageKey: string,
  locale: string
): Promise<{ ok: boolean }> {
  const accessToken = await token();
  if (!accessToken) return { ok: false };
  const response = await fetch(
    `${apiBase}/internal/v1/page-compositions/${encodeURIComponent(pageKey)}/publish?locale=${encodeURIComponent(locale)}`,
    {
      method: "POST",
      cache: "no-store",
      headers: { Authorization: `Bearer ${accessToken}` }
    }
  );
  return { ok: response.ok };
}
