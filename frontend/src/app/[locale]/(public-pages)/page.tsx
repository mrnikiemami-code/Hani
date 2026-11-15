import { cookies } from "next/headers";
import { setRequestLocale } from "next-intl/server";
import {
  HOME_EXPERIENCE_COOKIE,
  resolveHomeExperience
} from "@/features/home-experience/application/resolve-home-experience";
import { getHomeFeed } from "@/features/home-experience/infrastructure/home-api";
import { HomeExperienceRenderer } from "@/features/home-experience/ui/HomeExperienceRenderer";

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
  const homeFeed = await getHomeFeed(locale);

  return <HomeExperienceRenderer definition={experience} homeFeed={homeFeed} />;
}
