import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { searchTours } from "@/features/tours/infrastructure/tours-api";
import type { TourScopeValue } from "@/features/tours/domain/tour-search";
import TourGridClient from "./tourGridClient";

export async function buildTourGridMetadata(
  locale: string,
  scope?: TourScopeValue
): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "common" });

  return {
    title:
      scope === "Domestic"
        ? t("domesticTours")
        : scope === "Foreign"
          ? t("foreignTours")
          : t("tours"),
    description: t("scopeDescription")
  };
}

export async function TourGridPage({
  locale,
  page,
  scope
}: {
  locale: string;
  page: number;
  scope?: TourScopeValue;
}) {
  setRequestLocale(locale);
  const result = await searchTours(locale, page, 9, scope);

  return (
    <TourGridClient
      tours={result.items}
      totalCount={result.totalCount}
      page={result.page}
      locale={locale}
      scope={scope}
    />
  );
}
