"use client";

import { useState } from "react";
import type {
  TourScopeValue,
  TourSearchFilters,
  TourSearchItem
} from "@/features/tours/domain/tour-search";
import TourGridView from "@/views/tour/tour-grid/tourGrid";

type Props = {
  tours: TourSearchItem[];
  totalCount: number;
  page: number;
  locale: string;
  filters: TourSearchFilters;
  tourTypes: string[];
};

type GridState = {
  tours: TourSearchItem[];
  totalCount: number;
  page: number;
  scope?: TourScopeValue;
};

function pathForScope(locale: string, scope?: TourScopeValue): string {
  if (scope === "Domestic") {
    return `/${locale}/tours?scope=domestic`;
  }
  if (scope === "Foreign") {
    return `/${locale}/tours?scope=foreign`;
  }
  return `/${locale}/tours`;
}

export default function TourGridClient({
  tours,
  totalCount,
  page,
  locale,
  filters,
  tourTypes
}: Props) {
  const [state] = useState<GridState>({
    tours,
    totalCount,
    page,
    scope: filters.scope
  });

  return (
    <TourGridView
      tours={state.tours}
      totalCount={state.totalCount}
      page={state.page}
      locale={locale}
      scope={state.scope}
      filters={filters}
      tourTypes={tourTypes}
      onScopeSelect={(nextScope) => {
        window.location.assign(pathForScope(locale, nextScope));
      }}
    />
  );
}
