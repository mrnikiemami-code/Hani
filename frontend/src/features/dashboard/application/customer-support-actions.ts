"use server";

import { cookies } from "next/headers";

const apiBase =
  process.env.API_BASE_URL ??
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  "http://localhost:5099";

async function post(
  path: string,
  body: unknown
): Promise<{ ok: boolean; id?: string }> {
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
  if (!response.ok) return { ok: false };
  const data = (await response.json()) as { id?: string };
  return { ok: true, id: data.id };
}

export async function createMySupportTicket(input: {
  contactName: string;
  contactEmail: string;
  contactPhone?: string | null;
  subject: string;
  category: string;
  message: string;
}): Promise<{ ok: boolean; id?: string }> {
  return post("/market/v1/support/tickets", input);
}

export async function replyMySupportTicket(
  id: string,
  body: string,
  attachmentIds: string[] = []
): Promise<{ ok: boolean }> {
  return post(`/market/v1/support/tickets/${id}/messages`, {
    body,
    attachmentIds
  });
}

export async function uploadMySupportAttachment(
  ticketId: string,
  formData: FormData
): Promise<{ ok: boolean; id?: string }> {
  const token = (await cookies()).get("hani_access_token")?.value;
  if (!token) return { ok: false };
  const response = await fetch(
    `${apiBase}/market/v1/support/tickets/${ticketId}/attachments`,
    {
      method: "POST",
      cache: "no-store",
      headers: { Authorization: `Bearer ${token}` },
      body: formData
    }
  );
  if (!response.ok) return { ok: false };
  const data = (await response.json()) as { id?: string };
  return { ok: true, id: data.id };
}

export async function createMySupportDispute(
  ticketId: string,
  input: {
    orderId?: string | null;
    type: string;
    amount?: number | null;
    currency?: string | null;
    description: string;
    evidenceUrl?: string | null;
  }
): Promise<{ ok: boolean }> {
  return post(`/market/v1/support/tickets/${ticketId}/disputes`, input);
}
