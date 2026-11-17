import type { Metadata } from "next";
import { cookies } from "next/headers";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { absoluteUrl } from "@/lib/hani/site";
import {
  HOME_EXPERIENCE_COOKIE,
  resolveHomeExperience
} from "@/features/home-experience/application/resolve-home-experience";
import { getHomeFeed } from "@/features/home-experience/infrastructure/home-api";
import { getHomePageSettings } from "@/features/home-experience/infrastructure/home-settings-api";
import { HomeExperienceRenderer } from "@/features/home-experience/ui/HomeExperienceRenderer";
import { getMyPreferences } from "@/features/preferences/infrastructure/preferences-api";
import { HomeStructuredData } from "@/features/home-experience/ui/HomeStructuredData";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  const settings = await getHomePageSettings(locale);
  const ogImage = settings.heroImageUrl
    ? settings.heroImageUrl.startsWith("http")
      ? settings.heroImageUrl
      : absoluteUrl(settings.heroImageUrl)
    : absoluteUrl("/assets/img/bg/adventure-bg.png");
  const languages = Object.fromEntries(
    routing.locales.map((item) => [item, absoluteUrl(`/${item}`)])
  );

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: absoluteUrl(`/${locale}`),
      languages
    },
    openGraph: {
      type: "website",
      siteName: "Hani",
      title: t("title"),
      description: t("description"),
      url: absoluteUrl(`/${locale}`),
      images: [ogImage]
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: [ogImage]
    }
  };
}

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
  const homeSettings = await getHomePageSettings(locale);

  const heroImage = homeSettings.heroImageUrl
    ? homeSettings.heroImageUrl.startsWith("http")
      ? homeSettings.heroImageUrl
      : absoluteUrl(homeSettings.heroImageUrl)
    : "";

  return (
    <>
      {heroImage ? (
        <link rel="preload" as="image" href={heroImage} fetchPriority="high" />
      ) : null}
      <HomeStructuredData locale={locale} feed={homeFeed} />
      <HomeExperienceRenderer
        definition={experience}
        homeFeed={homeFeed}
        tourScope={tourScope}
        homeSettings={homeSettings}
      />
    </>
  );
}
