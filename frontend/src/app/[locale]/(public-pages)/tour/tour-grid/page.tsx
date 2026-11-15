import { getPageMetadata } from "@/config/metadata";
import { setRequestLocale } from "next-intl/server";
import { searchTours } from "@/features/tours/infrastructure/tours-api";
import TourGridClient from "./tourGridClient";

export const generateMetadata = () => getPageMetadata("Tour Grid");

export default async function TourGridPage({
  params,
  searchParams
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { locale } = await params;
  const query = await searchParams;
  setRequestLocale(locale);

  const page = Math.max(1, Number(query.page ?? "1"));
  const result = await searchTours(locale, page, 9);

  return (
    <TourGridClient
      tours={result.items}
      totalCount={result.totalCount}
      page={result.page}
      locale={locale}
    />
  );
}
