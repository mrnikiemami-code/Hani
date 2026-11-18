"use server";

import { cookies } from "next/headers";

const apiBase =
  process.env.API_BASE_URL ??
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  "http://localhost:5099";

async function post(path: string, body?: unknown): Promise<{ ok: boolean }> {
  const token = (await cookies()).get("hani_access_token")?.value;
  if (!token) return { ok: false };
  const response = await fetch(`${apiBase}${path}`, {
    method: "POST",
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${token}`,
      ...(body === undefined ? {} : { "Content-Type": "application/json" })
    },
    body: body === undefined ? undefined : JSON.stringify(body)
  });
  return { ok: response.ok };
}

export async function approveSupplierOffer(id: string): Promise<{ ok: boolean }> {
  return post(`/internal/v1/admin/suppliers/offers/${id}/approve`);
}

export async function rejectSupplierOffer(
  id: string,
  reason: string
): Promise<{ ok: boolean }> {
  return post(`/internal/v1/admin/suppliers/offers/${id}/reject`, { reason });
}
