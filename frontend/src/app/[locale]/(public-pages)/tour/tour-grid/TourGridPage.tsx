import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { absoluteUrl } from "@/lib/hani/site";
import { searchTours } from "@/features/tours/infrastructure/tours-api";
import type { TourScopeValue } from "@/features/tours/domain/tour-search";
import TourGridClient from "./tourGridClient";
import { TourListStructuredData } from "@/features/tours/ui/TourListStructuredData";

export async function buildTourGridMetadata(
  locale: string,
  scope?: TourScopeValue
): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "common" });
  const query = scope === "Domestic" ? "?scope=domestic" : scope === "Foreign" ? "?scope=foreign" : "";
  const canonical = absoluteUrl(`/${locale}/tours${query}`);
  const languages = Object.fromEntries(
    routing.locales.map((item) => [item, absoluteUrl(`/${item}/tours${query}`)])
  );
  const title =
    scope === "Domestic"
      ? t("domesticTours")
      : scope === "Foreign"
        ? t("foreignTours")
        : t("tours");

  return {
    title,
    description: t("scopeDescription"),
    alternates: { canonical, languages },
    openGraph: {
      type: "website",
      siteName: "Hani",
      title,
      description: t("scopeDescription"),
      url: canonical,
      images: [absoluteUrl("/assets/img/bg/adventure-bg.png")]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: t("scopeDescription"),
      images: [absoluteUrl("/assets/img/bg/adventure-bg.png")]
    }
  };
}

export async function TourGridPage({
  locale,
  page,
  scope,
  originSlug
}: {
  locale: string;
  page: number;
  scope?: TourScopeValue;
  originSlug?: string;
}) {
  setRequestLocale(locale);
  const result = await searchTours(locale, page, 9, scope, originSlug);

  return (
    <>
      <TourListStructuredData
        locale={locale}
        scope={scope}
        tours={result.items}
      />
      <TourGridClient
        tours={result.items}
        totalCount={result.totalCount}
        page={result.page}
        locale={locale}
        scope={scope}
      />
    </>
  );
}
