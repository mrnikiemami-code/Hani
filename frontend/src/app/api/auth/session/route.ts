import { NextResponse } from "next/server";
import { verifyOtp } from "@/features/auth/infrastructure/auth-api";

const accessCookie = "hani_access_token";
const refreshCookie = "hani_refresh_token";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      mobile?: string;
      code?: string;
    };

    if (!body.mobile || !body.code) {
      return NextResponse.json({ error: "mobile_and_code_required" }, { status: 400 });
    }

    const result = await verifyOtp(body.mobile, body.code);
    const response = NextResponse.json({ user: result.user });

    const secure = process.env.NODE_ENV === "production";
    response.cookies.set(accessCookie, result.accessToken, {
      httpOnly: true,
      secure,
      sameSite: "lax",
      path: "/",
      expires: new Date(result.accessTokenExpiresAt)
    });
    response.cookies.set(refreshCookie, result.refreshToken, {
      httpOnly: true,
      secure,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30
    });

    return response;
  } catch {
    return NextResponse.json({ error: "otp_verify_failed" }, { status: 401 });
  }
}
