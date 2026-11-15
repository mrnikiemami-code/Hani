"use client";

import dynamic from "next/dynamic";
import type {
  TourScopeValue,
  TourSearchItem
} from "@/features/tours/domain/tour-search";

const TourGridView = dynamic(() => import("@/views/tour/tour-grid/tourGrid"), {
  ssr: false
});

export default function TourGridClient({
  tours,
  totalCount,
  page,
  locale,
  scope
}: {
  tours: TourSearchItem[];
  totalCount: number;
  page: number;
  locale: string;
  scope?: TourScopeValue;
}) {
  return (
    <TourGridView
      tours={tours}
      totalCount={totalCount}
      page={page}
      locale={locale}
      scope={scope}
    />
  );
}
