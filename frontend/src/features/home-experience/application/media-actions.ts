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

function appendOptional(formData: FormData, key: string, value: FormDataEntryValue | null) {
  const text = typeof value === "string" ? value.trim() : "";
  if (text) {
    formData.append(key, text);
  }
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
  appendOptional(backendForm, "folderId", formData.get("folderId"));
  appendOptional(backendForm, "tags", formData.get("tags"));
  appendOptional(backendForm, "focalX", formData.get("focalX"));
  appendOptional(backendForm, "focalY", formData.get("focalY"));

  const response = await fetch(`${apiBase}/internal/v1/content-media`, {
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

  const response = await fetch(`${apiBase}/internal/v1/content-media/${id}`, {
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

export async function createMediaFolder(
  name: string
): Promise<MediaActionResult<{ id: string; name: string; parentId: string | null }>> {
  const accessToken = await token();
  if (!accessToken) {
    return { ok: false, error: "unauthorized" };
  }

  const response = await fetch(`${apiBase}/internal/v1/content-media/folders`, {
    method: "POST",
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ name })
  });

  if (response.status === 401 || response.status === 403) {
    return { ok: false, error: "unauthorized" };
  }

  return response.ok
    ? {
        ok: true,
        data: (await response.json()) as {
          id: string;
          name: string;
          parentId: string | null;
        }
      }
    : { ok: false, error: "failed" };
}

export async function replaceMedia(
  id: string,
  formData: FormData
): Promise<MediaActionResult<MediaAsset>> {
  const accessToken = await token();
  if (!accessToken) {
    return { ok: false, error: "unauthorized" };
  }

  const file = formData.get("file");
  if (!(file instanceof File)) {
    return { ok: false, error: "failed" };
  }

  const backendForm = new FormData();
  backendForm.append("file", file, file.name);
  backendForm.append("altText", String(formData.get("altText") ?? ""));
  backendForm.append("caption", String(formData.get("caption") ?? ""));
  backendForm.append("credit", String(formData.get("credit") ?? ""));
  appendOptional(backendForm, "folderId", formData.get("folderId"));
  appendOptional(backendForm, "tags", formData.get("tags"));
  appendOptional(backendForm, "focalX", formData.get("focalX"));
  appendOptional(backendForm, "focalY", formData.get("focalY"));

  const response = await fetch(`${apiBase}/internal/v1/content-media/${id}/replace`, {
    method: "POST",
    cache: "no-store",
    headers: { Authorization: `Bearer ${accessToken}` },
    body: backendForm
  });

  if (response.status === 401 || response.status === 403) {
    return { ok: false, error: "unauthorized" };
  }

  return response.ok
    ? { ok: true, data: (await response.json()) as MediaAsset }
    : { ok: false, error: "failed" };
}

export async function bulkDeleteMedia(
  ids: string[]
): Promise<MediaActionResult<null>> {
  const accessToken = await token();
  if (!accessToken) {
    return { ok: false, error: "unauthorized" };
  }

  const response = await fetch(`${apiBase}/internal/v1/content-media/bulk-delete`, {
    method: "POST",
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ ids })
  });

  if (response.status === 401 || response.status === 403) {
    return { ok: false, error: "unauthorized" };
  }

  return response.ok || response.status === 204
    ? { ok: true }
    : { ok: false, error: "failed" };
}

export async function deleteMedia(
  id: string
): Promise<MediaActionResult<null>> {
  const accessToken = await token();
  if (!accessToken) {
    return { ok: false, error: "unauthorized" };
  }

  const response = await fetch(`${apiBase}/internal/v1/content-media/${id}`, {
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
