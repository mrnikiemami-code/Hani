"use server";

import { cookies } from "next/headers";

const apiBase =
  process.env.API_BASE_URL ??
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  "http://localhost:5099";

export async function retryNotification(id: string): Promise<{ ok: boolean }> {
  const token = (await cookies()).get("hani_access_token")?.value;
  if (!token) return { ok: false };
  const response = await fetch(
    `${apiBase}/internal/v1/admin/notifications/${id}/retry`,
    {
      method: "POST",
      cache: "no-store",
      headers: { Authorization: `Bearer ${token}` }
    }
  );
  return { ok: response.ok };
}
