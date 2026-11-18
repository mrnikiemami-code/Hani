"use server";

import { cookies } from "next/headers";

const apiBase =
  process.env.API_BASE_URL ??
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  "http://localhost:5099";

async function token(): Promise<string | null> {
  return (await cookies()).get("hani_access_token")?.value ?? null;
}

async function post(path: string, body?: unknown): Promise<{ ok: boolean }> {
  const accessToken = await token();
  if (!accessToken) return { ok: false };
  const response = await fetch(`${apiBase}${path}`, {
    method: "POST",
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      ...(body === undefined ? {} : { "Content-Type": "application/json" })
    },
    body: body === undefined ? undefined : JSON.stringify(body)
  });
  return { ok: response.ok };
}

export async function moderateReview(
  id: string,
  action: "publish" | "reject",
  reason: string
) {
  return action === "publish"
    ? post(`/internal/v1/reviews/${id}/publish`)
    : post(`/internal/v1/reviews/${id}/reject`, { reason });
}

export async function moderateMedia(
  id: string,
  action: "approve" | "reject",
  reason: string
) {
  return action === "approve"
    ? post(`/internal/v1/media/${id}/approve`)
    : post(`/internal/v1/media/${id}/reject`, { reason });
}
