import { NextRequest, NextResponse } from "next/server";

const apiBase =
  process.env.API_BASE_URL ??
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  "http://localhost:5099";

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const query = new URLSearchParams({
    locale: params.get("locale") ?? "fa",
    page: params.get("page") ?? "1",
    pageSize: params.get("pageSize") ?? "9",
    sort: params.get("sort") ?? "newest"
  });

  const scope = params.get("scope");
  if (scope) {
    query.set("scope", scope);
  }

  const originSlug = params.get("originSlug");
  if (originSlug) {
    query.set("originSlug", originSlug);
  }

  try {
    const response = await fetch(`${apiBase}/market/v1/search?${query}`, {
      cache: "no-store",
      headers: { Accept: "application/json" }
    });

    if (!response.ok) {
      return NextResponse.json(
        { items: [], page: 1, pageSize: 9, totalCount: 0, totalPages: 0 },
        { status: response.status }
      );
    }

    return NextResponse.json(await response.json());
  } catch {
    return NextResponse.json(
      { items: [], page: 1, pageSize: 9, totalCount: 0, totalPages: 0 },
      { status: 503 }
    );
  }
}
