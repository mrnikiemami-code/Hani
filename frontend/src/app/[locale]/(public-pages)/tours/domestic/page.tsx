import {
  buildTourGridMetadata,
  TourGridPage
} from "../../tour/tour-grid/TourGridPage";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return buildTourGridMetadata(locale, "Domestic");
}

export default async function Page({
  params,
  searchParams
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { locale } = await params;
  const query = await searchParams;
  const page = Math.max(1, Number(query.page ?? "1"));

  return <TourGridPage locale={locale} page={page} scope="Domestic" />;
}
