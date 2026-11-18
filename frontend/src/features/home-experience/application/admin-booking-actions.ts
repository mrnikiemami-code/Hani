"use server";

import { cookies } from "next/headers";

const apiBase =
  process.env.API_BASE_URL ??
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  "http://localhost:5099";

export async function cancelAdminOrder(
  id: string,
  reason: string
): Promise<{ ok: boolean }> {
  const token = (await cookies()).get("hani_access_token")?.value;
  if (!token) return { ok: false };
  const response = await fetch(
    `${apiBase}/internal/v1/admin/bookings/orders/${id}/cancel`,
    {
      method: "POST",
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ reason })
    }
  );
  return { ok: response.ok };
}

export async function refundAdminOrder(
  id: string,
  paymentIntentId: string,
  amount: number,
  reason: string
): Promise<{ ok: boolean }> {
  const token = (await cookies()).get("hani_access_token")?.value;
  if (!token) return { ok: false };
  const response = await fetch(
    `${apiBase}/internal/v1/admin/bookings/orders/${id}/refund`,
    {
      method: "POST",
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ reason, paymentIntentId, amount })
    }
  );
  return { ok: response.ok };
}

export async function markPayoutPaid(id: string): Promise<{ ok: boolean }> {
  const accessToken = (await cookies()).get("hani_access_token")?.value;
  if (!accessToken) return { ok: false };
  const response = await fetch(
    `${apiBase}/internal/v1/admin/finance/payouts/${id}/paid`,
    {
      method: "POST",
      cache: "no-store",
      headers: { Authorization: `Bearer ${accessToken}` }
    }
  );
  return { ok: response.ok };
}
