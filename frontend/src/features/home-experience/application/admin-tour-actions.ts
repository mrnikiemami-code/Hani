"use server";

import { cookies } from "next/headers";
import type { AdminTourCreateInput } from "../domain/admin-tour";

const apiBase =
  process.env.API_BASE_URL ??
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  "http://localhost:5099";

export async function createAdminTour(
  input: AdminTourCreateInput
): Promise<{ ok: boolean }> {
  const token = (await cookies()).get("hani_access_token")?.value;
  if (!token) return { ok: false };
  const response = await fetch(`${apiBase}/internal/v1/admin/catalog/tours`, {
    method: "POST",
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(input)
  });
  return { ok: response.ok };
}

export async function publishAdminTour(id: string): Promise<{ ok: boolean }> {
  const token = (await cookies()).get("hani_access_token")?.value;
  if (!token) return { ok: false };
  const response = await fetch(
    `${apiBase}/internal/v1/admin/catalog/tours/${id}/publish`,
    {
      method: "POST",
      cache: "no-store",
      headers: { Authorization: `Bearer ${token}` }
    }
  );
  return { ok: response.ok };
}
