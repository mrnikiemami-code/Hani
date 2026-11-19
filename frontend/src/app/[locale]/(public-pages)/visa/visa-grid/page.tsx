import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { absoluteUrl } from "@/lib/hani/site";
import { searchVisas } from "@/features/visa/infrastructure/visa-api";
import type { VisaFilterValues } from "@/features/visa/ui/VisaFilters";
import VisaGridClient from "./visaGridClient";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "common" });
  return {
    title: t("visas"),
    description: t("visaScopeDescription"),
    alternates: {
      canonical: absoluteUrl(`/${locale}/visa`),
      languages: Object.fromEntries(
        routing.locales.map((item) => [item, absoluteUrl(`/${item}/visa`)])
      )
    },
    robots: { index: true, follow: true }
  };
}

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
