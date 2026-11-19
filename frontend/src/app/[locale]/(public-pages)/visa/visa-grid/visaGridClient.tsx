"use client";

import dynamic from "next/dynamic";
import type { VisaSearchItem } from "@/features/visa/domain/visa-search";
import type { VisaFilterValues } from "@/features/visa/ui/VisaFilters";

const VisaGridView = dynamic(() => import("@/views/visa/visa-grid/visaGrid"), {
  ssr: false
});

export default function VisaGridClient({
  visas,
  locale,
  filters
}: {
  visas: VisaSearchItem[];
  locale: string;
  filters: VisaFilterValues;
}) {
  return <VisaGridView visas={visas} locale={locale} filters={filters} />;
}
