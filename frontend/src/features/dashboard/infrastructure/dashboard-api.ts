import { sessionGet } from "@/lib/hani/server-api";

export type TravelerOrder = {
  orderId: string;
  orderNumber: string;
  agencyId: string;
  status: string;
  paymentStatus: string;
  total: number;
  currency: string;
  contactEmail: string;
  createdAt: string;
};

export type TravelerDashboardSummary = {
  contactEmail: string;
  orderCount: number;
  reservationRequestCount: number;
  leadCount: number;
  grossPaid: number;
  currency: string | null;
};

export type TravelerDashboard = {
  summary: TravelerDashboardSummary;
  recentOrders: TravelerOrder[];
};

export async function getMyDashboard(): Promise<TravelerDashboard | null> {
  const result = await sessionGet<TravelerDashboard>("/market/v1/me/dashboard");
  return result.status === 200 ? result.data : null;
}

export type AgencyDashboard = {
  agencyId: string | null;
  agencyName: string | null;
  orderCount: number;
  pendingCount: number;
  paidCount: number;
  cancelledCount: number;
  grossPaid: number;
  currency: string | null;
  recentOrders: TravelerOrder[];
};

export async function getMyAgencyDashboard(): Promise<AgencyDashboard | null> {
  const result = await sessionGet<AgencyDashboard>("/market/v1/me/agency/dashboard");
  return result.status === 200 ? result.data : null;
}

export async function getMyOrders(
  page = 1,
  pageSize = 20
): Promise<{ items: TravelerOrder[]; totalCount: number } | null> {
  const result = await sessionGet<{ items: TravelerOrder[]; totalCount: number }>(
    `/market/v1/me/orders?page=${page}&pageSize=${pageSize}`
  );

  return result.status === 200 ? result.data : null;
}
