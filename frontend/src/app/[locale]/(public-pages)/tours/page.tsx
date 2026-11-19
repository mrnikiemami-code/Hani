import {
  buildTourGridMetadata,
  TourGridPage
} from "../tour/tour-grid/TourGridPage";
import { searchTours } from "@/features/tours/infrastructure/tours-api";
import type {
  TourScopeValue,
  TourSearchFilters
} from "@/features/tours/domain/tour-search";

function resolveScope(value: string | undefined): TourScopeValue | undefined {
  return value === "domestic"
    ? "Domestic"
    : value === "foreign"
      ? "Foreign"
      : undefined;
}

function numberValue(value: string | undefined): number | undefined {
  if (value === undefined || value === "") return undefined;
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : undefined;
}

function sortValue(value: string | undefined): string {
  const allowed = new Set([
    "newest",
    "price_asc",
    "price_desc",
    "duration_asc",
    "rating"
  ]);
  return value && allowed.has(value) ? value : "newest";
}

export async function generateMetadata({
  params,
  searchParams
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ scope?: string }>;
}) {
  const { locale } = await params;
  const query = await searchParams;
  return buildTourGridMetadata(locale, resolveScope(query.scope));
}

export default async function Page({
  params,
  searchParams
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{
    page?: string;
    scope?: string;
    origin?: string;
    q?: string;
    minPrice?: string;
    maxPrice?: string;
    minDuration?: string;
    maxDuration?: string;
    tourType?: string;
    sort?: string;
  }>;
}) {
  const { locale } = await params;
  const query = await searchParams;
  const requestedPage = Number(query.page ?? "1");
  const page =
    Number.isInteger(requestedPage) && requestedPage > 0 ? requestedPage : 1;
  const scope = resolveScope(query.scope);
  const filters: TourSearchFilters = {
    scope,
    originSlug: query.origin,
    q: query.q?.trim() || undefined,
    minPrice: numberValue(query.minPrice),
    maxPrice: numberValue(query.maxPrice),
    minDuration: numberValue(query.minDuration),
    maxDuration: numberValue(query.maxDuration),
    tourType: query.tourType?.trim() || undefined,
    sort: sortValue(query.sort)
  };

  const typeSource = await searchTours(locale, 1, 100, { scope });
  const tourTypes = [
    ...new Set(typeSource.items.map((item) => item.tourType).filter(Boolean))
  ].sort();

  return (
    <TourGridPage
      locale={locale}
      page={page}
      filters={filters}
      tourTypes={tourTypes}
    />
  );
}
