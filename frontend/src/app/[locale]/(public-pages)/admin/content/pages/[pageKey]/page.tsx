import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { sessionGet } from "@/lib/hani/server-api";
import { normalizeHomePageSettings, type HomePageSettingsResponse } from "@/features/home-experience/domain/home-page-settings";
import {
  EMPTY_PAGE_COMPOSITION,
  PAGE_KEY_OPTIONS,
  normalizePageComposition,
  type PageCompositionData,
  type PageCompositionDto,
  type PageSectionType
} from "@/features/home-experience/domain/page-composition";
import type { MediaListResponse } from "@/features/home-experience/domain/media";
import { AdminPageShell } from "@/features/home-experience/ui/AdminPageShell";
import { PageCompositionEditor } from "@/features/home-experience/ui/PageCompositionEditor";

export const dynamic = "force-dynamic";

const HOME_SECTION_TYPES: Record<string, PageSectionType> = {
  featured: "tourCollection",
  latestDomestic: "tourCollection",
  latestForeign: "tourCollection",
  visas: "visaCollection",
  originCities: "cardGrid",
  travelogues: "richText",
  magazine: "richText",
  experience: "richText",
  delivery: "richText",
  guide: "richText",
  testimonials: "testimonials",
  whyChoose: "richText"
};

async function homeFallback(locale: string): Promise<PageCompositionData | null> {
  const result = await sessionGet<HomePageSettingsResponse>(
    `/internal/v1/home-settings?key=default&locale=${encodeURIComponent(locale)}`
  );
  if (!result.data) return null;
  const settings = normalizeHomePageSettings(result.data.settings);
  return {
    hero: {
      ...EMPTY_PAGE_COMPOSITION.hero,
      fallbackImageUrl: settings.heroImageUrl
    },
    sections: settings.sections.map((section, index) => ({
      id: section.id,
      type: HOME_SECTION_TYPES[section.id] ?? "richText",
      enabled: section.enabled,
      order: section.order || (index + 1) * 10,
      title: "",
      subtitle: "",
      body: "",
      mediaId: null,
      fallbackImageUrl: section.imageUrl ?? "",
      ctaLabel: "",
      ctaHref: "",
      sourceMode: "auto",
      sourceIds: []
    })),
    seo: { ...EMPTY_PAGE_COMPOSITION.seo }
  };
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string; pageKey: string }>;
}): Promise<Metadata> {
  const { locale, pageKey } = await params;
  const t = await getTranslations({ locale, namespace: "adminPages" });
  return {
    title: `${t("builderTitle")} — ${decodeURIComponent(pageKey)}`,
    robots: { index: false, follow: false }
  };
}

export default async function PageCompositionBuilderPage({
  params
}: {
  params: Promise<{ locale: string; pageKey: string }>;
}) {
  const { locale, pageKey: rawPageKey } = await params;
  const pageKey = decodeURIComponent(rawPageKey);
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "adminPages" });
  const [composition, media] = await Promise.all([
    sessionGet<PageCompositionDto>(
      `/internal/v1/page-compositions/${encodeURIComponent(pageKey)}?locale=${encodeURIComponent(locale)}&published=false`
    ),
    sessionGet<MediaListResponse>(
      "/internal/v1/content-media?page=1&pageSize=100"
    )
  ]);

  if (!PAGE_KEY_OPTIONS.some((option) => option.key === pageKey)) {
    notFound();
  }

  const initial =
    composition.data?.data ??
    (pageKey === "home"
      ? (await homeFallback(locale)) ?? EMPTY_PAGE_COMPOSITION
      : EMPTY_PAGE_COMPOSITION);

  return (
    <AdminPageShell
      locale={locale}
      title={t("builderTitle")}
      subtitle={t("builderHint")}
      active={t("builderTitle")}
      activeSection="content"
      activeChild="pages"
    >
      <PageCompositionEditor
        pageKey={pageKey}
        locale={locale}
        initialData={normalizePageComposition(initial)}
        mediaAssets={media.data?.items ?? []}
      />
    </AdminPageShell>
  );
}
