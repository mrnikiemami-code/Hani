import { cookies } from "next/headers";

const apiBase =
  process.env.API_BASE_URL ??
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  "http://localhost:5099";

const accessCookie = "hani_access_token";

export type SessionApiResult<T> = {
  status: number;
  data: T | null;
};

async function authHeaders(): Promise<HeadersInit> {
  const store = await cookies();
  const token = store.get(accessCookie)?.value;

  return token
    ? {
        Accept: "application/json",
        Authorization: `Bearer ${token}`
      }
    : { Accept: "application/json" };
}

async function request<T>(
  method: "GET" | "PUT" | "POST" | "DELETE",
  path: string,
  body?: unknown,
  extraHeaders?: HeadersInit
): Promise<SessionApiResult<T>> {
  try {
    const response = await fetch(`${apiBase}${path}`, {
      method,
      cache: "no-store",
      headers: {
        ...(await authHeaders()),
        ...(body === undefined ? {} : { "Content-Type": "application/json" }),
        ...extraHeaders
      },
      body: body === undefined ? undefined : JSON.stringify(body)
    });

    if (!response.ok) {
      return { status: response.status, data: null };
    }

    return { status: response.status, data: (await response.json()) as T };
  } catch {
    return { status: 0, data: null };
  }
}

export function sessionGet<T>(path: string): Promise<SessionApiResult<T>> {
  return request<T>("GET", path);
}

export function sessionPut<T>(path: string, body: unknown): Promise<SessionApiResult<T>> {
  return request<T>("PUT", path, body);
}

export function sessionPost<T>(
  path: string,
  body: unknown,
  headers?: HeadersInit
): Promise<SessionApiResult<T>> {
  return request<T>("POST", path, body, headers);
}

export function sessionDelete<T>(path: string): Promise<SessionApiResult<T>> {
  return request<T>("DELETE", path);
}
