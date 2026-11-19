"use server";

import { cookies } from "next/headers";

const apiBase =
  process.env.API_BASE_URL ??
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  "http://localhost:5099";

async function post(path: string, body: unknown): Promise<{ ok: boolean }> {
  const token = (await cookies()).get("hani_access_token")?.value;
  if (!token) return { ok: false };
  const response = await fetch(`${apiBase}${path}`, {
    method: "POST",
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  });
  return { ok: response.ok };
}

export async function createVisaCountry(input: unknown): Promise<{ ok: boolean }> {
  return post("/internal/v1/admin/catalog/visas", input);
}

export async function updateVisaCountry(
  id: string,
  input: unknown
): Promise<{ ok: boolean }> {
  const token = (await cookies()).get("hani_access_token")?.value;
  if (!token) return { ok: false };
  const response = await fetch(
    `${apiBase}/internal/v1/admin/catalog/visas/${id}`,
    {
      method: "PUT",
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(input)
    }
  );
  return { ok: response.ok };
}

export async function updateVisaApplicationStatus(
  id: string,
  status: string,
  rejectionReason?: string | null
): Promise<{ ok: boolean }> {
  return post(`/internal/v1/admin/catalog/visa-applications/${id}/status`, {
    status,
    rejectionReason: rejectionReason ?? null
  });
}
