import { redirect } from "next/navigation";

export default async function LegacyVisaDetailsPage({
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
      ? `/${locale}/visa/${encodeURIComponent(slug)}`
      : `/${locale}/visa`
  );
}
