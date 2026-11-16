"use client";

import { useCallback, useEffect, useState } from "react";
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

function scopeFromLocation(locale: string): TourScopeValue | undefined {
  const path = window.location.pathname.replace(/\/+$/, "");
  if (path.endsWith(`/${locale}/tours/domestic`)) {
    return "Domestic";
  }
  if (path.endsWith(`/${locale}/tours/foreign`)) {
    return "Foreign";
  }

  const query = new URLSearchParams(window.location.search).get("scope");
  return query === "domestic" ? "Domestic" : query === "foreign" ? "Foreign" : undefined;
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
  const [state, setState] = useState<GridState>({
    tours: filterItems(tours),
    totalCount,
    page,
    scope
  });
  const [loading, setLoading] = useState(false);

  const loadScope = useCallback(
    async (nextScope?: TourScopeValue, nextPage = 1, pushHistory = true) => {
      if (pushHistory) {
        const path = pathForScope(locale, nextScope);
        if (window.location.pathname + window.location.search !== path) {
          window.history.pushState({ scope: nextScope ?? null }, "", path);
        }
      }

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
      } catch {
        setState((current) => ({ ...current, scope: nextScope }));
      } finally {
        setLoading(false);
      }
    },
    [locale]
  );

  useEffect(() => {
    const handlePopState = () => {
      void loadScope(scopeFromLocation(locale), 1, false);
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [loadScope, locale]);

  return (
    <TourGridView
      tours={state.tours}
      totalCount={state.totalCount}
      page={state.page}
      locale={locale}
      scope={state.scope}
      isLoading={loading}
      onScopeSelect={(nextScope) => void loadScope(nextScope, 1, true)}
    />
  );
}
