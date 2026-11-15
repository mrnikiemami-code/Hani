import { redirect } from "next/navigation";

export default async function PreferencesSettingsPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  redirect(`/${locale}/settings/experience`);
}
