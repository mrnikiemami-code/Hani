import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";

const apiBase =
  process.env.API_BASE_URL ??
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  "http://localhost:5099";

/** Streams a finance CSV export from the API while attaching the admin token. */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ dataset: string }> }
) {
  const { dataset } = await params;
  const token = (await cookies()).get("hani_access_token")?.value;
  if (!token) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const search = new URL(request.url).search;
  const response = await fetch(
    `${apiBase}/internal/v1/admin/finance/exports/${encodeURIComponent(dataset)}${search}`,
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
        response.headers.get("content-type") ?? "text/csv; charset=utf-8",
      "Content-Disposition":
        response.headers.get("content-disposition") ??
        `attachment; filename="${dataset}.csv"`
    }
  });
}
