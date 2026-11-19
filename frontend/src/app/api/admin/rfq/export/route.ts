import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const apiBase =
  process.env.API_BASE_URL ??
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  "http://localhost:5099";

function csvCell(value: unknown): string {
  const text = value == null ? "" : String(value);
  return `"${text.replaceAll('"', '""')}"`;
}

/** Exports the RFQ/lead queue as CSV for the admin panel. */
export async function GET() {
  const token = (await cookies()).get("hani_access_token")?.value;
  if (!token) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const response = await fetch(
    `${apiBase}/internal/v1/leads?page=1&pageSize=1000`,
    {
      cache: "no-store",
      headers: { Authorization: `Bearer ${token}` }
    }
  );
  if (!response.ok) {
    return new NextResponse(await response.text(), { status: response.status });
  }

  const data = (await response.json()) as {
    items: Array<{
      requestNumber: string;
      serviceType: string;
      destination: string | null;
      startDate: string | null;
      endDate: string | null;
      adults: number;
      children: number;
      infants: number;
      budgetAmount: number | null;
      currency: string | null;
      contactName: string;
      contactEmail: string;
      contactPhone: string;
      status: string;
      createdAt: string;
    }>;
  };

  const header = [
    "requestNumber",
    "serviceType",
    "destination",
    "startDate",
    "endDate",
    "adults",
    "children",
    "infants",
    "budgetAmount",
    "currency",
    "contactName",
    "contactEmail",
    "contactPhone",
    "status",
    "createdAt"
  ];
  const rows = data.items.map((item) =>
    [
      item.requestNumber,
      item.serviceType,
      item.destination,
      item.startDate,
      item.endDate,
      item.adults,
      item.children,
      item.infants,
      item.budgetAmount,
      item.currency,
      item.contactName,
      item.contactEmail,
      item.contactPhone,
      item.status,
      item.createdAt
    ]
      .map(csvCell)
      .join(",")
  );

  return new NextResponse([header.join(","), ...rows].join("\n"), {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": 'attachment; filename="hani-rfq-queue.csv"',
      "Cache-Control": "private, no-store"
    }
  });
}
