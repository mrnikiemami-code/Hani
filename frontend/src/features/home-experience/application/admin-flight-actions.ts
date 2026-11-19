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

export async function createFlightRoute(input: unknown): Promise<{ ok: boolean }> {
  return post("/internal/v1/admin/catalog/flights/routes", input);
}

export async function createAirline(iata: string, name: string): Promise<{ ok: boolean }> {
  return post("/internal/v1/admin/catalog/flights/airlines", { iata, name });
}

export async function createAirport(input: {
  iata: string;
  name: string;
  city: string;
  countryCode: string;
}): Promise<{ ok: boolean }> {
  return post("/internal/v1/admin/catalog/flights/airports", input);
}
