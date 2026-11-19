import { redirect } from "next/navigation";

export default async function LegacyTourDetailsPage({
  params,
  searchParams
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ slug?: string }>;
}) {
  const { locale } = await params;
  const { slug } = await searchParams;
  redirect(
    slug
      ? `/${locale}/tours/${encodeURIComponent(slug)}`
      : `/${locale}/tours`
  );
}
