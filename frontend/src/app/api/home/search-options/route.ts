import { NextRequest, NextResponse } from "next/server";

const apiBase =
  process.env.API_BASE_URL ??
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  "http://localhost:5099";

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const query = new URLSearchParams({
    locale: params.get("locale") ?? "fa"
  });

  const scope = params.get("scope");
  if (scope) {
    query.set("scope", scope);
  }

  try {
    const response = await fetch(`${apiBase}/market/v1/search/options?${query}`, {
      cache: "no-store",
      headers: { Accept: "application/json" }
    });

    if (!response.ok) {
      return NextResponse.json(
        { origins: [], destinations: [], durations: [], hotels: [] },
        { status: response.status }
      );
    }

    return NextResponse.json(await response.json());
  } catch {
    return NextResponse.json(
      { origins: [], destinations: [], durations: [], hotels: [] },
      { status: 503 }
    );
  }
}
