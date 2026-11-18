"use server";

import { cookies } from "next/headers";
import type { CreatedApiClient } from "../domain/admin-channel";

const apiBase =
  process.env.API_BASE_URL ??
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  "http://localhost:5099";

async function post(path: string, body?: unknown): Promise<Response> {
  const token = (await cookies()).get("hani_access_token")?.value;
  if (!token) return new Response(null, { status: 401 });
  return fetch(`${apiBase}${path}`, {
    method: "POST",
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${token}`,
      ...(body === undefined ? {} : { "Content-Type": "application/json" })
    },
    body: body === undefined ? undefined : JSON.stringify(body)
  });
}

export async function createChannelClient(input: {
  agencyId: string;
  name: string;
  scopes: string[];
}): Promise<{ ok: boolean; data?: CreatedApiClient }> {
  const response = await post("/internal/v1/admin/channel/clients", input);
  if (!response.ok) return { ok: false };
  return { ok: true, data: (await response.json()) as CreatedApiClient };
}

export async function revokeChannelClient(id: string): Promise<{ ok: boolean }> {
  const response = await post(`/internal/v1/admin/channel/clients/${id}/revoke`);
  return { ok: response.ok };
}

export async function updateChannelSettings(
  agencyId: string,
  input: {
    plan: string;
    whiteLabelEnabled: boolean;
    customDomain: string | null;
    attributionRequired: boolean;
    canonicalMode: string;
  }
): Promise<{ ok: boolean }> {
  const response = await post(
    `/internal/v1/admin/channel/agencies/${agencyId}/settings`,
    input
  );
  return { ok: response.ok };
}

export async function updateChannelWebhook(
  agencyId: string,
  url: string | null,
  secret: string | null
): Promise<{ ok: boolean }> {
  const response = await post(
    `/internal/v1/admin/channel/agencies/${agencyId}/webhook`,
    { url, secret }
  );
  return { ok: response.ok };
}
