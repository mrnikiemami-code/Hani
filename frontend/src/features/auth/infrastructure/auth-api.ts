const apiBase =
  process.env.API_BASE_URL ??
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  "http://localhost:5099";

export type OtpRequestResult = {
  expiresAt: string;
  retryAfterSeconds: number;
  devCode: string | null;
};

export type AuthUser = {
  userId: string;
  mobile: string;
  email: string | null;
  firstName: string;
  lastName: string;
  username: string;
  bio: string | null;
  avatarUrl: string | null;
  role: string;
  status: string;
};

export type AuthResult = {
  accessToken: string;
  refreshToken: string;
  accessTokenExpiresAt: string;
  user: AuthUser;
};

export async function requestOtp(
  mobile: string,
  ipAddress?: string
): Promise<OtpRequestResult> {
  const response = await fetch(`${apiBase}/market/v1/auth/otp/request`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(ipAddress ? { "X-Forwarded-For": ipAddress } : {})
    },
    body: JSON.stringify({ mobile })
  });

  if (!response.ok) {
    throw new Error("OTP request failed");
  }

  return (await response.json()) as OtpRequestResult;
}

export async function verifyOtp(
  mobile: string,
  code: string
): Promise<AuthResult> {
  const response = await fetch(`${apiBase}/market/v1/auth/otp/verify`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ mobile, code })
  });

  if (!response.ok) {
    throw new Error("OTP verification failed");
  }

  return (await response.json()) as AuthResult;
}
