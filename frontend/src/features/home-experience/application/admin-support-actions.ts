"use server";

import { cookies } from "next/headers";
import type {
  SupportDisputeInput,
  SupportTicketCreateInput
} from "../domain/admin-support";

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

export async function createSupportTicket(
  input: SupportTicketCreateInput
): Promise<{ ok: boolean; id?: string }> {
  const token = (await cookies()).get("hani_access_token")?.value;
  if (!token) return { ok: false };
  const response = await fetch(
    `${apiBase}/internal/v1/admin/support/tickets`,
    {
      method: "POST",
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(input)
    }
  );
  if (!response.ok) return { ok: false };
  const data = (await response.json()) as { id?: string };
  return { ok: true, id: data.id };
}

export async function replySupportTicket(
  id: string,
  body: string,
  isInternal: boolean,
  attachmentIds: string[] = []
): Promise<{ ok: boolean }> {
  return post(`/internal/v1/admin/support/tickets/${id}/messages`, {
    body,
    isInternal,
    attachmentIds
  });
}

export async function uploadSupportAttachment(
  ticketId: string,
  formData: FormData
): Promise<{ ok: boolean; id?: string }> {
  const token = (await cookies()).get("hani_access_token")?.value;
  if (!token) return { ok: false };
  const response = await fetch(
    `${apiBase}/internal/v1/admin/support/tickets/${ticketId}/attachments`,
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

export async function updateSupportTicket(
  id: string,
  status: string,
  priority: string,
  assignedTo: string | null
): Promise<{ ok: boolean }> {
  return post(`/internal/v1/admin/support/tickets/${id}/update`, {
    status,
    priority,
    assignedTo
  });
}

export async function createSupportDispute(
  ticketId: string,
  input: SupportDisputeInput
): Promise<{ ok: boolean }> {
  return post(`/internal/v1/admin/support/tickets/${ticketId}/disputes`, input);
}

export async function updateSupportDisputeStatus(
  id: string,
  status: string,
  resolution: string | null
): Promise<{ ok: boolean }> {
  return post(`/internal/v1/admin/support/disputes/${id}/status`, {
    status,
    resolution
  });
}
