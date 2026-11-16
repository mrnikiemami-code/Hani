import {
  buildTourGridMetadata,
  TourGridPage
} from "../tour/tour-grid/TourGridPage";
import type { TourScopeValue } from "@/features/tours/domain/tour-search";

function resolveScope(value: string | undefined): TourScopeValue | undefined {
  return value === "domestic"
    ? "Domestic"
    : value === "foreign"
      ? "Foreign"
      : undefined;
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
  searchParams: Promise<{ page?: string; scope?: string; origin?: string }>;
}) {
  const { locale } = await params;
  const query = await searchParams;
  const page = Math.max(1, Number(query.page ?? "1"));

  return (
    <TourGridPage
      locale={locale}
      page={page}
      scope={resolveScope(query.scope)}
      originSlug={query.origin}
    />
  );
}
