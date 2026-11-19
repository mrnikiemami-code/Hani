import { getPageMetadata } from "@/config/metadata";
import { setRequestLocale } from "next-intl/server";
import { searchVisas } from "@/features/visa/infrastructure/visa-api";
import type { VisaFilterValues } from "@/features/visa/ui/VisaFilters";
import VisaGridClient from "./visaGridClient";

export const generateMetadata = () => getPageMetadata("Visa Grid");

function numberValue(value: string | undefined): number | undefined {
  const parsed = Number(value);
  return value && Number.isFinite(parsed) && parsed >= 0 ? parsed : undefined;
}

export default async function VisaGridPage({
  params,
  searchParams
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{
    q?: string;
    minPrice?: string;
    maxPrice?: string;
    maxProcessingDays?: string;
  }>;
}) {
  const { locale } = await params;
  const query = await searchParams;
  setRequestLocale(locale);

  const filters: VisaFilterValues = {
    q: query.q?.trim() || undefined,
    minPrice: numberValue(query.minPrice),
    maxPrice: numberValue(query.maxPrice),
    maxProcessingDays: numberValue(query.maxProcessingDays)
  };

  const all = await searchVisas(locale);
  const visas = all.filter((visa) => {
    if (
      filters.q &&
      !visa.name.toLowerCase().includes(filters.q.toLowerCase()) &&
      !visa.countryCode.toLowerCase().includes(filters.q.toLowerCase()) &&
      !visa.slug.toLowerCase().includes(filters.q.toLowerCase())
    ) {
      return false;
    }
    if (filters.minPrice !== undefined && (visa.minimumPrice ?? 0) < filters.minPrice) {
      return false;
    }
    if (filters.maxPrice !== undefined && (visa.minimumPrice ?? 0) > filters.maxPrice) {
      return false;
    }
    if (
      filters.maxProcessingDays !== undefined &&
      (visa.processingDaysMax ?? visa.processingDaysMin ?? 0) > filters.maxProcessingDays
    ) {
      return false;
    }
    return true;
  });

  return <VisaGridClient visas={visas} locale={locale} filters={filters} />;
}
