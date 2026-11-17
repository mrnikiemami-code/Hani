"use server";

import { cookies } from "next/headers";

const apiBase =
  process.env.API_BASE_URL ??
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  "http://localhost:5099";

export type OtpSecurityConfig = {
  lifetimeSeconds: number;
  resendCooldownSeconds: number;
  maxRequestsPerHour: number;
  maxVerifyAttempts: number;
  mobileChangeWindowSeconds: number;
  maxMobileChangesPerIp: number;
  ipBlockSeconds: number;
  maxIpRequestsPerWindow: number;
  ipRequestWindowSeconds: number;
};

export async function saveOtpSecuritySettings(
  config: OtpSecurityConfig
): Promise<{ ok: boolean; data?: OtpSecurityConfig }> {
  const token = (await cookies()).get("hani_access_token")?.value;
  if (!token) return { ok: false };

  const response = await fetch(`${apiBase}/internal/v1/security/otp`, {
    method: "PUT",
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(config)
  });

  return response.ok
    ? { ok: true, data: (await response.json()) as OtpSecurityConfig }
    : { ok: false };
}

export async function unlockOtpSecurity(
  mobile: string,
  ipAddress: string
): Promise<{ ok: boolean }> {
  const token = (await cookies()).get("hani_access_token")?.value;
  if (!token) return { ok: false };

  const response = await fetch(`${apiBase}/internal/v1/security/otp/unlock`, {
    method: "POST",
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      mobile: mobile.trim() || null,
      ipAddress: ipAddress.trim() || null
    })
  });

  return { ok: response.ok };
}
