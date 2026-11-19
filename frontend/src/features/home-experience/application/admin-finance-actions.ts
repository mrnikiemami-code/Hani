"use server";

import { cookies } from "next/headers";
import type {
  AdminFinanceSettings,
  AdminFinanceSettingsInput
} from "../domain/admin-finance-settings";

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

/** Persists bank, currency, tax, and settlement settings. */
export async function saveFinanceSettings(
  input: AdminFinanceSettingsInput
): Promise<{ ok: boolean; data: AdminFinanceSettings | null }> {
  const token = (await cookies()).get("hani_access_token")?.value;
  if (!token) return { ok: false, data: null };
  const response = await fetch(
    `${apiBase}/internal/v1/admin/finance/settings`,
    {
      method: "PUT",
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(input)
    }
  );
  if (!response.ok) return { ok: false, data: null };
  return { ok: true, data: (await response.json()) as AdminFinanceSettings };
}

/** Runs a provider reconciliation for one period and currency. */
export async function runReconciliation(input: {
  provider: string;
  periodStart: string;
  periodEnd: string;
  currency: string;
  actualAmount: number;
}): Promise<{ ok: boolean }> {
  return send(
    "POST",
    "/internal/v1/admin/finance/reconciliations/run",
    input
  );
}
