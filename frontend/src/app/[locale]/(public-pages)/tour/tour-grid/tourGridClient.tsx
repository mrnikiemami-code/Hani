"use client";

import { useCallback, useState } from "react";
import { useTranslations } from "next-intl";
import type {
  PagedResult,
  TourScopeValue,
  TourSearchItem
} from "@/features/tours/domain/tour-search";
import TourGridView from "@/views/tour/tour-grid/tourGrid";

type Props = {
  tours: TourSearchItem[];
  totalCount: number;
  page: number;
  locale: string;
  scope?: TourScopeValue;
};

type GridState = {
  tours: TourSearchItem[];
  totalCount: number;
  page: number;
  scope?: TourScopeValue;
};

function filterItems(items: TourSearchItem[]): TourSearchItem[] {
  return items.filter((item) => !item.title.includes("?") && !item.title.includes("�??"));
}

function pathForScope(locale: string, scope?: TourScopeValue): string {
  if (scope === "Domestic") {
    return `/${locale}/tours/domestic`;
  }
  if (scope === "Foreign") {
    return `/${locale}/tours/foreign`;
  }
  return `/${locale}/tours`;
}

export default function TourGridClient({
  tours,
  totalCount,
  page,
  locale,
  scope
}: Props) {
  const t = useTranslations("common");
  const [state, setState] = useState<GridState>({
    tours: filterItems(tours),
    totalCount,
    page,
    scope
  });
  const [loading, setLoading] = useState(false);

  const loadScope = useCallback(
    async (nextScope?: TourScopeValue, nextPage = 1) => {
      const query = new URLSearchParams({
        locale,
        page: String(nextPage),
        pageSize: "9",
        sort: "newest"
      });
      if (nextScope) {
        query.set("scope", nextScope);
      }

      setLoading(true);
      try {
        const response = await fetch(`/api/tours/search?${query.toString()}`, {
          cache: "no-store"
        });
        const result = (await response.json()) as PagedResult<TourSearchItem>;
        const items = filterItems(result?.items ?? []);

        setState({
          tours: items,
          totalCount: items.length,
          page: result?.page ?? nextPage,
          scope: nextScope
        });

        // Keep the address bar truthful without triggering Next.js routing.
        window.history.replaceState(
          { scope: nextScope ?? null },
          "",
          pathForScope(locale, nextScope)
        );
        document.title =
          nextScope === "Domestic"
            ? t("domesticTours")
            : nextScope === "Foreign"
              ? t("foreignTours")
              : t("tours");
      } finally {
        setLoading(false);
      }
    },
    [locale, t]
  );

  return (
    <TourGridView
      tours={state.tours}
      totalCount={state.totalCount}
      page={state.page}
      locale={locale}
      scope={state.scope}
      isLoading={loading}
      onScopeSelect={(nextScope) => void loadScope(nextScope)}
    />
  );
}
