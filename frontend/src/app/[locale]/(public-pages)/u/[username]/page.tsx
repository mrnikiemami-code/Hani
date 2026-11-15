import { setRequestLocale } from "next-intl/server";
import { AuthorProfileView } from "@/features/authors/ui/AuthorProfileView";

export default async function AuthorPage({
  params
}: {
  params: Promise<{ locale: string; username: string }>;
}) {
  const { locale, username } = await params;
  setRequestLocale(locale);
  return <AuthorProfileView locale={locale} username={username} />;
}
