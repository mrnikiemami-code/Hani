import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const apiBase =
  process.env.API_BASE_URL ??
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  "http://localhost:5099";

/** Returns the signed-in agency profile without exposing the HttpOnly token. */
export async function GET() {
  const token = (await cookies()).get("hani_access_token")?.value;
  if (!token) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const response = await fetch(`${apiBase}/market/v1/agencies/me`, {
    cache: "no-store",
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!response.ok) {
    return new NextResponse(await response.text(), {
      status: response.status,
      headers: {
        "Content-Type":
          response.headers.get("content-type") ?? "application/problem+json"
      }
    });
  }

  return NextResponse.json(await response.json(), {
    headers: { "Cache-Control": "private, no-store" }
  });
}
