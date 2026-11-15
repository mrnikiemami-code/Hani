import { cookies } from "next/headers";
import { setRequestLocale } from "next-intl/server";
import {
  HOME_EXPERIENCE_COOKIE,
  resolveHomeExperience
} from "@/features/home-experience/application/resolve-home-experience";
import { getHomeFeed } from "@/features/home-experience/infrastructure/home-api";
import { HomeExperienceRenderer } from "@/features/home-experience/ui/HomeExperienceRenderer";
import { getMyPreferences } from "@/features/preferences/infrastructure/preferences-api";

export default async function HomePage({
  params,
  searchParams
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ scope?: string }>;
}) {
  const { locale } = await params;
  const { scope } = await searchParams;
  const tourScope = scope === "domestic" ? "Domestic" : scope === "foreign" ? "Foreign" : undefined;
  setRequestLocale(locale);

  const cookieStore = await cookies();
  const stored = await getMyPreferences();
  const experience = resolveHomeExperience({
    userPreference: stored?.homeExperienceId,
    cookie: cookieStore.get(HOME_EXPERIENCE_COOKIE)?.value
  });
  const homeFeed = await getHomeFeed(locale, tourScope);

  return (
    <HomeExperienceRenderer
      definition={experience}
      homeFeed={homeFeed}
      tourScope={tourScope}
    />
  );
}
