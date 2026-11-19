import { redirect } from "next/navigation";

export default async function LegacyTourGridPage({
  params,
  searchParams
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ scope?: string }>;
}) {
  const { locale } = await params;
  const query = await searchParams;
  const scope =
    query.scope === "domestic"
      ? "?scope=domestic"
      : query.scope === "foreign"
        ? "?scope=foreign"
        : "";
  redirect(`/${locale}/tours${scope}`);
}
