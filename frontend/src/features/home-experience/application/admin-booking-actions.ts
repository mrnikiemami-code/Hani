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

export async function cancelAdminOrder(
  id: string,
  reason: string
): Promise<{ ok: boolean }> {
  return post(`/internal/v1/admin/bookings/orders/${id}/cancel`, { reason });
}

export async function refundAdminOrder(
  orderId: string,
  paymentIntentId: string,
  amount: number,
  currency: string,
  reason: string
): Promise<{ ok: boolean }> {
  return post("/internal/v1/admin/approvals/refunds", {
    orderId,
    paymentIntentId,
    amount,
    currency,
    reason
  });
}

export async function requestSettlementApproval(
  payoutId: string,
  bankReference: string,
  documentUrl: string,
  reason: string
): Promise<{ ok: boolean }> {
  return post("/internal/v1/admin/approvals/settlements", {
    payoutId,
    bankReference,
    documentUrl,
    reason
  });
}

export async function approveAdminApproval(
  id: string,
  reason: string
): Promise<{ ok: boolean }> {
  return post(`/internal/v1/admin/approvals/${id}/approve`, { reason });
}

export async function rejectAdminApproval(
  id: string,
  reason: string
): Promise<{ ok: boolean }> {
  return post(`/internal/v1/admin/approvals/${id}/reject`, { reason });
}
