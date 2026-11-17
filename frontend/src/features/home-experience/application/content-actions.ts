"use server";

import { cookies } from "next/headers";
import type { ContentEntry, ContentEntryWrite } from "../domain/content-entry";

const apiBase =
  process.env.API_BASE_URL ??
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  "http://localhost:5099";

async function token(): Promise<string | null> {
  return (await cookies()).get("hani_access_token")?.value ?? null;
}

export type ContentActionResult<T> = {
  ok: boolean;
  error?: "unauthorized" | "failed";
  data?: T;
};

export async function saveContentEntry(
  id: string | null,
  input: ContentEntryWrite
): Promise<ContentActionResult<ContentEntry>> {
  const accessToken = await token();
  if (!accessToken) return { ok: false, error: "unauthorized" };

  const response = await fetch(
    `${apiBase}/internal/v1/content-entries${id ? `/${id}` : ""}`,
    {
      method: id ? "PUT" : "POST",
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(input)
    }
  );

  if (response.status === 401 || response.status === 403) {
    return { ok: false, error: "unauthorized" };
  }

  return response.ok
    ? { ok: true, data: (await response.json()) as ContentEntry }
    : { ok: false, error: "failed" };
}

export async function changeContentStatus(
  id: string,
  action: "publish" | "unpublish" | "delete"
): Promise<ContentActionResult<ContentEntry | null>> {
  const accessToken = await token();
  if (!accessToken) return { ok: false, error: "unauthorized" };

  const response = await fetch(
    `${apiBase}/internal/v1/content-entries/${id}${action === "delete" ? "" : `/${action}`}`,
    {
      method: action === "delete" ? "DELETE" : "POST",
      cache: "no-store",
      headers: { Authorization: `Bearer ${accessToken}` }
    }
  );

  if (response.status === 401 || response.status === 403) {
    return { ok: false, error: "unauthorized" };
  }

  if (!response.ok) {
    return { ok: false, error: "failed" };
  }

  return {
    ok: true,
    data:
      action === "delete"
        ? null
        : ((await response.json()) as ContentEntry)
  };
}
