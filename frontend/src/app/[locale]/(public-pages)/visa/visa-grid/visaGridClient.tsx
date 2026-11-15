"use client";

import dynamic from "next/dynamic";
import type { VisaSearchItem } from "@/features/visa/domain/visa-search";

const VisaGridView = dynamic(() => import("@/views/visa/visa-grid/visaGrid"), {
  ssr: false
});

export default function VisaGridClient({
  visas,
  locale
}: {
  visas: VisaSearchItem[];
  locale: string;
}) {
  return <VisaGridView visas={visas} locale={locale} />;
}
