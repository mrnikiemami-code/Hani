"use server";

import { cookies } from "next/headers";

const apiBase =
  process.env.API_BASE_URL ??
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  "http://localhost:5099";

async function send(
  method: "POST" | "PUT",
  path: string,
  body: unknown
): Promise<{ ok: boolean }> {
  const token = (await cookies()).get("hani_access_token")?.value;
  if (!token) return { ok: false };
  const response = await fetch(`${apiBase}${path}`, {
    method,
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  });
  return { ok: response.ok };
}

export async function saveAdminRole(
  role: string,
  permissions: string[]
): Promise<{ ok: boolean }> {
  return send("PUT", `/internal/v1/admin/roles/${role}`, { permissions });
}

export async function changeUserRole(
  userId: string,
  role: string
): Promise<{ ok: boolean }> {
  return send("POST", `/internal/v1/admin/users/${userId}/role`, { role });
}

export async function createAdminRole(
  name: string,
  displayName: string
): Promise<{ ok: boolean }> {
  return send("POST", "/internal/v1/admin/roles", { name, displayName });
}

export async function deleteAdminRole(role: string): Promise<{ ok: boolean }> {
  const token = (await cookies()).get("hani_access_token")?.value;
  if (!token) return { ok: false };
  const response = await fetch(
    `${apiBase}/internal/v1/admin/roles/${encodeURIComponent(role)}`,
    {
      method: "DELETE",
      cache: "no-store",
      headers: { Authorization: `Bearer ${token}` }
    }
  );
  return { ok: response.ok };
}
