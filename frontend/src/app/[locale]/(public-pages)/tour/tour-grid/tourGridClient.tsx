"use client";

import type {
  TourScopeValue,
  TourSearchItem
} from "@/features/tours/domain/tour-search";
import TourGridView from "@/views/tour/tour-grid/tourGrid";

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
