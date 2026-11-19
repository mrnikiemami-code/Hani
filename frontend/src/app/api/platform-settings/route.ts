import { NextResponse } from "next/server";

const apiBase =
  process.env.API_BASE_URL ??
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  "http://localhost:5099";

export async function GET() {
  try {
    const response = await fetch(`${apiBase}/market/v1/platform-settings`, {
      cache: "no-store",
      headers: { Accept: "application/json" }
    });
    if (!response.ok) {
      return NextResponse.json({ settings: {} }, { status: 200 });
    }
    return NextResponse.json(await response.json());
  } catch {
    return NextResponse.json({ settings: {} }, { status: 200 });
  }
}
