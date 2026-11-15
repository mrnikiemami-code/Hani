import { cookies } from "next/headers";
import { setRequestLocale } from "next-intl/server";
import { apiGet } from "@/lib/api";
import type { HomeFeed } from "@/lib/types";
import { SiteFooter, SiteHeader } from "@/components/SiteHeader";
import { resolveHomeExperience, HOME_EXPERIENCE_COOKIE } from "@/features/home/application/resolve-home-experience";
import { HomeExperienceRenderer } from "@/features/home/ui/HomeExperienceRenderer";

export default async function HomePage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const cookieStore = await cookies();
  const experience = resolveHomeExperience({
    cookie: cookieStore.get(HOME_EXPERIENCE_COOKIE)?.value
  });
  const data = await apiGet<HomeFeed>(`/market/v1/home?locale=${locale}`);

  return (
    <>
      <SiteHeader locale={locale} />
      <main>
        <HomeExperienceRenderer
          locale={locale}
          data={data}
          experienceId={experience.id}
        />
      </main>
      <SiteFooter />
    </>
  );
}
