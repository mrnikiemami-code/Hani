"use server";

import { cookies } from "next/headers";
import type { MediaAsset } from "../domain/media";

const apiBase =
  process.env.API_BASE_URL ??
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  "http://localhost:5099";

async function token(): Promise<string | null> {
  return (await cookies()).get("hani_access_token")?.value ?? null;
}

export type MediaActionResult<T> = {
  ok: boolean;
  error?: "unauthorized" | "failed";
  data?: T;
};

export async function uploadMedia(
  formData: FormData
): Promise<MediaActionResult<MediaAsset>> {
  const accessToken = await token();
  if (!accessToken) {
    return { ok: false, error: "unauthorized" };
  }

  const file = formData.get("file");
  const altText = formData.get("altText");
  if (!(file instanceof File) || typeof altText !== "string" || !altText.trim()) {
    return { ok: false, error: "failed" };
  }

  const backendForm = new FormData();
  backendForm.append("file", file, file.name);
  backendForm.append("altText", altText);
  backendForm.append("caption", String(formData.get("caption") ?? ""));
  backendForm.append("credit", String(formData.get("credit") ?? ""));

  const response = await fetch(`${apiBase}/internal/v1/media`, {
    method: "POST",
    cache: "no-store",
    headers: { Authorization: `Bearer ${accessToken}` },
    body: backendForm
  });

  if (response.status === 401 || response.status === 403) {
    return { ok: false, error: "unauthorized" };
  }

  if (!response.ok) {
    return { ok: false, error: "failed" };
  }

  return { ok: true, data: (await response.json()) as MediaAsset };
}

export async function updateMediaAlt(
  id: string,
  altText: string
): Promise<MediaActionResult<MediaAsset>> {
  const accessToken = await token();
  if (!accessToken) {
    return { ok: false, error: "unauthorized" };
  }

  const response = await fetch(`${apiBase}/internal/v1/media/${id}`, {
    method: "PUT",
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ altText, caption: null, credit: null })
  });

  if (response.status === 401 || response.status === 403) {
    return { ok: false, error: "unauthorized" };
  }

  return response.ok
    ? { ok: true, data: (await response.json()) as MediaAsset }
    : { ok: false, error: "failed" };
}

export async function deleteMedia(
  id: string
): Promise<MediaActionResult<null>> {
  const accessToken = await token();
  if (!accessToken) {
    return { ok: false, error: "unauthorized" };
  }

  const response = await fetch(`${apiBase}/internal/v1/media/${id}`, {
    method: "DELETE",
    cache: "no-store",
    headers: { Authorization: `Bearer ${accessToken}` }
  });

  if (response.status === 401 || response.status === 403) {
    return { ok: false, error: "unauthorized" };
  }

  return response.ok || response.status === 204
    ? { ok: true }
    : { ok: false, error: "failed" };
}
