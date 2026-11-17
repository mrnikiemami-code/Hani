import { NextResponse } from "next/server";
import { requestOtp } from "@/features/auth/infrastructure/auth-api";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { mobile?: string };
    if (!body.mobile) {
      return NextResponse.json({ error: "mobile_required" }, { status: 400 });
    }

    const ipAddress =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      request.headers.get("x-real-ip") ??
      undefined;
    const result = await requestOtp(body.mobile, ipAddress);
    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ error: "otp_request_failed" }, { status: 502 });
  }
}
