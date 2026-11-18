"use server";

import { cookies } from "next/headers";

const apiBase =
  process.env.API_BASE_URL ??
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  "http://localhost:5099";

async function token(): Promise<string | null> {
  return (await cookies()).get("hani_access_token")?.value ?? null;
}

export async function approveAgency(id: string): Promise<{ ok: boolean }> {
  const accessToken = await token();
  if (!accessToken) return { ok: false };

  const response = await fetch(`${apiBase}/internal/v1/agencies/${id}/approve`, {
    method: "POST",
    cache: "no-store",
    headers: { Authorization: `Bearer ${accessToken}` }
  });

  return { ok: response.ok };
}

export async function rejectAgency(
  id: string,
  reason: string
): Promise<{ ok: boolean }> {
  const accessToken = await token();
  if (!accessToken) return { ok: false };

  const response = await fetch(`${apiBase}/internal/v1/agencies/${id}/reject`, {
    method: "POST",
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ reason })
  });

  return { ok: response.ok };
}
