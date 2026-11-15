import { apiGet } from "@/lib/hani/api";
import type { AgencyDirectoryPage, AgencyProfile } from "../domain/agency";

export async function getAgencies(
  page = 1,
  pageSize = 12
): Promise<AgencyDirectoryPage> {
  const query = new URLSearchParams({
    page: String(page),
    pageSize: String(pageSize)
  });
  const result = await apiGet<AgencyDirectoryPage>(
    `/market/v1/agencies?${query.toString()}`
  );
  return result ?? { items: [], page, pageSize, totalCount: 0 };
}

export async function getAgencyProfile(slug: string): Promise<AgencyProfile | null> {
  return apiGet<AgencyProfile>(
    `/market/v1/agencies/${encodeURIComponent(slug)}/profile`
  );
}
