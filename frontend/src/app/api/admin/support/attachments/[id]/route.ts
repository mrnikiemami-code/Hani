import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";

const apiBase =
  process.env.API_BASE_URL ??
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  "http://localhost:5099";

/** Streams any support attachment with the admin bearer token. */
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const token = (await cookies()).get("hani_access_token")?.value;
  if (!token) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const response = await fetch(
    `${apiBase}/internal/v1/admin/support/attachments/${encodeURIComponent(id)}`,
    {
      cache: "no-store",
      headers: { Authorization: `Bearer ${token}` }
    }
  );

  if (!response.ok) {
    return new NextResponse(await response.text(), {
      status: response.status,
      headers: {
        "Content-Type":
          response.headers.get("content-type") ?? "application/problem+json"
      }
    });
  }

  return new NextResponse(await response.arrayBuffer(), {
    status: 200,
    headers: {
      "Content-Type":
        response.headers.get("content-type") ?? "application/octet-stream",
      "Content-Disposition":
        response.headers.get("content-disposition") ??
        'attachment; filename="attachment"'
    }
  });
}
