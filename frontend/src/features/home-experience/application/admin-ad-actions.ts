"use server";

import { cookies } from "next/headers";

const apiBase =
  process.env.API_BASE_URL ??
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  "http://localhost:5099";

export async function createAdSlot(
  code: string,
  name: string
): Promise<{ ok: boolean }> {
  const token = (await cookies()).get("hani_access_token")?.value;
  if (!token) return { ok: false };
  const response = await fetch(
    `${apiBase}/internal/v1/admin/marketing/ad-slots`,
    {
      method: "POST",
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ code, name })
    }
  );
  return { ok: response.ok };
}

export async function addAdCreative(
  code: string,
  input: {
    title: string;
    imageUrl: string;
    targetUrl: string;
    startsAt?: string | null;
    endsAt?: string | null;
  }
): Promise<{ ok: boolean }> {
  const token = (await cookies()).get("hani_access_token")?.value;
  if (!token) return { ok: false };
  const response = await fetch(
    `${apiBase}/internal/v1/admin/marketing/ad-slots/${encodeURIComponent(code)}/creatives`,
    {
      method: "POST",
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title: input.title,
        imageUrl: input.imageUrl,
        targetUrl: input.targetUrl,
        startsAt: input.startsAt ?? null,
        endsAt: input.endsAt ?? null
      })
    }
  );
  return { ok: response.ok };
}
