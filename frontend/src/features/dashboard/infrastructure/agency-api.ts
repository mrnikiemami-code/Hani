import { sessionGet } from "@/lib/hani/server-api";
import type { TravelerOrder } from "./dashboard-api";

export type AgencyListing = {
  offerId: string;
  agencyId: string;
  tourProductId: string;
  externalId: string;
  title: string;
  basePrice: number;
  currency: string;
  status: string;
  departures: Array<{
    id: string;
    startDate: string;
    endDate: string;
    capacity: number;
    seatsLeft: number;
    status: string;
    prices: Array<{ roomType: string; amount: number; currency: string }>;
  }>;
  bookingMode: string;
  collectionMode: string;
};

export type MyAgency = {
  id: string;
  slug: string;
  name: string;
  licenseNo: string;
  city: string;
  status: string;
  website: string | null;
  contactEmail: string | null;
  contactPhone: string | null;
  about: string | null;
  address: string | null;
  province: string | null;
  managerName: string | null;
  staffCount: number | null;
};

export type AgencyPayout = {
  payoutId: string;
  agencyId: string;
  periodStart: string;
  periodEnd: string;
  amount: number;
  currency: string;
  status: string;
  createdAt: string;
  paidAt: string | null;
};

async function getList<T>(path: string): Promise<T[]> {
  const result = await sessionGet<T[]>(path);
  return result.status === 200 && result.data ? result.data : [];
}

export async function getMyAgency(): Promise<MyAgency | null> {
  const result = await sessionGet<MyAgency>("/market/v1/agencies/me");
  return result.status === 200 ? result.data : null;
}

export function getMyAgencyListings(): Promise<AgencyListing[]> {
  return getList<AgencyListing>("/market/v1/me/agency/listings");
}

export function getMyAgencyPayouts(): Promise<AgencyPayout[]> {
  return getList<AgencyPayout>("/market/v1/me/agency/payouts");
}

export async function getMyAgencyOrders(): Promise<TravelerOrder[]> {
  const result = await sessionGet<{ items: TravelerOrder[]; totalCount: number }>(
    "/market/v1/me/agency/orders?page=1&pageSize=50"
  );
  return result.status === 200 && result.data ? result.data.items : [];
}
