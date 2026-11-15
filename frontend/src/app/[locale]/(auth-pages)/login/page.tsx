import { setRequestLocale } from "next-intl/server";
import { OtpLoginForm } from "@/features/auth/ui/OtpLoginForm";

export default async function LoginPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <OtpLoginForm locale={locale} />;
}
